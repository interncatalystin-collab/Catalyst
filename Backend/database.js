/**
 * InternCatalyst In-Memory Database Collections
 * Stores Internships, Applications, Companies & OTPs
 */

export let internships = [
  {
    id: 'int-101',
    title: 'Full-Stack Web Development Intern',
    companyId: 'comp-101',
    companyName: 'Nexus Tech Solutions',
    verified: true,
    location: 'Bangalore, Karnataka',
    workMode: 'Online',
    stipendAmount: '₹18,000 / month',
    duration: '6 Months',
    openings: 5,
    industry: 'Software & IT',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    deadline: '2026-09-15',
    status: 'Approved',
    applicantsCount: 12
  },
  {
    id: 'int-102',
    title: 'AI & Machine Learning Research Intern',
    companyId: 'comp-104',
    companyName: 'Cognitive AI Labs',
    verified: true,
    location: 'Hyderabad, Telangana',
    workMode: 'Hybrid',
    stipendAmount: '₹25,000 / month',
    duration: '4 Months',
    openings: 3,
    industry: 'Artificial Intelligence',
    skills: ['Python', 'PyTorch', 'NLP', 'Scikit-Learn'],
    deadline: '2026-09-01',
    status: 'Approved',
    applicantsCount: 8
  }
];

export let applications = [
  {
    id: 'app-501',
    internshipId: 'int-101',
    internshipTitle: 'Full-Stack Web Development Intern',
    companyId: 'comp-101',
    companyName: 'Nexus Tech Solutions',
    studentId: 'std-001',
    studentName: 'Aditya Verma',
    studentEmail: 'aditya.verma@student.edu',
    studentPhone: '9876543210',
    appliedDate: '2026-08-18',
    status: 'Under Review',
    forwardedToEmployer: false,
    adminSelectionStatus: 'Pending Admin Selection',
    matchScore: 94
  }
];

export let companies = [
  {
    id: 'comp-1',
    name: 'Nexus Tech Solutions',
    email: 'hr@nexustech.io',
    verifiedBadge: true,
    verificationStatus: 'Verified',
    legalDoc: 'GSTIN_29AAACN1234F1Z9.pdf'
  }
];

export let reports = [
  {
    id: 'rep-101',
    companyId: 'comp-101',
    companyName: 'Nexus Tech Solutions',
    studentId: 'std-001',
    studentName: 'Adithya S',
    studentEmail: 'adithya@student.edu',
    studentPhone: '+91 98765 43210',
    studentCollege: "Alva's Institute of Engineering & Technology",
    internshipId: 'int-101',
    internshipTitle: 'Full-Stack Web Development Intern',
    reportTitle: 'Month 1 Progress & Milestone Deliverable Report',
    reportType: 'Monthly Milestone Report',
    submissionDate: '2026-10-10',
    supervisorName: 'Dr. Rajesh V. Sharma',
    supervisorDesignation: 'Engineering Director',
    supervisorEmail: 'hr@nexustech.io',
    rating: 5,
    attendance: '98%',
    stipendStatus: 'Processed (₹15,000 / month)',
    keyDeliverables: 'Designed RESTful API endpoints for user authentication; configured automated test suites; resolved 12 frontend UI bugs in React; assisted in Vite migration.',
    supervisorRemarks: 'Adithya has demonstrated exceptional technical aptitude, proactive communication, and quick turnaround on assigned sprints. Recommended for continuation into advanced modules.',
    fileName: 'NexusTech_Adithya_Month1_Progress_Report.pdf',
    fileSize: '1.8 MB',
    status: 'Approved',
    uploadedBy: 'Company Supervisor',
    createdAt: '2026-10-10 14:30:00'
  }
];

export let activeOtps = {};
