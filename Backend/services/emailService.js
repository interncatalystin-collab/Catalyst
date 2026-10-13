/**
 * InternCatalyst Automated Email Service
 * Handles Application Confirmation and Registration Welcome Emails via Nodemailer
 */

import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config.js';

let transporter = null;

/**
 * Creates or retrieves the Nodemailer Transporter
 */
export const getTransporter = () => {
  const user = (EMAIL_CONFIG.user || process.env.EMAIL_USER || '').trim();
  const rawPass = (EMAIL_CONFIG.pass || process.env.EMAIL_PASS || '');
  const pass = rawPass.replace(/\s+/g, ''); // Strip whitespace from Google App Passwords

  if (!user || !pass) {
    return null;
  }

  // If already instantiated with current credentials, reuse
  if (transporter) return transporter;

  const isGmail = (EMAIL_CONFIG.host || '').includes('gmail') || user.endsWith('@gmail.com');

  const transportConfig = isGmail
    ? {
        service: 'gmail',
        auth: {
          user,
          pass
        }
      }
    : {
        host: EMAIL_CONFIG.host || 'smtp.gmail.com',
        port: EMAIL_CONFIG.port || 587,
        secure: EMAIL_CONFIG.secure || false,
        auth: {
          user,
          pass
        },
        tls: {
          rejectUnauthorized: false
        }
      };

  try {
    transporter = nodemailer.createTransport(transportConfig);
  } catch (err) {
    console.error('⚠️ [Email Service] Error creating Nodemailer transporter:', err.message);
    transporter = null;
  }

  return transporter;
};

/**
 * Verify SMTP Connection Status
 */
export const verifyEmailService = async () => {
  const mailTransport = getTransporter();
  const user = (EMAIL_CONFIG.user || process.env.EMAIL_USER || '').trim();

  if (!mailTransport || !user) {
    return {
      connected: false,
      configured: false,
      message: 'SMTP credentials not configured in .env. Please set EMAIL_USER and EMAIL_PASS.'
    };
  }

  try {
    await mailTransport.verify();
    return {
      connected: true,
      configured: true,
      user,
      message: 'Nodemailer SMTP connection verified and ready to dispatch live emails.'
    };
  } catch (err) {
    return {
      connected: false,
      configured: true,
      user,
      error: err.message,
      message: `Nodemailer connection failed: ${err.message}`
    };
  }
};

/**
 * Send an automated confirmation email when a student applies for an internship
 */
export const sendApplicationConfirmationEmail = async (application) => {
  const {
    id = `APP-${Date.now()}`,
    studentName = 'Student',
    studentEmail,
    applicantEmail,
    email,
    internshipTitle = 'Internship Position',
    companyName = 'Partner Company',
    stipend = 'Competitive Stipend',
    workMode = 'Online',
    duration = '3-6 Months',
    appliedDate = new Date().toISOString().split('T')[0],
    txnId = 'TXN_VERIFIED',
    paymentAmount = '₹100.00',
    resumeName = 'Candidate_ATS_Resume.pdf'
  } = application;

  const recipientEmail = (studentEmail || applicantEmail || email || '').trim();

  if (!recipientEmail) {
    console.warn('⚠️ [Email Service] No student email provided. Skipping email dispatch.');
    return { success: false, error: 'Missing recipient email address' };
  }

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
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
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; padding: 30px 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 13px; color: #bfdbfe; font-weight: 500; }
    .content { padding: 28px 24px; }
    .greeting { font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #0f172a; }
    .message { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px; }
    .badge-success { display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 16px; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 20px; }
    .card-title { font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    .timeline { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .timeline-title { font-size: 13px; font-weight: 700; color: #1d4ed8; margin: 0 0 6px 0; }
    .timeline-steps { margin: 0; padding-left: 18px; font-size: 12px; color: #1e3a8a; line-height: 1.6; }
    .btn-container { text-align: center; margin: 24px 0 16px 0; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .whatsapp-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 16px; font-size: 13px; color: #166534; display: flex; align-items: center; justify-content: space-between; }
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
      <span class="badge-success">✓ Application Successfully Received &amp; Queued</span>
      <div class="greeting">Dear ${studentName},</div>
      <p class="message">
        Congratulations! Your application for the <strong>${internshipTitle}</strong> opportunity at <strong>${companyName}</strong> has been successfully received and placed in our verification queue.
      </p>

      <div class="card">
        <div class="card-title">Application Summary &amp; Verification Details</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Reference ID:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #2563eb; text-align: right;">${id}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Position Title:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a; text-align: right;">${internshipTitle}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Hiring Company:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a; text-align: right;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Stipend Package:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #059669; text-align: right;">${stipend}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Work Mode &amp; Duration:</td>
            <td style="padding: 6px 0; font-weight: 500; color: #0f172a; text-align: right;">${workMode} • ${duration}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Application Date:</td>
            <td style="padding: 6px 0; font-weight: 500; color: #0f172a; text-align: right;">${appliedDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Vetting Status:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #d97706; text-align: right;">Under Central Admin Review</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Fee Payment &amp; Resume:</td>
            <td style="padding: 6px 0; font-weight: 500; color: #475569; text-align: right;">${paymentAmount} [${txnId}] • ${resumeName}</td>
          </tr>
        </table>
      </div>

      <div class="timeline">
        <div class="timeline-title">Next Steps in Selection Pipeline:</div>
        <ol class="timeline-steps">
          <li><strong>Central Admin Vetting:</strong> Academic compliance verifies candidate eligibility and resume alignment.</li>
          <li><strong>Employer Forwarding:</strong> Shortlisted profiles are forwarded directly to the hiring managers at ${companyName}.</li>
          <li><strong>Interview Call &amp; Decision:</strong> You will be notified directly via email and on your Student Dashboard.</li>
        </ol>
      </div>

      <div class="btn-container">
        <a href="${clientUrl}" class="btn" target="_blank">Track Application on Student Dashboard →</a>
      </div>

      <div class="whatsapp-box">
        <span>💬 <strong>Official WhatsApp Support:</strong> +91 90140 88240</span>
        <a href="https://wa.me/919014088240" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">Chat Now →</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;">This is an automated confirmation sent to <strong>${recipientEmail}</strong>.</p>
      <p style="margin: 0;">InternCatalyst Verified Career Platform • Education to Work Ecosystem</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: EMAIL_CONFIG.from || 'InternCatalyst <no-reply@interncatalyst.org>',
    to: recipientEmail,
    subject,
    html: htmlContent
  };

  const mailTransport = getTransporter();

  if (!mailTransport) {
    console.log('\n=============================================================');
    console.log(`📧 [EMAIL SIMULATION] Application Confirmation Mail for ${recipientEmail}`);
    console.log(`📌 Subject: ${subject}`);
    console.log(`🎯 Recipient: ${recipientEmail} (${studentName})`);
    console.log(`🏢 Company: ${companyName} | Internship: ${internshipTitle}`);
    console.log(`💰 Stipend: ${stipend} | Mode: ${workMode}`);
    console.log(`🆔 Application ID: ${id} | Txn ID: ${txnId}`);
    console.log('💡 Note: Set EMAIL_USER & EMAIL_PASS in .env to dispatch live emails via SMTP.');
    console.log('=============================================================\n');

    return {
      success: true,
      simulated: true,
      message: `Simulated confirmation email generated for ${recipientEmail}`,
      previewSubject: subject
    };
  }

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log(`✅ [Email Service] Live application confirmation email delivered to ${recipientEmail}. MessageId: ${info.messageId}`);
    return {
      success: true,
      simulated: false,
      messageId: info.messageId
    };
  } catch (err) {
    console.error(`❌ [Email Service] SMTP transmission error to ${recipientEmail}:`, err.message);
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
    _id,
    id = _id || `STD-${Date.now()}`,
    fullName = 'Student',
    name = fullName,
    email,
    collegeName = 'Accredited Institution',
    institution = collegeName,
    degree = 'B.Tech / B.E.',
    branch = 'Computer Science & Engineering',
    preferredDomain = 'Software & Web Development',
    domain = preferredDomain
  } = student;

  const recipientEmail = (email || '').trim();

  if (!recipientEmail) {
    console.warn('⚠️ [Email Service] No email provided for registration confirmation.');
    return { success: false, error: 'No email address provided' };
  }

  const studentDisplayName = fullName || name || 'Student';
  const studentCollege = collegeName || institution || 'Accredited Institution';
  const studentTrack = preferredDomain || domain || 'Software & Web Development';
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  const subject = `🎉 Welcome to InternCatalyst - Student Registration Confirmed!`;

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
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; padding: 30px 24px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 13px; color: #bfdbfe; font-weight: 500; }
    .content { padding: 28px 24px; }
    .greeting { font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #0f172a; }
    .message { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px; }
    .badge-success { display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 16px; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 20px; }
    .card-title { font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    .features-list { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .features-title { font-size: 13px; font-weight: 700; color: #1d4ed8; margin: 0 0 8px 0; }
    .features-items { margin: 0; padding-left: 18px; font-size: 13px; color: #1e3a8a; line-height: 1.7; }
    .btn-container { text-align: center; margin: 24px 0 16px 0; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .whatsapp-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 16px; font-size: 13px; color: #166534; display: flex; align-items: center; justify-content: space-between; }
    .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>InternCatalyst Portal</h1>
      <p>Official Candidate Onboarding Confirmation</p>
    </div>

    <div class="content">
      <span class="badge-success">✓ Student Registration Confirmed</span>
      <div class="greeting">Welcome to InternCatalyst, ${studentDisplayName}!</div>
      <p class="message">
        Your verified student account has been successfully created. You now have access to verified IT and Non-IT internships, domain skill assessments, and direct candidate placement pipelines.
      </p>

      <div class="card">
        <div class="card-title">Registered Profile Summary</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Candidate Name:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a; text-align: right;">${studentDisplayName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Registered Email:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #2563eb; text-align: right;">${recipientEmail}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Institution / College:</td>
            <td style="padding: 6px 0; font-weight: 500; color: #0f172a; text-align: right;">${studentCollege}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Degree &amp; Branch:</td>
            <td style="padding: 6px 0; font-weight: 500; color: #0f172a; text-align: right;">${degree} • ${branch}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Career Track / Domain:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #059669; text-align: right;">${studentTrack}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Account Status:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #16a34a; text-align: right;">Active &amp; Verified Candidate</td>
          </tr>
        </table>
      </div>

      <div class="features-list">
        <div class="features-title">Recommended Next Steps to Land Your Internship:</div>
        <ul class="features-items">
          <li><strong>Upload Your ATS Resume PDF:</strong> Attach your resume on your profile to get prioritized by top employers.</li>
          <li><strong>Take Domain Skill Assessment:</strong> Complete a quick assessment to boost your Candidate Match Score to 90%+.</li>
          <li><strong>Apply to Verified Openings:</strong> Apply to both IT and Non-IT openings with guaranteed Central Admin tracking.</li>
        </ul>
      </div>

      <div class="btn-container">
        <a href="${clientUrl}" class="btn" target="_blank">Access Student Dashboard &amp; Browse Openings →</a>
      </div>

      <div class="whatsapp-box">
        <span>💬 <strong>Student Helpdesk WhatsApp:</strong> +91 90140 88240</span>
        <a href="https://wa.me/919014088240" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">Contact Desk →</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;">This automated onboarding confirmation was dispatched to <strong>${recipientEmail}</strong>.</p>
      <p style="margin: 0;">InternCatalyst Verified Career Platform • Education to Work Ecosystem</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: EMAIL_CONFIG.from || 'InternCatalyst <no-reply@interncatalyst.org>',
    to: recipientEmail,
    subject,
    html: htmlContent
  };

  const mailTransport = getTransporter();

  if (!mailTransport) {
    console.log('\n=============================================================');
    console.log(`📧 [EMAIL SIMULATION] Registration Welcome Mail for ${recipientEmail}`);
    console.log(`📌 Subject: ${subject}`);
    console.log(`🎯 Candidate: ${studentDisplayName} (${recipientEmail})`);
    console.log(`🏫 Institution: ${studentCollege}`);
    console.log(`🎓 Degree: ${degree} • ${branch}`);
    console.log('💡 Note: Set EMAIL_USER & EMAIL_PASS in .env to dispatch live emails via SMTP.');
    console.log('=============================================================\n');

    return {
      success: true,
      simulated: true,
      message: `Simulated registration welcome email generated for ${recipientEmail}`,
      previewSubject: subject
    };
  }

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log(`✅ [Email Service] Registration welcome email sent to ${recipientEmail}. MessageId: ${info.messageId}`);
    return {
      success: true,
      simulated: false,
      messageId: info.messageId
    };
  } catch (err) {
    console.error(`❌ [Email Service] Failed to send registration email to ${recipientEmail}:`, err.message);
    return {
      success: false,
      error: err.message
    };
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
    from: EMAIL_CONFIG.from || 'InternCatalyst <no-reply@interncatalyst.org>',
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
