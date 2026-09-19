import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowseInternshipsPage from './pages/BrowseInternshipsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ResumeTemplatesPage from './pages/ResumeTemplatesPage';
import AboutUsPage from './pages/AboutUsPage';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import InternshipModal from './components/InternshipModal';
import LoginPage from './components/LoginPage';

import { 
  INITIAL_INTERNSHIPS, 
  INITIAL_COMPANIES, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_STUDENTS_LIST, 
  INITIAL_APPLICATIONS, 
  INITIAL_COMPLAINTS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_BLOGS, 
  INITIAL_FAQS, 
  INITIAL_TESTIMONIALS 
} from './data/mockData';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'browse', 'how-it-works', 'resume-templates', 'for-companies', 'about', 'student-dash', 'company-dash', 'admin-dash', 'login'
  const [currentRole, setCurrentRole] = useState('visitor'); // 'visitor', 'student', 'company', 'admin'

  // Portal Login Authentication State (Guards dashboards until credentials entered)
  const [authenticatedRoles, setAuthenticatedRoles] = useState({
    student: false,
    company: false,
    admin: false
  });

  // Application Datasets State
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [currentLoggedInCompanyId, setCurrentLoggedInCompanyId] = useState('comp-101');
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [students, setStudents] = useState(INITIAL_STUDENTS_LIST);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Modal State
  const [modalInternship, setModalInternship] = useState(null);

  // Toast Notification State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const addAuditLog = (action, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentRole === 'admin' ? 'Admin (admin@interncatalyst.org)' : currentRole === 'company' ? 'Employer' : 'Student',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Unified Student Profile & Admin Store 1 Synchronizer (No Duplicates)
  const handleUpdateStudentProfile = (updatedProfile) => {
    setStudentProfile(prev => {
      const merged = typeof updatedProfile === 'function' ? updatedProfile(prev) : { ...prev, ...updatedProfile };
      
      // Synchronize into students array for Admin Dashboard (Store 1)
      setStudents(prevList => {
        const emailToMatch = (merged.email || '').toLowerCase();
        const existingIdx = prevList.findIndex(s => s.email && s.email.toLowerCase() === emailToMatch);
        
        const formattedRecord = {
          id: merged.id || (existingIdx !== -1 ? prevList[existingIdx].id : `std-${Date.now()}`),
          name: merged.name || merged.fullName || 'Registered Student',
          fullName: merged.name || merged.fullName || 'Registered Student',
          email: merged.email || '',
          phone: merged.phone || '',
          avatar: merged.avatar || (existingIdx !== -1 ? prevList[existingIdx].avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'),
          collegeName: merged.institution || merged.collegeName || '',
          institution: merged.institution || merged.collegeName || '',
          degree: merged.degree || 'B.Tech CS',
          branch: merged.branch || 'Computer Science & Engineering',
          yearOfStudy: merged.yearOfStudy || merged.currentYearOrSemester || '4th Year',
          currentYearOrSemester: merged.yearOfStudy || merged.currentYearOrSemester || '4th Year',
          cgpa: merged.cgpa || merged.cgpaOrPercentage || '',
          cgpaOrPercentage: merged.cgpa || merged.cgpaOrPercentage || '',
          graduationYear: merged.graduationYear || '2026',
          dateOfBirth: merged.dateOfBirth || '',
          gender: merged.gender || 'Male',
          city: merged.city || '',
          state: merged.state || '',
          internshipPreference: merged.internshipPreference || 'Remote / Online',
          preferredDomain: merged.domain || merged.preferredDomain || 'Software Development',
          domain: merged.domain || merged.preferredDomain || 'Software Development',
          skills: Array.isArray(merged.skills) ? merged.skills : (merged.skills ? merged.skills.split(',').map(s => s.trim()) : []),
          resumeUrl: merged.resumeUrl || merged.resumeLink || '',
          resumeLink: merged.resumeUrl || merged.resumeLink || '',
          linkedinUrl: merged.linkedinUrl || merged.linkedin || '',
          linkedin: merged.linkedinUrl || merged.linkedin || '',
          githubUrl: merged.githubUrl || merged.github || '',
          github: merged.githubUrl || merged.github || '',
          createdAt: merged.createdAt || new Date().toISOString(),
          status: merged.status || 'Active'
        };

        if (existingIdx !== -1) {
          // UPDATE EXISTING RECORD IN-PLACE TO PREVENT DUPLICATES
          const copy = [...prevList];
          copy[existingIdx] = { ...copy[existingIdx], ...formattedRecord };
          return copy;
        } else {
          // ADD NEW UNIQUE STUDENT
          return [formattedRecord, ...prevList];
        }
      });

      return merged;
    });
  };

  const handleAdminUpdateStudents = (updatedList) => {
    setStudents(updatedList);
    if (studentProfile && studentProfile.id) {
      const updatedMatch = updatedList.find(s => s.id === studentProfile.id || (s.email && studentProfile.email && s.email.toLowerCase() === studentProfile.email.toLowerCase()));
      if (updatedMatch) {
        setStudentProfile(prev => ({ ...prev, ...updatedMatch }));
      }
    }
  };

  const handleLoginSuccess = (role, userEmail, userObj = null, token = null) => {
    setAuthenticatedRoles(prev => ({ ...prev, [role]: true }));
    setCurrentRole(role);

    if (role === 'student') {
      if (userObj) {
        handleUpdateStudentProfile(userObj);
      } else if (userEmail) {
        const displayName = userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        handleUpdateStudentProfile({
          id: `std-${Date.now()}`,
          name: displayName,
          fullName: displayName,
          email: userEmail,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
          status: 'Active',
          isRegistered: false
        });
      }
      setActiveTab('student-dash');
    } else if (role === 'company') {
      if (userObj && userObj.id) {
        setCurrentLoggedInCompanyId(userObj.id);
      } else {
        const found = companies.find(c => c.businessEmail && c.businessEmail.toLowerCase() === (userEmail || '').toLowerCase());
        if (found) setCurrentLoggedInCompanyId(found.id);
      }
      setActiveTab('company-dash');
    } else {
      setActiveTab('admin-dash');
    }
    
    addAuditLog('USER_AUTHENTICATED', `User '${userEmail}' successfully logged into ${role.toUpperCase()} portal.`);
    addToast(`Authenticated as ${role.toUpperCase()}! Welcome to InternCatalyst.`, 'success');
  };

  const handleLogoutRole = (role) => {
    setAuthenticatedRoles(prev => ({ ...prev, [role]: false }));
    setCurrentRole('visitor');
    setActiveTab('home');
    addAuditLog('USER_LOGOUT', `Logged out from ${role.toUpperCase()} portal.`);
    addToast(`Logged out from ${role.toUpperCase()} portal.`, 'info');
  };

  // Student application submission handler with resume storage & confirmation email
  const handleConfirmApply = async (internshipId, formData) => {
    const targetInternship = internships.find(i => i.id === internshipId);
    if (!targetInternship) return;

    const applicantEmail = formData.email || studentProfile.email;
    const applicantPhone = formData.phone || studentProfile.phone;
    const resumeName = formData.resumeName || `${studentProfile.name.replace(/\s+/g, '_')}_ATS_Resume.pdf`;

    const newApp = {
      id: `app-${Date.now()}`,
      internshipId,
      internshipTitle: targetInternship.title,
      companyId: targetInternship.companyId,
      companyName: targetInternship.companyName,
      verifiedCompany: targetInternship.verified,
      studentId: studentProfile.id,
      studentName: formData.name || studentProfile.name,
      studentEmail: applicantEmail,
      studentPhone: applicantPhone,
      studentCollege: formData.college || studentProfile.institution || 'Accredited Institution',
      studentDegree: formData.course || studentProfile.degree || 'B.Tech / B.E.',
      studentYear: formData.yearOfStudy || studentProfile.yearOfStudy || '4th Year',
      studentCgpa: studentProfile.cgpa || '',
      studentSkills: studentProfile.skills || ['Web Development', 'Problem Solving'],
      linkedinUrl: formData.linkedinUrl || studentProfile.linkedinUrl || '',
      githubUrl: formData.githubUrl || studentProfile.githubUrl || '',
      resumeName,
      resumeUrl: studentProfile.resumeUrl || '',
      paymentAmount: formData.paymentAmount || '₹100.00',
      paymentStatus: formData.paymentStatus || 'Paid (Verified)',
      txnId: formData.txnId || `TXN_UPI_100_${Date.now().toString().slice(-6)}`,
      coverNote: formData.coverNote || 'Enthusiastic candidate applying with verified academic background and project skills.',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      stipend: targetInternship.stipendAmount,
      workMode: targetInternship.workMode,
      duration: targetInternship.duration || '3 Months',
      matchScore: 94,
      forwardedToEmployer: false,
      adminSelectionStatus: 'Pending Admin Vetting',
      employerDecision: 'Awaiting Admin Selection',
      confirmationEmailSent: true
    };

    // Synchronize with backend REST API to store application and dispatch email confirmation
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.application) {
          Object.assign(newApp, data.application);
        }
      }
    } catch (apiErr) {
      console.warn('Backend /api/applications unavailable, continuing with client state:', apiErr.message);
    }

    setApplications(prev => [newApp, ...prev]);
    
    // Update internship applicant count
    setInternships(prev => prev.map(item => item.id === internshipId ? { ...item, applicantsCount: item.applicantsCount + 1 } : item));
    
    // Update student profile details if provided
    setStudentProfile(prev => ({
      ...prev,
      name: formData.name || prev.name,
      institution: formData.college || prev.institution,
      degree: formData.course || prev.degree,
      yearOfStudy: formData.yearOfStudy || prev.yearOfStudy,
      email: applicantEmail,
      phone: applicantPhone,
      linkedinUrl: formData.linkedinUrl || prev.linkedinUrl,
      githubUrl: formData.githubUrl || prev.githubUrl
    }));

    addAuditLog('SUBMIT_APPLICATION', `Student '${newApp.studentName}' (${applicantEmail}) applied for '${targetInternship.title}' with resume '${resumeName}' & ₹100 payment (${newApp.txnId}). Confirmation email dispatched.`);
    addToast(`🎉 Application & ₹100 payment verified! Submitted to Central Admin Queue.`, 'success');
    addToast(`✉️ Confirmation email sent to ${applicantEmail}! Check your inbox.`, 'info');
    setModalInternship(null);
  };

  // Domain Role Application Handler (Students apply for their Domain Role, pooled across connected partner companies)
  const handleApplyDomainRole = async (domainRoleData, formData) => {
    const applicantEmail = formData.email || studentProfile.email;
    const applicantPhone = formData.phone || studentProfile.phone;
    const resumeName = formData.resumeName || `${(studentProfile.name || 'Student').replace(/\s+/g, '_')}_ATS_Resume.pdf`;

    const newApp = {
      id: `app-domain-${Date.now()}`,
      internshipId: `domain-${domainRoleData.id || 'track'}`,
      internshipTitle: `${domainRoleData.roleTitle} (Domain Track)`,
      companyId: 'connected-partners-pool',
      companyName: `Connected Partner Pool (${domainRoleData.connectedCompanies?.length || 0} Companies)`,
      domain: domainRoleData.domainName,
      isDomainApplication: true,
      connectedCompanies: (domainRoleData.connectedCompanies || []).map(c => c.name),
      verifiedCompany: true,
      studentId: studentProfile.id,
      studentName: formData.name || studentProfile.name,
      studentEmail: applicantEmail,
      studentPhone: applicantPhone,
      studentCollege: formData.college || studentProfile.institution || 'Accredited Institution',
      studentDegree: formData.course || studentProfile.degree || 'B.Tech / B.E.',
      studentYear: formData.yearOfStudy || studentProfile.yearOfStudy || '4th Year',
      studentCgpa: studentProfile.cgpa || '',
      studentSkills: studentProfile.skills || domainRoleData.skillsRequired || [],
      linkedinUrl: formData.linkedinUrl || studentProfile.linkedinUrl || '',
      githubUrl: formData.githubUrl || studentProfile.githubUrl || '',
      resumeName,
      resumeUrl: studentProfile.resumeUrl || '',
      paymentAmount: formData.paymentAmount || '₹100.00',
      paymentStatus: formData.paymentStatus || 'Paid (Verified)',
      txnId: formData.txnId || `TXN_UPI_DOMAIN_${Date.now().toString().slice(-6)}`,
      coverNote: formData.coverNote || `Domain-centric candidate application for ${domainRoleData.roleTitle}. Pooled across connected partner companies.`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      stipend: domainRoleData.stipendRange,
      workMode: domainRoleData.workMode,
      duration: domainRoleData.duration || '3-6 Months',
      matchScore: 96,
      forwardedToEmployer: false,
      adminSelectionStatus: 'Pending Admin Selection & Allocation',
      employerDecision: 'Pooled for Connected Employers',
      confirmationEmailSent: true
    };

    // Synchronize with backend REST API
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.application) {
          Object.assign(newApp, data.application);
        }
      }
    } catch (apiErr) {
      console.warn('Backend /api/applications unavailable, continuing with client state:', apiErr.message);
    }

    setApplications(prev => [newApp, ...prev]);

    // Synchronize updated contact info and domain to profile
    setStudentProfile(prev => ({
      ...prev,
      phone: applicantPhone,
      email: applicantEmail,
      domain: domainRoleData.domainName || prev.domain
    }));

    addAuditLog('SUBMIT_DOMAIN_APPLICATION', `Student '${newApp.studentName}' applied for '${domainRoleData.roleTitle}' across ${domainRoleData.connectedCompanies?.length || 0} connected partner companies.`);
    addToast(`🎉 Domain Application submitted! Pooled across all ${domainRoleData.connectedCompanies?.length || 0} connected partner companies.`, 'success');
    addToast(`✉️ Confirmation email sent to ${applicantEmail}! Central admin vetting initiated.`, 'info');
    return newApp;
  };

  // Proctored Assessment Completion Handler (Camera, Mic, Screen Sharing & Full Screen Verified)
  const handleCompleteAssessment = async (appId, results) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          assessmentScore: results.score,
          assessmentStatus: 'Completed',
          proctoringDetails: results.proctoringDetails,
          adminSelectionStatus: results.score >= 60 
            ? 'Passed Proctored Assessment (Vetted for Placement)' 
            : 'Assessment Completed (Under Review)'
        };
      }
      return app;
    }));

    // Synchronize to backend REST API
    try {
      await fetch('/api/applications/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appId, ...results })
      });
    } catch (err) {
      console.warn('Backend /api/applications/assessment unreachable, saved in memory:', err.message);
    }

    addAuditLog('ASSESSMENT_COMPLETED', `Student completed proctored assessment for application '${appId}' with score ${results.score}% (Camera, Mic, Screen, Fullscreen verified, Violations: ${results.violationsCount}).`);
  };

  // Employer Candidate Selection & Vacant Seat Management Handler
  const handleEmployerSelectCandidate = (appId, newStatus) => {
    const targetApp = applications.find(a => a.id === appId);
    if (!targetApp) return;

    const targetJob = internships.find(i => i.id === targetApp.internshipId || i.title === targetApp.internshipTitle);
    
    if ((newStatus === 'Selected' || newStatus === 'Hired') && targetJob) {
      const currentVacant = targetJob.vacantSeats !== undefined ? targetJob.vacantSeats : Math.max(0, targetJob.openings - (targetJob.hiredCount || 0));
      
      if (currentVacant <= 0) {
        addToast(`Cannot select candidate. All ${targetJob.openings} vacant seats for '${targetJob.title}' are already filled!`, 'danger');
        return;
      }

      // Decrement vacant seats and increment hired count
      const updatedVacant = currentVacant - 1;
      const updatedHired = (targetJob.hiredCount || 0) + 1;

      setInternships(prev => prev.map(job => 
        (job.id === targetJob.id) 
          ? { ...job, vacantSeats: updatedVacant, hiredCount: updatedHired } 
          : job
      ));

      setApplications(prev => prev.map(a => 
        a.id === appId 
          ? { ...a, status: 'Selected', employerDecision: 'Selected for Vacant Seat' } 
          : a
      ));

      addAuditLog('EMPLOYER_HIRED_CANDIDATE', `Employer '${targetApp.companyName}' selected '${targetApp.studentName}' for Vacant Seat on position '${targetApp.internshipTitle}'. Vacant Seats remaining: ${updatedVacant}.`);
      addToast(`🎉 Candidate '${targetApp.studentName}' selected & hired! Remaining Vacant Seats: ${updatedVacant}/${targetJob.openings}`, 'success');
    } else {
      setApplications(prev => prev.map(a => 
        a.id === appId 
          ? { ...a, status: newStatus, employerDecision: newStatus } 
          : a
      ));
      addAuditLog('UPDATE_APPLICATION_STATUS', `Employer set application '${appId}' status to '${newStatus}'.`);
      addToast(`Application status updated to ${newStatus}.`, 'info');
    }
  };

  // Application withdrawal handler
  const handleWithdrawApplication = (appId) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Withdrawn' } : a));
    addAuditLog('WITHDRAW_APPLICATION', `Student '${studentProfile.name}' withdrew application '${appId}'.`);
  };

  // Student Account deletion handler
  const handleDeleteStudentAccount = () => {
    setStudents(prev => prev.filter(s => s.id !== studentProfile.id));
    setCurrentRole('visitor');
    setActiveTab('home');
    addAuditLog('DELETE_STUDENT_ACCOUNT', `Student account '${studentProfile.name}' deleted per user request.`);
    addToast('Your student account has been permanently deleted.', 'info');
  };

  const DEFAULT_COMPANY = {
    id: "comp-101",
    name: "Nexus Tech Solutions",
    businessEmail: "hr@nexustech.io",
    contactPerson: "Dr. Rajesh V. Sharma",
    phone: "+91 98765 43210",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    website: "https://nexustech.io",
    industry: "Software & IT",
    location: "Bangalore, Karnataka",
    size: "50-200 Employees",
    verifiedBadge: true,
    verificationStatus: "Verified"
  };

  // Add new internship from employer wizard
  const handleAddInternship = (newJob) => {
    const formattedJob = {
      ...newJob,
      status: 'Approved', // Auto-approved so newly added internships are instantly visible platform-wide
      verified: true
    };
    setInternships(prev => [formattedJob, ...prev]);

    setCompanies(prev => {
      const exists = prev.some(c => c.id === newJob.companyId || c.name === newJob.companyName);
      if (!exists && newJob.companyName) {
        const newComp = {
          id: newJob.companyId || `comp-${Date.now()}`,
          name: newJob.companyName,
          businessEmail: newJob.supervisorEmail || 'hr@company.com',
          contactPerson: newJob.supervisorName || 'Recruiter Lead',
          phone: newJob.supervisorPhone || '+91 98765 43210',
          logo: newJob.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
          website: 'https://company.com',
          industry: newJob.industry || 'Software & IT',
          location: newJob.location || 'Bangalore, Karnataka',
          size: '50-200 Employees',
          verifiedBadge: true,
          verificationStatus: 'Verified'
        };
        return [newComp, ...prev];
      }
      return prev;
    });

    addAuditLog('CREATE_INTERNSHIP_POST', `Employer '${newJob.companyName}' posted new opportunity '${newJob.title}'.`);
  };

  // Guard Apply button: Direct students to their Domain Role in the Student Dashboard
  const handleAttemptApply = () => {
    if (currentRole !== 'student' || !authenticatedRoles.student) {
      addToast('Please log in to your Student account to apply for domain roles.', 'info');
      setActiveTab('login');
    } else {
      addToast('In accordance with platform rules, students apply for their Domain Role across connected companies. Redirecting to your Student Dashboard!', 'info');
      setActiveTab('student-dash');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      {/* Global Navigation Header with RBAC Persona Switcher */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentRole={currentRole} 
        setCurrentRole={setCurrentRole} 
        unreadNotificationsCount={3}
      />

      {/* Main Content Router View */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomePage 
            internships={internships}
            onSelectInternship={(job) => setModalInternship(job)}
            onApplyInternship={handleAttemptApply}
            setActiveTab={setActiveTab}
            setCurrentRole={setCurrentRole}
            testimonials={testimonials}
            blogs={blogs}
          />
        )}

        {activeTab === 'browse' && (
          <BrowseInternshipsPage 
            internships={internships}
            onSelectInternship={(job) => setModalInternship(job)}
            onApplyInternship={handleAttemptApply}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksPage 
            setActiveTab={setActiveTab} 
            setCurrentRole={setCurrentRole} 
          />
        )}

        {(activeTab === 'resume-templates' || activeTab === 'resources') && (
          <ResumeTemplatesPage />
        )}


        {activeTab === 'about' && (
          <AboutUsPage />
        )}

        {activeTab === 'login' && (
          <LoginPage targetRole="student" companies={companies} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'register' && !authenticatedRoles.student && (
          <StudentRegisterPage onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} onUpdateProfile={handleUpdateStudentProfile} onAddToast={addToast} />
        )}

        {(activeTab === 'student-dash' || activeTab === 'student-profile' || activeTab === 'student-register') && (
          !authenticatedRoles.student ? (
            <LoginPage targetRole="student" companies={companies} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />
          ) : (
            <StudentDashboard 
              profile={studentProfile}
              onUpdateProfile={handleUpdateStudentProfile}
              applications={applications}
              internships={internships}
              companies={companies}
              onApplyDomainRole={handleApplyDomainRole}
              onCompleteAssessment={handleCompleteAssessment}
              onWithdrawApplication={handleWithdrawApplication}
              onDeleteAccount={handleDeleteStudentAccount}
              onAddToast={addToast}
              onLogout={() => handleLogoutRole('student')}
              onLoginSuccess={handleLoginSuccess}
              initialTab="profile"
            />
          )
        )}

        {(activeTab === 'company-dash' || activeTab === 'for-companies') && (
          !authenticatedRoles.company ? (
            <LoginPage targetRole="company" companies={companies} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />
          ) : (
            <CompanyDashboard 
              company={companies.find(c => c.id === currentLoggedInCompanyId) || companies[0] || DEFAULT_COMPANY}
              onUpdateCompany={(updated) => setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c))}
              internships={internships}
              onAddInternship={handleAddInternship}
              applications={applications}
              onUpdateAppStatus={handleEmployerSelectCandidate}
              onAddToast={addToast}
              onLogout={() => handleLogoutRole('company')}
            />
          )
        )}

        {activeTab === 'admin-dash' && (
          !authenticatedRoles.admin ? (
            <LoginPage targetRole="admin" companies={companies} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />
          ) : (
            <AdminDashboard 
              students={students}
              onUpdateStudents={handleAdminUpdateStudents}
              companies={companies}
              onUpdateCompanies={setCompanies}
              internships={internships}
              onUpdateInternships={setInternships}
              applications={applications}
              onUpdateApplications={setApplications}
              complaints={complaints}
              onUpdateComplaints={setComplaints}
              blogs={blogs}
              faqs={faqs}
              auditLogs={auditLogs}
              onAddAuditLog={addAuditLog}
              onAddToast={addToast}
              onLogout={() => handleLogoutRole('admin')}
            />
          )
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Detail & Application Modal */}
      {modalInternship && (
        <InternshipModal 
          internship={modalInternship}
          onClose={() => setModalInternship(null)}
          onConfirmApply={handleConfirmApply}
          studentProfile={studentProfile}
          hasApplied={applications.some(a => a.internshipId === modalInternship.id && a.studentId === studentProfile.id && a.status !== 'Withdrawn')}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          authenticatedRoles={authenticatedRoles}
          setActiveTab={setActiveTab}
          onAddToast={addToast}
          onUpdateStudentProfile={setStudentProfile}
        />
      )}

      {/* Toast Notification Popups */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div>{toast.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
