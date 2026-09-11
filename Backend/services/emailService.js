/**
 * InternCatalyst Automated Email Service
 * Handles Application Confirmation and Registration Welcome Emails via Nodemailer
 */

import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config.js';

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (EMAIL_CONFIG.user && EMAIL_CONFIG.pass) {
    transporter = nodemailer.createTransport({
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      secure: EMAIL_CONFIG.secure,
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
      }
    });
  }
  return transporter;
};

/**
 * Send an automated confirmation email when a student applies for an internship
 */
export const sendApplicationConfirmationEmail = async (application) => {
  const {
    id,
    studentName = 'Student',
    studentEmail,
    internshipTitle = 'Internship Position',
    companyName = 'Partner Company',
    stipend = 'Competitive Stipend',
    workMode = 'Online',
    duration = '3-6 Months',
    appliedDate = new Date().toISOString().split('T')[0],
    txnId = 'TXN_VERIFIED',
    paymentAmount = '₹100.00',
    resumeName = 'Candidate_Resume.pdf'
  } = application;

  if (!studentEmail) {
    console.warn('⚠️ [Email Service] No student email provided. Skipping email dispatch.');
    return { success: false, error: 'Missing recipient email address' };
  }

  const subject = `🎓 Application Confirmed: ${internshipTitle} at ${companyName} [Ref: ${id}]`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 13px; color: #bfdbfe; font-weight: 500; }
    .content { padding: 28px 24px; }
    .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #0f172a; }
    .message { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px; }
    .badge-success { display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 16px; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px; }
    .card-title { font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    .timeline { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .timeline-title { font-size: 13px; font-weight: 700; color: #1d4ed8; margin: 0 0 6px 0; }
    .timeline-steps { margin: 0; padding-left: 18px; font-size: 12px; color: #1e3a8a; line-height: 1.6; }
    .btn-container { text-align: center; margin: 24px 0 10px 0; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>InternCatalyst Portal</h1>
      <p>Official Internship Application Confirmation</p>
    </div>

    <div class="content">
      <span class="badge-success">✓ Application Successfully Received</span>
      <div class="greeting">Dear ${studentName},</div>
      <p class="message">
        Congratulations! Your application for the <strong>${internshipTitle}</strong> opportunity at <strong>${companyName}</strong> has been successfully registered in our platform queue.
      </p>

      <div class="card">
        <div class="card-title">Application Summary & Verification</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Reference ID:</td>
            <td style="padding: 5px 0; font-weight: 700; color: #2563eb; text-align: right;">${id}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Position Title:</td>
            <td style="padding: 5px 0; font-weight: 600; color: #0f172a; text-align: right;">${internshipTitle}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Company:</td>
            <td style="padding: 5px 0; font-weight: 600; color: #0f172a; text-align: right;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Stipend:</td>
            <td style="padding: 5px 0; font-weight: 700; color: #059669; text-align: right;">${stipend}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Work Mode & Duration:</td>
            <td style="padding: 5px 0; font-weight: 500; color: #0f172a; text-align: right;">${workMode} • ${duration}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Application Date:</td>
            <td style="padding: 5px 0; font-weight: 500; color: #0f172a; text-align: right;">${appliedDate}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Vetting Status:</td>
            <td style="padding: 5px 0; font-weight: 600; color: #d97706; text-align: right;">Under Review (Admin Vetting)</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Fee Payment & Resume:</td>
            <td style="padding: 5px 0; font-weight: 500; color: #475569; text-align: right;">${paymentAmount} [${txnId}] • ${resumeName}</td>
          </tr>
        </table>
      </div>

      <div class="timeline">
        <div class="timeline-title">Next Steps in Selection Pipeline:</div>
        <ol class="timeline-steps">
          <li><strong>Central Admin Vetting:</strong> Our academic team verifies candidate eligibility and resume alignment.</li>
          <li><strong>Employer Forwarding:</strong> Shortlisted profiles are forwarded directly to the hiring managers at ${companyName}.</li>
          <li><strong>Interview Call & Decision:</strong> You will be notified of interview schedules directly via email and the Student Dashboard.</li>
        </ol>
      </div>

      <div class="btn-container">
        <a href="http://localhost:5173" class="btn" target="_blank">Track Application on Student Dashboard →</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;">This is an automated confirmation sent to <strong>${studentEmail}</strong>.</p>
      <p style="margin: 0;">InternCatalyst Verified Career Platform • Education to Work Ecosystem</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: EMAIL_CONFIG.from,
    to: studentEmail,
    subject,
    html: htmlContent
  };

  const mailTransport = getTransporter();

  if (!mailTransport) {
    console.log('\n=============================================================');
    console.log(`📧 [EMAIL SIMULATION] Confirmation Mail Generated for ${studentEmail}`);
    console.log(`📌 Subject: ${subject}`);
    console.log(`🎯 Recipient: ${studentEmail} (${studentName})`);
    console.log(`🏢 Company: ${companyName} | Internship: ${internshipTitle}`);
    console.log(`💰 Stipend: ${stipend} | Mode: ${workMode}`);
    console.log(`🆔 Application ID: ${id} | Txn ID: ${txnId}`);
    console.log('💡 Note: Set EMAIL_USER & EMAIL_PASS in .env to dispatch live emails via SMTP.');
    console.log('=============================================================\n');

    return {
      success: true,
      simulated: true,
      message: `Simulated confirmation email generated for ${studentEmail}`,
      previewSubject: subject
    };
  }

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log(`✅ [Email Service] Live confirmation email delivered to ${studentEmail}. MessageId: ${info.messageId}`);
    return {
      success: true,
      simulated: false,
      messageId: info.messageId
    };
  } catch (err) {
    console.error(`❌ [Email Service] SMTP transmission error to ${studentEmail}:`, err.message);
    return {
      success: false,
      error: err.message
    };
  }
};

/**
 * Send an automated welcome & confirmation email upon student registration
 */
export const sendRegistrationConfirmationMail = async (student) => {
  const {
    fullName = 'Student',
    email,
    collegeName = 'Your Institution',
    preferredDomain = 'Software Development'
  } = student;

  if (!email) return { success: false, error: 'No email address provided' };

  const subject = `🎉 Welcome to InternCatalyst - Student Registration Confirmed!`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #1e293b;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; padding: 24px;">
    <h2 style="color: #2563eb; margin-top: 0;">Welcome to InternCatalyst, ${fullName}!</h2>
    <p style="font-size: 14px; line-height: 1.6;">Your student candidate profile has been successfully created. You can now explore verified internships, take aptitude assessments, and submit applications.</p>
    <div style="background-color: #eff6ff; border-radius: 8px; padding: 14px; margin: 18px 0; font-size: 13px;">
      <p style="margin: 4px 0;"><strong>Registered Email:</strong> ${email}</p>
      <p style="margin: 4px 0;"><strong>Institution:</strong> ${collegeName}</p>
      <p style="margin: 4px 0;"><strong>Career Domain:</strong> ${preferredDomain}</p>
    </div>
    <p style="font-size: 14px;">Log in anytime to update your ATS resume and browse openings.</p>
    <a href="http://localhost:5173" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: bold; font-size: 13px;">Visit Student Portal</a>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: EMAIL_CONFIG.from,
    to: email,
    subject,
    html: htmlContent
  };

  const mailTransport = getTransporter();

  if (!mailTransport) {
    console.log(`📧 [EMAIL SIMULATION] Registration Welcome Mail logged for ${email} (${fullName})`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log(`✅ [Email Service] Registration welcome email sent to ${email}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [Email Service] Failed to send registration email to ${email}:`, err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Send an automated OTP code email for passwordless verification
 */
export const sendOtpEmail = async (email, otpCode) => {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Valid email address required' };
  }

  const subject = `🔐 InternCatalyst Login OTP: ${otpCode}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 24px 10px; margin: 0; color: #1e293b;">
  <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
      <h2 style="margin: 0; font-size: 20px;">InternCatalyst Security</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">One-Time Password (OTP) Verification</p>
    </div>
    <div style="padding: 24px; text-align: center;">
      <p style="font-size: 14px; color: #475569; margin-top: 0;">Use the verification code below to complete your login session:</p>
      <div style="display: inline-block; background-color: #eff6ff; border: 2px dashed #3b82f6; border-radius: 8px; padding: 14px 28px; margin: 16px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #1d4ed8; font-family: monospace;">${otpCode}</span>
      </div>
      <p style="font-size: 13px; color: #64748b; margin-bottom: 4px;">⏱️ This code is valid for <strong>10 minutes</strong>.</p>
      <p style="font-size: 12px; color: #94a3b8;">If you did not request this login code, please ignore this email.</p>
    </div>
    <div style="background: #f8fafc; padding: 14px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
      InternCatalyst Student Career Platform • Automated Security Service
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: EMAIL_CONFIG.from,
    to: email,
    subject,
    html: htmlContent
  };

  const mailTransport = getTransporter();

  if (!mailTransport) {
    console.log(`📧 [EMAIL SIMULATION] Login OTP ${otpCode} generated for ${email}`);
    return { success: true, simulated: true, otp: otpCode };
  }

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log(`✅ [Email Service] OTP code email dispatched to ${email}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`❌ [Email Service] Failed to dispatch OTP email to ${email}:`, err.message);
    return { success: false, error: err.message };
  }
};
