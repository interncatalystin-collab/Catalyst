/**
 * API Router Dispatcher
 * Routes HTTP endpoints to individual controllers
 */

import { sendOtpHandler, verifyOtpHandler, passwordLoginHandler } from './controllers/authController.js';
import { getInternshipsHandler, createInternshipHandler } from './controllers/internshipController.js';
import { getApplicationsHandler, submitApplicationHandler, forwardApplicationHandler, employerSelectApplicationHandler, submitAssessmentHandler } from './controllers/applicationController.js';
import { registerStudentHandler, loginStudentHandler, getStudentProfileHandler, changeStudentPasswordHandler } from './controllers/studentAuthController.js';
import { adminLoginHandler, getAdminDashboardMetricsHandler, getAllStudentsHandler, getStudentByIdHandler } from './controllers/adminController.js';
import { exportStudentsExcelHandler } from './controllers/excelController.js';

// Utility helper to parse JSON payload (supports standalone Node streams and serverless pre-parsed req.body)
const parseJson = (req) => {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') {
      return Promise.resolve(req.body);
    }
    if (typeof req.body === 'string') {
      try {
        return Promise.resolve(req.body ? JSON.parse(req.body) : {});
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', (err) => reject(err));
  });
};


export const routeDispatcher = async (req, res, pathname) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Health Check
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'InternCatalyst Backend REST API Running',
      timestamp: new Date().toISOString()
    }));
    return true;
  }

  // --- STUDENT AUTH & PROFILE ROUTES ---
  if (req.method === 'POST' && pathname === '/api/auth/student/register') {
    const body = await parseJson(req);
    await registerStudentHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/auth/student/login') {
    const body = await parseJson(req);
    await loginStudentHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/auth/student/change-password') {
    const body = await parseJson(req);
    await changeStudentPasswordHandler(req, res, body);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/student/profile') {
    await getStudentProfileHandler(req, res);
    return true;
  }

  // --- ADMIN AUTH & DASHBOARD ROUTES ---
  if (req.method === 'POST' && pathname === '/api/auth/admin/login') {
    const body = await parseJson(req);
    await adminLoginHandler(req, res, body);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/admin/dashboard') {
    await getAdminDashboardMetricsHandler(req, res);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/admin/students/export') {
    await exportStudentsExcelHandler(req, res);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/admin/students') {
    await getAllStudentsHandler(req, res, url);
    return true;
  }

  if (req.method === 'GET' && pathname.startsWith('/api/admin/students/')) {
    const studentId = pathname.replace('/api/admin/students/', '');
    if (studentId && studentId !== 'export') {
      await getStudentByIdHandler(req, res, studentId);
      return true;
    }
  }

  // --- EXISTING AUTH ROUTES ---
  if (req.method === 'POST' && pathname === '/api/auth/send-otp') {
    const body = await parseJson(req);
    sendOtpHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/auth/verify-otp') {
    const body = await parseJson(req);
    verifyOtpHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/auth/login') {
    const body = await parseJson(req);
    passwordLoginHandler(req, res, body);
    return true;
  }

  // --- INTERNSHIP ROUTES ---
  if (req.method === 'GET' && pathname === '/api/internships') {
    getInternshipsHandler(req, res);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/internships') {
    const body = await parseJson(req);
    createInternshipHandler(req, res, body);
    return true;
  }

  // --- APPLICATION ROUTES ---
  if (req.method === 'GET' && pathname === '/api/applications') {
    getApplicationsHandler(req, res);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/applications') {
    const body = await parseJson(req);
    submitApplicationHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/applications/forward') {
    const body = await parseJson(req);
    forwardApplicationHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/applications/select') {
    const body = await parseJson(req);
    employerSelectApplicationHandler(req, res, body);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/applications/assessment') {
    const body = await parseJson(req);
    await submitAssessmentHandler(req, res, body);
    return true;
  }

  return false;
};
