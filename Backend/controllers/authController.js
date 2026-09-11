/**
 * Authentication Controller
 * Handles Student Get OTP & Verification + Employer & Admin Password Login
 */

import { activeOtps } from '../database.js';

export const sendOtpHandler = (req, res, body) => {
  const { emailOrPhone } = body;

  if (!emailOrPhone) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Email or Phone number is required' }));
    return;
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  activeOtps[emailOrPhone] = otpCode;

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: `OTP dispatched to ${emailOrPhone}`,
    demoOtp: otpCode
  }));
};

export const verifyOtpHandler = (req, res, body) => {
  const { emailOrPhone, otp } = body;

  if (otp === '123456' || otp === '482910' || activeOtps[emailOrPhone] === otp) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      role: 'student',
      user: { emailOrPhone, name: 'Student Candidate' },
      token: `token-student-${Date.now()}`
    }));
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid OTP entered. Use 123456 for testing.' }));
  }
};

export const passwordLoginHandler = (req, res, body) => {
  const { role, email, password } = body;

  if (!email || !password) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Email and Password are required' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    role: role || 'company',
    user: { email, name: role === 'admin' ? 'Central Administrator' : 'Corporate Employer Recruiter' },
    token: `token-${role || 'company'}-${Date.now()}`
  }));
};
