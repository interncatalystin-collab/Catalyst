/**
 * InternCatalyst In-Memory Database Collections
 * Stores Internships, Applications, Companies & OTPs
 */

export let internships = [
  {
    id: 'int-101',
    title: 'Full-Stack Web Development Intern',
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

export let activeOtps = {};
