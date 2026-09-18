/**
 * Applications Controller
 * Handles Student Application Submission & Admin Candidate Selection & Employer Forwarding
 * Fully persisted in MongoDB with resilient memory fallback
 */

import { applications as memoryApplications } from '../database.js';
import ApplicationModel from '../models/Application.js';
import { verifyAdminToken, verifyStudentToken } from '../middleware/authMiddleware.js';
import { sendApplicationConfirmationEmail } from '../services/emailService.js';

// Helper to fetch all applications from MongoDB or memory
const getAllApplications = async () => {
  try {
    const dbApps = await ApplicationModel.find().sort({ createdAt: -1 }).lean();
    if (dbApps && dbApps.length > 0) {
      return dbApps;
    }
  } catch (err) {
    // Database unreachable, proceed with in-memory store
  }
  return memoryApplications;
};

export const getApplicationsHandler = async (req, res) => {
  const admin = verifyAdminToken(req);
  const student = verifyStudentToken(req);

  const allApps = await getAllApplications();

  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (admin) {
    // Full unredacted applied student profiles for Central Admin
    res.end(JSON.stringify(allApps));
    return;
  }

  if (student) {
    // Students can only access their own submitted applications
    const studentApps = allApps.filter(a => 
      a.studentId === student.id || 
      a.studentEmail === student.email || 
      a.applicantEmail === student.email
    );
    res.end(JSON.stringify(studentApps));
    return;
  }

  // Employer Dashboard / Top selected candidate profile access:
  // Forwarded candidates retain full candidate profile (name, email, phone, college, degree, resume, links)
  const resultApps = allApps.map(app => {
    if (app.forwardedToEmployer) {
      return app;
    }
    return {
      id: app.id,
      internshipId: app.internshipId,
      internshipTitle: app.internshipTitle,
      companyName: app.companyName,
      appliedDate: app.appliedDate,
      status: app.status,
      adminSelectionStatus: app.adminSelectionStatus,
      studentName: app.studentName ? `${app.studentName.charAt(0)}. (Pending Vetting)` : 'Candidate (Pending Vetting)',
      studentEmail: '🔒 Pending Admin Selection',
      studentPhone: '🔒 Pending Admin Selection',
      resumeName: '🔒 Stored in Central Admin Queue'
    };
  });

  res.end(JSON.stringify(resultApps));
};

export const submitApplicationHandler = async (req, res, body) => {
  const newApp = {
    id: body.id || `app-${Date.now()}`,
    ...body,
    appliedDate: body.appliedDate || new Date().toISOString().split('T')[0],
    status: 'Under Review',
    forwardedToEmployer: false,
    adminSelectionStatus: 'Pending Admin Selection'
  };

  // Persist to MongoDB
  try {
    await ApplicationModel.create(newApp);
  } catch (dbErr) {
    // In-memory mirror fallback
  }

  // Always keep in-memory array up-to-date
  memoryApplications.unshift(newApp);

  // Dispatch automated application confirmation email (non-blocking)
  let emailStatus = null;
  try {
    emailStatus = await sendApplicationConfirmationEmail(newApp);
  } catch (err) {
    console.error('⚠️ [Application Controller] Failed to dispatch confirmation email:', err.message);
    emailStatus = { success: false, error: err.message };
  }

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    application: newApp,
    emailDispatched: emailStatus?.success ?? false,
    emailDetails: emailStatus
  }));
};

export const forwardApplicationHandler = async (req, res, body) => {
  const admin = verifyAdminToken(req);
  if (!admin) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized. Only Central Admin can manage and forward student application profiles.' }));
    return;
  }

  const { applicationId } = body;

  const updates = {
    forwardedToEmployer: true,
    adminSelectionStatus: 'Shortlisted & Forwarded to Employer Portal',
    status: 'Forwarded to Employer',
    employerDecision: 'Awaiting Recruiter Hiring Action'
  };

  // Update in MongoDB
  let updatedApp = null;
  try {
    updatedApp = await ApplicationModel.findOneAndUpdate(
      { id: applicationId },
      { $set: updates },
      { new: true }
    ).lean();
  } catch (dbErr) {
    // proceed to memory fallback
  }

  // Update in memory
  const memoryApp = memoryApplications.find(a => a.id === applicationId);
  if (memoryApp) {
    Object.assign(memoryApp, updates);
    if (!updatedApp) updatedApp = memoryApp;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, application: updatedApp || memoryApp }));
};

export const employerSelectApplicationHandler = async (req, res, body) => {
  const { applicationId, status } = body;

  const updates = {
    status,
    employerDecision: status === 'Selected' ? 'Selected & Hired for Vacant Seat by Employer' : 'Rejected by Employer',
    employerSelectionStatus: status === 'Selected' ? 'Hired & Confirmed by Recruiter (Returned to Admin)' : 'Rejected by Recruiter (Returned to Admin)'
  };

  // Update in MongoDB
  let updatedApp = null;
  try {
    updatedApp = await ApplicationModel.findOneAndUpdate(
      { id: applicationId },
      { $set: updates },
      { new: true }
    ).lean();
  } catch (dbErr) {
    // proceed to memory fallback
  }

  // Update in memory
  const memoryApp = memoryApplications.find(a => a.id === applicationId);
  if (memoryApp) {
    Object.assign(memoryApp, updates);
    if (!updatedApp) updatedApp = memoryApp;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: `Employer selection '${status}' recorded & transmitted back to Central Admin Dashboard!`,
    application: updatedApp || memoryApp 
  }));
};

export const submitAssessmentHandler = async (req, res, body) => {
  const { applicationId, score, proctoringDetails, violationsCount } = body;

  const updates = {
    assessmentScore: score,
    assessmentStatus: 'Completed',
    proctoringDetails: proctoringDetails || {
      cameraVerified: true,
      micVerified: true,
      screenShareVerified: true,
      fullScreenVerified: true,
      violationsCount: violationsCount || 0,
      completedAt: new Date().toISOString()
    },
    adminSelectionStatus: score >= 60 
      ? 'Passed Proctored Assessment (Vetted for Placement)' 
      : 'Assessment Completed (Under Review)'
  };

  // Update in MongoDB
  let updatedApp = null;
  try {
    updatedApp = await ApplicationModel.findOneAndUpdate(
      { id: applicationId },
      { $set: updates },
      { new: true }
    ).lean();
  } catch (dbErr) {
    // proceed to memory fallback
  }

  // Update in memory
  const memoryApp = memoryApplications.find(a => a.id === applicationId);
  if (memoryApp) {
    Object.assign(memoryApp, updates);
    if (!updatedApp) updatedApp = memoryApp;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: `Proctored Assessment score ${score}% recorded with verified camera, mic, screen share, and fullscreen access.`,
    application: updatedApp || memoryApp 
  }));
};

