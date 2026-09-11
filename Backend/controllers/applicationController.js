/**
 * Applications Controller
 * Handles Student Application Submission & Admin Candidate Selection & Employer Forwarding
 */

import { applications } from '../database.js';
import { verifyAdminToken, verifyStudentToken } from '../middleware/authMiddleware.js';
import { sendApplicationConfirmationEmail } from '../services/emailService.js';

export const getApplicationsHandler = (req, res) => {
  const admin = verifyAdminToken(req);
  const student = verifyStudentToken(req);

  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (admin) {
    // Full unredacted applied student profiles for Central Admin
    res.end(JSON.stringify(applications));
    return;
  }

  if (student) {
    // Students can only access their own submitted applications
    const studentApps = applications.filter(a => 
      a.studentId === student.id || 
      a.studentEmail === student.email || 
      a.applicantEmail === student.email
    );
    res.end(JSON.stringify(studentApps));
    return;
  }

  // Employer Dashboard / Top selected candidate profile access:
  // Forwarded candidates retain full candidate profile (name, email, phone, college, degree, resume, links)
  // so employer dashboard users can view top selected student profiles.
  const resultApps = applications.map(app => {
    if (app.forwardedToEmployer) {
      return app; // Full profile available for top selected candidates forwarded by admin
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
    id: `app-${Date.now()}`,
    ...body,
    appliedDate: body.appliedDate || new Date().toISOString().split('T')[0],
    status: 'Under Review',
    forwardedToEmployer: false,
    adminSelectionStatus: 'Pending Admin Selection'
  };
  applications.unshift(newApp);

  // Dispatch automated application confirmation email
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

export const forwardApplicationHandler = (req, res, body) => {
  const admin = verifyAdminToken(req);
  if (!admin) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized. Only Central Admin can manage and forward student application profiles.' }));
    return;
  }

  const { applicationId } = body;

  const app = applications.find(a => a.id === applicationId);
  if (app) {
    app.forwardedToEmployer = true;
    app.adminSelectionStatus = 'Shortlisted & Forwarded to Employer Portal';
    app.status = 'Forwarded to Employer';
    app.employerDecision = 'Awaiting Recruiter Hiring Action';
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, application: app }));
};

export const employerSelectApplicationHandler = (req, res, body) => {
  const { applicationId, status } = body;

  const app = applications.find(a => a.id === applicationId);
  if (app) {
    app.status = status;
    app.employerDecision = status === 'Selected' ? 'Selected & Hired for Vacant Seat by Employer' : 'Rejected by Employer';
    app.employerSelectionStatus = status === 'Selected' ? 'Hired & Confirmed by Recruiter (Returned to Admin)' : 'Rejected by Recruiter (Returned to Admin)';
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: `Employer selection '${status}' recorded & transmitted back to Central Admin Dashboard!`,
    application: app 
  }));
};
