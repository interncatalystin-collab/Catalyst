import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  User, 
  FileText, 
  Building2, 
  Users, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Sparkles, 
  Send, 
  Mail, 
  Phone, 
  ExternalLink, 
  Trash2, 
  MapPin, 
  DollarSign, 
  X,
  LogOut,
  Camera,
  Mic,
  Monitor,
  Maximize,
  Award,
  ArrowRight,
  Play
} from 'lucide-react';
import { DOMAIN_ROLES_DATA, getDomainRoleForStudent } from '../data/domainRolesData';
import ProctoredAssessmentModal from '../components/ProctoredAssessmentModal';

export default function StudentDashboard({ 
  profile, 
  onUpdateProfile, 
  applications = [], 
  internships = [],
  onApplyDomainRole,
  onCompleteAssessment,
  onWithdrawApplication, 
  onDeleteAccount,
  onAddToast,
  onLogout,
  initialTab = 'domain-role'
}) {
  const [activeTab, setActiveTab] = useState(initialTab === 'register' ? 'profile' : initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  // Proctored Assessment State (Camera, Mic, Screen & Fullscreen)
  const [activeAssessmentApp, setActiveAssessmentApp] = useState(null);
  const [postApplyModalApp, setPostApplyModalApp] = useState(null);

  // Domain Apply Modal State
  const [showDomainApplyModal, setShowDomainApplyModal] = useState(false);
  const [domainPhone, setDomainPhone] = useState(profile?.phone || '9876543210');
  const [domainEmail, setDomainEmail] = useState(profile?.email || '');
  const [domainCoverNote, setDomainCoverNote] = useState('');
  const [isSubmittingDomain, setIsSubmittingDomain] = useState(false);

  // Delete Account Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const safeProfile = profile || {};

  useEffect(() => {
    if (initialTab && initialTab !== 'register') {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (safeProfile.phone) setDomainPhone(safeProfile.phone);
    if (safeProfile.email) setDomainEmail(safeProfile.email);
  }, [safeProfile.phone, safeProfile.email]);

  // Profile Form State for Profile Tab
  const [name, setName] = useState(safeProfile.name || safeProfile.fullName || 'Student Candidate');
  const [email, setEmail] = useState(safeProfile.email || '');
  const [phone, setPhone] = useState(safeProfile.phone || '9876543210');
  const [domain, setDomain] = useState(safeProfile.domain || safeProfile.preferredDomain || 'Software & Full-Stack Web Development');
  const [institution, setInstitution] = useState(safeProfile.institution || safeProfile.collegeName || 'Accredited Institution');
  const [degree, setDegree] = useState(safeProfile.degree || 'B.Tech CS');
  const [yearOfStudy, setYearOfStudy] = useState(safeProfile.yearOfStudy || '3rd Year');
  const [cgpa, setCgpa] = useState(safeProfile.cgpa || '8.85 / 10');
  const [resumeUrl, setResumeUrl] = useState(safeProfile.resumeUrl || 'https://resume.interncatalyst.org/view');
  const [linkedinUrl, setLinkedinUrl] = useState(safeProfile.linkedinUrl || 'https://linkedin.com');
  const [githubUrl, setGithubUrl] = useState(safeProfile.githubUrl || 'https://github.com');
  const [skillsInput, setSkillsInput] = useState(
    Array.isArray(safeProfile.skills) ? safeProfile.skills.join(', ') : (safeProfile.skills || 'React, Node.js, JavaScript, Python, SQL')
  );

  // Derive active domain role with live vacancies
  const studentDomain = safeProfile.domain || safeProfile.preferredDomain || 'Software & Full-Stack Web Development';
  const targetDomainName = selectedDomainId 
    ? (DOMAIN_ROLES_DATA.find(d => d.id === selectedDomainId)?.domainName || studentDomain)
    : studentDomain;
  const currentDomainRole = getDomainRoleForStudent(targetDomainName, internships);

  // Check if student already applied for this domain role
  const existingDomainApp = applications?.find(a => 
    (a.domain && currentDomainRole && a.domain.toLowerCase() === currentDomainRole.domainName.toLowerCase()) ||
    (a.isDomainApplication && a.internshipId === `domain-${currentDomainRole?.id}`) ||
    (a.internshipTitle && currentDomainRole && a.internshipTitle.toLowerCase().includes(currentDomainRole.roleTitle.toLowerCase()))
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      if (onAddToast) onAddToast('Mandatory Contact Requirement: Please provide a valid 10-digit phone number.', 'danger');
      return;
    }

    const updated = {
      ...safeProfile,
      name,
      email,
      phone,
      domain,
      institution,
      degree,
      yearOfStudy,
      cgpa,
      resumeUrl,
      linkedinUrl,
      githubUrl,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (onUpdateProfile) onUpdateProfile(updated);
    setIsEditing(false);
    if (onAddToast) onAddToast('Student Profile updated successfully!', 'success');
  };

  const handleDomainApplySubmit = async (e) => {
    e.preventDefault();

    if (!domainPhone || domainPhone.trim().length < 10) {
      if (onAddToast) onAddToast('Mandatory Contact Requirement: Please enter a valid 10-digit phone number.', 'danger');
      return;
    }

    setIsSubmittingDomain(true);

    const formData = {
      name: safeProfile.name || safeProfile.fullName || 'Student',
      email: domainEmail || safeProfile.email,
      phone: domainPhone,
      college: safeProfile.institution || safeProfile.collegeName || 'Accredited Institution',
      course: safeProfile.degree || 'B.Tech CS',
      yearOfStudy: safeProfile.yearOfStudy || '3rd Year',
      coverNote: domainCoverNote || `Application for ${currentDomainRole.roleTitle} domain track pooled across connected partner companies.`
    };

    let createdApp = null;
    if (onApplyDomainRole) {
      createdApp = await onApplyDomainRole(currentDomainRole, formData);
    } else if (onAddToast) {
      onAddToast(`Application submitted for ${currentDomainRole.roleTitle}!`, 'success');
    }

    setIsSubmittingDomain(false);
    setShowDomainApplyModal(false);
    setDomainCoverNote('');

    // Trigger immediate post-application proctored assessment prompt
    const targetAssessmentApp = createdApp || {
      id: `app-domain-${Date.now()}`,
      internshipTitle: `${currentDomainRole.roleTitle} (Domain Track)`,
      domain: currentDomainRole.domainName,
      companyName: `Connected Partner Pool (${currentDomainRole.connectedCompanies?.length || 0} Companies)`,
      connectedCompanies: (currentDomainRole.connectedCompanies || []).map(c => c.name)
    };
    setPostApplyModalApp(targetAssessmentApp);
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Top Summary Banner */}
        <div className="glass-card" style={{
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img 
              src={safeProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
              alt="Student Avatar"
              style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
                  {safeProfile.name || safeProfile.fullName || 'Student Candidate'}
                </h1>
                <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Student</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                {safeProfile.degree || 'B.Tech CS'} • {safeProfile.institution || safeProfile.collegeName || 'Accredited Institution'}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '6px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(37, 99, 235, 0.08)',
                  color: '#2563eb',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Briefcase size={13} /> Domain: {currentDomainRole.domainName}
                </span>

                <span style={{
                  background: '#f0fdf4',
                  color: '#16a34a',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  🔥 {currentDomainRole.totalVacancies} Open Vacancies
                </span>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Phone size={12} style={{ display: 'inline', marginRight: '3px', color: '#16a34a' }} />
                  {safeProfile.phone || '9876543210'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveTab('profile');
                setIsEditing(true);
              }}
            >
              <User size={14} /> Edit Profile
            </button>
            {onLogout && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={onLogout}
                style={{ color: '#ef4444' }}
              >
                <LogOut size={14} /> Log Out
              </button>
            )}
          </div>
        </div>

        {/* Clean Dashboard Navigation Tabs (Simplified to 3 Essential Tabs) */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {/* Tab 1: Domain Role & Vacancies */}
          <button 
            onClick={() => setActiveTab('domain-role')}
            style={{
              background: activeTab === 'domain-role' ? 'var(--primary)' : '#ffffff',
              border: activeTab === 'domain-role' ? 'none' : '1px solid var(--border-color)',
              color: activeTab === 'domain-role' ? '#ffffff' : 'var(--text-main)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeTab === 'domain-role' ? 'var(--shadow-glow)' : 'none'
            }}
          >
            <Briefcase size={16} /> Domain Role & Vacancies
            <span style={{
              background: activeTab === 'domain-role' ? '#ffffff' : '#e0e7ff',
              color: activeTab === 'domain-role' ? '#1d4ed8' : '#3730a3',
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '0.15rem 0.45rem',
              borderRadius: '10px'
            }}>
              {currentDomainRole.totalVacancies} Seats
            </span>
          </button>

          {/* Tab 2: My Applications */}
          <button 
            onClick={() => setActiveTab('applications')}
            style={{
              background: activeTab === 'applications' ? 'var(--primary)' : '#ffffff',
              border: activeTab === 'applications' ? 'none' : '1px solid var(--border-color)',
              color: activeTab === 'applications' ? '#ffffff' : 'var(--text-main)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FileText size={16} /> My Applications
            <span style={{
              background: activeTab === 'applications' ? '#ffffff' : '#f1f5f9',
              color: activeTab === 'applications' ? '#1d4ed8' : '#475569',
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '0.15rem 0.45rem',
              borderRadius: '10px'
            }}>
              {applications.length}
            </span>
          </button>

          {/* Tab 3: Candidate Profile */}
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              background: activeTab === 'profile' ? 'var(--primary)' : '#ffffff',
              border: activeTab === 'profile' ? 'none' : '1px solid var(--border-color)',
              color: activeTab === 'profile' ? '#ffffff' : 'var(--text-main)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <User size={16} /> Candidate Profile & Resume
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: DOMAIN ROLE & VACANCIES (PRIMARY CORE FEATURE)    */}
        {/* ======================================================== */}
        {activeTab === 'domain-role' && (
          <div>
            {/* Domain Switcher & Notice Bar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={18} style={{ color: '#2563eb' }} /> Domain-Based Central Placement
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
                  Students apply directly for their <strong>Domain Role</strong>. You cannot apply to individual companies. Your single domain application pools you across all connected partner companies below.
                </p>
              </div>

              {/* Domain Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-muted)' }}>Target Domain:</span>
                <select 
                  value={selectedDomainId || currentDomainRole.id}
                  onChange={(e) => setSelectedDomainId(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  {DOMAIN_ROLES_DATA.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.domainName} ({d.totalVacancies} Vacancies)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Domain Role Card */}
            <div className="glass-card" style={{
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid #cbd5e1',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="badge badge-verified" style={{ background: '#2563eb', color: '#fff' }}>
                      Verified Domain Track
                    </span>
                    <span className="badge badge-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                      {currentDomainRole.category}
                    </span>
                    <span className="badge badge-pending" style={{ background: '#fef3c7', color: '#b45309' }}>
                      {currentDomainRole.badge}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                    {currentDomainRole.roleTitle}
                  </h2>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.925rem', maxWidth: '850px', lineHeight: '1.6' }}>
                    {currentDomainRole.overview}
                  </p>
                </div>

                {/* Application Status / Action Button */}
                <div>
                  {existingDomainApp ? (
                    <div style={{
                      background: '#f0fdf4',
                      border: '1px solid #86efac',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                      textAlign: 'center',
                      minWidth: '270px'
                    }}>
                      <div style={{ color: '#15803d', fontWeight: '800', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                        <CheckCircle size={16} /> Applied for this Domain!
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#166534', display: 'block', marginTop: '3px' }}>
                        Status: <strong>{existingDomainApp.adminSelectionStatus || 'Under Review'}</strong>
                      </span>

                      {/* Assessment Status Pill & Launch Button */}
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0' }}>
                        {existingDomainApp.assessmentStatus === 'Completed' ? (
                          <div>
                            <span className="badge badge-verified" style={{ background: '#15803d', color: '#fff', fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                              ✓ Proctored Score: {existingDomainApp.assessmentScore}%
                            </span>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#166534', marginTop: '3px' }}>
                              📷 Cam 🎙️ Mic 🖥️ Screen Verified
                            </span>
                            <button 
                              onClick={() => setActiveTab('applications')}
                              className="btn btn-secondary btn-sm"
                              style={{ marginTop: '0.6rem', fontSize: '0.78rem', width: '100%' }}
                            >
                              Track Application →
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span className="badge badge-pending" style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.75rem', padding: '0.2rem 0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              <Clock size={11} /> Assessment Pending
                            </span>
                            <p style={{ fontSize: '0.72rem', color: '#92400e', marginTop: '4px', marginBottom: '0.5rem' }}>
                              Camera, Mic & Screen proctoring required.
                            </p>
                            <button 
                              onClick={() => setActiveAssessmentApp(existingDomainApp)}
                              className="btn btn-primary btn-sm"
                              style={{ width: '100%', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}
                            >
                              <Play size={13} /> Take Assessment Now
                            </button>
                            <button 
                              onClick={() => setActiveTab('applications')}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', width: '100%' }}
                            >
                              Track in Applications →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowDomainApplyModal(true)}
                      style={{
                        padding: '0.85rem 1.75rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: 'var(--shadow-glow)'
                      }}
                    >
                      <Send size={16} /> Apply for this Domain Role
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Stat Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginTop: '1.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Users size={14} style={{ color: '#2563eb' }} /> ROLE VACANCIES
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#0f172a', display: 'block', marginTop: '4px' }}>
                    {currentDomainRole.totalVacancies} Open Seats
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                    Available across {currentDomainRole.connectedCompanies.length} companies
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Building2 size={14} style={{ color: '#0284c7' }} /> CONNECTED COMPANIES
                  </span>
                  <strong style={{ fontSize: '1.4rem', color: '#0f172a', display: 'block', marginTop: '4px' }}>
                    {currentDomainRole.connectedCompanies.length} Partners
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '600' }}>
                    100% Verified Corporate Badges
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <DollarSign size={14} style={{ color: '#16a34a' }} /> STIPEND RANGE
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: '#0f172a', display: 'block', marginTop: '4px' }}>
                    {currentDomainRole.stipendRange}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Guaranteed stipend payout
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} style={{ color: '#4f46e5' }} /> MODE & DURATION
                  </span>
                  <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block', marginTop: '4px' }}>
                    {currentDomainRole.workMode}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {currentDomainRole.duration}
                  </span>
                </div>
              </div>

              {/* Skills & Eligibility */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <span style={{ fontSize: '0.825rem', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                    Required Technical Skill Stack:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {currentDomainRole.skillsRequired.map((sk, idx) => (
                      <span key={idx} style={{
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        border: '1px solid #bfdbfe',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: '#0f172a' }}>Eligibility:</strong> {currentDomainRole.eligibility}
                </div>
              </div>
            </div>

            {/* List of Connected Companies */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Building2 size={20} style={{ color: '#2563eb' }} />
                    Connected Companies Hiring for this Role ({currentDomainRole.connectedCompanies.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                    All companies listed below hire from your domain application pool. Individual company applications are disabled.
                  </p>
                </div>

                <div style={{
                  background: '#f1f5f9',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Lock size={12} /> Apply to Domain Role only
                </div>
              </div>

              {/* Grid of Connected Company Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.25rem'
              }}>
                {currentDomainRole.connectedCompanies.map((comp) => (
                  <div key={comp.id} className="glass-card" style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-color)',
                    background: '#ffffff'
                  }}>
                    <div>
                      {/* Company Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                        <img 
                          src={comp.logo} 
                          alt={comp.name}
                          style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            {comp.name}
                          </h4>
                          <span className="badge badge-verified" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', marginTop: '2px' }}>
                            <ShieldCheck size={11} /> Verified Partner
                          </span>
                        </div>
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          color: '#15803d',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: '800',
                          textAlign: 'center'
                        }}>
                          {comp.vacancies} Seats
                        </div>
                      </div>

                      {/* Details Strip */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-dim)', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
                          <span>{comp.location} • <strong>{comp.workMode}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <DollarSign size={13} style={{ color: '#16a34a' }} />
                          <span style={{ color: '#16a34a', fontWeight: '700' }}>{comp.stipend}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                          <span>Supervisor: {comp.supervisor} ({comp.supervisorEmail})</span>
                        </div>
                      </div>

                      {/* Highlight */}
                      <div style={{
                        background: '#f8fafc',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        color: 'var(--text-dim)',
                        border: '1px solid var(--border-color)',
                        lineHeight: '1.4'
                      }}>
                        <strong>Focus:</strong> {comp.highlights}
                      </div>
                    </div>

                    {/* Card Footer: Domain Application Status */}
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem'
                    }}>
                      <span style={{ color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldCheck size={12} /> Pooled Hiring Partner
                      </span>
                      <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Lock size={11} /> Covered under Domain App
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MY APPLICATIONS                                   */}
        {/* ======================================================== */}
        {activeTab === 'applications' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
                My Internship Applications ({applications.length})
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Track your active domain applications, central vetting status, and employer allocations.
              </p>
            </div>

            {applications.length > 0 ? (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Applied Role & Track</th>
                      <th>Connected Partner Pool</th>
                      <th>Applied Date</th>
                      <th>Proctored Assessment</th>
                      <th>Status & Hiring Pipeline</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>
                          <strong style={{ color: '#0f172a', display: 'block' }}>{app.internshipTitle}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '600' }}>
                            {app.domain || 'Domain Track'}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: '#16a34a', marginTop: '2px' }}>
                            ✓ ₹100 Fee Verified ({app.txnId || 'TXN_VERIFIED'})
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: '600' }}>
                            {app.companyName}
                          </div>
                          {Array.isArray(app.connectedCompanies) && app.connectedCompanies.length > 0 && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              Covers: {app.connectedCompanies.slice(0, 3).join(', ')}
                              {app.connectedCompanies.length > 3 && ` +${app.connectedCompanies.length - 3} more`}
                            </div>
                          )}
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{app.appliedDate}</div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Ref: {app.id?.slice(0, 12)}
                          </span>
                        </td>
                        <td>
                          {app.assessmentStatus === 'Completed' ? (
                            <div>
                              <span className="badge badge-verified" style={{ background: (app.assessmentScore || 0) >= 60 ? '#16a34a' : '#2563eb', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}>
                                <Award size={12} /> Score: {app.assessmentScore}%
                              </span>
                              <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '3px', fontWeight: '600' }}>
                                ✓ Cam, Mic & Screen Verified
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="badge badge-pending" style={{ background: '#fef3c7', color: '#b45309', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', marginBottom: '4px' }}>
                                <Clock size={11} /> Required
                              </span>
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => setActiveAssessmentApp(app)}
                                style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                              >
                                <Play size={10} /> Take Assessment
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          {app.status === 'Selected' || app.status === 'Hired' ? (
                            <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff' }}>
                              🎉 Selected by Employer! Offer Dispatched
                            </span>
                          ) : app.status === 'Forwarded to Employer' || app.forwardedToEmployer ? (
                            <span className="badge badge-verified" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                              <ShieldCheck size={12} /> Vetted & Forwarded to Companies
                            </span>
                          ) : app.status === 'Withdrawn' ? (
                            <span className="badge badge-pill">Withdrawn</span>
                          ) : (
                            <span className="badge badge-pending" style={{ background: '#fef3c7', color: '#b45309' }}>
                              <Clock size={12} /> {app.adminSelectionStatus || 'Under Admin Vetting'}
                            </span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            {app.status !== 'Withdrawn' && app.status !== 'Selected' && app.status !== 'Hired' && (
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  if (onWithdrawApplication) onWithdrawApplication(app.id);
                                  if (onAddToast) onAddToast(`Application ${app.id} withdrawn.`, 'info');
                                }}
                              >
                                Withdraw
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <Briefcase size={36} style={{ color: '#cbd5e1', marginBottom: '0.5rem' }} />
                <p>You have not submitted any domain applications yet.</p>
                <button 
                  onClick={() => setActiveTab('domain-role')} 
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '0.75rem' }}
                >
                  View Domain Role & Apply
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CANDIDATE PROFILE & RESUME                        */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
                  Candidate Profile & ATS Resume
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Ensure your phone number, domain, and ATS resume link are accurate for company placement.
                </p>
              </div>
              <button 
                className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="required">*</span></label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mandatory Phone Number <span className="required">*</span></label>
                    <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98450 12345" required />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Primary Career Domain <span className="required">*</span></label>
                    <select className="form-select" value={domain} onChange={(e) => setDomain(e.target.value)}>
                      {DOMAIN_ROLES_DATA.map(d => (
                        <option key={d.id} value={d.domainName}>{d.domainName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Institution / College</label>
                    <input type="text" className="form-input" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree / Branch</label>
                    <input type="text" className="form-input" value={degree} onChange={(e) => setDegree(e.target.value)} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Year of Study</label>
                    <input type="text" className="form-input" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} placeholder="e.g. 3rd Year" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CGPA / Grade</label>
                    <input type="text" className="form-input" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">ATS Resume Drive Link <span className="required">*</span></label>
                  <input type="url" className="form-input" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="https://drive.google.com/..." required />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">LinkedIn URL</label>
                    <input type="url" className="form-input" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub URL</label>
                    <input type="url" className="form-input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Skills (Comma separated)</label>
                  <input type="text" className="form-input" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Profile</button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>Contact & Academic Info</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}><strong>Email:</strong> {safeProfile.email}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}><strong>Phone:</strong> {safeProfile.phone || '9876543210'}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}><strong>College:</strong> {safeProfile.institution || safeProfile.collegeName || 'Accredited Institution'}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}><strong>Degree:</strong> {safeProfile.degree} ({safeProfile.yearOfStudy || '3rd Year'})</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>Domain & Verified Resume</h4>
                  <p style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <Briefcase size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {safeProfile.domain || 'Software & Full-Stack Web Development'}
                  </p>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <a href={safeProfile.resumeUrl || '#'} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={15} /> View ATS Resume PDF <ExternalLink size={12} />
                    </a>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.825rem' }}>
                    {safeProfile.linkedinUrl && (
                      <a href={safeProfile.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: '600' }}>LinkedIn →</a>
                    )}
                    {safeProfile.githubUrl && (
                      <a href={safeProfile.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#334155', fontWeight: '600' }}>GitHub →</a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Account Governance (Delete Account) */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#dc2626', display: 'block' }}>Account Governance & Removal</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Permanently delete account, applications, and student record.</span>
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={14} /> Delete Account Permanently
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DOMAIN ROLE APPLICATION MODAL                            */}
        {/* ======================================================== */}
        {showDomainApplyModal && (
          <div className="modal-overlay" onClick={() => setShowDomainApplyModal(false)}>
            <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                      Apply for Domain Role
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {currentDomainRole.roleTitle}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDomainApplyModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Policy Notice Box */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '0.85rem',
                marginBottom: '1.25rem',
                fontSize: '0.8rem',
                color: '#1e40af',
                lineHeight: '1.5'
              }}>
                <strong>🔒 Edu2Work Domain Placement Notice:</strong> You are submitting a single application for the <strong>{currentDomainRole.domainName}</strong> track. Your application qualifies you for consideration across all <strong>{currentDomainRole.connectedCompanies.length} connected partner companies</strong> ({currentDomainRole.totalVacancies} total vacancies).
              </div>

              <form onSubmit={handleDomainApplySubmit}>
                <div className="form-group">
                  <label className="form-label">Candidate Full Name</label>
                  <input type="text" className="form-input" value={safeProfile.name || safeProfile.fullName || 'Student'} readOnly style={{ background: '#f1f5f9' }} />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Mandatory Phone Number <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={domainPhone} 
                      onChange={(e) => setDomainPhone(e.target.value)} 
                      placeholder="+91 98450 12345" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={domainEmail} 
                      onChange={(e) => setDomainEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Attached ATS Resume</label>
                  <div style={{
                    background: '#f8fafc',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0f172a', fontWeight: '600' }}>
                      <FileText size={15} style={{ color: '#2563eb' }} />
                      Verified ATS Resume PDF Attached
                    </span>
                    <a href={safeProfile.resumeUrl || '#'} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: '700' }}>
                      View
                    </a>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Candidate Note (Optional)</label>
                  <textarea 
                    className="form-textarea" 
                    rows={2} 
                    placeholder="Describe your technical interest in this domain role..."
                    value={domainCoverNote}
                    onChange={(e) => setDomainCoverNote(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDomainApplyModal(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmittingDomain}
                  >
                    {isSubmittingDomain ? 'Submitting...' : `Confirm & Apply for Domain Role (₹100 Verified)`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DELETE ACCOUNT CONFIRMATION MODAL                        */}
        {/* ======================================================== */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={20} /> Confirm Permanent Deletion
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Are you sure you want to permanently delete account for <strong>{safeProfile.name || 'this student'}</strong>? All domain applications will be withdrawn and removed.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => {
                    setShowDeleteModal(false);
                    if (onDeleteAccount) onDeleteAccount();
                  }}
                >
                  Yes, Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* POST-APPLICATION ASSESSMENT PROMPT MODAL                 */}
        {/* ======================================================== */}
        {postApplyModalApp && (
          <div className="modal-overlay" onClick={() => setPostApplyModalApp(null)}>
            <div className="modal-content" style={{ maxWidth: '580px', textAlign: 'center', padding: '2.25rem' }} onClick={(e) => e.stopPropagation()}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                border: '3px solid #bfdbfe'
              }}>
                <Sparkles size={34} />
              </div>

              <span className="badge badge-verified" style={{ marginBottom: '0.75rem', fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                Step 1 Complete: Application Submitted
              </span>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Mandatory Proctored Assessment Required
              </h2>

              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
                Your domain application for <strong>{postApplyModalApp.internshipTitle || postApplyModalApp.domain}</strong> is registered. To complete placement vetting across connected employers, you must complete the <strong>online proctored assessment</strong>.
              </p>

              {/* 4 Required Permissions Box */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                  Mandatory Hardware & Anti-Cheat Requirements:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0f172a' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Camera size={15} />
                    </div>
                    <div>
                      <strong>Camera Access</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Continuous facial feed</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0f172a' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mic size={15} />
                    </div>
                    <div>
                      <strong>Microphone Access</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Audio level verification</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0f172a' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ede9fe', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Monitor size={15} />
                    </div>
                    <div>
                      <strong>Screen Sharing</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Live desktop monitoring</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0f172a' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Maximize size={15} />
                    </div>
                    <div>
                      <strong>Full-Screen Mode</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Anti-cheat tab switch lock</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                ⏱️ 10 Questions • 15 Minutes • Instant Auto-Scoring & Audit Report
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setPostApplyModalApp(null);
                    setActiveTab('applications');
                  }}
                >
                  Later from My Applications
                </button>
                <button 
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onClick={() => {
                    const appToAssess = postApplyModalApp;
                    setPostApplyModalApp(null);
                    setActiveAssessmentApp(appToAssess);
                  }}
                >
                  <Play size={16} /> Start Proctored Assessment Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PROCTORED HARDWARE ASSESSMENT MODAL                      */}
        {/* ======================================================== */}
        {activeAssessmentApp && (
          <ProctoredAssessmentModal
            application={activeAssessmentApp}
            onClose={() => setActiveAssessmentApp(null)}
            onCompleteAssessment={(appId, results) => {
              if (onCompleteAssessment) {
                onCompleteAssessment(appId, results);
              }
              if (onAddToast) {
                onAddToast(`🎉 Proctored assessment completed with ${results.score}%! Camera, mic & screen share verified.`, 'success');
              }
              setActiveAssessmentApp(null);
            }}
            onAddToast={onAddToast}
          />
        )}

      </div>
    </div>
  );
}
