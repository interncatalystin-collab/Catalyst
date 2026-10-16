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
  Key,
  LogOut,
  Upload,
  Download,
  Star,
  Award,
  Trash2,
  Edit3,
  X,
  Eye,
  Filter,
  Search,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  RefreshCw,
  Printer
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import AIResumeReaderModal from '../components/AIResumeReaderModal';

export default function CompanyDashboard({ 
  company, 
  onUpdateCompany, 
  internships, 
  onAddInternship, 
  applications, 
  onUpdateAppStatus,
  reports = [],
  onAddReport,
  onUpdateReport,
  onDeleteReport,
  onAddToast,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('post-role'); // 'post-role', 'company-profile', 'listings', 'applicants', 'reports', 'verification', 'subscription'

  // Reports & Evaluation State
  const [selectedReportCategoryFilter, setSelectedReportCategoryFilter] = useState('all');
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('all');
  const [showUploadReportModal, setShowUploadReportModal] = useState(false);
  const [showViewReportModal, setShowViewReportModal] = useState(false);
  const [activeViewingReport, setActiveViewingReport] = useState(null);

  // AI Resume Reader & Candidate Screening Modal State
  const [activeAIResumeCandidate, setActiveAIResumeCandidate] = useState(null);
  const [showAIResumeModal, setShowAIResumeModal] = useState(false);

  // Form state for Upload Report modal
  const [reportStudentAppId, setReportStudentAppId] = useState('');
  const [customStudentName, setCustomStudentName] = useState('');
  const [customStudentEmail, setCustomStudentEmail] = useState('');
  const [customRoleTitle, setCustomRoleTitle] = useState('');
  const [formReportTitle, setFormReportTitle] = useState('');
  const [formReportType, setFormReportType] = useState('Monthly Milestone Report');
  const [formPeriod, setFormPeriod] = useState('Month 1 Review');
  const [formRating, setFormRating] = useState(5);
  const [formAttendance, setFormAttendance] = useState('98%');
  const [formStipendStatus, setFormStipendStatus] = useState('Processed / Released');
  const [formKeyDeliverables, setFormKeyDeliverables] = useState('');
  const [formSupervisorRemarks, setFormSupervisorRemarks] = useState('');
  const [formStatus, setFormStatus] = useState('Approved');
  const [formFileName, setFormFileName] = useState('');
  const [formFileSize, setFormFileSize] = useState('');
  const [formFileData, setFormFileData] = useState('');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [editingReportId, setEditingReportId] = useState(null);

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
  const [trackType, setTrackType] = useState('IT'); // 'IT' or 'Non-IT'
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

  // Strict Multi-Tenant Isolation: Only listings specifically owned by this company
  const companyListings = (internships || []).filter(i => {
    if (!company) return false;
    const matchId = i.companyId && company.id && String(i.companyId).trim() === String(company.id).trim();
    const matchName = i.companyName && company.name && i.companyName.trim().toLowerCase() === company.name.trim().toLowerCase();
    return matchId || matchName;
  });

  // Strict Multi-Tenant Isolation: Only candidates applied to this specific company
  const allCompanyApplications = (applications || []).filter(app => {
    if (!company) return false;

    // Explicit cross-company leak prevention:
    if (app.companyId && company.id && String(app.companyId).trim() !== String(company.id).trim()) {
      return false;
    }
    if (app.companyName && company.name && app.companyName.trim().toLowerCase() !== company.name.trim().toLowerCase()) {
      const isOurListing = companyListings.some(l => String(l.id) === String(app.internshipId));
      if (!isOurListing) return false;
    }

    const matchId = app.companyId && company.id && String(app.companyId).trim() === String(company.id).trim();
    const matchName = app.companyName && company.name && app.companyName.trim().toLowerCase() === company.name.trim().toLowerCase();
    const matchListing = companyListings.some(l => String(l.id) === String(app.internshipId));

    return matchId || matchName || matchListing;
  });

  const companyApps = allCompanyApplications.filter(app => 
    app.forwardedToEmployer || app.adminSelectionStatus === 'Shortlisted & Forwarded to Employer'
  );
  const pendingVettingApps = allCompanyApplications.filter(app => 
    !(app.forwardedToEmployer || app.adminSelectionStatus === 'Shortlisted & Forwarded to Employer')
  );

  // Hired / Selected candidates who have been awarded an internship at this company:
  const hiredStudents = allCompanyApplications.filter(app => 
    app.status === 'Selected' || app.status === 'Hired'
  );

  // Filter company reports strictly by company ID or company name
  const companyReports = (reports || []).filter(rep => {
    if (!company) return false;
    const matchId = rep.companyId && company.id && String(rep.companyId).trim() === String(company.id).trim();
    const matchName = rep.companyName && company.name && rep.companyName.trim().toLowerCase() === company.name.trim().toLowerCase();
    return matchId || matchName;
  });

  const handleOpenUploadForStudent = (studentApp) => {
    if (studentApp) {
      setReportStudentAppId(studentApp.id);
      setCustomStudentName(studentApp.studentName || '');
      setCustomStudentEmail(studentApp.studentEmail || '');
      setCustomRoleTitle(studentApp.internshipTitle || '');
      setFormReportTitle(`Month 1 Progress & Milestone Evaluation - ${studentApp.studentName || 'Intern'}`);
      setFormReportType('Monthly Milestone Report');
      setFormPeriod('Month 1 (Sprint 1-4)');
      setFormRating(5);
      setFormAttendance('98%');
      setFormStipendStatus('Processed (₹15,000 / month)');
      setFormKeyDeliverables('Successfully completed assigned engineering sprints; resolved key GitHub issues; passed all continuous integration test suites.');
      setFormSupervisorRemarks('Exceptional problem-solving abilities, high attention to code quality, and active team participation throughout this milestone.');
      setFormFileName(`${(studentApp.studentName || 'Student').replace(/\s+/g, '_')}_Milestone1_Report.pdf`);
      setFormFileSize('1.8 MB');
      setFormStatus('Approved');
    } else {
      setReportStudentAppId('');
      setCustomStudentName('');
      setCustomStudentEmail('');
      setCustomRoleTitle('');
      setFormReportTitle('');
      setFormReportType('Monthly Milestone Report');
      setFormPeriod('Month 1 Review');
      setFormRating(5);
      setFormAttendance('98%');
      setFormStipendStatus('Processed / Released');
      setFormKeyDeliverables('');
      setFormSupervisorRemarks('');
      setFormFileName('');
      setFormFileSize('');
      setFormStatus('Approved');
    }
    setEditingReportId(null);
    setShowUploadReportModal(true);
  };

  const handleOpenEditReport = (rep) => {
    setEditingReportId(rep.id);
    setReportStudentAppId(rep.applicationId || '');
    setCustomStudentName(rep.studentName || '');
    setCustomStudentEmail(rep.studentEmail || '');
    setCustomRoleTitle(rep.internshipTitle || '');
    setFormReportTitle(rep.reportTitle || '');
    setFormReportType(rep.reportType || 'Monthly Milestone Report');
    setFormPeriod(rep.period || 'Month 1 Review');
    setFormRating(rep.rating || 5);
    setFormAttendance(rep.attendance || '98%');
    setFormStipendStatus(rep.stipendStatus || 'Approved');
    setFormKeyDeliverables(rep.keyDeliverables || '');
    setFormSupervisorRemarks(rep.supervisorRemarks || '');
    setFormFileName(rep.fileName || '');
    setFormFileSize(rep.fileSize || '');
    setFormStatus(rep.status || 'Approved');
    setShowUploadReportModal(true);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setFormFileName(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFormFileSize(file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormFileData(e.target?.result || '');
    };
    reader.readAsDataURL(file);
    onAddToast(`📄 File attached: ${file.name}`, 'info');
  };

  const handleAutofillTemplate = () => {
    setFormReportTitle(`Official Milestone Progress & Capstone Evaluation Report`);
    setFormReportType('Monthly Milestone Report');
    setFormPeriod('Sprint Milestone 2-4');
    setFormRating(5);
    setFormAttendance('100%');
    setFormStipendStatus('Processed & Released (₹15,000 / month)');
    setFormKeyDeliverables('• Completed core module architectural design\n• Implemented secure REST APIs with schema validation\n• Added automated unit tests achieving 94% coverage\n• Collaborated on production deployment pipeline');
    setFormSupervisorRemarks('The intern exhibited remarkable diligence, high attention to code quality, and exceptional communication. Completed all deliverables ahead of sprint deadlines. Strongly recommended for milestone sign-off and completion certificate.');
    setFormFileName('Internship_Evaluation_Official_Report.pdf');
    setFormFileSize('2.1 MB');
    setFormStatus('Approved');
    onAddToast('✨ Autofilled form with standard corporate milestone template!', 'info');
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();

    let targetStudentName = customStudentName;
    let targetStudentEmail = customStudentEmail;
    let targetRole = customRoleTitle;
    let targetStudentCollege = '';
    let targetStudentPhone = '';
    let targetAppId = reportStudentAppId;

    if (reportStudentAppId) {
      const matchedApp = allCompanyApplications.find(a => String(a.id) === String(reportStudentAppId));
      if (matchedApp) {
        targetStudentName = matchedApp.studentName;
        targetStudentEmail = matchedApp.studentEmail;
        targetRole = matchedApp.internshipTitle;
        targetStudentCollege = matchedApp.studentCollege || '';
        targetStudentPhone = matchedApp.studentPhone || '';
      }
    }

    if (!targetStudentName || !formReportTitle) {
      onAddToast('Please select a student and provide a Report Title.', 'danger');
      return;
    }

    const reportPayload = {
      id: editingReportId || `rep-${Date.now()}`,
      companyId: company.id || 'comp-101',
      companyName: company.name || 'Company',
      applicationId: targetAppId || null,
      studentId: targetAppId || `stud-${Date.now()}`,
      studentName: targetStudentName,
      studentEmail: targetStudentEmail,
      studentPhone: targetStudentPhone,
      studentCollege: targetStudentCollege,
      internshipTitle: targetRole || 'Internship Opportunity',
      reportTitle: formReportTitle,
      reportType: formReportType,
      period: formPeriod,
      submissionDate: new Date().toISOString().split('T')[0],
      supervisorName: company.contactPerson || 'HR Lead',
      supervisorDesignation: 'Designated Corporate Supervisor',
      supervisorEmail: company.businessEmail || 'hr@company.com',
      rating: Number(formRating) || 5,
      attendance: formAttendance,
      stipendStatus: formStipendStatus,
      keyDeliverables: formKeyDeliverables || 'All assigned internship milestone deliverables completed satisfactorily.',
      supervisorRemarks: formSupervisorRemarks || 'Satisfactory progress and dedication observed during the review cycle.',
      fileName: formFileName || `${targetStudentName.replace(/\s+/g, '_')}_Milestone_Report.pdf`,
      fileSize: formFileSize || '1.6 MB',
      fileUrl: formFileData || '#',
      status: formStatus,
      uploadedBy: 'Company Supervisor',
      createdAt: new Date().toISOString()
    };

    if (editingReportId && onUpdateReport) {
      onUpdateReport(editingReportId, reportPayload);
      onAddToast(`Report '${formReportTitle}' updated successfully!`, 'success');
    } else if (onAddReport) {
      onAddReport(reportPayload);
      onAddToast(`🎉 Internship Report '${formReportTitle}' uploaded successfully!`, 'success');
    }

    setShowUploadReportModal(false);
    setEditingReportId(null);
  };

  const handleDownloadReport = (rep) => {
    const reportText = `=====================================================
INTERNCATALYST OFFICIAL INTERNSHIP PROGRESS & EVALUATION REPORT
=====================================================

COMPANY INFORMATION
Company Name: ${rep.companyName}
Corporate Supervisor: ${rep.supervisorName} (${rep.supervisorDesignation || 'Supervisor'})
Supervisor Email: ${rep.supervisorEmail || 'hr@company.com'}
Verification Status: Verified Employer

STUDENT INTERN INFORMATION
Candidate Name: ${rep.studentName}
Email: ${rep.studentEmail}
Phone: ${rep.studentPhone || 'N/A'}
Institution / College: ${rep.studentCollege || 'N/A'}
Internship Opportunity: ${rep.internshipTitle}

REPORT METRICS & EVALUATION
Report Title: ${rep.reportTitle}
Report Category: ${rep.reportType}
Evaluation Period: ${rep.period || 'Milestone Period'}
Submission Date: ${rep.submissionDate}
Overall Performance Rating: ${rep.rating} / 5 Stars
Attendance Record: ${rep.attendance || '100%'}
Stipend Disbursal Status: ${rep.stipendStatus || 'Approved'}
Compliance Status: ${rep.status}

KEY PROJECT DELIVERABLES & RESPONSIBILITIES
${rep.keyDeliverables || 'Standard milestone deliverables met per curriculum.'}

CORPORATE SUPERVISOR REMARKS & RECOMMENDATIONS
${rep.supervisorRemarks || 'Satisfactory performance throughout the internship tenure.'}

-----------------------------------------------------
Official Electronic Seal: VERIFIED BY ${rep.companyName.toUpperCase()}
Generated on: ${new Date().toLocaleString()}
Document ID: ${rep.id}
Attachment File: ${rep.fileName} (${rep.fileSize || 'N/A'})
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rep.studentName.replace(/\s+/g, '_')}_${rep.reportType.replace(/\s+/g, '_')}_${rep.submissionDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onAddToast) onAddToast(`📥 Report '${rep.reportTitle}' downloaded successfully!`, 'success');
  };

  const handleExportReportsCSV = () => {
    if (companyReports.length === 0) {
      if (onAddToast) onAddToast('No reports available to export.', 'info');
      return;
    }
    const headers = ['Report ID', 'Student Name', 'Email', 'Role Title', 'Report Title', 'Type', 'Period', 'Rating (Out of 5)', 'Attendance', 'Stipend Status', 'Date', 'Supervisor', 'Status'];
    const rows = companyReports.map(r => [
      r.id,
      `"${r.studentName || ''}"`,
      r.studentEmail || '',
      `"${r.internshipTitle || ''}"`,
      `"${r.reportTitle || ''}"`,
      `"${r.reportType || ''}"`,
      `"${r.period || ''}"`,
      r.rating || 5,
      r.attendance || '100%',
      `"${r.stipendStatus || ''}"`,
      r.submissionDate,
      `"${r.supervisorName || ''}"`,
      r.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${company.name.replace(/\s+/g, '_')}_Internship_Reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onAddToast) onAddToast('📊 Internship reports exported as CSV successfully!', 'success');
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!roleTitle || !supervisorName || !supervisorPhone) {
      onAddToast('Please fill out all mandatory role and supervisor details.', 'danger');
      return;
    }

    const newOpportunity = {
      id: `int-${Date.now()}`,
      title: roleTitle,
      trackType,
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-emerald"
              onClick={() => setActiveTab('post-role')}
            >
              <PlusCircle size={16} /> Post New Opportunity
            </button>
            {onLogout && (
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={onLogout}
                style={{ 
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '700',
                  padding: '0.6rem 1rem'
                }}
              >
                <LogOut size={15} /> Exit / Log Out
              </button>
            )}
          </div>
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
            onClick={() => setActiveTab('reports')}
            style={{
              background: activeTab === 'reports' ? 'var(--verified-color)' : '#f1f5f9',
              border: 'none',
              color: activeTab === 'reports' ? '#fff' : 'var(--text-dim)',
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
            <FileText size={15} /> Student Reports & Progress ({companyReports.length})
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

            <div className="grid-3">
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
                <label className="form-label">Internship Track <span className="required">*</span></label>
                <select className="form-select" value={trackType} onChange={(e) => setTrackType(e.target.value)}>
                  <option value="IT">💻 IT Track (Tech, Software & AI)</option>
                  <option value="Non-IT">🏢 Non-IT Track (Business, HR & Finance)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Industry Category</label>
                <select className="form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <optgroup label="💻 IT Domains">
                    <option value="Software & IT">Software & IT</option>
                    <option value="Artificial Intelligence">Artificial Intelligence & ML</option>
                    <option value="Data & Analytics">Data Science & Analytics</option>
                    <option value="Cloud & DevOps">Cloud Infrastructure & DevOps</option>
                    <option value="Cybersecurity">Cybersecurity & Networking</option>
                  </optgroup>
                  <optgroup label="🏢 Non-IT Domains">
                    <option value="Human Resources">Human Resources & Talent Acquisition</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Business Development">Business Development & Sales</option>
                    <option value="Operations & Logistics">Operations & Supply Chain</option>
                    <option value="Content & Marketing">Content Writing, PR & Marketing</option>
                    <option value="Design & Media">UI/UX & Creative Design</option>
                  </optgroup>
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
                          <td>
                            <strong style={{ color: '#fff' }}>{item.title}</strong>
                            {item.trackType && (
                              <span style={{ 
                                marginLeft: '8px', 
                                fontSize: '0.7rem', 
                                padding: '2px 7px', 
                                borderRadius: '4px', 
                                background: item.trackType === 'Non-IT' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)', 
                                color: item.trackType === 'Non-IT' ? '#fbbf24' : '#60a5fa', 
                                fontWeight: '700',
                                border: `1px solid ${item.trackType === 'Non-IT' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(59, 130, 246, 0.35)'}`
                              }}>
                                {item.trackType === 'Non-IT' ? '🏢 Non-IT' : '💻 IT'}
                              </span>
                            )}
                          </td>
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

            {/* AI Resume Screening & ATS Candidate Match Engine Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.35), rgba(15, 23, 42, 0.85))',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)',
                  flexShrink: 0
                }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      AI Resume Reader & Intelligent Screening
                    </span>
                    <span className="badge badge-verified" style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                      Active
                    </span>
                  </div>
                  <strong style={{ fontSize: '1.05rem', color: '#ffffff', display: 'block' }}>
                    Deep Candidate Match Engine & Tailored Interview Guide
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                    Click "🤖 AI Resume Reader & Screen" on any candidate to inspect parsed skills, project depth, ATS compliance, and custom interview questions.
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setActiveAIResumeCandidate(companyApps[0] || { studentName: 'External Candidate', internshipTitle: 'Software Development' });
                  setShowAIResumeModal(true);
                }}
                style={{
                  background: 'linear-gradient(90deg, #0284c7, #2563eb)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.55rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <Upload size={14} /> Screen Any External Resume
              </button>
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
                              <button 
                                type="button"
                                onClick={() => {
                                  setActiveAIResumeCandidate(app);
                                  setShowAIResumeModal(true);
                                }}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.15)',
                                  border: '1px solid #0284c7',
                                  color: '#38bdf8',
                                  fontSize: '0.78rem',
                                  fontWeight: '700',
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <Sparkles size={13} style={{ color: '#38bdf8' }} /> 🤖 AI Resume Reader & Screen
                              </button>
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
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'flex-start' }}>
                                  <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff', fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}>
                                    🎉 Selected & Hired for Vacant Seat ✓
                                  </span>
                                  <button 
                                    type="button"
                                    className="btn btn-sm"
                                    onClick={() => {
                                      handleOpenUploadForStudent(app);
                                      setActiveTab('reports');
                                    }}
                                    style={{
                                      background: '#0284c7',
                                      color: '#ffffff',
                                      border: 'none',
                                      borderRadius: '6px',
                                      padding: '0.35rem 0.75rem',
                                      fontSize: '0.78rem',
                                      fontWeight: '700',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.35rem',
                                      boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)'
                                    }}
                                  >
                                    <Upload size={13} /> Upload Intern Report
                                  </button>
                                </div>
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

        {/* Tab: Internship Reports, Milestones & Progress */}
        {activeTab === 'reports' && (
          <div>
            {/* Header Banner */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <FileCheck size={13} /> Corporate Internship Evaluation Hub
                    </span>
                    <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      Verified Company Portal
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                    Intern Progress, Milestone & Final Reports
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '720px', lineHeight: '1.5' }}>
                    After awarding internships to students, record weekly milestones, upload performance evaluation reports, track stipend release status, and issue official completion sign-offs.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleExportReportsCSV}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                  >
                    <Download size={14} /> Export CSV Summary
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-emerald" 
                    onClick={() => handleOpenUploadForStudent(null)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', padding: '0.7rem 1.4rem' }}
                  >
                    <PlusCircle size={16} /> Upload New Report
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics KPI Bar */}
            <div className="grid-4" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hired Interns</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>{hiredStudents.length}</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reports Uploaded</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>{companyReports.length}</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Supervisor Rating</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {companyReports.length > 0 
                      ? (companyReports.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / companyReports.length).toFixed(1)
                      : '5.0'}
                    <span style={{ fontSize: '0.85rem', color: '#fbbf24' }}>★</span>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved Milestones</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
                    {companyReports.filter(r => r.status === 'Approved').length}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Hired Interns Roster */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} style={{ color: '#10b981' }} /> Active Hired Candidates ({hiredStudents.length})
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Students selected and awarded an internship at {company.name}. Click "Upload Report" on any intern to attach milestone reviews.
                  </span>
                </div>
                {hiredStudents.length > 0 && (
                  <span className="badge badge-verified">
                    {hiredStudents.length} Assigned {hiredStudents.length === 1 ? 'Intern' : 'Interns'} Active
                  </span>
                )}
              </div>

              {hiredStudents.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                  {hiredStudents.map(student => {
                    const studentReportCount = companyReports.filter(r => 
                      (r.applicationId && r.applicationId === student.id) ||
                      (r.studentEmail && r.studentEmail.toLowerCase() === (student.studentEmail || '').toLowerCase()) ||
                      (r.studentName && r.studentName.toLowerCase() === (student.studentName || '').toLowerCase())
                    ).length;

                    return (
                      <div 
                        key={student.id} 
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.85rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #10b981)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem' }}>
                                {(student.studentName || 'S').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong style={{ color: '#fff', fontSize: '0.98rem', display: 'block' }}>{student.studentName}</strong>
                                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{student.studentEmail}</span>
                              </div>
                            </div>
                            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.72rem' }}>
                              Hired Intern ✓
                            </span>
                          </div>

                          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                            <div style={{ fontWeight: '600', color: '#f8fafc', marginBottom: '2px' }}>{student.internshipTitle}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                              {student.studentCollege || 'Engineering College'} • {student.studentDegree || 'B.Tech'}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', padding: '0 0.2rem' }}>
                            <span>📞 {student.studentPhone || 'Contact verified'}</span>
                            <span style={{ color: '#38bdf8', fontWeight: '600' }}>{studentReportCount} Reports Filed</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <button
                            type="button"
                            className="btn btn-emerald btn-sm"
                            onClick={() => handleOpenUploadForStudent(student)}
                            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontWeight: '700' }}
                          >
                            <Upload size={13} /> + Upload Report
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setSelectedStudentFilter(student.studentName);
                            }}
                            title="Filter reports by this student"
                            style={{ padding: '0.4rem 0.65rem' }}
                          >
                            <Filter size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.12)' }}>
                  <Users size={34} style={{ color: '#38bdf8', marginBottom: '0.75rem' }} />
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                    No Students Hired Yet
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '560px', margin: '0 auto 1.25rem', lineHeight: '1.5' }}>
                    Once you review applications in the <strong>Applicant Manager</strong> tab and click <strong>Select Candidate & Send Result to Admin</strong>, their profile will automatically appear here to upload milestone progress reports.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setActiveTab('applicants')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Users size={14} /> Open Applicant Manager
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-emerald" 
                      onClick={() => handleOpenUploadForStudent(null)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <PlusCircle size={14} /> Upload Custom Intern Report
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Search reports by student name, role, title, or keywords..."
                      value={reportSearchTerm}
                      onChange={(e) => setReportSearchTerm(e.target.value)}
                      style={{ paddingLeft: '2.25rem', margin: 0 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Filter size={14} style={{ color: 'var(--text-dim)' }} />
                    <select 
                      className="form-select" 
                      value={selectedReportCategoryFilter} 
                      onChange={(e) => setSelectedReportCategoryFilter(e.target.value)}
                      style={{ margin: 0, padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                    >
                      <option value="all">📁 All Report Categories</option>
                      <option value="Monthly Milestone Report">🎯 Monthly Milestone Report</option>
                      <option value="Weekly Progress Report">📊 Weekly Progress Report</option>
                      <option value="Mid-Term Evaluation">🛠️ Mid-Term Project Evaluation</option>
                      <option value="Final Internship Completion Report">🎓 Final Completion Report</option>
                      <option value="Performance Appraisal">🌟 Performance Appraisal</option>
                      <option value="Attendance & Stipend Log">💼 Attendance & Stipend Log</option>
                    </select>
                  </div>

                  <select 
                    className="form-select" 
                    value={selectedStudentFilter} 
                    onChange={(e) => setSelectedStudentFilter(e.target.value)}
                    style={{ margin: 0, padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                  >
                    <option value="all">👤 All Interns</option>
                    {Array.from(new Set(companyReports.map(r => r.studentName).filter(Boolean))).map(sName => (
                      <option key={sName} value={sName}>Intern: {sName}</option>
                    ))}
                  </select>

                  {(reportSearchTerm || selectedReportCategoryFilter !== 'all' || selectedStudentFilter !== 'all') && (
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => {
                        setReportSearchTerm('');
                        setSelectedReportCategoryFilter('all');
                        setSelectedStudentFilter('all');
                      }}
                      style={{ padding: '0.55rem 0.85rem' }}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Reports List */}
            {(() => {
              const filteredReports = companyReports.filter(rep => {
                if (selectedReportCategoryFilter !== 'all' && rep.reportType !== selectedReportCategoryFilter) {
                  return false;
                }
                if (selectedStudentFilter !== 'all' && rep.studentName !== selectedStudentFilter) {
                  return false;
                }
                if (reportSearchTerm.trim()) {
                  const q = reportSearchTerm.toLowerCase();
                  const inStudent = (rep.studentName || '').toLowerCase().includes(q);
                  const inTitle = (rep.reportTitle || '').toLowerCase().includes(q);
                  const inRole = (rep.internshipTitle || '').toLowerCase().includes(q);
                  const inType = (rep.reportType || '').toLowerCase().includes(q);
                  const inRemarks = (rep.supervisorRemarks || '').toLowerCase().includes(q);
                  if (!inStudent && !inTitle && !inRole && !inType && !inRemarks) return false;
                }
                return true;
              });

              if (filteredReports.length === 0) {
                return (
                  <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <FileText size={28} />
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                      No Internship Reports Found
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                      {companyReports.length === 0
                        ? 'No progress or evaluation reports have been uploaded yet for this company.'
                        : 'No reports match your current filter criteria. Try adjusting or clearing search terms.'}
                    </p>
                    <button 
                      type="button" 
                      className="btn btn-emerald" 
                      onClick={() => handleOpenUploadForStudent(hiredStudents[0] || null)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}
                    >
                      <PlusCircle size={15} /> Upload First Student Report
                    </button>
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredReports.map(rep => {
                    const typeColor = 
                      rep.reportType === 'Final Internship Completion Report' ? '#a855f7' :
                      rep.reportType === 'Monthly Milestone Report' ? '#3b82f6' :
                      rep.reportType === 'Mid-Term Evaluation' ? '#f59e0b' :
                      rep.reportType === 'Weekly Progress Report' ? '#06b6d4' : '#10b981';

                    return (
                      <div 
                        key={rep.id} 
                        className="glass-card" 
                        style={{
                          padding: '1.5rem',
                          borderRadius: '14px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${typeColor}22`, border: `1px solid ${typeColor}55`, color: typeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', flexShrink: 0 }}>
                              <FileCheck size={24} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2px' }}>
                                <span className="badge" style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}40`, fontSize: '0.72rem', fontWeight: '700' }}>
                                  {rep.reportType}
                                </span>
                                {rep.period && (
                                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    • Period: <strong style={{ color: '#e2e8f0' }}>{rep.period}</strong>
                                  </span>
                                )}
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                  • Date: <strong style={{ color: '#e2e8f0' }}>{rep.submissionDate}</strong>
                                </span>
                              </div>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                                {rep.reportTitle}
                              </h3>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-verified" style={{ background: rep.status === 'Approved' ? '#16a34a' : 'rgba(245, 158, 11, 0.2)', color: '#fff', fontSize: '0.78rem' }}>
                              {rep.status === 'Approved' ? 'Approved ✓' : rep.status || 'Under Review'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(245, 158, 11, 0.15)', padding: '0.25rem 0.55rem', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={13} 
                                  fill={i < (rep.rating || 5) ? '#fbbf24' : 'none'} 
                                  color={i < (rep.rating || 5) ? '#fbbf24' : '#64748b'} 
                                />
                              ))}
                              <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '800', marginLeft: '4px' }}>
                                {rep.rating || 5}.0
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Student & Project Details Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '0.75rem',
                          background: 'rgba(0,0,0,0.25)',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          marginBottom: '1rem',
                          fontSize: '0.82rem'
                        }}>
                          <div>
                            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Student Intern</span>
                            <strong style={{ color: '#fff' }}>{rep.studentName}</strong>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{rep.studentEmail}</div>
                          </div>

                          <div>
                            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Internship Opportunity</span>
                            <strong style={{ color: '#38bdf8' }}>{rep.internshipTitle}</strong>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{rep.studentCollege || company.name}</div>
                          </div>

                          <div>
                            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Supervisor Evaluation</span>
                            <strong style={{ color: '#e2e8f0' }}>{rep.supervisorName}</strong>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{rep.supervisorDesignation || 'Supervisor'}</div>
                          </div>

                          <div>
                            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Attendance & Stipend</span>
                            <span style={{ color: '#34d399', fontWeight: '700' }}>Attendance: {rep.attendance || '100%'}</span>
                            <div style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>{rep.stipendStatus || 'Processed'}</div>
                          </div>
                        </div>

                        {/* Deliverables & Remarks Excerpts */}
                        <div style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                          {rep.keyDeliverables && (
                            <div style={{ marginBottom: '0.5rem' }}>
                              <strong style={{ color: '#e2e8f0', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>
                                📌 Key Deliverables Completed:
                              </strong>
                              <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.45', whiteSpace: 'pre-line' }}>
                                {rep.keyDeliverables}
                              </p>
                            </div>
                          )}

                          {rep.supervisorRemarks && (
                            <div style={{ background: 'rgba(59, 130, 246, 0.08)', borderLeft: '3px solid #3b82f6', padding: '0.65rem 0.85rem', borderRadius: '0 8px 8px 0', marginTop: '0.5rem' }}>
                              <strong style={{ color: '#93c5fd', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>
                                💬 Supervisor Remarks & Recommendation:
                              </strong>
                              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.82rem', lineHeight: '1.45', fontStyle: 'italic' }}>
                                "{rep.supervisorRemarks}"
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Footer Bar: Attached File + Action Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.85rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.78rem', color: '#e2e8f0' }}>
                              <FileText size={13} style={{ color: '#38bdf8' }} />
                              <strong>{rep.fileName || 'Evaluation_Report.pdf'}</strong>
                              <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>({rep.fileSize || '1.8 MB'})</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setActiveViewingReport(rep);
                                setShowViewReportModal(true);
                              }}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}
                            >
                              <Eye size={13} /> View Full Report
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleDownloadReport(rep)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', background: '#0284c7', color: '#fff', border: 'none' }}
                            >
                              <Download size={13} /> Download File
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleOpenEditReport(rep)}
                              title="Edit Report"
                              style={{ padding: '0.35rem 0.6rem' }}
                            >
                              <Edit3 size={13} />
                            </button>

                            {onDeleteReport && (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete the report '${rep.reportTitle}' for ${rep.studentName}?`)) {
                                    onDeleteReport(rep.id);
                                  }
                                }}
                                title="Delete Report"
                                style={{ padding: '0.35rem 0.6rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
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

        {/* Upload / Edit Internship Report Modal */}
        {showUploadReportModal && (
          <div className="modal-overlay" onClick={() => setShowUploadReportModal(false)}>
            <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
                      {editingReportId ? 'Edit Internship Progress Report' : 'Upload Student Internship Report'}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Post-hiring performance milestone, deliverables & supervisor appraisal
                    </span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowUploadReportModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitReport}>
                {/* 1. Student Selection */}
                <div className="form-group">
                  <label className="form-label">
                    Select Hired Candidate / Intern <span className="required">*</span>
                  </label>
                  <select 
                    className="form-select" 
                    value={reportStudentAppId} 
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setReportStudentAppId(selectedVal);
                      if (selectedVal && selectedVal !== 'custom') {
                        const matched = allCompanyApplications.find(a => String(a.id) === String(selectedVal));
                        if (matched) {
                          setCustomStudentName(matched.studentName);
                          setCustomStudentEmail(matched.studentEmail);
                          setCustomRoleTitle(matched.internshipTitle);
                          if (!formReportTitle) {
                            setFormReportTitle(`Month 1 Progress & Performance Evaluation - ${matched.studentName}`);
                          }
                          setFormFileName(`${matched.studentName.replace(/\s+/g, '_')}_Milestone_Report.pdf`);
                          setFormFileSize('1.8 MB');
                        }
                      }
                    }}
                  >
                    <option value="">-- Choose from Awarded / Hired Candidates --</option>
                    {hiredStudents.map(app => (
                      <option key={app.id} value={app.id}>
                        {app.studentName} — {app.internshipTitle} ({app.studentEmail})
                      </option>
                    ))}
                    {/* Fallback to any company applicants */}
                    {allCompanyApplications.filter(a => a.status !== 'Selected' && a.status !== 'Hired').map(app => (
                      <option key={app.id} value={app.id}>
                        [Candidate] {app.studentName} — {app.internshipTitle}
                      </option>
                    ))}
                    <option value="custom">✏️ Enter Custom Intern Details Manually</option>
                  </select>
                </div>

                {(!reportStudentAppId || reportStudentAppId === 'custom') && (
                  <div className="grid-3" style={{ gap: '0.75rem', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.85rem', borderRadius: '8px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Student Full Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Adithya S"
                        value={customStudentName}
                        onChange={(e) => setCustomStudentName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Student Email <span className="required">*</span></label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="student@university.edu"
                        value={customStudentEmail}
                        onChange={(e) => setCustomStudentEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Internship Role</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Full-Stack Web Development Intern"
                        value={customRoleTitle}
                        onChange={(e) => setCustomRoleTitle(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* 2. Report Category & Title */}
                <div className="grid-2" style={{ gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Report Category <span className="required">*</span></label>
                    <select 
                      className="form-select"
                      value={formReportType}
                      onChange={(e) => setFormReportType(e.target.value)}
                      required
                    >
                      <option value="Monthly Milestone Report">🎯 Monthly Milestone Report</option>
                      <option value="Weekly Progress Report">📊 Weekly Progress Report</option>
                      <option value="Mid-Term Evaluation">🛠️ Mid-Term Project Evaluation</option>
                      <option value="Final Internship Completion Report">🎓 Final Internship Completion Report</option>
                      <option value="Performance Appraisal">🌟 Performance Appraisal & Supervisor Review</option>
                      <option value="Attendance & Stipend Log">💼 Attendance & Stipend Disbursal Log</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Milestone Period</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Month 1 (Sprint 1-4) or Final Review"
                      value={formPeriod}
                      onChange={(e) => setFormPeriod(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Report Title <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Month 1 Progress & Milestone Evaluation Report"
                    value={formReportTitle}
                    onChange={(e) => setFormReportTitle(e.target.value)}
                    required
                  />
                </div>

                {/* 3. Rating & Attendance Record */}
                <div className="grid-3" style={{ gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Performance Rating (1-5)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '6px' }}>
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setFormRating(starVal)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            color: starVal <= formRating ? '#fbbf24' : '#64748b'
                          }}
                        >
                          <Star size={22} fill={starVal <= formRating ? '#fbbf24' : 'none'} />
                        </button>
                      ))}
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fbbf24', marginLeft: '6px' }}>
                        {formRating} / 5
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attendance Record</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 98% / 100%"
                      value={formAttendance}
                      onChange={(e) => setFormAttendance(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stipend Status</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Processed (₹15,000)"
                      value={formStipendStatus}
                      onChange={(e) => setFormStipendStatus(e.target.value)}
                    />
                  </div>
                </div>

                {/* 4. Deliverables & Remarks */}
                <div className="form-group">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Key Project Deliverables / Responsibilities</label>
                    <button 
                      type="button" 
                      onClick={handleAutofillTemplate}
                      style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      ✨ Load Template Fill
                    </button>
                  </div>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    placeholder="List specific modules built, tickets resolved, and technologies used by the intern..."
                    value={formKeyDeliverables}
                    onChange={(e) => setFormKeyDeliverables(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Supervisor Written Feedback & Remarks</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    placeholder="Provide qualitative feedback on communication, code quality, punctuality, and next milestones..."
                    value={formSupervisorRemarks}
                    onChange={(e) => setFormSupervisorRemarks(e.target.value)}
                  />
                </div>

                {/* 5. Document / File Attachment */}
                <div className="form-group">
                  <label className="form-label">Attach Official Report Document / Certificate (PDF / DOC)</label>
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                    onDragLeave={() => setIsDraggingFile(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    style={{
                      border: `2px dashed ${isDraggingFile ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)'}`,
                      borderRadius: '10px',
                      padding: '1.25rem',
                      textAlign: 'center',
                      background: isDraggingFile ? 'rgba(56, 189, 248, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const input = document.getElementById('report-file-picker');
                      if (input) input.click();
                    }}
                  >
                    <input 
                      id="report-file-picker"
                      type="file" 
                      accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />
                    <Upload size={24} style={{ color: '#38bdf8', marginBottom: '0.4rem' }} />
                    <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: '600' }}>
                      Click to browse or drag & drop evaluation report file
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Supports PDF, DOC, DOCX up to 10MB
                    </span>
                  </div>

                  {formFileName && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.5rem 0.85rem', borderRadius: '8px', marginTop: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#fff' }}>
                        <FileCheck size={16} style={{ color: '#38bdf8' }} />
                        <strong>{formFileName}</strong>
                        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({formFileSize || '1.5 MB'})</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setFormFileName(''); setFormFileSize(''); }}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* 6. Status & Submit */}
                <div className="grid-2" style={{ gap: '0.75rem', alignItems: 'center', marginTop: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ marginBottom: '4px' }}>Approval Status</label>
                    <select 
                      className="form-select" 
                      value={formStatus} 
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="Approved">Approved ✓ (Sign-Off Granted)</option>
                      <option value="Under Review">Under Review ⏳ (Draft Milestone)</option>
                      <option value="Final Certified">Final Certified 🎓 (Internship Completed)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.2rem' }}>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowUploadReportModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-emerald" 
                      style={{ padding: '0.75rem 1.75rem', fontWeight: '700' }}
                    >
                      {editingReportId ? 'Save Changes' : 'Upload & Publish Report'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View / Preview Report Modal */}
        {showViewReportModal && activeViewingReport && (
          <div className="modal-overlay" onClick={() => setShowViewReportModal(false)}>
            <div className="modal-content" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', background: '#0b1120', border: '1px solid rgba(56, 189, 248, 0.4)' }} onClick={(e) => e.stopPropagation()}>
              {/* Report Header with Corporate Letterhead */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <span className="badge badge-verified" style={{ marginBottom: '0.4rem', background: '#16a34a', color: '#fff' }}>
                    Official Corporate Evaluation Report ✓
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', margin: '4px 0' }}>
                    {activeViewingReport.companyName}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {company.location || 'Bangalore, India'} • Contact: {activeViewingReport.supervisorEmail || company.businessEmail}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Report ID</div>
                  <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>{activeViewingReport.id}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
                    Date: {activeViewingReport.submissionDate}
                  </div>
                </div>
              </div>

              {/* Title & Badge */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                    {activeViewingReport.reportType}
                  </span>
                  {activeViewingReport.period && (
                    <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                      {activeViewingReport.period}
                    </span>
                  )}
                  <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff' }}>
                    {activeViewingReport.status}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                  {activeViewingReport.reportTitle}
                </h3>
              </div>

              {/* Intern Information Box */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Candidate & Academic Particulars
                </h4>
                <div className="grid-2" style={{ gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>Candidate Name</span>
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{activeViewingReport.studentName}</strong>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{activeViewingReport.studentEmail} • {activeViewingReport.studentPhone || 'Phone Verified'}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>Opportunity Role</span>
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{activeViewingReport.internshipTitle}</strong>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{activeViewingReport.studentCollege || 'University Candidate'}</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Breakdown */}
              <div className="grid-3" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '0.85rem' }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>Overall Rating</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill={i < (activeViewingReport.rating || 5) ? '#fbbf24' : 'none'} color={i < (activeViewingReport.rating || 5) ? '#fbbf24' : '#64748b'} />
                    ))}
                    <strong style={{ color: '#fbbf24', marginLeft: '6px' }}>{activeViewingReport.rating || 5}.0 / 5.0</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '0.85rem' }}>
                  <span style={{ color: '#34d399', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>Attendance Record</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                    {activeViewingReport.attendance || '100%'}
                  </div>
                </div>

                <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', padding: '0.85rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>Stipend Status</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginTop: '2px' }}>
                    {activeViewingReport.stipendStatus || 'Approved'}
                  </div>
                </div>
              </div>

              {/* Deliverables Section */}
              {activeViewingReport.keyDeliverables && (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Key Project Deliverables & Tasks Completed
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                    {activeViewingReport.keyDeliverables}
                  </p>
                </div>
              )}

              {/* Supervisor Remarks */}
              {activeViewingReport.supervisorRemarks && (
                <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <h4 style={{ color: '#93c5fd', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Supervisor Evaluation & Recommendations
                  </h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                    "{activeViewingReport.supervisorRemarks}"
                  </p>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(59, 130, 246, 0.2)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Evaluator: <strong>{activeViewingReport.supervisorName}</strong></span>
                    <span>Designation: <strong>{activeViewingReport.supervisorDesignation || 'Supervisor'}</strong></span>
                  </div>
                </div>
              )}

              {/* Attached File Download & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={16} style={{ color: '#38bdf8' }} />
                  <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600' }}>
                    {activeViewingReport.fileName || 'Report_Document.pdf'}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    ({activeViewingReport.fileSize || '1.8 MB'})
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => window.print()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Printer size={13} /> Print
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-emerald btn-sm"
                    onClick={() => handleDownloadReport(activeViewingReport)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}
                  >
                    <Download size={13} /> Download Report
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowViewReportModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ======================================================== */}
        {/* AI RESUME READER & CANDIDATE SCREENING MODAL             */}
        {/* ======================================================== */}
        {showAIResumeModal && activeAIResumeCandidate && (
          <AIResumeReaderModal
            candidate={activeAIResumeCandidate}
            targetJob={companyListings.find(j => j.id === activeAIResumeCandidate.internshipId || j.title === activeAIResumeCandidate.internshipTitle) || { title: activeAIResumeCandidate.internshipTitle, companyName: company.name }}
            isOpen={showAIResumeModal}
            onClose={() => setShowAIResumeModal(false)}
            onSelectCandidate={(appId, decision) => {
              if (onUpdateAppStatus) onUpdateAppStatus(appId, decision);
              if (onAddToast) onAddToast(`Candidate selected & hired for vacant seat!`, 'success');
            }}
            onAddToast={onAddToast}
            userRole="company"
          />
        )}

      </div>
    </div>
  );
}

