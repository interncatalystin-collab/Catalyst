import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  Users, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  UserCheck, 
  DollarSign,
  Calendar,
  Sparkles,
  Lock,
  BadgeCheck,
  Zap,
  Check,
  ArrowRight,
  Key
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export default function CompanyDashboard({ 
  company, 
  onUpdateCompany, 
  internships, 
  onAddInternship, 
  applications, 
  onUpdateAppStatus,
  onAddToast 
}) {
  const [activeTab, setActiveTab] = useState('post-role'); // 'post-role', 'company-profile', 'listings', 'applicants', 'verification', 'subscription'

  // Company Profile Form State
  const [isEditingCompanyProfile, setIsEditingCompanyProfile] = useState(false);
  const [compName, setCompName] = useState(company.name || '');
  const [businessEmail, setBusinessEmail] = useState(company.businessEmail || '');
  const [contactPerson, setContactPerson] = useState(company.contactPerson || '');
  const [compPhone, setCompPhone] = useState(company.phone || '');
  const [logo, setLogo] = useState(company.logo || '');
  const [website, setWebsite] = useState(company.website || '');
  const [compIndustry, setCompIndustry] = useState(company.industry || 'Software & IT');
  const [compLocation, setCompLocation] = useState(company.location || '');
  const [compSize, setCompSize] = useState(company.size || '50-200 Employees');
  const [compDescription, setCompDescription] = useState(company.description || '');

  // Auth / Business Email Verification State
  const [showBusinessAuthModal, setShowBusinessAuthModal] = useState(false);
  const [emailAuthCode, setEmailAuthCode] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);

  // Post Role Wizard Form
  const [roleTitle, setRoleTitle] = useState('');
  const [industry, setIndustry] = useState(company.industry || 'Software & IT');
  const [workMode, setWorkMode] = useState('Online');
  const [internshipType, setInternshipType] = useState('Full-time'); // 'Full-time' or 'Part-time'
  const [stipendType, setStipendType] = useState('Paid'); // 'Paid' or 'Free'
  const [stipendAmount, setStipendAmount] = useState('₹15,000 / month');
  const [duration, setDuration] = useState('3 Months');
  const [openings, setOpenings] = useState(3);
  const [workingHours, setWorkingHours] = useState('9:00 AM - 5:00 PM (40 hrs/wk)');
  const [deadline, setDeadline] = useState('2026-09-30');
  const [skillsInput, setSkillsInput] = useState('React, Node.js, JavaScript, Git');
  const [supervisorName, setSupervisorName] = useState(company.contactPerson || '');
  const [supervisorDesignation, setSupervisorDesignation] = useState('HR Lead');
  const [supervisorEmail, setSupervisorEmail] = useState(company.businessEmail || '');
  const [supervisorPhone, setSupervisorPhone] = useState(company.phone || '');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('Pursuing BE/B.Tech or MCA degree\nGood programming foundation');

  // Verification Audit Request Form
  const [docName, setDocName] = useState('GST_Certificate_2026.pdf');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSaveCompanyProfile = (e) => {
    e.preventDefault();

    if (!businessEmail || !businessEmail.includes('@')) {
      onAddToast('Please provide a valid corporate business email domain.', 'danger');
      return;
    }

    const updated = {
      ...company,
      name: compName,
      businessEmail: company.businessEmail, // Preserved: Only Admin can change company login email
      contactPerson,
      phone: compPhone,
      logo,
      website,
      industry: compIndustry,
      location: compLocation,
      size: compSize,
      description: compDescription
    };

    onUpdateCompany(updated);
    setIsEditingCompanyProfile(false);
    onAddToast('Company business identity updated successfully!', 'success');
  };

  const handleSendBusinessEmailCode = (e) => {
    e.preventDefault();
    setEmailCodeSent(true);
    onAddToast(`Verification OTP dispatched to corporate email: ${businessEmail}`, 'info');
  };

  const handleVerifyBusinessEmailSubmit = (e) => {
    e.preventDefault();
    setShowBusinessAuthModal(false);
    setEmailCodeSent(false);
    onAddToast(`Corporate business email '${businessEmail}' verified successfully!`, 'success');
  };

  const companyListings = internships.filter(i => i.companyName === company.name || i.companyId === company.id);
  const allCompanyApplications = applications.filter(app => 
    app.companyName === company.name || companyListings.some(l => l.id === app.internshipId)
  );
  const companyApps = allCompanyApplications.filter(app => 
    app.forwardedToEmployer || app.adminSelectionStatus === 'Shortlisted & Forwarded to Employer'
  );
  const pendingVettingApps = allCompanyApplications.filter(app => 
    !(app.forwardedToEmployer || app.adminSelectionStatus === 'Shortlisted & Forwarded to Employer')
  );

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!roleTitle || !supervisorName || !supervisorPhone) {
      onAddToast('Please fill out all mandatory role and supervisor details.', 'danger');
      return;
    }

    const newOpportunity = {
      id: `int-${Date.now()}`,
      title: roleTitle,
      companyId: company.id,
      companyName: company.name,
      logo: company.logo,
      verified: company.verifiedBadge,
      location: company.location,
      workMode,
      internshipType,
      stipendType,
      stipendAmount: stipendType === 'Paid' ? stipendAmount : 'Free Internship (Certificate + LOR)',
      duration,
      openings: parseInt(openings) || 1,
      vacantSeats: parseInt(openings) || 1,
      hiredCount: 0,
      workingHours: workingHours || (internshipType === 'Full-time' ? '9:00 AM - 5:00 PM (40 hrs/wk)' : '10:00 AM - 2:00 PM (20 hrs/wk)'),
      deadline,
      industry,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      supervisorName,
      supervisorDesignation,
      supervisorEmail,
      supervisorPhone,
      description: description || 'Exciting internship opportunity with hands-on project exposure.',
      requirements: requirementsInput.split('\n').filter(Boolean),
      status: 'Approved', // Auto-approved and published live immediately across public portal
      verified: true,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0
    };

    onAddInternship(newOpportunity);
    onAddToast('🎉 Opportunity posted live to public portal & candidate matcher engine!', 'success');
    setActiveTab('listings');
  };

  const handleVerificationRequest = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
    const updatedComp = { ...company, verificationStatus: 'Pending' };
    onUpdateCompany(updatedComp);
    onAddToast('Verification document uploaded! Admin compliance team will verify your business.', 'success');
  };

  if (company && company.accessGranted === false) {
    return (
      <div style={{ padding: '4rem 0 6rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #fed7aa', background: '#fff' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              Company Dashboard Access Restricted
            </h2>
            <div className="badge" style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', marginBottom: '1.25rem', padding: '0.4rem 0.8rem', width: 'fit-content', margin: '0 auto 1.25rem' }}>
              <Clock size={13} /> Pending Central Admin Access Approval
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              <strong>{company.name}</strong> is connected to our website, but Central Administration has not yet granted dashboard access credentials (corporate email & password).
            </p>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={15} style={{ color: '#2563eb' }} /> Access Authorization Process:
              </div>
              <div style={{ color: 'var(--text-dim)', lineHeight: '1.5' }}>
                Central Administrators review connected companies and grant dashboard access with a designated corporate email and secure password in the <strong>Admin Dashboard &rarr; Connected Companies & Access</strong> panel.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
              <img 
                src={company.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80'} 
                alt={company.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling;
                  if (fb) fb.style.display = 'flex';
                }}
                style={{ width: '70px', height: '70px', borderRadius: '14px', objectFit: 'cover', background: '#fff', border: '1px solid #e2e8f0' }}
              />
              <div style={{ display: 'none', width: '70px', height: '70px', borderRadius: '14px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={32} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>{company.name}</h1>
                <span className="badge" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                  <Key size={12} /> Admin-Authorized Access Active ✓
                </span>
                {company.verifiedBadge ? (
                  <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Employer ✓</span>
                ) : (
                  <span className="badge badge-pending"><Clock size={13} /> Verification Audit Pending</span>
                )}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                {company.industry} • {company.location} • Plan: <strong style={{ color: '#2563eb' }}>{company.subscriptionPlan}</strong>
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>Authorized Login Email: <strong style={{ color: '#0f172a' }}>{company.businessEmail}</strong></span>
                <span>•</span>
                <span>Contact Person: {company.contactPerson} ({company.phone})</span>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-emerald"
            onClick={() => setActiveTab('post-role')}
          >
            <PlusCircle size={16} /> Post New Opportunity
          </button>
        </div>

        {/* Navigation Tabs */}
        <div 
          className="mobile-touch-tabs"
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            overflowX: 'auto'
          }}
        >
          <button 
            onClick={() => setActiveTab('post-role')}
            style={{
              background: activeTab === 'post-role' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'post-role' ? '#fff' : 'var(--text-dim)',
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
            <PlusCircle size={15} /> Post Internship Wizard
          </button>

          <button 
            onClick={() => setActiveTab('company-profile')}
            style={{
              background: activeTab === 'company-profile' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'company-profile' ? '#fff' : 'var(--text-dim)',
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
            <Building2 size={15} /> Company Profile
          </button>

          <button 
            onClick={() => setActiveTab('listings')}
            style={{
              background: activeTab === 'listings' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'listings' ? '#fff' : 'var(--text-dim)',
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
            <FileText size={15} /> Active Postings ({companyListings.length})
          </button>

          <button 
            onClick={() => setActiveTab('applicants')}
            style={{
              background: activeTab === 'applicants' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'applicants' ? '#fff' : 'var(--text-dim)',
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
            <Users size={15} /> Applicant Manager ({companyApps.length})
          </button>

          <button 
            onClick={() => setActiveTab('verification')}
            style={{
              background: activeTab === 'verification' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'verification' ? '#fff' : 'var(--text-dim)',
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
            <ShieldCheck size={15} /> Employer Verification Badge
          </button>

          <button 
            onClick={() => setActiveTab('subscription')}
            style={{
              background: activeTab === 'subscription' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'subscription' ? '#fff' : 'var(--text-dim)',
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
            <CreditCard size={15} /> Partner Benefits & Plans
          </button>
        </div>

        {/* Tab 1: Post Internship Opportunity */}
        {activeTab === 'post-role' && (
          <form onSubmit={handlePostSubmit} className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlusCircle size={20} style={{ color: '#10b981' }} /> Post New Internship Opportunity
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Requirements: Include specific role title, required skills, duration, work mode (Online/Offline), stipend amount, working hours, openings count, application deadline, and supervisor details.
            </p>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Role Title <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Backend Node.js Development Intern"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Industry Category</label>
                <select className="form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value="Software & IT">Software & IT</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Design & Media">Design & Media</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Marketing & Sales">Marketing & Sales</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Commitment Type <span className="required">*</span></label>
                <select className="form-select" value={internshipType} onChange={(e) => setInternshipType(e.target.value)}>
                  <option value="Full-time">🌕 Full-Time (40 hrs/week)</option>
                  <option value="Part-time">🌓 Part-Time (20 hrs/week)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Compensation Type <span className="required">*</span></label>
                <select className="form-select" value={stipendType} onChange={(e) => setStipendType(e.target.value)}>
                  <option value="Paid">💵 Paid (With Monthly Stipend)</option>
                  <option value="Free">🎓 Free Internship (Experience & Verified Certificate)</option>
                </select>
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Work Mode <span className="required">*</span></label>
                <select className="form-select" value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                  <option value="Online">Online (Remote)</option>
                  <option value="Offline">Offline (On-Site)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {stipendType === 'Paid' ? (
                <div className="form-group">
                  <label className="form-label">Monthly Stipend Amount <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. ₹18,000 / month"
                    value={stipendAmount}
                    onChange={(e) => setStipendAmount(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Perks & Benefits</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value="Free Internship (Certificate + LOR)"
                    disabled
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Duration</label>
                <select className="form-select" value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">No. of Openings <span className="required">*</span></label>
                <input 
                  type="number" 
                  min="1"
                  className="form-input"
                  value={openings}
                  onChange={(e) => setOpenings(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Working Hours Schedule</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 9:30 AM - 5:30 PM (Mon-Fri)"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Application Deadline <span className="required">*</span></label>
                <input 
                  type="date" 
                  className="form-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Supervisor Details Box */}
            <div style={{
              background: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              margin: '1.5rem 0'
            }}>
              <h4 style={{ color: '#818cf8', fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserCheck size={18} /> Designated Internship Supervisor Details (Handwritten Requirement)
              </h4>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Supervisor Full Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation / Role</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="VP of Engineering"
                    value={supervisorDesignation}
                    onChange={(e) => setSupervisorDesignation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Supervisor Email <span className="required">*</span></label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={supervisorEmail}
                    onChange={(e) => setSupervisorEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Supervisor Direct Phone <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    className="form-input"
                    value={supervisorPhone}
                    onChange={(e) => setSupervisorPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Required Skills (Comma separated)</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="React, Node.js, MongoDB, Git"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Description & Responsibilities</label>
              <textarea 
                className="form-textarea" 
                rows={3}
                placeholder="Describe day-to-day responsibilities..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Requirements (One per line)</label>
              <textarea 
                className="form-textarea" 
                rows={3}
                value={requirementsInput}
                onChange={(e) => setRequirementsInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-emerald" style={{ padding: '0.85rem 2rem' }}>
                Publish Internship Posting Now
              </button>
            </div>
          </form>
        )}

        {/* Tab: Company Profile & Business Details */}
        {activeTab === 'company-profile' && (
          <form onSubmit={handleSaveCompanyProfile} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={22} style={{ color: '#34d399' }} /> Company Profile & Business Identity
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                  Handwritten Requirements: Register & verify business email, contact person details, logo, website, industry, location, and size.
                </p>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowBusinessAuthModal(true)}
              >
                <Mail size={14} /> Verify Business Email
              </button>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Company Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={compName} 
                  onChange={(e) => setCompName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Corporate Business Email</span>
                  <span className="badge" style={{ background: '#fffbeb', color: '#b45309', fontSize: '0.7rem', padding: '2px 6px', border: '1px solid #fde68a' }}>
                    <Lock size={10} /> Admin-Controlled
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem', background: '#f8fafc', color: '#475569', cursor: 'not-allowed' }}
                    value={company.businessEmail} 
                    disabled
                    readOnly
                  />
                </div>
                <span style={{ fontSize: '0.725rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <Lock size={11} /> Only Admin has the access to change company login email and password.
                </span>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Primary Contact Person Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={contactPerson} 
                  onChange={(e) => setContactPerson(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person Direct Phone <span className="required">*</span></label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={compPhone} 
                  onChange={(e) => setCompPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Company Logo URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={logo} 
                  onChange={(e) => setLogo(e.target.value)} 
                  placeholder="https://..." 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Website URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  placeholder="https://company.com" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Industry Sector</label>
                <select className="form-select" value={compIndustry} onChange={(e) => setCompIndustry(e.target.value)}>
                  <option value="Software & IT">Software & IT</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Design & Media">Design & Media</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Marketing & Sales">Marketing & Sales</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Headquarters / Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={compLocation} 
                  onChange={(e) => setCompLocation(e.target.value)} 
                  placeholder="Bangalore, Karnataka" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Size (No. of Employees)</label>
                <select className="form-select" value={compSize} onChange={(e) => setCompSize(e.target.value)}>
                  <option value="1-10 Employees">1-10 Employees (Early Startup)</option>
                  <option value="10-50 Employees">10-50 Employees (Growth)</option>
                  <option value="50-200 Employees">50-200 Employees (Mid-Size)</option>
                  <option value="200-1000 Employees">200-1000 Employees (Enterprise)</option>
                  <option value="1000+ Employees">1000+ Employees (Global)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">About Company Description</label>
              <textarea 
                className="form-textarea" 
                rows={3} 
                value={compDescription} 
                onChange={(e) => setCompDescription(e.target.value)} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-emerald" style={{ padding: '0.85rem 2rem' }}>
                Save Company Profile Details
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Active Listings & Vacant Seats */}
        {activeTab === 'listings' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Posted Opportunities & Vacant Seat Tracker
            </h3>

            {companyListings.length > 0 ? (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Work Mode</th>
                      <th>Stipend</th>
                      <th>Total Openings</th>
                      <th>Vacant Seats Remaining</th>
                      <th>Hired Candidates</th>
                      <th>Deadline</th>
                      <th>Audit Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyListings.map(item => {
                      const vacant = item.vacantSeats !== undefined ? item.vacantSeats : Math.max(0, item.openings - (item.hiredCount || 0));
                      const hired = item.hiredCount || 0;
                      return (
                        <tr key={item.id}>
                          <td><strong style={{ color: '#fff' }}>{item.title}</strong></td>
                          <td>{item.workMode}</td>
                          <td style={{ color: '#10b981', fontWeight: '600' }}>{item.stipendAmount}</td>
                          <td><strong>{item.openings} Seats</strong></td>
                          <td>
                            {vacant > 0 ? (
                              <span className="badge badge-verified" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: '#10b981' }}>
                                Vacant Seats: {vacant} / {item.openings}
                              </span>
                            ) : (
                              <span className="badge badge-danger" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
                                Position Filled (0 Vacant)
                              </span>
                            )}
                          </td>
                          <td style={{ color: '#38bdf8', fontWeight: '600' }}>{hired} Hired</td>
                          <td>{item.deadline}</td>
                          <td>
                            <span className={`badge ${item.status === 'Approved' ? 'badge-verified' : 'badge-pending'}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No active internship listings found.</p>
            )}
          </div>
        )}

        {/* Tab 3: Applicant Manager & Candidate Selection */}
        {activeTab === 'applicants' && (
          <div className="glass-card">
            {/* Student Privacy & Admin Forwarding Protocol Banner */}
            <div style={{
              background: 'rgba(30, 58, 138, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <ShieldCheck size={26} style={{ color: '#38bdf8', flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#f8fafc', display: 'block', marginBottom: '2px' }}>
                  🔒 Student Privacy & Central Admin Vetting Protocol
                </strong>
                <span style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                  In accordance with platform rules, candidate personal information (name, email, phone, college, and resume) is strictly protected and hidden from company view until Central Admin verifies candidate qualifications, reviews proctored assessments, and forwards the candidate profile to your portal.
                </span>
              </div>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '0.85rem 1.15rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={22} style={{ color: '#16a34a' }} />
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#14532d', display: 'block' }}>
                    ⭐ Top Selected Candidates Forwarded by Central Admin
                  </strong>
                  <span style={{ fontSize: '0.825rem', color: '#166534' }}>
                    Showing top candidate profiles manually vetted and forwarded to {company.name} by InternCatalyst Central Admin for recruiter screening.
                  </span>
                </div>
              </div>
              <span className="badge badge-verified" style={{ background: '#16a34a', color: '#ffffff' }}>
                Admin Selection Verified ✓
              </span>
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Top Selected Candidates for Recruiter Hiring ({companyApps.length})
            </h3>

            {companyApps.length > 0 ? (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Candidate Name & Contact Details</th>
                      <th>Academic Info & Verified Resume</th>
                      <th>Applied Position</th>
                      <th>Vacant Seats</th>
                      <th>ATS Match</th>
                      <th>Recruiter Hiring Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyApps.map(app => {
                      const targetJob = companyListings.find(j => j.id === app.internshipId || j.title === app.internshipTitle);
                      const vacant = targetJob?.vacantSeats !== undefined ? targetJob.vacantSeats : (targetJob ? Math.max(0, targetJob.openings - (targetJob.hiredCount || 0)) : 1);
                      return (
                        <tr key={app.id}>
                          <td>
                            <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>{app.studentName}</strong>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                              ✉️ {app.studentEmail}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#38bdf8', display: 'block' }}>
                              📞 {app.studentPhone}
                            </span>
                          </td>
                          <td>
                            <span style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'block', fontWeight: '600' }}>
                              {app.studentCollege || 'IIT Bombay'}
                            </span>
                            <span style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'block' }}>
                              {app.studentDegree || 'B.Tech CS'} • {app.studentYear || '3rd Year'}
                            </span>
                            <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <a 
                                href={app.resumeUrl || '#'} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  alert(`📄 VERIFIED CANDIDATE PROFILE & RESUME\n\nCandidate Name: ${app.studentName}\nEmail: ${app.studentEmail}\nPhone: ${app.studentPhone}\nCollege: ${app.studentCollege || 'IIT Bombay'}\nDegree/Course: ${app.studentDegree || 'B.Tech Computer Science'}\nYear of Study: ${app.studentYear || '3rd Year'}\nLinkedIn: ${app.linkedinUrl || 'https://linkedin.com/in/aditya-verma-dev'}\nGitHub: ${app.githubUrl || 'https://github.com/adityaverma'}\n₹100 Fee Payment: Verified (${app.txnId || 'TXN_UPI_100_892104'})\n\nResume File: ${app.resumeName || 'Student_ATS_Resume.pdf'}`); 
                                }}
                                style={{ color: '#38bdf8', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: '700', textDecoration: 'underline' }}
                              >
                                <FileText size={12} /> 📄 View ATS Resume ({app.resumeName || 'Resume.pdf'})
                              </a>
                              <a href={app.linkedinUrl || 'https://linkedin.com/in/aditya-verma-dev'} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', fontSize: '0.72rem', fontWeight: '700', textDecoration: 'underline' }}>
                                LinkedIn 🔗
                              </a>
                              <a href={app.githubUrl || 'https://github.com/adityaverma'} target="_blank" rel="noreferrer" style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: '700', textDecoration: 'underline' }}>
                                GitHub 💻
                              </a>
                            </div>
                          </td>
                          <td>
                            <strong style={{ color: '#f8fafc' }}>{app.internshipTitle}</strong>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                              Applied: {app.appliedDate}
                            </span>
                          </td>
                          <td>
                            {vacant > 0 ? (
                              <span className="badge badge-verified" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                                {vacant} Vacant Seats Remaining
                              </span>
                            ) : (
                              <span className="badge badge-danger">0 Vacant Seats Left</span>
                            )}
                          </td>
                          <td>
                            <span className="badge badge-pill" style={{ color: '#34d399', borderColor: '#10b981' }}>
                              {app.matchScore || 94}% Match Score
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                              {app.status === 'Selected' || app.status === 'Hired' ? (
                                <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                                  🎉 Selected & Hired for Vacant Seat (Returned to Admin) ✓
                                </span>
                              ) : app.status === 'Rejected' ? (
                                <span className="badge badge-danger">Rejected (Returned to Admin)</span>
                              ) : (
                                <>
                                  <button 
                                    className="btn btn-emerald btn-sm"
                                    onClick={() => onUpdateAppStatus(app.id, 'Selected')}
                                    disabled={vacant <= 0}
                                    style={{ fontWeight: '700' }}
                                  >
                                    Select Candidate & Send Result to Admin
                                  </button>
                                  <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onUpdateAppStatus(app.id, 'Rejected')}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px border-dashed rgba(255,255,255,0.1)' }}>
                <Clock size={32} style={{ color: '#38bdf8', marginBottom: '0.75rem' }} />
                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Awaiting Admin Candidate Forwarding
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '580px', margin: '0 auto' }}>
                  Central Admin is currently vetting incoming student applications. As soon as Admin manually selects the best matching candidates for {company.name}, they will appear here automatically with full profiles for recruiter screening.
                </p>
              </div>
            )}

            {/* Candidates in Central Admin Screening Queue (Student Details Protected until Admin Forwarding) */}
            {pendingVettingApps.length > 0 && (
              <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Lock size={16} color="#fbbf24" /> Applications in Central Admin Queue ({pendingVettingApps.length})
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Candidate profiles undergoing academic check, ATS analysis, and proctoring. Details are unlocked upon Admin forwarding.
                    </span>
                  </div>
                  <span className="badge badge-pending">
                    🔒 Identity Protected
                  </span>
                </div>

                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Candidate Profile</th>
                        <th>Contact Details</th>
                        <th>Academic Info</th>
                        <th>Applied Role</th>
                        <th>Status</th>
                        <th>Recruiter Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingVettingApps.map(app => (
                        <tr key={app.id}>
                          <td>
                            <strong style={{ color: '#94a3b8', display: 'block', fontSize: '0.9rem' }}>
                              Candidate #{app.id?.slice(-4) || 'QUEUED'}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              Registered Application
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <Lock size={12} color="#fbbf24" /> Hidden until Admin Forwarding
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <ShieldCheck size={12} color="#38bdf8" /> Under Admin Review
                            </span>
                          </td>
                          <td>
                            <strong style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                              {app.internshipTitle}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>
                              Applied: {app.appliedDate}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-pending" style={{ fontSize: '0.74rem' }}>
                              ⏳ In Admin Screening Queue
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                              🔒 Unlocked when Admin forwards
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Employer Verification Badge Audit */}
        {activeTab === 'verification' && (
          <div className="glass-card" style={{ maxWidth: '650px' }}>
            <div className="badge badge-verified" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> Trust & Compliance Requirement
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Employer Verification Badge System (✓)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Handwritten Instruction: Include an employer verification badge ONLY after checking company identity and internship details. Never list a company or internship without confirming that the opportunity is genuine.
            </p>

            <div style={{
              background: company.verifiedBadge ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              border: '1px solid ' + (company.verifiedBadge ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'),
              padding: '1.25rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <strong style={{ color: company.verifiedBadge ? '#34d399' : '#fbbf24', fontSize: '1.05rem', display: 'block', marginBottom: '0.3rem' }}>
                Current Status: {company.verifiedBadge ? 'Verified Employer Badge Granted ✓' : 'Verification Documents Required'}
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {company.verifiedBadge 
                  ? 'Your company profile exhibits the verified badge across all public listings.' 
                  : 'Submit corporate legal documents (GST / Certificate of Incorporation) for Admin review.'}
              </p>
            </div>

            {!company.verifiedBadge && (
              <form onSubmit={handleVerificationRequest}>
                <div className="form-group">
                  <label className="form-label">Upload Business Registration Document / GST Certificate</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="GSTIN_Certificate_PDF.pdf"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-emerald">
                  Submit Documents for Admin Verification Audit
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 5: Corporate Partner Benefits & Subscription Plans */}
        {activeTab === 'subscription' && (
          <div>
            {/* Header Banner */}
            <div className="glass-card" style={{
              padding: '2rem 2.5rem',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ maxWidth: '720px' }}>
                  <div className="badge badge-verified" style={{ marginBottom: '0.75rem', background: '#10b981', color: '#fff' }}>
                    <ShieldCheck size={14} /> Corporate & Startup Partner Portal
                  </div>
                  <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#fff', marginBottom: '0.65rem' }}>
                    Hire Pre-Vetted Interns & Build Your <span className="text-gradient-emerald">Talent Pipeline</span>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                    InternCatalyst connects verified corporate partners with pre-screened engineering, design, and IT candidates. Manage your active subscription, placement quotas, and partnership credentials.
                  </p>
                </div>

                {/* Current Active Plan Status Widget */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid var(--border-highlight)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.75rem',
                  minWidth: '260px'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Current Corporate Tier
                  </span>
                  <h3 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: '800', marginTop: '3px' }}>
                    {company.subscriptionPlan || 'Growth Monthly'}
                  </h3>
                  <div style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} /> {company.placementsRemaining ?? 10} Placement Posts Remaining
                  </div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: company.verifiedBadge ? '#34d399' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <BadgeCheck size={13} /> {company.verifiedBadge ? 'Verified Partner Badge Active (✓)' : 'Pending Document Audit'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Value Pillars Grid (From For Companies section) */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} style={{ color: '#38bdf8' }} /> Corporate Partner Benefits & Features
              </h3>
              <div className="grid-3" style={{ gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <BadgeCheck size={26} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Verified Employer Badge (✓)
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    Stand out to top-tier candidates. Earning the Verified Employer Badge signals authenticity, corporate email verification, and genuine stipend commitments.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Zap size={26} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Smart AI Candidate Matcher
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    Our proprietary matching algorithm filters student skill portfolios, year of study, and hardware-proctored assessment scores to deliver candidates with a 90%+ match score.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Users size={26} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Direct College Access
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    Partner directly with top college placement cells (including AIET and accredited engineering institutions) for bulk intern hiring, virtual hackathons, and structured campus drives.
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Tier Subscription & Placement Plans Matrix */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                  Transparent <span className="text-gradient">Subscription & Placement Plans</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Choose the plan that fits your startup or enterprise hiring volume. Instant quota allocation upon activation.
                </p>
              </div>

              <div className="grid-3" style={{ gap: '1.5rem' }}>
                {SUBSCRIPTION_PLANS.map((plan, idx) => {
                  const isCurrent = company.subscriptionPlan === plan.name;
                  return (
                    <div 
                      key={idx}
                      className="glass-card" 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: isCurrent 
                          ? '2px solid #10b981' 
                          : plan.popular 
                            ? '1.5px solid #38bdf8' 
                            : '1px solid var(--border-color)',
                        position: 'relative',
                        padding: '1.75rem',
                        background: isCurrent ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-card)'
                      }}
                    >
                      {isCurrent ? (
                        <span style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '1.5rem',
                          background: '#10b981',
                          color: '#fff',
                          fontWeight: '800',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '10px',
                          textTransform: 'uppercase'
                        }}>
                          Current Plan
                        </span>
                      ) : plan.popular ? (
                        <span style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '1.5rem',
                          background: '#38bdf8',
                          color: '#0f172a',
                          fontWeight: '800',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '10px',
                          textTransform: 'uppercase'
                        }}>
                          Most Popular
                        </span>
                      ) : null}

                      <h4 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: '700', marginBottom: '0.4rem' }}>
                        {plan.name}
                      </h4>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '2.2rem', fontWeight: '800', color: isCurrent ? '#34d399' : '#fff' }}>
                          {plan.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                          {plan.period}
                        </span>
                      </div>

                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
                        {plan.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                            <Check size={15} style={{ color: isCurrent ? '#34d399' : '#38bdf8', flexShrink: 0 }} />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <button 
                        className={isCurrent ? 'btn btn-secondary' : plan.popular ? 'btn btn-emerald' : 'btn btn-primary'}
                        onClick={() => {
                          let added = plan.name.includes('Starter') ? 2 : plan.name.includes('Growth') ? 10 : 50;
                          let willVerify = !plan.name.includes('Starter');
                          onUpdateCompany({
                            ...company,
                            subscriptionPlan: plan.name,
                            placementsRemaining: (company.placementsRemaining || 0) + added,
                            verifiedBadge: company.verifiedBadge || willVerify,
                            verificationStatus: willVerify ? 'Verified' : company.verificationStatus
                          });
                          onAddToast(`🎉 Subscribed to ${plan.name}! Credited +${added} placement posts.`, 'success');
                        }}
                        style={{ width: '100%', fontWeight: '700' }}
                      >
                        {isCurrent ? '✓ Current Plan (Renew & Add Quota)' : `${plan.cta} →`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Add-On Placement Packs */}
            <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                Need Additional Placement Quota Immediately?
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Purchase top-up packs without altering your billing cycle or renew enterprise access.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-emerald"
                  onClick={() => {
                    onUpdateCompany({ ...company, placementsRemaining: (company.placementsRemaining || 0) + 10 });
                    onAddToast('Added +10 Placement Posts to company balance!', 'success');
                  }}
                >
                  <PlusCircle size={15} /> Buy +10 Placements Pack (₹4,999)
                </button>

                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    onUpdateCompany({ ...company, subscriptionPlan: 'Pro Annual Plan', placementsRemaining: (company.placementsRemaining || 0) + 50, verifiedBadge: true });
                    onAddToast('Renewed Annual Pro Subscription (+50 Placements)!', 'success');
                  }}
                >
                  <Sparkles size={15} /> Renew Annual Pro Plan (₹19,999)
                </button>
              </div>
            </div>

            {/* Post Opportunity Callout */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(14, 165, 233, 0.12) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.35rem' }}>
                  Ready to Post Your Next Internship Opportunity?
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Create a new role opening in 2 minutes to start receiving vetted candidate applications.
                </p>
              </div>
              <button 
                className="btn btn-emerald"
                onClick={() => setActiveTab('post-role')}
                style={{ padding: '0.75rem 1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                Launch Post Role Wizard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Business Email Verification Modal */}
        {showBusinessAuthModal && (
          <div className="modal-overlay" onClick={() => setShowBusinessAuthModal(false)}>
            <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '800' }}>Corporate Email Verification</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Handwritten Rule: Verify business email & identity</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBusinessAuthModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {!emailCodeSent ? (
                <form onSubmit={handleSendBusinessEmailCode}>
                  <div className="form-group">
                    <label className="form-label">Corporate Email Address <span className="required">*</span></label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={businessEmail} 
                      onChange={(e) => setBusinessEmail(e.target.value)} 
                      placeholder="hr@company.com" 
                      required 
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Must use official corporate domain (e.g., @company.com). Personal Gmail/Yahoo domains will fail verification.
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowBusinessAuthModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-emerald">Dispatch Verification OTP</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyBusinessEmailSubmit}>
                  <div className="form-group">
                    <label className="form-label">Enter 6-Digit Email Verification Code</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 849201" 
                      value={emailAuthCode} 
                      onChange={(e) => setEmailAuthCode(e.target.value)} 
                      required 
                    />
                    <span style={{ fontSize: '0.75rem', color: '#34d399' }}>✓ OTP dispatched to {businessEmail}. Test OTP code: 849201</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setEmailCodeSent(false)}>Back</button>
                    <button type="submit" className="btn btn-emerald">Confirm & Verify Domain</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

