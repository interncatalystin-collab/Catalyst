import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Upload,
  Image,
  Calendar,
  BookOpen,
  GraduationCap,
  Building,
  CheckCircle2,
  Code,
  Globe,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  Bell,
  Settings,
  Shield
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
  initialTab = 'profile'
}) {
  const [activeTab, setActiveTab] = useState(
    (initialTab === 'register' || initialTab === 'profile' || initialTab === 'student-profile') ? 'profile' : initialTab
  );
  const [profileViewMode, setProfileViewMode] = useState('form'); // 'form' (default - directly show registration form) or 'preview'
  const [isEditing, setIsEditing] = useState(true);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  // Security Credentials (Password) State for Registration Profile Form
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  // Notification & Settings States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [studentNotifications, setStudentNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Proctored Assessment Ready',
      message: 'Your domain assessment is unlocked. Complete evaluation to boost recruiter visibility.',
      time: '10m ago',
      read: false,
      tab: 'assessment'
    },
    {
      id: 'notif-2',
      title: 'New Domain Openings',
      message: 'Verified partner companies have listed new internship vacancies in your specialized domain.',
      time: '1h ago',
      read: false,
      tab: 'domain'
    },
    {
      id: 'notif-3',
      title: 'Profile Active & Verified',
      message: 'Student account credential security is managed under AIET Placement Administration.',
      time: 'Today',
      read: true,
      tab: 'profile'
    }
  ]);

  const unreadNotifCount = studentNotifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setStudentNotifications(prev => prev.map(n => ({ ...n, read: true })));
    if (onAddToast) onAddToast('All notifications marked as read', 'info');
  };

  const handleNotificationClick = (notif) => {
    setStudentNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setShowNotifications(false);
    if (notif.tab) {
      setActiveTab(notif.tab);
    }
  };

  const safeProfile = profile || {};

  useEffect(() => {
    if (initialTab) {
      if (initialTab === 'register' || initialTab === 'profile' || initialTab === 'student-profile') {
        setActiveTab('profile');
        setProfileViewMode('form');
        setIsEditing(true);
      } else {
        setActiveTab(initialTab);
      }
    }
  }, [initialTab]);

  useEffect(() => {
    if (safeProfile.phone) setDomainPhone(safeProfile.phone);
    if (safeProfile.email) setDomainEmail(safeProfile.email);
  }, [safeProfile.phone, safeProfile.email]);

  // Profile Form State & Photo Upload Ref for Profile Tab
  const photoInputRef = useRef(null);
  const [avatar, setAvatar] = useState(
    safeProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  );
  const [name, setName] = useState(safeProfile.name || safeProfile.fullName || 'Student Candidate');
  const [email, setEmail] = useState(safeProfile.email || '');
  const [phone, setPhone] = useState(safeProfile.phone || '9876543210');
  const [domain, setDomain] = useState(safeProfile.domain || safeProfile.preferredDomain || 'Software & Full-Stack Web Development');
  const [institution, setInstitution] = useState(safeProfile.institution || safeProfile.collegeName || "Alva's Institute of Engineering & Technology (AIET)");
  const [degree, setDegree] = useState(safeProfile.degree || 'B.Tech / B.E.');
  const [branch, setBranch] = useState(safeProfile.branch || 'Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState(safeProfile.yearOfStudy || safeProfile.currentYearOrSemester || '4th Year (Final Year)');
  const [cgpa, setCgpa] = useState(safeProfile.cgpa || safeProfile.cgpaOrPercentage || '8.85 / 10');
  const [graduationYear, setGraduationYear] = useState(safeProfile.graduationYear || '2026');
  const [dateOfBirth, setDateOfBirth] = useState(safeProfile.dateOfBirth || '2004-05-15');
  const [gender, setGender] = useState(safeProfile.gender || 'Male');
  const [city, setCity] = useState(safeProfile.city || 'Bangalore');
  const [state, setState] = useState(safeProfile.state || 'Karnataka');
  const [internshipPreference, setInternshipPreference] = useState(safeProfile.internshipPreference || 'Remote / Online');
  const [resumeUrl, setResumeUrl] = useState(safeProfile.resumeUrl || safeProfile.resumeLink || 'https://resume.interncatalyst.org/view');
  const [linkedinUrl, setLinkedinUrl] = useState(safeProfile.linkedinUrl || safeProfile.linkedin || 'https://linkedin.com');
  const [githubUrl, setGithubUrl] = useState(safeProfile.githubUrl || safeProfile.github || 'https://github.com');
  const [skillsInput, setSkillsInput] = useState(
    Array.isArray(safeProfile.skills) ? safeProfile.skills.join(', ') : (safeProfile.skills || 'React, Node.js, JavaScript, Python, SQL')
  );

  // Sync state if safeProfile prop updates externally
  useEffect(() => {
    if (safeProfile) {
      if (safeProfile.avatar) setAvatar(safeProfile.avatar);
      if (safeProfile.name || safeProfile.fullName) setName(safeProfile.name || safeProfile.fullName);
      if (safeProfile.email) setEmail(safeProfile.email);
      if (safeProfile.phone) setPhone(safeProfile.phone);
      if (safeProfile.domain || safeProfile.preferredDomain) setDomain(safeProfile.domain || safeProfile.preferredDomain);
      if (safeProfile.institution || safeProfile.collegeName) setInstitution(safeProfile.institution || safeProfile.collegeName);
      if (safeProfile.degree) setDegree(safeProfile.degree);
      if (safeProfile.branch) setBranch(safeProfile.branch);
      if (safeProfile.yearOfStudy || safeProfile.currentYearOrSemester) setYearOfStudy(safeProfile.yearOfStudy || safeProfile.currentYearOrSemester);
      if (safeProfile.cgpa || safeProfile.cgpaOrPercentage) setCgpa(safeProfile.cgpa || safeProfile.cgpaOrPercentage);
      if (safeProfile.graduationYear) setGraduationYear(safeProfile.graduationYear);
      if (safeProfile.dateOfBirth) setDateOfBirth(safeProfile.dateOfBirth);
      if (safeProfile.gender) setGender(safeProfile.gender);
      if (safeProfile.city) setCity(safeProfile.city);
      if (safeProfile.state) setState(safeProfile.state);
      if (safeProfile.internshipPreference) setInternshipPreference(safeProfile.internshipPreference);
      if (safeProfile.resumeUrl || safeProfile.resumeLink) setResumeUrl(safeProfile.resumeUrl || safeProfile.resumeLink);
      if (safeProfile.linkedinUrl || safeProfile.linkedin) setLinkedinUrl(safeProfile.linkedinUrl || safeProfile.linkedin);
      if (safeProfile.githubUrl || safeProfile.github) setGithubUrl(safeProfile.githubUrl || safeProfile.github);
      if (safeProfile.skills) {
        setSkillsInput(Array.isArray(safeProfile.skills) ? safeProfile.skills.join(', ') : safeProfile.skills);
      }
    }
  }, [safeProfile]);


  // Photo Upload Handler with validation & FileReader dataURL
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onAddToast) onAddToast('Invalid file format: Please select a valid image file (PNG, JPG, WEBP).', 'danger');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      if (onAddToast) onAddToast('File size limit exceeded: Photo must be under 5MB.', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (dataUrl) {
        setAvatar(dataUrl);
        if (onUpdateProfile) {
          onUpdateProfile({ ...safeProfile, avatar: dataUrl });
        }
        if (onAddToast) onAddToast('📸 Candidate photo uploaded and updated successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };


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
    if (e) e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      if (onAddToast) onAddToast('Mandatory Contact Requirement: Please provide a valid 10-digit phone number.', 'danger');
      return;
    }
    if (!name.trim()) {
      if (onAddToast) onAddToast('Full Name is required.', 'danger');
      return;
    }
    if (!institution.trim()) {
      if (onAddToast) onAddToast('College / University Name is required.', 'danger');
      return;
    }
    if (!branch.trim()) {
      if (onAddToast) onAddToast('Branch / Specialization is required.', 'danger');
      return;
    }
    if (password) {
      if (password.length < 8) {
        if (onAddToast) onAddToast('Password Requirement: Password must be at least 8 characters long.', 'danger');
        return;
      }
      if (!/[A-Z]/.test(password)) {
        if (onAddToast) onAddToast('Password Requirement: Password must contain at least one capital letter (A-Z).', 'danger');
        return;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
        if (onAddToast) onAddToast('Password Requirement: Password must contain at least one special character (!@#$%^&*).', 'danger');
        return;
      }
      if (password !== confirmPassword) {
        if (onAddToast) onAddToast('Password Mismatch: Passwords do not match.', 'danger');
        return;
      }
    }

    const updated = {
      ...safeProfile,
      email: safeProfile.email || email.trim(), // Preserved: Only Admin can change student login email
      password: safeProfile.password, // Preserved: Only Admin can change student password
      name: name.trim(),
      fullName: name.trim(),
      phone: phone.trim(),
      avatar,
      domain,
      preferredDomain: domain,
      institution: institution.trim(),
      collegeName: institution.trim(),
      degree,
      branch: branch.trim(),
      yearOfStudy,
      currentYearOrSemester: yearOfStudy,
      cgpa: cgpa.trim(),
      cgpaOrPercentage: cgpa.trim(),
      graduationYear: graduationYear.trim(),
      dateOfBirth,
      gender,
      city: city.trim(),
      state: state.trim(),
      internshipPreference,
      resumeUrl: resumeUrl.trim(),
      resumeLink: resumeUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      linkedin: linkedinUrl.trim(),
      githubUrl: githubUrl.trim(),
      github: githubUrl.trim(),
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (onUpdateProfile) onUpdateProfile(updated);
    setIsEditing(false);
    if (onAddToast) onAddToast('🎉 Candidate Profile & Registration saved successfully!', 'success');
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
            <div style={{ position: 'relative' }}>
              <img 
                src={avatar || safeProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                alt="Student Avatar"
                style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3b82f6', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)' }}
              />
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  setIsEditing(true);
                  setTimeout(() => photoInputRef.current?.click(), 100);
                }}
                title="Upload / Change Candidate Photo"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                <Camera size={13} />
              </button>
            </div>
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

          {/* Backdrop for closing notification and settings dropdowns */}
          {(showNotifications || showSettings) && (
            <div 
              onClick={() => {
                setShowNotifications(false);
                setShowSettings(false);
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 80,
                background: 'transparent'
              }}
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', position: 'relative', zIndex: 85 }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveTab('profile');
                setProfileViewMode('form');
                setIsEditing(true);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}
            >
              <FileText size={14} /> Profile
            </button>

            {/* Notification Bell Icon & Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                type="button"
                onClick={() => {
                  setShowNotifications(prev => !prev);
                  setShowSettings(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ 
                  position: 'relative',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  background: showNotifications ? 'rgba(37, 99, 235, 0.1)' : '#ffffff',
                  borderColor: showNotifications ? 'var(--primary)' : 'var(--border-color)',
                  color: showNotifications ? 'var(--primary)' : 'var(--text-main)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                title="Notifications"
                aria-label="Student Notifications"
              >
                <Bell size={17} />
                {unreadNotifCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 4px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '320px',
                  maxWidth: '90vw',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--border-color)',
                  zIndex: 90,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: '#f8fafc',
                    borderBottom: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Bell size={15} color="var(--primary)" />
                      <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                        Notifications
                      </span>
                      {unreadNotifCount > 0 && (
                        <span style={{
                          background: 'rgba(37, 99, 235, 0.12)',
                          color: 'var(--primary)',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '10px'
                        }}>
                          {unreadNotifCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotifCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          padding: '0.2rem 0.4rem',
                          borderRadius: '4px'
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification Items */}
                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {studentNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        style={{
                          padding: '0.85rem 1rem',
                          borderBottom: '1px solid #f1f5f9',
                          background: notif.read ? '#ffffff' : '#f0f7ff',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                          display: 'flex',
                          gap: '0.75rem'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = notif.read ? '#ffffff' : '#f0f7ff'; }}
                      >
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: notif.read ? 'transparent' : 'var(--primary)',
                          marginTop: '6px',
                          flexShrink: 0
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                            <span style={{ fontWeight: notif.read ? '600' : '700', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                              {notif.title}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {notif.time}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    padding: '0.6rem 1rem',
                    background: '#f8fafc',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    Catalyst Student Placement Alert Hub
                  </div>
                </div>
              )}
            </div>

            {/* Settings Button & Dropdown (Housing the Logout Button) */}
            <div style={{ position: 'relative' }}>
              <button 
                type="button"
                onClick={() => {
                  setShowSettings(prev => !prev);
                  setShowNotifications(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.45rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: showSettings ? 'rgba(37, 99, 235, 0.1)' : '#ffffff',
                  borderColor: showSettings ? 'var(--primary)' : 'var(--border-color)',
                  color: showSettings ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Account Settings"
                aria-label="Account Settings"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>

              {/* Settings Dropdown Menu */}
              {showSettings && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '270px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--border-color)',
                  zIndex: 90,
                  padding: '0.65rem',
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  {/* Student Quick Bio Header */}
                  <div style={{
                    padding: '0.5rem 0.65rem 0.75rem',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '0.4rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img 
                        src={avatar} 
                        alt={name}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid var(--primary-light, #e0e7ff)'
                        }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {email || 'Student Account'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settings Menu Options */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSettings(false);
                      setActiveTab('profile');
                      setProfileViewMode('form');
                      setIsEditing(true);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 0.65rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <User size={15} color="var(--primary)" />
                    <span>Profile & Bio Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowSettings(false);
                      setActiveTab('domain');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 0.65rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <Briefcase size={15} color="#16a34a" />
                    <span>Domain & Vacancies</span>
                  </button>

                  <div style={{
                    padding: '0.45rem 0.65rem',
                    margin: '0.2rem 0',
                    fontSize: '0.72rem',
                    color: '#64748b',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <ShieldCheck size={14} color="#16a34a" />
                    <span>Credentials governed by Admin</span>
                  </div>

                  <div style={{ height: '1px', background: '#f1f5f9', margin: '0.4rem 0' }} />

                  {/* Log Out Button inside Settings Dropdown */}
                  {onLogout && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettings(false);
                        onLogout();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.65rem',
                        borderRadius: '8px',
                        border: '1px solid #fee2e2',
                        background: '#fef2f2',
                        color: '#dc2626',
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                    >
                      <LogOut size={15} />
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>
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
          {/* Tab 1: Student Profile & Registration Form */}
          <button 
            onClick={() => {
              setActiveTab('profile');
              setProfileViewMode('form');
            }}
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
              gap: '0.5rem',
              boxShadow: activeTab === 'profile' ? 'var(--shadow-glow)' : 'none'
            }}
          >
            <User size={16} /> Student Profile
            <span style={{
              background: activeTab === 'profile' ? '#ffffff' : '#e0e7ff',
              color: activeTab === 'profile' ? '#1d4ed8' : '#3730a3',
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '0.15rem 0.45rem',
              borderRadius: '10px'
            }}>
              Profile
            </span>
          </button>

          {/* Tab 2: Domain Role & Vacancies */}
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

          {/* Tab 3: My Applications */}
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
        </div>

        {/* ======================================================== */}
        {/* TAB 2: DOMAIN ROLE & VACANCIES (CENTRAL PLACEMENT)       */}
        {/* ======================================================== */}
        {activeTab === 'domain-role' && (
          <div>
            {/* Quick Profile Registration Status Strip */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img 
                  src={avatar} 
                  alt="Candidate Photo" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }} 
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{name}</strong>
                    <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>✓ Profile Active</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Phone: {phone} • {institution} ({degree})
                  </span>
                </div>
              </div>
              <button 
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setActiveTab('profile');
                  setProfileViewMode('form');
                  setIsEditing(true);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700', fontSize: '0.825rem' }}
              >
                <User size={14} /> Edit Profile & Photo
              </button>
            </div>

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
        {/* TAB 3: CANDIDATE PROFILE & REGISTRATION FORM             */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            {/* Hidden Photo File Input triggered by buttons/avatar */}
            <input 
              type="file" 
              ref={photoInputRef} 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }} 
            />

            {/* Profile Tab Header */}
            <div style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Candidate Profile & Registration Form
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '3px', margin: 0 }}>
                    Official placement registration record, verified candidate photo, academic background, and domain credentials.
                  </p>
                </div>
              </div>

              {/* Subview Segmented Pills */}
              <div style={{
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '10px',
                display: 'inline-flex',
                gap: '4px'
              }}>
                <button 
                  type="button"
                  onClick={() => {
                    setProfileViewMode('form');
                    setIsEditing(true);
                  }}
                  style={{
                    background: profileViewMode === 'form' ? '#ffffff' : 'transparent',
                    color: profileViewMode === 'form' ? '#2563eb' : '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: profileViewMode === 'form' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  <FileText size={15} /> 📝 Student Profile
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setProfileViewMode('preview');
                    setIsEditing(false);
                  }}
                  style={{
                    background: profileViewMode === 'preview' ? '#ffffff' : 'transparent',
                    color: profileViewMode === 'preview' ? '#2563eb' : '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: profileViewMode === 'preview' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  <Eye size={15} /> 👁️ Profile Summary
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* VIEW MODE CONDITIONAL RENDERING (DEFAULT IS FORM)         */}
            {/* ======================================================== */}
            {profileViewMode === 'preview' ? (
              <div>
                {/* Hero Candidate Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {/* Candidate Photo with Camera Quick-Change Trigger */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img 
                        src={avatar || safeProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                        alt="Candidate Headshot"
                        style={{
                          width: '96px',
                          height: '96px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #2563eb',
                          boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        title="Click to change candidate photo"
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          background: '#2563eb',
                          color: '#ffffff',
                          border: '2px solid #ffffff',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                        }}
                      >
                        <Camera size={15} />
                      </button>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {safeProfile.name || safeProfile.fullName || 'Student Candidate'}
                        </h2>
                        <span className="badge badge-verified" style={{ fontSize: '0.78rem' }}>
                          <ShieldCheck size={13} /> Verified Student
                        </span>
                        <span style={{
                          background: '#dcfce7',
                          color: '#15803d',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          <CheckCircle2 size={13} /> Active Placement Candidate
                        </span>
                      </div>

                      <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', marginTop: '4px', marginBottom: '8px' }}>
                        <strong>{safeProfile.degree || degree}</strong> ({safeProfile.branch || branch}) • {safeProfile.institution || safeProfile.collegeName || institution}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{
                          background: 'rgba(37, 99, 235, 0.08)',
                          color: '#1d4ed8',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          <Briefcase size={13} /> Track: {safeProfile.domain || domain}
                        </span>

                        <span style={{
                          background: '#ecfdf5',
                          color: '#047857',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          🔥 {currentDomainRole.totalVacancies} Open Vacancies
                        </span>

                        <span style={{ fontSize: '0.82rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Phone size={13} style={{ color: '#16a34a' }} />
                          <strong>{safeProfile.phone || phone}</strong>
                        </span>

                        <span style={{ fontSize: '0.82rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Mail size={13} style={{ color: '#2563eb' }} />
                          {safeProfile.email || email}
                        </span>

                        {(safeProfile.city || city) && (
                          <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <MapPin size={13} />
                            {safeProfile.city || city}, {safeProfile.state || state}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <button 
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
                    >
                      <Upload size={14} /> Upload Photo
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setProfileViewMode('form');
                        setIsEditing(true);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
                    >
                      <FileText size={14} /> Open Profile
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('domain-role')}
                      className="btn btn-emerald btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
                    >
                      <Briefcase size={14} /> Domain Roles ({currentDomainRole.totalVacancies} Seats) →
                    </button>
                  </div>
                </div>

                {/* 4 Structured Information Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Card 1: Academic & Education Information */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <BookOpen size={18} style={{ color: '#2563eb' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Academic Credentials</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Institution / University</span>
                        <strong style={{ color: '#1e293b' }}>{safeProfile.institution || safeProfile.collegeName || institution}</strong>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Degree / Program</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.degree || degree}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Branch / Specialization</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.branch || branch}</strong>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Year of Study</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.yearOfStudy || safeProfile.currentYearOrSemester || yearOfStudy}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>CGPA / Score</span>
                          <span style={{ color: '#16a34a', fontWeight: '800' }}>{safeProfile.cgpa || safeProfile.cgpaOrPercentage || cgpa}</span>
                        </div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Graduation Year</span>
                        <strong style={{ color: '#1e293b' }}>{safeProfile.graduationYear || graduationYear}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Domain Placement & ATS Resume */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <Briefcase size={18} style={{ color: '#2563eb' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Placement Track & Resume</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Assigned Domain Track</span>
                        <strong style={{ color: '#2563eb', fontSize: '0.95rem' }}>{safeProfile.domain || domain}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Work Mode Preference</span>
                        <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600', fontSize: '0.8rem' }}>
                          {safeProfile.internshipPreference || internshipPreference}
                        </span>
                      </div>
                      <div style={{ marginTop: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '4px' }}>Official ATS Resume PDF</span>
                        <a 
                          href={safeProfile.resumeUrl || safeProfile.resumeLink || resumeUrl || '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            color: '#1d4ed8',
                            padding: '0.5rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.825rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            textDecoration: 'none'
                          }}
                        >
                          <FileText size={15} /> View ATS Resume Link <ExternalLink size={13} />
                        </a>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Connected Partner Pool</span>
                        <span style={{ color: '#047857', fontWeight: '700' }}>
                          {currentDomainRole.connectedCompanies?.length || 0} Companies ({currentDomainRole.totalVacancies} seats)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Technical Skills & Social Links */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <Code size={18} style={{ color: '#2563eb' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Skills & Online Profiles</h4>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '6px' }}>Technical Skill Tags</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                        {(Array.isArray(safeProfile.skills) ? safeProfile.skills : (safeProfile.skills || skillsInput).split(',')).map((skill, idx) => {
                          const trimmed = typeof skill === 'string' ? skill.trim() : '';
                          if (!trimmed) return null;
                          return (
                            <span key={idx} style={{
                              background: '#f1f5f9',
                              color: '#334155',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              border: '1px solid #e2e8f0'
                            }}>
                              {trimmed}
                            </span>
                          );
                        })}
                      </div>

                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem', marginBottom: '6px' }}>Verified Portfolios</span>
                      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                        {(safeProfile.linkedinUrl || safeProfile.linkedin || linkedinUrl) && (
                          <a 
                            href={safeProfile.linkedinUrl || safeProfile.linkedin || linkedinUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{
                              background: '#f0f9ff',
                              border: '1px solid #bae6fd',
                              color: '#0284c7',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: '700',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <Globe size={14} /> LinkedIn Profile →
                          </a>
                        )}
                        {(safeProfile.githubUrl || safeProfile.github || githubUrl) && (
                          <a 
                            href={safeProfile.githubUrl || safeProfile.github || githubUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              color: '#334155',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: '700',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <Code size={14} /> GitHub Profile →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Personal & Contact Information */}
                  <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <User size={18} style={{ color: '#2563eb' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Personal & Location Details</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Date of Birth</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.dateOfBirth || dateOfBirth || 'Not specified'}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Gender</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.gender || gender}</strong>
                        </div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Mandatory Contact Phone</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '2px' }}>
                          <strong style={{ color: '#16a34a', fontSize: '0.95rem' }}>{safeProfile.phone || phone}</strong>
                          <span className="badge badge-verified" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>Verified ✓</span>
                        </div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Registered Email Address</span>
                        <strong style={{ color: '#1e293b' }}>{safeProfile.email || email}</strong>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>City</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.city || city || 'Bangalore'}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>State</span>
                          <strong style={{ color: '#1e293b' }}>{safeProfile.state || state || 'Karnataka'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* EDIT MODE: COMPLETE CANDIDATE REGISTRATION FORM          */
              /* ======================================================== */
              <div>
                {/* Form Header Alert */}
                <div style={{
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <GraduationCap size={22} style={{ color: '#2563eb' }} />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#1e40af', display: 'block' }}>
                        Official Candidate Registration Form
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>
                        Keep your candidate photo, mandatory phone number, and academic credentials updated for corporate placement.
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-verified" style={{ background: '#2563eb', color: '#ffffff' }}>
                    Live Registration Mode
                  </span>
                </div>

                {/* ======================================================== */}
                {/* CANDIDATE PHOTO UPLOAD STATION                           */}
                {/* ======================================================== */}
                <div style={{
                  background: '#f8fafc',
                  border: '2px dashed #93c5fd',
                  borderRadius: '14px',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.75rem',
                  flexWrap: 'wrap'
                }}>
                  {/* Live Preview Photo Frame */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img 
                      src={avatar} 
                      alt="Candidate Uploaded Preview"
                      style={{
                        width: '105px',
                        height: '105px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #2563eb',
                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)',
                        background: '#fff'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      title="Upload candidate photo"
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        background: '#2563eb',
                        color: '#fff',
                        border: '2px solid #fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Image size={18} style={{ color: '#2563eb' }} /> Candidate Profile Photograph <span className="required">*</span>
                      </h4>
                      <span className="badge badge-verified" style={{ background: '#eff6ff', color: '#2563eb', fontSize: '0.7rem', padding: '2px 8px' }}>
                        Mandatory Upload
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                      Please upload your official candidate passport-style photograph. Accepted formats: PNG, JPG, JPEG, WEBP (Max 5MB).
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button 
                        type="button" 
                        onClick={() => photoInputRef.current?.click()}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', padding: '0.55rem 1.15rem' }}
                      >
                        <Upload size={16} /> Choose Candidate Photo to Upload
                      </button>
                      <span style={{ fontSize: '0.775rem', color: '#64748b' }}>
                        ✓ Reflects on student ID, ATS resume, and employer applications
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile}>
                  {/* SECTION 1: PERSONAL INFORMATION */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <User size={18} style={{ color: '#2563eb' }} /> 1. Personal Information
                    </h4>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="e.g. Aditya Verma"
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Mandatory Phone Number <span className="required">*</span></span>
                          {phone && phone.trim().length >= 10 && (
                            <span style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: '700' }}>✓ 10 Digits Valid</span>
                          )}
                        </label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="10-digit mobile number" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>Email Address <span className="required">*</span></span>
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
                            value={safeProfile.email || email} 
                            disabled 
                            readOnly
                          />
                        </div>
                        <span style={{ fontSize: '0.725rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <Lock size={11} /> Only Central Admin has access to change student login email and password.
                        </span>
                      </div>

                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">Date of Birth</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={dateOfBirth} 
                            onChange={(e) => setDateOfBirth(e.target.value)} 
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Gender</label>
                          <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other / Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: ACCOUNT SECURITY & CREDENTIALS (ADMIN-GOVERNED ONLY) */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <Lock size={18} style={{ color: '#2563eb' }} /> 2. Security & Account Credentials
                    </h4>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lock size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>
                              Student Portal Authentication Credentials
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              Registered Email: <strong style={{ color: '#0f172a' }}>{safeProfile.email}</strong> • Password: <strong>••••••••</strong>
                            </div>
                          </div>
                        </div>
                        <span className="badge" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontWeight: '700', fontSize: '0.725rem' }}>
                          <ShieldCheck size={12} /> Managed by Central Admin
                        </span>
                      </div>
                      <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>
                        🔒 <strong>Platform Security Rule:</strong> Only Central Administration has the authority to change or reset passwords and email addresses for student accounts. If you require email modification or a password reset, please contact the Central Administration office at <a href="mailto:admin@interncatalyst.org" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>admin@interncatalyst.org</a>.
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: EDUCATION INFORMATION */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <BookOpen size={18} style={{ color: '#2563eb' }} /> 3. Education Information
                    </h4>

                    <div className="form-group">
                      <label className="form-label">College / University Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={institution} 
                        onChange={(e) => setInstitution(e.target.value)} 
                        placeholder="e.g. Alva's Institute of Engineering & Technology (AIET)"
                        required 
                      />
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Degree / Course <span className="required">*</span></label>
                        <select className="form-select" value={degree} onChange={(e) => setDegree(e.target.value)}>
                          <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                          <option value="M.Tech">M.Tech</option>
                          <option value="BCA">BCA</option>
                          <option value="MCA">MCA</option>
                          <option value="B.Sc CS / IT">B.Sc CS / IT</option>
                          <option value="MBA">MBA</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Other Degree">Other Degree</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Branch / Department <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={branch} 
                          onChange={(e) => setBranch(e.target.value)} 
                          placeholder="e.g. Computer Science & Engineering"
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Current Year / Semester</label>
                        <select className="form-select" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)}>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year (Final Year)">4th Year / Final Year</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                        </select>
                      </div>

                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">CGPA / Grade</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={cgpa} 
                            onChange={(e) => setCgpa(e.target.value)} 
                            placeholder="e.g. 8.85 / 10" 
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Graduation Year</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={graduationYear} 
                            onChange={(e) => setGraduationYear(e.target.value)} 
                            placeholder="e.g. 2026" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: DOMAIN & PROFESSIONAL PROFILE */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <Code size={18} style={{ color: '#2563eb' }} /> 4. Domain & Professional Profile
                    </h4>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Primary Placement Domain <span className="required">*</span></label>
                        <select className="form-select" value={domain} onChange={(e) => setDomain(e.target.value)}>
                          {DOMAIN_ROLES_DATA.map(d => (
                            <option key={d.id} value={d.domainName}>{d.domainName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>ATS Resume Drive Link <span className="required">*</span></span>
                          {resumeUrl && (
                            <a href={resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>
                              Test Link ↗
                            </a>
                          )}
                        </label>
                        <input 
                          type="url" 
                          className="form-input" 
                          value={resumeUrl} 
                          onChange={(e) => setResumeUrl(e.target.value)} 
                          placeholder="https://drive.google.com/..." 
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Technical Skills (Comma separated)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={skillsInput} 
                        onChange={(e) => setSkillsInput(e.target.value)} 
                        placeholder="e.g. React, Node.js, JavaScript, Python, MongoDB, SQL" 
                      />
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">LinkedIn Profile URL</label>
                        <input 
                          type="url" 
                          className="form-input" 
                          value={linkedinUrl} 
                          onChange={(e) => setLinkedinUrl(e.target.value)} 
                          placeholder="https://linkedin.com/in/username" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GitHub Profile URL</label>
                        <input 
                          type="url" 
                          className="form-input" 
                          value={githubUrl} 
                          onChange={(e) => setGithubUrl(e.target.value)} 
                          placeholder="https://github.com/username" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: LOCATION & WORK PREFERENCES */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <MapPin size={18} style={{ color: '#2563eb' }} /> 5. Location & Work Preferences
                    </h4>

                    <div className="grid-2">
                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">City</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder="e.g. Bangalore" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">State</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            placeholder="e.g. Karnataka" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Internship Mode Preference</label>
                        <select 
                          className="form-select" 
                          value={internshipPreference} 
                          onChange={(e) => setInternshipPreference(e.target.value)}
                        >
                          <option value="Remote / Online">Remote / Online</option>
                          <option value="In-Office / On-Site">In-Office / On-Site</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                    <button 
                      type="button" 
                      className="btn btn-emerald"
                      onClick={() => setActiveTab('domain-role')}
                      style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Briefcase size={15} /> Proceed to Domain Roles ({currentDomainRole.totalVacancies} Seats) →
                    </button>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => {
                          setProfileViewMode('preview');
                          setIsEditing(false);
                        }}
                        style={{ fontWeight: '700' }}
                      >
                        View Profile Summary
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <CheckCircle2 size={16} /> Save Registration Profile
                      </button>
                    </div>
                  </div>
                </form>
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
