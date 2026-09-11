import React, { useState, useEffect } from 'react';
import StudentRegisterPage from './StudentRegisterPage';
import AptitudeAssessment from '../components/AptitudeAssessment';
import { 
  GraduationCap, 
  User, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  ExternalLink, 
  Phone, 
  Mail, 
  Plus, 
  ShieldCheck, 
  AlertTriangle,
  Upload,
  ArrowRight,
  Key,
  Smartphone,
  Globe,
  Heart,
  Lock,
  Check,
  BrainCircuit,
  Award,
  Zap
} from 'lucide-react';

export default function StudentDashboard({ 
  profile, 
  onUpdateProfile, 
  applications, 
  onWithdrawApplication, 
  onDeleteAccount,
  onAddToast,
  onLogout,
  onLoginSuccess,
  initialTab = 'profile'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'profile', 'register', 'applications', 'feedback', 'notifications', 'settings'
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const safeProfile = profile || {};

  const getSkillsString = (sk, defaultVal) => {
    if (Array.isArray(sk)) return sk.join(', ');
    if (typeof sk === 'string') return sk;
    return defaultVal;
  };

  const skillsList = Array.isArray(safeProfile.skills) 
    ? safeProfile.skills 
    : (typeof safeProfile.skills === 'string' ? safeProfile.skills.split(',').map(s => s.trim()).filter(Boolean) : ['React.js', 'Node.js', 'JavaScript', 'Python', 'SQL']);

  const languagesList = Array.isArray(safeProfile.languages) ? safeProfile.languages : ['English (Fluent)', 'Kannada (Native)', 'Hindi'];
  const interestsList = Array.isArray(safeProfile.interests) ? safeProfile.interests : ['Web Development', 'AI Agents', 'Cloud Computing'];
  const projectsList = Array.isArray(safeProfile.projects) ? safeProfile.projects : [];
  const certsList = Array.isArray(safeProfile.certifications) ? safeProfile.certifications : [];

  // Registration Form State inside Student Dashboard
  const [regForm, setRegForm] = useState({
    fullName: safeProfile.name || safeProfile.fullName || '',
    email: safeProfile.email || '',
    phone: safeProfile.phone || '',
    password: '',
    collegeName: safeProfile.institution || safeProfile.collegeName || '',
    degree: safeProfile.degree || 'B.Tech / B.E.',
    branch: safeProfile.branch || 'Computer Science & Engineering',
    yearOfStudy: safeProfile.yearOfStudy || '3rd Year',
    cgpa: safeProfile.cgpa || '',
    preferredDomain: safeProfile.domain || 'Software & Full-Stack Web Development',
    skills: getSkillsString(safeProfile.skills, 'React, Node.js, JavaScript'),
    resumeUrl: safeProfile.resumeUrl || '',
    linkedinUrl: safeProfile.linkedinUrl || '',
    githubUrl: safeProfile.githubUrl || ''
  });

  // Auth / Login Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMethod, setAuthMethod] = useState('otp'); // 'email', 'phone', 'otp'
  const [authInput, setAuthInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Form State
  const [name, setName] = useState(safeProfile.name || safeProfile.fullName || '');
  const [email, setEmail] = useState(safeProfile.email || '');
  const [phone, setPhone] = useState(safeProfile.phone || '');
  const [domain, setDomain] = useState(safeProfile.domain || 'Software & Full-Stack Web Development');
  const [institution, setInstitution] = useState(safeProfile.institution || safeProfile.collegeName || '');
  const [degree, setDegree] = useState(safeProfile.degree || '');
  const [yearOfStudy, setYearOfStudy] = useState(safeProfile.yearOfStudy || '');
  const [cgpa, setCgpa] = useState(safeProfile.cgpa || '');
  const [location, setLocation] = useState(safeProfile.location || '');
  const [availability, setAvailability] = useState(safeProfile.availability || '');
  const [workModePref, setWorkModePref] = useState(safeProfile.workModePreference || 'Online');
  const [stipendPref, setStipendPref] = useState(safeProfile.stipendPreference || 'Paid');
  const [resumeUrl, setResumeUrl] = useState(safeProfile.resumeUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(safeProfile.portfolioUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(safeProfile.linkedinUrl || 'https://linkedin.com/in/aditya-verma-dev');
  const [githubUrl, setGithubUrl] = useState(safeProfile.githubUrl || 'https://github.com/adityaverma');
  const [skillsInput, setSkillsInput] = useState(getSkillsString(safeProfile.skills, 'React.js, Node.js, JavaScript, Python, MongoDB, SQL, Git'));
  const [languagesInput, setLanguagesInput] = useState(getSkillsString(safeProfile.languages, 'English (Fluent), Kannada (Native), Hindi'));
  const [interestsInput, setInterestsInput] = useState(getSkillsString(safeProfile.interests, 'Web Development, AI Agents, Cloud Computing'));

  // Feedback State
  const [feedbackCompany, setFeedbackCompany] = useState('Nexus Tech Solutions');
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!regForm.fullName || !regForm.email || !regForm.phone || !regForm.collegeName) {
      onAddToast('Please complete all mandatory registration fields (Name, Email, Phone, College).', 'danger');
      return;
    }

    if (regForm.phone.length < 10) {
      onAddToast('Please enter a valid 10-digit contact phone number.', 'danger');
      return;
    }

    const updatedProfile = {
      ...profile,
      name: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      institution: regForm.collegeName,
      degree: regForm.degree,
      branch: regForm.branch,
      yearOfStudy: regForm.yearOfStudy,
      cgpa: regForm.cgpa,
      domain: regForm.preferredDomain,
      skills: regForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      resumeUrl: regForm.resumeUrl || 'https://resume.interncatalyst.org/view',
      linkedinUrl: regForm.linkedinUrl,
      githubUrl: regForm.githubUrl
    };

    // Update state fields as well
    setName(regForm.fullName);
    setEmail(regForm.email);
    setPhone(regForm.phone);
    setInstitution(regForm.collegeName);
    setDegree(regForm.degree);
    setYearOfStudy(regForm.yearOfStudy);
    setCgpa(regForm.cgpa);
    setDomain(regForm.preferredDomain);

    onUpdateProfile(updatedProfile);
    onAddToast('🎉 Student Registration Form completed & saved inside Student Dashboard!', 'success');
    setActiveTab('profile');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // Mandatory contact phone validation check!
    if (!phone || phone.trim().length < 10) {
      onAddToast('Mandatory Contact Requirement: Please provide a valid 10-digit contact phone number.', 'danger');
      return;
    }

    const updated = {
      ...profile,
      name,
      email,
      phone,
      domain,
      institution,
      degree,
      yearOfStudy,
      cgpa,
      location,
      availability,
      workModePreference: workModePref,
      stipendPreference: stipendPref,
      resumeUrl,
      portfolioUrl,
      linkedinUrl,
      githubUrl,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      languages: languagesInput.split(',').map(s => s.trim()).filter(Boolean),
      interests: interestsInput.split(',').map(s => s.trim()).filter(Boolean)
    };

    onUpdateProfile(updated);
    setIsEditing(false);
    onAddToast('Student Profile updated successfully!', 'success');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMethod === 'otp' && !otpSent) {
      if (!authInput || authInput.length < 10) {
        onAddToast('Enter valid mobile number for OTP dispatch.', 'danger');
        return;
      }
      setOtpSent(true);
      onAddToast(`SMS Verification OTP dispatched to ${authInput}`, 'info');
      return;
    }

    setShowAuthModal(false);
    setOtpSent(false);
    onAddToast(`Successfully authenticated as Student via ${authMethod.toUpperCase()}!`, 'success');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    onAddToast('Thank you! Your internship feedback has been submitted.', 'success');
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Header Profile Summary */}
        <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img 
              src={safeProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
              alt={safeProfile.name || safeProfile.fullName || 'Student'}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>{safeProfile.name || safeProfile.fullName || 'Student Candidate'}</h1>
                <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Student</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                {safeProfile.degree || 'B.Tech CS'} • {safeProfile.institution || safeProfile.collegeName || 'Accredited Institution'}
              </p>
              <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Briefcase size={14} /> Domain: {safeProfile.domain || safeProfile.preferredDomain || 'Software & Full-Stack Web Development'}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.825rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
                <span><Mail size={13} style={{ display: 'inline', marginRight: '3px' }} /> {safeProfile.email}</span>
                <span><Phone size={13} style={{ display: 'inline', marginRight: '3px', color: '#34d399' }} /> <strong>{safeProfile.phone || '9876543210'}</strong> (Mandatory Contact)</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAuthModal(true)}
            >
              <Key size={14} /> Student Login / OTP Auth
            </button>
            <button 
              className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Full Profile'}
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              background: activeTab === 'profile' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'profile' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <User size={15} /> Candidate Profile
          </button>

          <button 
            onClick={() => setActiveTab('aptitude')}
            style={{
              background: activeTab === 'aptitude' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'aptitude' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative'
            }}
          >
            <BrainCircuit size={15} /> Practice Aptitude Test
            <span style={{
              background: activeTab === 'aptitude' ? '#ffffff' : '#3b82f6',
              color: activeTab === 'aptitude' ? '#1d4ed8' : '#ffffff',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '0.1rem 0.4rem',
              borderRadius: '10px'
            }}>
              20/30/50 Qs
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('register')}
            style={{
              background: activeTab === 'register' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'register' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileText size={15} /> Registration Form
          </button>

          <button 
            onClick={() => setActiveTab('applications')}
            style={{
              background: activeTab === 'applications' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'applications' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Briefcase size={15} /> My Applications ({applications.length})
          </button>

          <button 
            onClick={() => setActiveTab('feedback')}
            style={{
              background: activeTab === 'feedback' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'feedback' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Star size={15} /> Internship Feedback
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            style={{
              background: activeTab === 'notifications' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'notifications' ? '#fff' : 'var(--text-dim)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Bell size={15} /> Email/SMS Alerts
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            style={{
              background: activeTab === 'settings' ? '#fef2f2' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'settings' ? '#dc2626' : 'var(--text-muted)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: 'auto'
            }}
          >
            <Settings size={15} /> Account Settings
          </button>
        </div>

        {/* Tab 1: Profile View / Edit */}
        {activeTab === 'profile' && (
          <div>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '0.85rem 1.15rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Lock size={20} style={{ color: '#60a5fa' }} />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#93c5fd', display: 'block' }}>
                    🔒 Student Profile Privacy & Access Policy
                  </strong>
                  <span style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                    Your full student profile, contact numbers, and ATS resume files are strictly accessible ONLY by Central Admin for internship vetting and recruiter candidate selection.
                  </span>
                </div>
              </div>
              <span className="badge badge-verified" style={{ background: '#2563eb', color: '#ffffff' }}>
                Protected Profile ✓
              </span>
            </div>

            {/* Practice Aptitude Assessment Quick-Action Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.25), rgba(76, 29, 149, 0.25))',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  <BrainCircuit size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <strong style={{ color: '#fff', fontSize: '0.975rem' }}>
                      Practice Placement Aptitude Assessment
                    </strong>
                    <span style={{ background: '#10b981', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                      20, 30, or 50 Questions Choice
                    </span>
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '0.825rem' }}>
                    Boost your placement readiness with Quantitative, Logical Reasoning, Verbal Ability & CS test sets with instant score analytics.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('aptitude')}
                className="btn btn-primary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Launch Test <ArrowRight size={14} />
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Edit Candidate Profile, Domain & Skills</h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="required">*</span></label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Career Domain / Specialization <span className="required">*</span></label>
                    <select className="form-select" value={domain} onChange={(e) => setDomain(e.target.value)}>
                      <option value="Software & Full-Stack Web Development">💻 Software & Full-Stack Web Development</option>
                      <option value="Artificial Intelligence & Machine Learning">🤖 Artificial Intelligence & Machine Learning</option>
                      <option value="UI/UX & Product Design">🎨 UI/UX & Product Design</option>
                      <option value="Cybersecurity & Cloud Audit">🛡 Cybersecurity & Cloud Audit</option>
                      <option value="Digital Marketing & Growth Analytics">📈 Digital Marketing & Growth Analytics</option>
                      <option value="Data Science & Business Intelligence">📊 Data Science & Business Intelligence</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Number <span className="required">* (Mandatory)</span></label>
                    <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98450 12345" required />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Institution / College Name</label>
                    <input type="text" className="form-input" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree / Course</label>
                    <input type="text" className="form-input" value={degree} onChange={(e) => setDegree(e.target.value)} />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">Year of Study</label>
                    <select className="form-select" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)}>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">CGPA / Score</label>
                    <input type="text" className="form-input" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location / City</label>
                    <input type="text" className="form-input" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Technical & Core Skills (Comma separated) <span className="required">*</span></label>
                    <input type="text" className="form-input" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="React.js, Node.js, Python, SQL, Figma, AWS" required />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Enter your core technical skills separated by commas.</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Languages Spoken (Comma separated)</label>
                    <input type="text" className="form-input" value={languagesInput} onChange={(e) => setLanguagesInput(e.target.value)} placeholder="English (Fluent), Kannada (Native), Hindi" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Career Interests & Target Domains (Comma separated)</label>
                  <input type="text" className="form-input" value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} placeholder="Web Development, AI Research, Cybersecurity, UI/UX" />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Resume Link (Google Drive / PDF URL)</label>
                    <input type="url" className="form-input" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="https://drive.google.com/..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Portfolio Website URL</label>
                    <input type="url" className="form-input" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://adityaverma.dev" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">LinkedIn Profile URL</label>
                    <input type="url" className="form-input" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/aditya-verma-dev" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub Profile URL</label>
                    <input type="url" className="form-input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/adityaverma" />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Profile Changes</button>
                </div>
              </form>
            ) : (
              <div className="grid-3">
                {/* Academic & Bio Info */}
                <div className="glass-card" style={{ gridColumn: 'span 2' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Academic, Domain & Skills Summary
                  </h3>

                  {/* Primary Domain Box */}
                  <div style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    padding: '0.9rem 1.2rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}>
                    <div>
                      <span style={{ color: '#93c5fd', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px', display: 'block' }}>
                        Primary Career Domain & Specialization
                      </span>
                      <strong style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '800', display: 'block', marginTop: '2px' }}>
                        {profile.domain || 'Software & Full-Stack Web Development'}
                      </strong>
                    </div>
                    <span className="badge badge-verified" style={{ background: '#2563eb', color: '#ffffff', padding: '0.4rem 0.85rem' }}>
                      <Briefcase size={13} /> Verified Domain
                    </span>
                  </div>

                  <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'block' }}>Mandatory Contact Phone</span>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{safeProfile.phone || '9876543210'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'block' }}>Current Availability</span>
                      <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>{safeProfile.availability || 'Immediate'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'block' }}>Work Mode Preference</span>
                      <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>{safeProfile.workModePreference || 'Online'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'block' }}>Stipend Preference</span>
                      <strong style={{ color: '#fbbf24', fontSize: '0.95rem' }}>{safeProfile.stipendPreference || 'Paid'}</strong>
                    </div>
                  </div>

                  <h4 style={{ color: '#fff', marginBottom: '0.6rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={16} style={{ color: '#6366f1' }} /> Verified Technical & Professional Skills ({skillsList.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {skillsList.map((sk, i) => (
                      <span key={i} className="badge badge-pill" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#c7d2fe', border: '1px solid rgba(99, 102, 241, 0.35)', padding: '0.3rem 0.75rem', fontSize: '0.825rem', fontWeight: '600' }}>
                        ⚡ {sk}
                      </span>
                    ))}
                  </div>

                  <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Globe size={14} style={{ color: '#38bdf8' }} /> Languages Spoken
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {languagesList.map((lang, i) => (
                          <span key={i} style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Heart size={14} style={{ color: '#f43f5e' }} /> Career Interests
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {interestsList.map((item, i) => (
                          <span key={i} style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#fda4af', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>Featured Student Projects</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {projectsList.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>No projects added yet.</p>
                    ) : (
                      projectsList.map((proj, idx) => (
                        <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{proj.title}</strong>
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: '#818cf8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                View Project <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{proj.desc}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Sidebar Documents & Social Handles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-card">
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                      Verified Profile & Social Handles
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.8)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem' }}>
                          <FileText size={16} style={{ color: '#818cf8' }} /> Student Resume PDF
                        </div>
                        <a href={safeProfile.resumeUrl || '#'} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: '700' }}>View</a>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0, 119, 181, 0.12)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0, 119, 181, 0.3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.85rem', fontWeight: '700' }}>
                          <Globe size={16} /> LinkedIn Profile
                        </div>
                        <a href={safeProfile.linkedinUrl || 'https://linkedin.com'} target="_blank" rel="noreferrer" style={{ color: '#93c5fd', fontSize: '0.8rem', fontWeight: '700' }}>Open LinkedIn →</a>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(168, 85, 247, 0.12)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: '700' }}>
                          <Globe size={16} /> GitHub Profile
                        </div>
                        <a href={safeProfile.githubUrl || 'https://github.com'} target="_blank" rel="noreferrer" style={{ color: '#e9d5ff', fontSize: '0.8rem', fontWeight: '700' }}>Open GitHub →</a>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.8)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem' }}>
                          <ExternalLink size={16} style={{ color: '#34d399' }} /> Portfolio Link
                        </div>
                        <a href={safeProfile.portfolioUrl || '#'} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.8rem' }}>Visit</a>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                      Verified Certifications
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {profile.certifications?.map((c, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle size={14} style={{ color: '#10b981' }} /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Student Registration Form embedded in Student Dashboard */}
        {activeTab === 'register' && (
          <StudentRegisterPage 
            onLoginSuccess={onLoginSuccess}
            onUpdateProfile={onUpdateProfile}
            onAddToast={onAddToast}
            setActiveTab={setActiveTab}
            isEmbeddedInDashboard={true}
          />
        )}

        {/* Tab 2: Applications Tracker & Withdrawal */}
        {activeTab === 'applications' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              My Internship Applications & Resume Storage Tracker
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Track your saved applications, attached ATS resume, Admin vetting selection, and Employer vacant seat recruitment status.
            </p>

            {applications.length > 0 ? (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Internship Role & Company</th>
                      <th>Submitted Resume</th>
                      <th>Work Mode & Stipend</th>
                      <th>Applied Date</th>
                      <th>Status & Selection Pipeline</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>
                          <strong style={{ color: '#fff', display: 'block' }}>{app.internshipTitle}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            {app.companyName} {app.verifiedCompany && <span style={{ color: '#10b981' }}>✓</span>}
                          </span>
                        </td>
                        <td>
                          <a 
                            href={app.resumeUrl || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => { e.preventDefault(); alert(`Stored Candidate Resume: ${app.resumeName || 'Aditya_Verma_ATS_Resume.pdf'}\n\nCollege: ${app.studentCollege || 'IIT Bombay'}\nCourse: ${app.studentDegree || 'B.Tech CS'}\nYear: ${app.studentYear || '3rd Year'}\nPayment: ₹100 Paid (${app.txnId || 'TXN_UPI_100_892104'})`); }}
                            style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}
                          >
                            <FileText size={14} /> 📄 {app.resumeName || 'Aditya_Verma_ATS_Resume.pdf'}
                          </a>
                          <span style={{ display: 'block', fontSize: '0.725rem', color: '#4ade80', marginTop: '2px', fontWeight: '600' }}>
                            ✓ ₹100 Fee Paid ({app.txnId || 'TXN_UPI_100_892104'})
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#60a5fa', marginTop: '2px', fontWeight: '600' }}>
                            <Mail size={11} /> Confirmation Mail Sent
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{app.workMode}</div>
                          <div style={{ color: '#10b981', fontWeight: '600', fontSize: '0.825rem' }}>{app.stipend}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{app.appliedDate}</div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>Ref: {app.id?.slice(0, 11) || 'app-ref'}</span>
                        </td>
                        <td>
                          {app.status === 'Selected' || app.status === 'Hired' ? (
                            <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                              🎉 Selected by Employer for Vacant Seat! Offer Issued
                            </span>
                          ) : app.status === 'Forwarded to Employer' || app.forwardedToEmployer ? (
                            <span className="badge badge-verified" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: '#0284c7' }}>
                              <ShieldCheck size={13} /> Vetted by Admin! Forwarded to Employer
                            </span>
                          ) : app.status === 'Rejected' ? (
                            <span className="badge badge-danger">Not Selected</span>
                          ) : app.status === 'Withdrawn' ? (
                            <span className="badge badge-pill">Withdrawn</span>
                          ) : (
                            <span className="badge badge-pending" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', borderColor: '#f59e0b' }}>
                              <Clock size={13} /> Saved & Awaiting Admin Vetting Queue
                            </span>
                          )}
                        </td>
                        <td>
                          {app.status !== 'Withdrawn' && app.status !== 'Rejected' && app.status !== 'Selected' && app.status !== 'Hired' && (
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                onWithdrawApplication(app.id);
                                onAddToast(`Application for ${app.internshipTitle} withdrawn.`, 'info');
                              }}
                            >
                              Withdraw Application
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>You have not submitted any applications yet.</p>
            )}
          </div>
        )}

        {/* Tab 3: Post-Internship Feedback */}
        {activeTab === 'feedback' && (
          <div className="glass-card" style={{ maxWidth: '650px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Post-Internship Review & Feedback
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Handwritten Requirement: Students can give feedback after completing an internship to help maintain platform quality.
            </p>

            {feedbackSubmitted ? (
              <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', padding: '1.25rem', borderRadius: '8px' }}>
                <CheckCircle size={24} style={{ marginBottom: '0.3rem' }} />
                <h4>Feedback Recorded!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Thank you for reviewing {feedbackCompany}.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="form-group">
                  <label className="form-label">Completed Internship Company</label>
                  <select className="form-select" value={feedbackCompany} onChange={(e) => setFeedbackCompany(e.target.value)}>
                    <option value="Nexus Tech Solutions">Nexus Tech Solutions</option>
                    <option value="Cognitive AI Labs">Cognitive AI Labs</option>
                    <option value="PixelCraft Design Studio">PixelCraft Design Studio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Overall Rating (1 to 5 Stars)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map(num => (
                      <button 
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        style={{
                          background: num <= rating ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                          border: '1px solid ' + (num <= rating ? '#f59e0b' : 'var(--border-color)'),
                          color: num <= rating ? '#fbbf24' : 'var(--text-muted)',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '700'
                        }}
                      >
                        ★ {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mentorship & Workplace Experience Feedback</label>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    placeholder="Share how the stipend delivery, supervisor guidance, and technical projects went..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-emerald">Submit Review Feedback</button>
              </form>
            )}
          </div>
        )}

        {/* Tab 4: Notifications Inbox */}
        {activeTab === 'notifications' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Email & SMS Notification Log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#818cf8', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                  <span>SMS & Email Broadcast • Received Today</span>
                  <span>10:30 AM</span>
                </div>
                <strong style={{ color: '#fff', fontSize: '0.925rem' }}>Shortlisted for AI & Machine Learning Research Intern!</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Cognitive AI Labs recruiter has shortlisted your profile. Supervisor Ananya Deshmukh scheduled an interview round.
                </p>
              </div>

              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                  <span>System Audit • Aug 11</span>
                  <span>02:15 PM</span>
                </div>
                <strong style={{ color: '#fff', fontSize: '0.925rem' }}>Application Submitted: Nexus Tech Solutions</strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Your application for Full-Stack Web Development Intern was received. SMS notification dispatched to +91 98450 12345.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Settings & Account Deletion */}
        {activeTab === 'settings' && (
          <div className="glass-card" style={{ maxWidth: '600px', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <h3 style={{ color: '#fca5a5', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={20} /> Account Governance & Security
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Handwritten Requirement: Option for students to permanently delete their account and associated data logs.
            </p>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.3rem' }}>Delete Student Account</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Once deleted, your active applications, resume uploads, and student profile will be permanently removed.
              </p>
            </div>

            <button 
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} /> Delete Account Permanently
            </button>
          </div>
        )}

        {/* Tab 6: Practice Aptitude Assessment */}
        {activeTab === 'aptitude' && (
          <AptitudeAssessment 
            onAddToast={onAddToast}
            studentName={safeProfile.name || safeProfile.fullName || 'Student'}
          />
        )}

        {/* Delete Account Modal Confirmation */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '480px' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                Confirm Permanent Account Deletion
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Are you sure you want to delete account for <strong>{profile.name}</strong>? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => {
                    setShowDeleteModal(false);
                    onDeleteAccount();
                  }}
                >
                  Yes, Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student Register & Login Auth Modal (Email, Phone, OTP) */}
        {showAuthModal && (
          <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
            <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Key size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '800' }}>Student Register & Login</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Multi-method Authentication Engine</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {/* Auth Method Switcher Tabs */}
              <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.35rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                <button 
                  onClick={() => { setAuthMethod('otp'); setOtpSent(false); }}
                  style={{
                    flex: 1,
                    background: authMethod === 'otp' ? 'var(--primary)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Smartphone size={14} /> Phone OTP
                </button>
                <button 
                  onClick={() => setAuthMethod('email')}
                  style={{
                    flex: 1,
                    background: authMethod === 'email' ? 'var(--primary)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Mail size={14} /> Email & Password
                </button>
              </div>

              <form onSubmit={handleAuthSubmit}>
                {authMethod === 'otp' && (
                  <div>
                    {!otpSent ? (
                      <div className="form-group">
                        <label className="form-label">Mandatory Mobile Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="+91 98450 12345" 
                          value={authInput} 
                          onChange={(e) => setAuthInput(e.target.value)} 
                          required 
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Requirement: We send a 6-digit SMS verification code to your phone.</span>
                      </div>
                    ) : (
                      <div className="form-group">
                        <label className="form-label">Enter 6-Digit SMS OTP Code</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 582914" 
                          value={otpCode} 
                          onChange={(e) => setOtpCode(e.target.value)} 
                          required 
                        />
                        <span style={{ fontSize: '0.75rem', color: '#34d399' }}>✓ OTP sent to {authInput}. Test code: 123456</span>
                      </div>
                    )}
                  </div>
                )}

                {authMethod === 'email' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Student Email Address</label>
                      <input type="email" className="form-input" placeholder="student@college.edu" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-input" placeholder="••••••••" required />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAuthModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    {authMethod === 'otp' && !otpSent ? 'Send OTP Code' : 'Verify & Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

