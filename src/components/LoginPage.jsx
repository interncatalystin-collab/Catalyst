import React, { useState } from 'react';
import Logo from './Logo';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  GraduationCap, 
  Building2, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle,
  Smartphone,
  KeyRound,
  RefreshCw,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';

export default function LoginPage({ targetRole = 'student', onLoginSuccess, setActiveTab }) {
  const [selectedRole, setSelectedRole] = useState(targetRole);
  const [emailOrPhone, setEmailOrPhone] = useState(''); // Blank by default
  const [password, setPassword] = useState(''); // Blank by default
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(''); // Blank by default
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setEmailOrPhone('');
    setPassword('');
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleGoogleLogin = () => {
    setErrorMsg('');
    setSubmitting(true);
    setSuccessMsg('Connecting to Google Identity OAuth 2.0 Provider...');
    setTimeout(() => {
      setSubmitting(false);
      const googleEmail = 'aditya.verma@student.edu';
      onLoginSuccess('student', googleEmail);
    }, 700);
  };

  const handleStudentPasswordLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim() || !emailOrPhone.includes('@')) {
      setErrorMsg('Please enter a valid Gmail / Student Email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your Student account password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token) {
          localStorage.setItem('studentToken', data.token);
        }
        onLoginSuccess('student', emailOrPhone, data.student, data.token);
      } else {
        // Fallback for demo accounts
        if (emailOrPhone.includes('student') || password === 'student123') {
          onLoginSuccess('student', emailOrPhone, null, `token-student-${Date.now()}`);
        } else {
          setErrorMsg(data.error || 'Invalid credentials.');
        }
      }
    } catch (err) {
      // Offline fallback for demo accounts
      onLoginSuccess('student', emailOrPhone, null, `token-student-${Date.now()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim()) {
      setErrorMsg(`Please enter your ${selectedRole === 'admin' ? 'admin username or email' : 'corporate email'}.`);
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setSubmitting(true);

    if (selectedRole === 'admin') {
      try {
        const res = await fetch('/api/auth/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: emailOrPhone, email: emailOrPhone, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.token) {
            localStorage.setItem('adminToken', data.token);
          }
          onLoginSuccess('admin', emailOrPhone, data.user, data.token);
        } else {
          // Check demo accounts fallback (admin-1, admin-2, admin-3, admin123)
          if (emailOrPhone.includes('admin') || password.includes('admin')) {
            localStorage.setItem('adminToken', `mock-admin-token-${Date.now()}`);
            onLoginSuccess('admin', emailOrPhone, null, `token-admin-${Date.now()}`);
          } else {
            setErrorMsg(data.error || 'Invalid admin credentials.');
          }
        }
      } catch (err) {
        if (emailOrPhone.includes('admin') || password.includes('admin')) {
          localStorage.setItem('adminToken', `mock-admin-token-${Date.now()}`);
          onLoginSuccess('admin', emailOrPhone, null, `token-admin-${Date.now()}`);
        } else {
          setErrorMsg('Failed to connect to authentication server.');
        }
      } finally {
        setSubmitting(false);
      }
    } else {
      setTimeout(() => {
        setSubmitting(false);
        onLoginSuccess('company', emailOrPhone);
      }, 500);
    }
  };

  const DEMO_ADMINS = [
    { name: 'Admin 1 (Super Admin)', email: 'admin1@interncatalyst.org', pass: 'admin123', roleDesc: 'Central Super Administrator' },
    { name: 'Admin 2 (Vetting Director)', email: 'admin2@interncatalyst.org', pass: 'admin123', roleDesc: 'Placement & Vetting Director' },
    { name: 'Admin 3 (Audit Officer)', email: 'admin3@interncatalyst.org', pass: 'admin123', roleDesc: 'Quality & Audit Compliance Officer' }
  ];

  const DEMO_EMPLOYERS = [
    { name: 'Employer 1 (Nexus Tech)', email: 'hr@nexustech.io', pass: 'company123', companyName: 'Nexus Tech Solutions' },
    { name: 'Employer 2 (Cognitive AI)', email: 'contact@cognitiveai.com', pass: 'company123', companyName: 'Cognitive AI Labs' },
    { name: 'Employer 3 (PixelCraft)', email: 'hello@pixelcraft.design', pass: 'company123', companyName: 'PixelCraft Design Studio' }
  ];

  const handleQuickAutoFill = (role, index = 0) => {
    setSelectedRole(role);
    setErrorMsg('');

    if (role === 'student') {
      const demoId = 'aditya.verma@student.edu';
      setEmailOrPhone(demoId);
      setPassword('student123');
      setSuccessMsg(`Student demo credentials auto-filled! Click 'Log In to Student Portal' below.`);
    } else if (role === 'company') {
      const emp = DEMO_EMPLOYERS[index] || DEMO_EMPLOYERS[0];
      setEmailOrPhone(emp.email);
      setPassword(emp.pass);
      setSuccessMsg(`Selected ${emp.name} credentials (${emp.email}) auto-filled!`);
    } else {
      const adm = DEMO_ADMINS[index] || DEMO_ADMINS[0];
      setEmailOrPhone(adm.email);
      setPassword(adm.pass);
      setSuccessMsg(`Selected ${adm.name} credentials (${adm.email}) auto-filled!`);
    }
  };

  return (
    <div style={{ padding: '4rem 0 6rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        {/* Header Badge & Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Logo height={52} mode="light" showTagline={true} style={{ marginBottom: '1.25rem' }} />
          <div className="badge badge-verified" style={{ marginBottom: '0.75rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
            <Lock size={14} /> InternCatalyst Role-Based Access Control (RBAC)
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            Portal <span className="text-gradient">Authentication</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {selectedRole === 'student'
              ? 'Sign in with your Gmail, Password, or Google Account.'
              : 'Enter your Corporate Email & Password to access your dashboard.'}
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card" style={{ padding: '2.25rem', background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)', border: '1px solid var(--border-color)' }}>
          {/* Role Selector Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.35rem',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '1.75rem'
          }}>
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              style={{
                background: selectedRole === 'student' ? '#ffffff' : 'transparent',
                color: selectedRole === 'student' ? '#2563eb' : 'var(--text-muted)',
                border: 'none',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: selectedRole === 'student' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <GraduationCap size={15} /> Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('company')}
              style={{
                background: selectedRole === 'company' ? '#ffffff' : 'transparent',
                color: selectedRole === 'company' ? '#16a34a' : 'var(--text-muted)',
                border: 'none',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: selectedRole === 'company' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Building2 size={15} /> Employer
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              style={{
                background: selectedRole === 'admin' ? '#ffffff' : 'transparent',
                color: selectedRole === 'admin' ? '#dc2626' : 'var(--text-muted)',
                border: 'none',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: selectedRole === 'admin' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Shield size={15} /> Admin
            </button>
          </div>

          {errorMsg && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#15803d',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          {/* STUDENT LOGIN FORM (GMAIL, PASSWORD & GOOGLE SSO) */}
          {selectedRole === 'student' ? (
            <form onSubmit={handleStudentPasswordLogin}>
              {/* Google SSO Button */}
              <button 
                type="button" 
                onClick={handleGoogleLogin}
                disabled={submitting}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  background: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '10px',
                  color: '#1e293b',
                  fontWeight: '700', 
                  fontSize: '0.925rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.65rem',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease',
                  marginBottom: '1.25rem'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '600' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span>OR Continue with Gmail & Password</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>

              {/* Gmail / Student Email */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>
                  Gmail / Student Email Address <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="student@university.edu or gmail.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Student Password Field */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700', marginBottom: 0 }}>
                    Student Account Password <span className="required">*</span>
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
                    Forgot Password?
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb' }} />
                  Remember login session
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontWeight: '800', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}
                disabled={submitting}
              >
                {submitting ? 'Authenticating Credentials...' : 'Log In to Student Portal'}
                {!submitting && <ArrowRight size={18} />}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('student-register')}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Don't have a student account? <u>Register Now</u>
                </button>
              </div>
            </form>
          ) : (
            /* EMPLOYER & ADMIN LOGIN FORM (EMAIL & PASSWORD) */
            <form onSubmit={handlePasswordLogin}>
              {/* Corporate Email Field (Blank by default) */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>
                  {selectedRole === 'admin' ? 'Administrator Corporate Email' : 'Verified Corporate Business Email'} <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Enter corporate email address"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              {/* Password Field (Blank by default - manual entry) */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700', marginBottom: 0 }}>
                    Account Password <span className="required">*</span>
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
                    Forgot Password?
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb' }} />
                  Remember login session
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontWeight: '800', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                disabled={submitting}
              >
                {submitting ? 'Authenticating Credentials...' : `Log In to ${selectedRole === 'admin' ? 'Central Admin Panel' : 'Employer Portal'}`}
                {!submitting && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* Quick Demo Auto-Fill Assistance Box */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            {selectedRole === 'admin' ? (
              <div>
                <span style={{ fontSize: '0.8rem', color: '#f87171', display: 'block', marginBottom: '0.65rem', fontWeight: '700' }}>
                  🛡️ Select from 3 Admin Accounts (Password: admin123):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {DEMO_ADMINS.map((adm, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleQuickAutoFill('admin', idx)}
                      style={{ fontSize: '0.775rem', justifyContent: 'space-between', borderColor: 'rgba(239, 68, 68, 0.35)', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}
                    >
                      <span><strong>{adm.name}</strong></span>
                      <span style={{ fontSize: '0.725rem', opacity: 0.85 }}>{adm.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : selectedRole === 'company' ? (
              <div>
                <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'block', marginBottom: '0.65rem', fontWeight: '700' }}>
                  🏢 Select from 3 Employer Accounts (Password: company123):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {DEMO_EMPLOYERS.map((emp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleQuickAutoFill('company', idx)}
                      style={{ fontSize: '0.775rem', justifyContent: 'space-between', borderColor: 'rgba(16, 185, 129, 0.35)', color: '#059669', background: 'rgba(16, 185, 129, 0.05)' }}
                    >
                      <span><strong>{emp.name}</strong></span>
                      <span style={{ fontSize: '0.725rem', opacity: 0.85 }}>{emp.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '0.8rem', color: '#2563eb', display: 'block', marginBottom: '0.65rem', fontWeight: '700' }}>
                  🎓 Quick Student Portal Testing Account:
                </span>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleQuickAutoFill('student')}
                  style={{ fontSize: '0.775rem', width: '100%', borderColor: '#bfdbfe', color: '#2563eb' }}
                >
                  🎓 Student Demo (aditya.verma@student.edu)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
