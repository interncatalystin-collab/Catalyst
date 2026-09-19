import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  Database, 
  BarChart3, 
  Edit, 
  Trash2, 
  UserCheck,
  CreditCard,
  MessageSquare,
  Search,
  Check,
  X,
  Lock,
  Key,
  Mail,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  Copy,
  Clock
} from 'lucide-react';

export default function AdminDashboard({ 
  students, 
  onUpdateStudents, 
  companies, 
  onUpdateCompanies, 
  internships, 
  onUpdateInternships, 
  applications, 
  onUpdateApplications,
  complaints, 
  onUpdateComplaints, 
  blogs, 
  faqs, 
  auditLogs, 
  onAddAuditLog,
  onAddToast,
  onLogout
}) {
  const [adminTab, setAdminTab] = useState('verifications'); // 'verifications', 'students', 'listings', 'applications', 'matcher', 'notifications', 'complaints', 'cms', 'analytics', 'audit'

  const handleSelectAndForwardCandidate = (appId) => {
    const targetApp = applications.find(a => a.id === appId);
    if (!targetApp) return;

    const updatedApps = applications.map(a => 
      a.id === appId 
        ? { ...a, forwardedToEmployer: true, adminSelectionStatus: 'Shortlisted & Forwarded to Employer', status: 'Shortlisted' } 
        : a
    );

    if (onUpdateApplications) {
      onUpdateApplications(updatedApps);
    }

    onAddAuditLog(
      'FORWARD_CANDIDATE_TO_EMPLOYER',
      `Admin manually selected candidate '${targetApp.studentName}' as Best Match and forwarded profile to employer '${targetApp.companyName}'.`
    );
    onAddToast(`Candidate '${targetApp.studentName}' selected & forwarded to ${targetApp.companyName} Employer Portal!`, 'success');
  };

  // Student Search
  const [studentSearch, setStudentSearch] = useState('');

  // Notification Composer State
  const [notifyTarget, setNotifyTarget] = useState('All Students');
  const [notifyType, setNotifyType] = useState('Email & SMS');
  const [notifySubject, setNotifySubject] = useState('');
  const [notifyBody, setNotifyBody] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Matcher Tool State
  const [selectedStudentForMatch, setSelectedStudentForMatch] = useState(students[0]?.id || '');
  const [matchResults, setMatchResults] = useState(null);

  // Filtered lists
  const pendingCompanies = companies.filter(c => c.verificationStatus === 'Pending' || !c.verifiedBadge);
  const pendingListings = internships.filter(i => i.status === 'Pending');
  const companiesPendingAccess = companies.filter(c => !c.accessGranted);

  // Company Dashboard Access Governance State
  const [accessModalCompany, setAccessModalCompany] = useState(null);
  const [companyAccessEmail, setCompanyAccessEmail] = useState('');
  const [companyAccessPassword, setCompanyAccessPassword] = useState('');
  const [showAccessPassword, setShowAccessPassword] = useState(false);
  const [autoNotifyCompany, setAutoNotifyCompany] = useState(true);
  const [accessError, setAccessError] = useState('');
  const [recentDispatchedNotice, setRecentDispatchedNotice] = useState(null);

  const generateStrongPassword = () => {
    const prefixes = ['Comp', 'Partner', 'Corp', 'Nexus', 'Prime', 'Catalyst'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(100 + Math.random() * 900);
    const specials = ['@', '#', '$', '!', '&', '*'];
    const special = specials[Math.floor(Math.random() * specials.length)];
    const suffixes = ['Alpha', 'Secure', 'Gate', 'Vault', 'Tech', 'Pro'];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}${num}${special}${suffix}`;
  };

  const validatePasswordStrength = (pass) => {
    if (!pass || pass.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must contain at least one capital letter (A-Z).';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      return 'Password must contain at least one special character (e.g. @, #, $, !).';
    }
    return null;
  };

  const handleOpenGrantAccessModal = (comp) => {
    setAccessModalCompany(comp);
    setCompanyAccessEmail(comp.businessEmail || `${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@company.com`);
    setCompanyAccessPassword(comp.loginPassword || generateStrongPassword());
    setShowAccessPassword(false);
    setAutoNotifyCompany(true);
    setAccessError('');
  };

  const handleGrantCompanyAccess = (e) => {
    e.preventDefault();
    if (!companyAccessEmail.trim() || !companyAccessEmail.includes('@')) {
      setAccessError('Please enter a valid corporate email address.');
      return;
    }
    const passError = validatePasswordStrength(companyAccessPassword);
    if (passError) {
      setAccessError(passError);
      return;
    }

    const updatedCompany = {
      ...accessModalCompany,
      accessGranted: true,
      businessEmail: companyAccessEmail.trim(),
      loginPassword: companyAccessPassword.trim(),
      connectionStatus: 'Connected - Access Active',
      accessGrantedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      accessGrantedBy: 'Admin (admin@interncatalyst.org)'
    };

    const updatedCompanies = companies.map(c => c.id === accessModalCompany.id ? updatedCompany : c);
    onUpdateCompanies(updatedCompanies);

    onAddAuditLog(
      'GRANT_COMPANY_ACCESS',
      `Admin granted Company Dashboard access to '${accessModalCompany.name}'. Login Email: '${companyAccessEmail.trim()}' with credentials issued.`
    );

    onAddToast(`🎉 Dashboard access granted to ${accessModalCompany.name}! Login email & password issued.`, 'success');

    setRecentDispatchedNotice({
      companyName: accessModalCompany.name,
      email: companyAccessEmail.trim(),
      password: companyAccessPassword.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });

    setAccessModalCompany(null);
  };

  const handleRevokeCompanyAccess = (companyId) => {
    const compObj = companies.find(c => c.id === companyId);
    if (!compObj) return;

    const updatedCompanies = companies.map(c => 
      c.id === companyId 
        ? { 
            ...c, 
            accessGranted: false, 
            connectionStatus: 'Connected - Pending Admin Access' 
          }
        : c
    );
    onUpdateCompanies(updatedCompanies);

    onAddAuditLog(
      'REVOKE_COMPANY_ACCESS',
      `Admin revoked Company Dashboard access for '${compObj.name}'. Company cannot log in until re-authorized.`
    );
    onAddToast(`🚫 Dashboard access revoked for ${compObj.name}.`, 'danger');
  };

  // Candidate Matcher Handler
  const handleRunMatcher = () => {
    const student = students.find(s => s.id === selectedStudentForMatch);
    if (!student) return;

    const matches = internships.map(job => {
      let score = 50;
      if (student.skills) {
        student.skills.forEach(sk => {
          if (job.skills.some(js => js.toLowerCase() === sk.toLowerCase())) score += 12;
        });
      }
      if (job.workMode === student.workModePreference) score += 10;
      return { ...job, matchScore: Math.min(score, 98) };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setMatchResults({ student, matches });
    onAddToast(`AI Student-Company Matcher executed for ${student.name}!`, 'success');
  };

  // Student Filter States
  const [collegeFilter, setCollegeFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  // Student Login Credential Governance State (Admin Exclusive)
  const [studentCredModal, setStudentCredModal] = useState(null);
  const [studentEditEmail, setStudentEditEmail] = useState('');
  const [studentEditPassword, setStudentEditPassword] = useState('');
  const [showStudentEditPassword, setShowStudentEditPassword] = useState(false);
  const [studentCredError, setStudentCredError] = useState('');
  const [studentRecentNotice, setStudentRecentNotice] = useState(null);

  const handleOpenStudentCredModal = (student) => {
    setStudentCredModal(student);
    setStudentEditEmail(student.email || '');
    setStudentEditPassword(student.password || 'StudentPass@2026');
    setShowStudentEditPassword(false);
    setStudentCredError('');
  };

  const handleSaveStudentCredentials = (e) => {
    e.preventDefault();
    if (!studentEditEmail.trim() || !studentEditEmail.includes('@')) {
      setStudentCredError('Please enter a valid student email address.');
      return;
    }
    const passError = validatePasswordStrength(studentEditPassword);
    if (passError) {
      setStudentCredError(passError);
      return;
    }

    const updatedStudents = students.map(s => 
      (s.id === studentCredModal.id || s._id === studentCredModal._id)
        ? { ...s, email: studentEditEmail.trim(), password: studentEditPassword.trim() }
        : s
    );

    onUpdateStudents(updatedStudents);

    onAddAuditLog(
      'ADMIN_CHANGE_STUDENT_CREDENTIALS',
      `Admin updated login credentials for student '${studentCredModal.fullName || studentCredModal.name}'. New Login Email: '${studentEditEmail.trim()}'.`
    );

    onAddToast(`🎉 Credentials updated for ${studentCredModal.fullName || studentCredModal.name}!`, 'success');

    setStudentRecentNotice({
      studentName: studentCredModal.fullName || studentCredModal.name,
      email: studentEditEmail.trim(),
      password: studentEditPassword.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });

    setStudentCredModal(null);
  };

  const filteredStudents = students.filter(s => {
    const name = s.fullName || s.name || '';
    const email = s.email || '';
    const phone = s.phone || '';
    const college = s.collegeName || s.institution || '';
    const branch = s.branch || s.degree || '';
    const domain = s.preferredDomain || s.domain || '';

    const searchMatch = !studentSearch || 
      name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      phone.includes(studentSearch);

    const collegeMatch = !collegeFilter || college.toLowerCase().includes(collegeFilter.toLowerCase());
    const branchMatch = !branchFilter || branch.toLowerCase().includes(branchFilter.toLowerCase());
    const domainMatch = !domainFilter || domain.toLowerCase().includes(domainFilter.toLowerCase());

    return searchMatch && collegeMatch && branchMatch && domainMatch;
  });

  // Excel Data Exporter Handler
  const handleExportExcel = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/students/export', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate Excel file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `InternCatalyst_Students_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      onAddToast('🎉 Student Data Excel Report (.xlsx) downloaded successfully!', 'success');
    } catch (err) {
      handleExportDataCSV();
    }
  };

  // CSV Data Exporter Handler (Fallback)
  const handleExportDataCSV = () => {
    const csvHeader = "ID,Student_Name,Email,Phone,Institution,Degree,Status\n";
    const csvRows = students.map(s => `"${s.id || s._id}","${s.fullName || s.name}","${s.email}","${s.phone}","${s.collegeName || s.institution}","${s.degree}","${s.status || 'Active'}"`).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InternCatalyst_Student_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    onAddToast('Student Data exported to CSV file!', 'success');
  };

  // Verification Badge Grant Handler
  const handleToggleCompanyVerification = (companyId, newStatus) => {
    const updated = companies.map(c => {
      if (c.id === companyId) {
        return { 
          ...c, 
          verifiedBadge: newStatus === 'Verified', 
          verificationStatus: newStatus 
        };
      }
      return c;
    });
    onUpdateCompanies(updated);
    const compObj = companies.find(c => c.id === companyId);
    onAddAuditLog(
      newStatus === 'Verified' ? 'VERIFY_EMPLOYER_BADGE' : 'REVOKE_VERIFICATION',
      `Admin updated verification badge for company '${compObj?.name}' to '${newStatus}'.`
    );
    onAddToast(`Verification badge status for ${compObj?.name} updated to ${newStatus}.`, 'success');
  };

  // Listing Approval Handler
  const handleListingStatusChange = (listingId, newStatus) => {
    const updated = internships.map(i => i.id === listingId ? { ...i, status: newStatus } : i);
    onUpdateInternships(updated);
    const item = internships.find(i => i.id === listingId);
    onAddAuditLog(
      newStatus === 'Approved' ? 'APPROVE_LISTING' : 'REJECT_LISTING',
      `Admin set listing '${item?.title}' status to '${newStatus}'.`
    );
    onAddToast(`Internship listing '${item?.title}' set to ${newStatus}.`, 'success');
  };

  // Send Broadcast SMS/Email
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSent(true);
    onAddAuditLog(
      'SEND_SYSTEM_NOTIFICATION',
      `Admin dispatched broadcast ${notifyType} to ${notifyTarget}: '${notifySubject}'`
    );
    onAddToast(`Broadcast notification dispatched to ${notifyTarget}!`, 'success');
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Header with Security & RBAC Standard Banner */}
        <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '4px solid #2563eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={24} style={{ color: '#2563eb' }} />
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>
                  InternCatalyst Central Admin Panel
                </h1>
                <span className="badge badge-pill" style={{ borderColor: '#2563eb', color: '#2563eb' }}>
                  <Lock size={12} /> RBAC Enforcement Active
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Role-Based Access Control: Administrators, staff, employers, and students see only relevant data permissions.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-emerald btn-sm" onClick={handleExportDataCSV}>
                <Download size={15} /> Export Analytics Data CSV
              </button>
              {onLogout && (
                <button className="btn btn-secondary btn-sm" onClick={onLogout} style={{ borderColor: '#fca5a5', color: '#dc2626' }}>
                  <Lock size={14} /> Lock / Log Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs Grid */}
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
            onClick={() => setAdminTab('verifications')}
            style={{
              background: adminTab === 'verifications' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'verifications' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Building2 size={14} /> Connected Companies & Access ({companiesPendingAccess.length} Pending)
          </button>

          <button 
            onClick={() => setAdminTab('listings')}
            style={{
              background: adminTab === 'listings' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'listings' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <FileText size={14} /> Listing Moderation ({pendingListings.length})
          </button>

          <button 
            onClick={() => setAdminTab('students')}
            style={{
              background: adminTab === 'students' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'students' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Users size={14} /> 🎓 Store 1: Registered Student Profiles ({students.length})
          </button>

          <button 
            onClick={() => setAdminTab('applications')}
            style={{
              background: adminTab === 'applications' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'applications' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <UserCheck size={14} /> 💼 Store 2: Applied Internships Store ({applications.length})
          </button>

          <button 
            onClick={() => setAdminTab('subscriptions')}
            style={{
              background: adminTab === 'subscriptions' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'subscriptions' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <CreditCard size={14} /> Payments & Subscriptions
          </button>

          <button 
            onClick={() => setAdminTab('matcher')}
            style={{
              background: adminTab === 'matcher' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'matcher' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Sparkles size={14} /> Candidate Matcher Engine
          </button>

          <button 
            onClick={() => setAdminTab('notifications')}
            style={{
              background: adminTab === 'notifications' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'notifications' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Send size={14} /> Email / SMS Broadcaster
          </button>

          <button 
            onClick={() => setAdminTab('complaints')}
            style={{
              background: adminTab === 'complaints' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'complaints' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <AlertTriangle size={14} /> Flagged Complaints ({complaints.length})
          </button>

          <button 
            onClick={() => setAdminTab('cms')}
            style={{
              background: adminTab === 'cms' ? 'var(--primary)' : '#f1f5f9',
              border: 'none',
              color: adminTab === 'cms' ? '#fff' : 'var(--text-dim)',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <MessageSquare size={14} /> CMS & Content Governance
          </button>

          <button 
            onClick={() => setAdminTab('analytics')}
            style={{
              background: adminTab === 'analytics' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#fff',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <BarChart3 size={14} /> Placement Analytics & Export
          </button>

          <button 
            onClick={() => setAdminTab('audit')}
            style={{
              background: adminTab === 'audit' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#fff',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Database size={14} /> Audit Logs Feed
          </button>
        </div>

        {/* Tab 1: Connected Companies & Dashboard Access Governance */}
        {adminTab === 'verifications' && (
          <div>
            {/* Header Card */}
            <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
                        Connected Companies & Dashboard Access Governance
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0' }}>
                        Admin must give access to company with email and password after connecting to our website.
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.35rem 0.75rem', fontWeight: '700' }}>
                    <Lock size={13} /> Strict Access Protocol
                  </span>
                </div>
              </div>

              {/* Access Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Connected to Site</span>
                    <Building2 size={16} style={{ color: '#2563eb' }} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>
                    {companies.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Total registered partners
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: '600' }}>Access Granted</span>
                    <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#15803d', marginTop: '0.25rem' }}>
                    {companies.filter(c => c.accessGranted).length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '2px' }}>
                    Authorized with Email & Password
                  </div>
                </div>

                <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: '600' }}>Pending Admin Access</span>
                    <Clock size={16} style={{ color: '#d97706' }} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#b45309', marginTop: '0.25rem' }}>
                    {companiesPendingAccess.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '2px' }}>
                    Requires Admin action
                  </div>
                </div>

                <div style={{ background: '#fdf4ff', padding: '1rem', borderRadius: '10px', border: '1px solid #f5d0fe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#86198f', fontWeight: '600' }}>Verified Badges</span>
                    <ShieldCheck size={16} style={{ color: '#a21caf' }} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#86198f', marginTop: '0.25rem' }}>
                    {companies.filter(c => c.verifiedBadge).length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#a21caf', marginTop: '2px' }}>
                    GST / Legal audit verified
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Dispatched Credentials Alert Notice */}
            {recentDispatchedNotice && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                    <CheckCircle size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#166534', fontSize: '1rem' }}>
                      ✓ Dashboard Access Credentials Issued & Dispatched!
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#15803d', marginTop: '3px' }}>
                      Company: <strong>{recentDispatchedNotice.companyName}</strong> | Login Email: <strong>{recentDispatchedNotice.email}</strong> | Password: <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{recentDispatchedNotice.password}</code> (Dispatched at {recentDispatchedNotice.time})
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`InternCatalyst Company Dashboard Access\nEmail: ${recentDispatchedNotice.email}\nPassword: ${recentDispatchedNotice.password}`);
                      onAddToast('Credentials copied to clipboard!', 'info');
                    }}
                    style={{ borderColor: '#86efac', color: '#166534' }}
                  >
                    <Copy size={13} /> Copy Credentials
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setRecentDispatchedNotice(null)}
                    style={{ borderColor: '#86efac', color: '#166534' }}
                  >
                    <X size={13} /> Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Companies Access Management Table */}
            <div className="glass-card">
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Connected Company</th>
                      <th>Website & Contact</th>
                      <th>Dashboard Access Status</th>
                      <th>Corporate Login Credentials</th>
                      <th>Verification Badge</th>
                      <th>Admin Access Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img 
                              src={c.logo} 
                              alt={c.name}
                              style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', background: '#fff', border: '1px solid #e2e8f0' }}
                            />
                            <div>
                              <strong style={{ color: '#0f172a', fontSize: '0.925rem', display: 'block' }}>{c.name}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {c.industry} • {c.location}
                              </span>
                              <div style={{ marginTop: '2px' }}>
                                <span className="badge" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.675rem', padding: '1px 6px' }}>
                                  Connected to website
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a 
                              href={c.website} 
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
                            >
                              {c.website?.replace('https://', '')}
                            </a>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                              {c.contactPerson} ({c.phone})
                            </div>
                          </div>
                        </td>
                        <td>
                          {c.accessGranted ? (
                            <div>
                              <span className="badge" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                                <CheckCircle size={12} /> Access Granted ✓
                              </span>
                              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                                Authorized by: {c.accessGrantedBy || 'Central Admin'}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="badge" style={{ background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
                                <Clock size={12} /> Pending Admin Access ⏳
                              </span>
                              <div style={{ fontSize: '0.725rem', color: '#dc2626', marginTop: '3px', fontWeight: '600' }}>
                                Blocked until Admin sets credentials
                              </div>
                            </div>
                          )}
                        </td>
                        <td>
                          {c.accessGranted ? (
                            <div>
                              <div style={{ fontSize: '0.825rem', fontWeight: '700', color: '#0f172a' }}>
                                {c.businessEmail}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                                <Key size={12} style={{ color: '#2563eb' }} />
                                <span style={{ fontFamily: 'monospace', fontWeight: '700', letterSpacing: '0.5px' }}>
                                  {c.loginPassword || '••••••••'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              Not set (Cannot log in)
                            </div>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <span className={`badge ${c.verifiedBadge ? 'badge-verified' : 'badge-pending'}`} style={{ width: 'fit-content' }}>
                              {c.verifiedBadge ? 'Verified Badge ✓' : 'Unverified / Pending'}
                            </span>
                            {!c.verifiedBadge ? (
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleToggleCompanyVerification(c.id, 'Verified')}
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', width: 'fit-content' }}
                              >
                                <Check size={11} /> Grant Badge
                              </button>
                            ) : (
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleToggleCompanyVerification(c.id, 'Pending')}
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', width: 'fit-content', color: '#dc2626' }}
                              >
                                <X size={11} /> Revoke
                              </button>
                            )}
                          </div>
                        </td>
                        <td>
                          {!c.accessGranted ? (
                            <button 
                              className="btn btn-emerald btn-sm"
                              onClick={() => handleOpenGrantAccessModal(c)}
                              style={{ fontWeight: '700', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                            >
                              <Key size={13} /> Give Access (Email & Pass)
                            </button>
                          ) : (
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenGrantAccessModal(c)}
                                title="Edit Email & Password"
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                              >
                                <Edit size={12} /> Edit
                              </button>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRevokeCompanyAccess(c.id)}
                                title="Revoke Dashboard Access"
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                              >
                                <X size={12} /> Revoke
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grant / Edit Access Modal */}
            {accessModalCompany && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '1rem'
              }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  maxWidth: '540px',
                  width: '100%',
                  padding: '2rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid #e2e8f0',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Key size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {accessModalCompany.accessGranted ? 'Edit Company Access Credentials' : 'Give Company Dashboard Access'}
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          Admin authorizes company with corporate email and password.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAccessModalCompany(null)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Connected Company:</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
                      <Building2 size={16} style={{ color: '#2563eb' }} /> {accessModalCompany.name}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      Contact: {accessModalCompany.contactPerson} • {accessModalCompany.phone} • {accessModalCompany.location}
                    </div>
                  </div>

                  {accessError && (
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.825rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={16} /> {accessError}
                    </div>
                  )}

                  <form onSubmit={handleGrantCompanyAccess}>
                    {/* Corporate Email Input */}
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>
                        Authorized Corporate Login Email <span className="required">*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                        <input 
                          type="email"
                          className="form-input"
                          style={{ paddingLeft: '2.5rem' }}
                          value={companyAccessEmail}
                          onChange={(e) => setCompanyAccessEmail(e.target.value)}
                          placeholder="e.g. hr@company.io"
                          required
                        />
                      </div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '3px', display: 'block' }}>
                        The company will log into the Company Dashboard using this email address.
                      </span>
                    </div>

                    {/* Password Input */}
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700', margin: 0 }}>
                          Company Dashboard Password <span className="required">*</span>
                        </label>
                        <button 
                          type="button"
                          onClick={() => setCompanyAccessPassword(generateStrongPassword())}
                          style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <RefreshCw size={12} /> Auto-Generate Strong Password
                        </button>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Key size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                        <input 
                          type={showAccessPassword ? 'text' : 'password'}
                          className="form-input"
                          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', fontFamily: showAccessPassword ? 'inherit' : 'monospace' }}
                          value={companyAccessPassword}
                          onChange={(e) => setCompanyAccessPassword(e.target.value)}
                          placeholder="Assign strong corporate password"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowAccessPassword(!showAccessPassword)}
                          style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                        >
                          {showAccessPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Rule: Minimum 8 characters with at least 1 capital letter and 1 special character (!@#$%&*).
                      </div>
                    </div>

                    {/* Auto Notify Checkbox */}
                    <div style={{ marginBottom: '1.5rem', background: '#eff6ff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#1e40af', cursor: 'pointer', fontWeight: '600' }}>
                        <input 
                          type="checkbox" 
                          checked={autoNotifyCompany} 
                          onChange={(e) => setAutoNotifyCompany(e.target.checked)} 
                          style={{ accentColor: '#2563eb' }} 
                        />
                        Dispatch access activation credentials automatically to corporate email
                      </label>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setAccessModalCompany(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="btn btn-emerald"
                        style={{ fontWeight: '800' }}
                      >
                        <Key size={15} /> {accessModalCompany.accessGranted ? 'Save & Update Credentials' : 'Give Access & Dispatch Credentials'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Listing Moderation */}
        {adminTab === 'listings' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Internship Listing Moderation Queue
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Instruction: Approve (or) reject internship listings before they appear in public search.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Internship Title</th>
                    <th>Company</th>
                    <th>Work Mode</th>
                    <th>Stipend</th>
                    <th>Supervisor Info</th>
                    <th>Status</th>
                    <th>Moderation Action</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map(job => (
                    <tr key={job.id}>
                      <td><strong style={{ color: '#fff' }}>{job.title}</strong></td>
                      <td>{job.companyName}</td>
                      <td>{job.workMode}</td>
                      <td style={{ color: '#10b981' }}>{job.stipendAmount}</td>
                      <td>{job.supervisorName} ({job.supervisorPhone})</td>
                      <td>
                        <span className={`badge ${job.status === 'Approved' ? 'badge-verified' : job.status === 'Pending' ? 'badge-pending' : 'badge-danger'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {job.status !== 'Approved' && (
                            <button 
                              className="btn btn-emerald btn-sm"
                              onClick={() => handleListingStatusChange(job.id, 'Approved')}
                            >
                              Approve Listing
                            </button>
                          )}
                          {job.status !== 'Rejected' && (
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleListingStatusChange(job.id, 'Rejected')}
                            >
                              Reject Listing
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Student Management */}
        {adminTab === 'students' && (
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎓 STORE 1: Registered Student Profiles Database
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Separate central repository storing all registered student account profiles, college details, technical domain preferences, and ATS resume URLs.
                </p>
              </div>

              <button className="btn btn-emerald" onClick={handleExportExcel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                <Download size={16} /> Download Student Data (Excel)
              </button>
            </div>

            {/* Filters Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <label style={{ fontSize: '0.775rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>Search Name / Email / Phone</label>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '2rem', fontSize: '0.825rem', height: '38px' }}
                    placeholder="Search name, email..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>Filter by College</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.825rem', height: '38px' }}
                  placeholder="e.g. AIET / IIT"
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>Filter by Branch</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.825rem', height: '38px' }}
                  placeholder="e.g. Computer Science"
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: '700' }}>Filter by Preferred Domain</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.825rem', height: '38px' }}
                  placeholder="e.g. Web Development"
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                />
              </div>
            </div>

            {/* Student Credentials Updated Alert Banner */}
            {studentRecentNotice && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                    <CheckCircle size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#166534', fontSize: '1rem' }}>
                      ✓ Student Login Credentials Updated by Admin!
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#15803d', marginTop: '3px' }}>
                      Student: <strong>{studentRecentNotice.studentName}</strong> | Login Email: <strong>{studentRecentNotice.email}</strong> | Password: <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>{studentRecentNotice.password}</code>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`InternCatalyst Student Credentials\nEmail: ${studentRecentNotice.email}\nPassword: ${studentRecentNotice.password}`);
                      onAddToast('Student credentials copied to clipboard!', 'info');
                    }}
                    style={{ borderColor: '#86efac', color: '#166534' }}
                  >
                    <Copy size={13} /> Copy Credentials
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setStudentRecentNotice(null)}
                    style={{ borderColor: '#86efac', color: '#166534' }}
                  >
                    <X size={13} /> Dismiss
                  </button>
                </div>
              </div>
            )}

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Branch</th>
                    <th>Preferred Domain</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No student records found matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(s => (
                      <tr key={s.id || s._id}>
                        <td><strong style={{ color: '#fff' }}>{s.fullName || s.name}</strong></td>
                        <td>{s.email}</td>
                        <td>{s.collegeName || s.institution || 'N/A'}</td>
                        <td>{s.branch || s.degree || 'N/A'}</td>
                        <td>
                          <span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.825rem' }}>
                            {s.preferredDomain || s.domain || 'Software Development'}
                          </span>
                        </td>
                        <td>{s.createdAt ? new Date(s.createdAt).toISOString().split('T')[0] : '2026-08-20'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <button 
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => setSelectedStudentForDetail(s)}
                            >
                              View Details
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', borderColor: '#bfdbfe', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '3px' }}
                              onClick={() => handleOpenStudentCredModal(s)}
                              title="Admin: Change student password and email"
                            >
                              <Key size={12} /> Edit Login (Email & Pass)
                            </button>
                            <button 
                              className={`btn ${s.status === 'Suspended' ? 'btn-emerald' : 'btn-danger'} btn-sm`}
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => {
                                const newSt = s.status === 'Suspended' ? 'Active' : 'Suspended';
                                const updated = students.map(st => (st.id === s.id || st._id === s._id) ? { ...st, status: newSt } : st);
                                onUpdateStudents(updated);
                                onAddAuditLog('UPDATE_STUDENT_STATUS', `Admin updated status for student '${s.fullName || s.name}' to '${newSt}'.`);
                                onAddToast(`Student ${s.fullName || s.name} account set to ${newSt}.`, 'info');
                              }}
                            >
                              {s.status === 'Suspended' ? 'Activate' : 'Suspend'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Admin Edit Student Credentials Modal */}
            {studentCredModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '1rem'
              }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  maxWidth: '520px',
                  width: '100%',
                  padding: '2rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid #e2e8f0',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Key size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          Edit Student Login Credentials
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          Admin exclusive authority to change student login email and password.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStudentCredModal(null)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Student Candidate:</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
                      <Users size={16} style={{ color: '#2563eb' }} /> {studentCredModal.fullName || studentCredModal.name}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      College: {studentCredModal.collegeName || studentCredModal.institution || 'N/A'} • Branch: {studentCredModal.branch || studentCredModal.degree || 'N/A'}
                    </div>
                  </div>

                  {studentCredError && (
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.825rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={16} /> {studentCredError}
                    </div>
                  )}

                  <form onSubmit={handleSaveStudentCredentials}>
                    {/* Student Login Email */}
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>
                        Student Login Email Address <span className="required">*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                        <input 
                          type="email"
                          className="form-input"
                          style={{ paddingLeft: '2.5rem' }}
                          value={studentEditEmail}
                          onChange={(e) => setStudentEditEmail(e.target.value)}
                          placeholder="e.g. student@college.edu"
                          required
                        />
                      </div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '3px', display: 'block' }}>
                        The student will use this new email address to authenticate into the Student Portal.
                      </span>
                    </div>

                    {/* Student Password */}
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700', margin: 0 }}>
                          New Student Password <span className="required">*</span>
                        </label>
                        <button 
                          type="button"
                          onClick={() => setStudentEditPassword(generateStrongPassword())}
                          style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <RefreshCw size={12} /> Auto-Generate Password
                        </button>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Key size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                        <input 
                          type={showStudentEditPassword ? 'text' : 'password'}
                          className="form-input"
                          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', fontFamily: showStudentEditPassword ? 'inherit' : 'monospace' }}
                          value={studentEditPassword}
                          onChange={(e) => setStudentEditPassword(e.target.value)}
                          placeholder="Assign strong candidate password"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowStudentEditPassword(!showStudentEditPassword)}
                          style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                        >
                          {showStudentEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Rule: Minimum 8 characters with at least 1 capital letter and 1 special character (!@#$%&*).
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', background: '#eff6ff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '0.8rem', color: '#1e40af' }}>
                      🔒 <strong>Administrative Notice:</strong> Changes take effect immediately. The student's dashboard session and credentials will synchronize with this new email and password.
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStudentCredModal(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="btn btn-primary"
                        style={{ fontWeight: '800' }}
                      >
                        <Key size={15} /> Save & Update Credentials
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: View All Applications & Candidate Vetting Queue */}
        {adminTab === 'applications' && (
          <div className="glass-card">
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
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
                <ShieldCheck size={22} style={{ color: '#34d399' }} />
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#6ee7b7', display: 'block' }}>
                    🔒 Exclusive Central Admin Access: Applied Student Profiles Portal
                  </strong>
                  <span style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                    Only Central Admin accounts can view complete applied student profiles, contact details, ATS resumes, and payment verifications.
                  </span>
                </div>
              </div>
              <span className="badge badge-verified" style={{ background: '#10b981', color: '#ffffff' }}>
                Admin Privileged Access
              </span>
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💼 STORE 2: Applied Internships & Candidate Vetting Queue Database
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Separate repository storing internship applications submitted by students for specific job listings, with ₹100 payment verification, ATS match score, 3-stage lifecycle badges, and Admin forwarding actions.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Workflow: All incoming student applications & stored resumes are queued here. Admin reviews qualifications, resume, and ATS match, then selects the top candidates to forward to the employer portal for vacant seat hiring.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate Name & Contact</th>
                    <th>Academic Background & Resume</th>
                    <th>Target Role & Stipend</th>
                    <th>Employer Company</th>
                    <th>ATS Match</th>
                    <th>Admin Selection Status</th>
                    <th>Admin Forwarding Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>
                        <strong style={{ color: '#fff', display: 'block' }}>{app.studentName}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {app.studentEmail} • {app.studentPhone}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'block', fontWeight: '600' }}>
                          {app.studentCollege || 'IIT Bombay'}
                        </span>
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem', display: 'block' }}>
                          {app.studentDegree || 'B.Tech CS'} • {app.studentYear || '3rd Year'}
                        </span>
                        <div style={{ marginTop: '3px', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <a 
                            href={app.resumeUrl || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => { e.preventDefault(); alert(`Viewing Candidate Resume: ${app.resumeName || 'Student_ATS_Resume.pdf'}\n\nCollege: ${app.studentCollege}\nCourse: ${app.studentDegree}\nYear: ${app.studentYear}\nLinkedIn: ${app.linkedinUrl || 'https://linkedin.com/in/aditya-verma-dev'}\nGitHub: ${app.githubUrl || 'https://github.com/adityaverma'}\nPayment: ₹100 Verified (${app.txnId || 'TXN_UPI_100_892104'})`); }}
                            style={{ color: '#38bdf8', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: '600' }}
                          >
                            <FileText size={12} /> 📄 {app.resumeName || 'Student_ATS_Resume.pdf'}
                          </a>
                          <a href={app.linkedinUrl || 'https://linkedin.com/in/aditya-verma-dev'} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', fontSize: '0.72rem', fontWeight: '700', textDecoration: 'underline' }}>
                            LinkedIn 🔗
                          </a>
                          <a href={app.githubUrl || 'https://github.com/adityaverma'} target="_blank" rel="noreferrer" style={{ color: '#c084fc', fontSize: '0.72rem', fontWeight: '700', textDecoration: 'underline' }}>
                            GitHub 💻
                          </a>
                          <span style={{ fontSize: '0.7rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.1)', padding: '1px 6px', borderRadius: '4px', border: '1px solid #16a34a', fontWeight: '600' }}>
                            ₹100 Paid ✓
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong style={{ color: '#f8fafc' }}>{app.internshipTitle}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>
                          {app.stipend} ({app.workMode})
                        </span>
                      </td>
                      <td>
                        {app.companyName} {app.verifiedCompany && <span style={{ color: '#10b981' }}>✓</span>}
                      </td>
                      <td>
                        <span className="badge badge-pill" style={{ color: '#38bdf8', borderColor: '#0284c7' }}>
                          {app.matchScore || 94}% Match
                        </span>
                      </td>
                      <td>
                        {app.status === 'Selected' || app.status === 'Hired' ? (
                          <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff', fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                            ✅ Stage 3: Employer Hired Candidate
                          </span>
                        ) : app.status === 'Rejected' ? (
                          <span className="badge badge-danger">❌ Rejected by Employer</span>
                        ) : app.forwardedToEmployer ? (
                          <span className="badge badge-verified" style={{ background: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', fontSize: '0.825rem' }}>
                            📤 Stage 2: Sent to Employer Portal
                          </span>
                        ) : (
                          <span className="badge badge-pending" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', borderColor: '#f59e0b' }}>
                            📥 Stage 1: Stored in Central Admin Queue
                          </span>
                        )}
                      </td>
                      <td>
                        {app.status === 'Selected' || app.status === 'Hired' ? (
                          <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <UserCheck size={15} /> Final Selection Returned from {app.companyName} ✓
                          </span>
                        ) : app.status === 'Rejected' ? (
                          <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '600' }}>
                            Employer Rejection Returned
                          </span>
                        ) : app.forwardedToEmployer ? (
                          <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Check size={15} /> Awaiting Recruiter Hiring Selection
                          </span>
                        ) : (
                          <button 
                            className="btn btn-emerald btn-sm"
                            onClick={() => handleSelectAndForwardCandidate(app.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
                          >
                            <Send size={13} /> Select Top Student & Send to Employer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Manage Payments & Subscriptions */}
        {adminTab === 'subscriptions' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Manage Employer Payments & Subscriptions
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Requirement: Track corporate subscriptions, placement quotas, and payment processing.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Business Email</th>
                    <th>Active Plan</th>
                    <th>Placements Remaining</th>
                    <th>Joined Date</th>
                    <th>Payment Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(c => (
                    <tr key={c.id}>
                      <td><strong style={{ color: '#fff' }}>{c.name}</strong></td>
                      <td>{c.businessEmail}</td>
                      <td><span className="badge badge-pill" style={{ color: '#38bdf8' }}>{c.subscriptionPlan}</span></td>
                      <td style={{ color: '#10b981', fontWeight: '700' }}>{c.placementsRemaining} Posts Left</td>
                      <td>{c.joinedDate}</td>
                      <td>
                        <button 
                          className="btn btn-emerald btn-sm"
                          onClick={() => {
                            const updated = companies.map(comp => comp.id === c.id ? { ...comp, placementsRemaining: comp.placementsRemaining + 10 } : comp);
                            onUpdateCompanies(updated);
                            onAddAuditLog('CREDIT_PLACEMENTS', `Admin manually credited +10 placements to ${c.name}.`);
                            onAddToast(`Credited +10 placement posts to ${c.name}!`, 'success');
                          }}
                        >
                          Credit +10 Placements
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: AI Candidate-Company Matcher */}
        {adminTab === 'matcher' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} style={{ color: '#818cf8' }} /> Match Students to Company Requirements
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Instruction: Match students to company requirements using skill overlap, location, and work mode preferences.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Select Student Candidate</label>
                <select 
                  className="form-select"
                  value={selectedStudentForMatch}
                  onChange={(e) => setSelectedStudentForMatch(e.target.value)}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id} style={{ background: '#0f172a' }}>
                      {s.name} — {s.degree} ({s.skills?.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn btn-primary" onClick={handleRunMatcher} style={{ marginTop: '1.5rem' }}>
                Run AI Matcher Engine
              </button>
            </div>

            {matchResults && (
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-highlight)' }}>
                <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Best Internship Matches for <strong>{matchResults.student.name}</strong>
                </h4>

                <div className="grid-2">
                  {matchResults.matches.map(m => (
                    <div key={m.id} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#fff' }}>{m.title}</strong>
                        <span className="badge badge-verified">{m.matchScore}% Match</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Company: {m.companyName} | Stipend: {m.stipendAmount} | Mode: {m.workMode}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#818cf8', marginTop: '0.4rem' }}>
                        Matching Skills: {m.skills.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Email/SMS Broadcaster */}
        {adminTab === 'notifications' && (
          <div className="glass-card" style={{ maxWidth: '650px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Send Email or SMS Notifications
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Instruction: Send email (or) SMS notifications to candidates or employer groups.
            </p>

            <form onSubmit={handleSendBroadcast}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Target Audience</label>
                  <select className="form-select" value={notifyTarget} onChange={(e) => setNotifyTarget(e.target.value)}>
                    <option value="All Students">All Registered Students</option>
                    <option value="Verified Employers">Verified Employers</option>
                    <option value="College TPO Partners">College TPO Partners</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Dispatch Channel</label>
                  <select className="form-select" value={notifyType} onChange={(e) => setNotifyType(e.target.value)}>
                    <option value="Email & SMS">Email & SMS Broadcast</option>
                    <option value="Email Only">Email Only</option>
                    <option value="SMS Only">SMS Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Notification Headline <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Urgent Campus Placement Drive Announcement"
                  value={notifySubject}
                  onChange={(e) => setNotifySubject(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message Body</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  placeholder="Compose notification message..."
                  value={notifyBody}
                  onChange={(e) => setNotifyBody(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Dispatch Broadcast Notification <Send size={15} />
              </button>
            </form>
          </div>
        )}

        {/* Tab 6: Flagged Complaints */}
        {adminTab === 'complaints' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Handle Complaints & Suspicious Listings
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Instruction: Handle complaints and suspicious listings reported by candidates or security audit scans.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Reporter</th>
                    <th>Target Listing / Account</th>
                    <th>Reported Reason</th>
                    <th>Date Reported</th>
                    <th>Status</th>
                    <th>Resolution Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(cmp => (
                    <tr key={cmp.id}>
                      <td>{cmp.reporterName} ({cmp.reporterEmail})</td>
                      <td><strong style={{ color: '#fff' }}>{cmp.targetTitle}</strong></td>
                      <td style={{ color: '#fca5a5' }}>{cmp.reason}</td>
                      <td>{cmp.dateReported}</td>
                      <td>
                        <span className={`badge ${cmp.status === 'Resolved' ? 'badge-verified' : 'badge-pending'}`}>
                          {cmp.status}
                        </span>
                      </td>
                      <td>
                        {cmp.status !== 'Resolved' && (
                          <button 
                            className="btn btn-emerald btn-sm"
                            onClick={() => {
                              const updated = complaints.map(c => c.id === cmp.id ? { ...c, status: 'Resolved' } : c);
                              onUpdateComplaints(updated);
                              onAddAuditLog('RESOLVE_COMPLAINT', `Admin resolved complaint '${cmp.id}' for target '${cmp.targetTitle}'.`);
                              onAddToast(`Complaint resolved and suspicious item removed.`, 'success');
                            }}
                          >
                            Mark Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: CMS & Content Governance */}
        {adminTab === 'cms' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Manage Blogs, FAQs, Testimonials & Homepage Content
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Requirement: Governance controls for editorial guides, FAQs, student success testimonials, and homepage banners.
            </p>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Active Career Resource Guides ({blogs.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {blogs.map(b => (
                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                      <span><strong>{b.title}</strong> ({b.category})</span>
                      <span className="badge badge-verified">Published</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Frequently Asked Questions ({faqs.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {faqs.map((f, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                      <strong style={{ color: '#818cf8' }}>Q: {f.question}</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: View Analytics & Export Data */}
        {adminTab === 'analytics' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700' }}>
                  Placement Analytics & NAAC / NIRF Data Exporter
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                  Handwritten Requirement: Real-time ecosystem metrics and CSV export functionality for audits.
                </p>
              </div>
              <button className="btn btn-emerald" onClick={handleExportDataCSV}>
                <Download size={16} /> Export Student Placements CSV
              </button>
            </div>

            <div className="grid-4" style={{ marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#818cf8', display: 'block' }}>{students.length}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Enrolled Students</span>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399', display: 'block' }}>{companies.length}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Corporate Partners</span>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8', display: 'block' }}>{internships.length}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Listings</span>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbf24', display: 'block' }}>96.8%</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Placement Success Rate</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Security Audit Logs */}
        {adminTab === 'audit' && (
          <div className="glass-card">
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Database size={20} style={{ color: '#818cf8' }} /> Maintain Immutable System Audit Logs
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Handwritten Instruction: Maintain audit logs showing important account (or) listing changes, verification badge updates, and admin permissions.
            </p>

            {/* Triple Star Security Rule Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: '#a5b4fc'
            }}>
              <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block', marginBottom: '0.3rem' }}>
                *** Triple Star Security & Technical Standard Compliance:
              </strong>
              Use role-based access (RBAC) so that students, employers, staff, and administrators see only relevant information. Platform technical features include responsive UI, secure authentication, role-based access control, data encryption, audit logs, and SMS/email notifications.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {auditLogs.map(log => (
                <div key={log.id} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#818cf8', fontSize: '0.8rem', fontWeight: '700' }}>
                    <span>{log.action} • Action by {log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p style={{ color: '#fff', fontSize: '0.875rem', marginTop: '0.3rem' }}>
                    {log.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Detail Modal */}
        {selectedStudentForDetail && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              color: '#0f172a',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎓 Student Profile Details
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedStudentForDetail(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={18} style={{ color: '#64748b' }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Personal Info */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.65rem' }}>Personal Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div><strong>Full Name:</strong> {selectedStudentForDetail.fullName || selectedStudentForDetail.name || 'N/A'}</div>
                    <div><strong>Email:</strong> {selectedStudentForDetail.email || 'N/A'}</div>
                    <div><strong>Phone:</strong> {selectedStudentForDetail.phone || 'N/A'}</div>
                    <div><strong>Date of Birth:</strong> {selectedStudentForDetail.dateOfBirth || 'N/A'}</div>
                    <div><strong>Gender:</strong> {selectedStudentForDetail.gender || 'N/A'}</div>
                    <div><strong>Role:</strong> {selectedStudentForDetail.role || 'student'}</div>
                  </div>
                </div>

                {/* Academic Info */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.65rem' }}>Academic Background</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div><strong>College / University:</strong> {selectedStudentForDetail.collegeName || selectedStudentForDetail.institution || 'N/A'}</div>
                    <div><strong>Degree:</strong> {selectedStudentForDetail.degree || 'N/A'}</div>
                    <div><strong>Branch / Specialization:</strong> {selectedStudentForDetail.branch || 'N/A'}</div>
                    <div><strong>Current Year / Semester:</strong> {selectedStudentForDetail.currentYearOrSemester || selectedStudentForDetail.yearOfStudy || 'N/A'}</div>
                    <div><strong>CGPA / Percentage:</strong> {selectedStudentForDetail.cgpaOrPercentage || selectedStudentForDetail.cgpa || 'N/A'}</div>
                    <div><strong>Graduation Year:</strong> {selectedStudentForDetail.graduationYear || '2026'}</div>
                  </div>
                </div>

                {/* Professional Info */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.65rem' }}>Professional Profile & Links</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div>
                      <strong>Technical Skills:</strong>{' '}
                      {Array.isArray(selectedStudentForDetail.skills) 
                        ? selectedStudentForDetail.skills.join(', ') 
                        : (selectedStudentForDetail.skills || 'N/A')}
                    </div>
                    <div><strong>Preferred Domain:</strong> {selectedStudentForDetail.preferredDomain || selectedStudentForDetail.domain || 'Software Development'}</div>
                    {selectedStudentForDetail.resumeLink && (
                      <div><strong>Resume / Drive Link:</strong> <a href={selectedStudentForDetail.resumeLink} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{selectedStudentForDetail.resumeLink}</a></div>
                    )}
                    {selectedStudentForDetail.linkedin && (
                      <div><strong>LinkedIn:</strong> <a href={selectedStudentForDetail.linkedin} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{selectedStudentForDetail.linkedin}</a></div>
                    )}
                    {selectedStudentForDetail.github && (
                      <div><strong>GitHub:</strong> <a href={selectedStudentForDetail.github} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{selectedStudentForDetail.github}</a></div>
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.65rem' }}>Location & Preference</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div><strong>City:</strong> {selectedStudentForDetail.city || 'N/A'}</div>
                    <div><strong>State:</strong> {selectedStudentForDetail.state || 'N/A'}</div>
                    <div><strong>Internship Preference:</strong> {selectedStudentForDetail.internshipPreference || 'Remote / Online'}</div>
                    <div><strong>Registered On:</strong> {selectedStudentForDetail.createdAt ? new Date(selectedStudentForDetail.createdAt).toLocaleDateString() : 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSelectedStudentForDetail(null)}
                >
                  Close Profile Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
