import { DOMAIN_ROLES_DATA } from './domainRolesData';

// Initial Mock Data for InternCatalyst Platform - Populated with all 6 Domain Tracks
export const INITIAL_INTERNSHIPS = DOMAIN_ROLES_DATA.flatMap((domainTrack) => {
  return domainTrack.connectedCompanies.map((company, index) => ({
    id: `int-${domainTrack.id}-${company.id || index}`,
    title: `${domainTrack.roleTitle}`,
    roleTitle: domainTrack.roleTitle,
    domain: domainTrack.domainName,
    domainId: domainTrack.id,
    trackType: domainTrack.trackType || 'IT',
    category: domainTrack.category,
    companyId: company.id,
    companyName: company.name,
    companyLogo: company.logo,
    industry: company.industry || domainTrack.category,
    location: company.location,
    workMode: company.workMode || domainTrack.workMode,
    internshipType: 'Full-time',
    stipendType: 'Paid',
    stipendAmount: company.stipend || domainTrack.stipendRange,
    duration: domainTrack.duration,
    openings: company.vacancies || 5,
    hiredCount: company.hired || 0,
    verified: company.verified ?? true,
    status: 'Approved',
    skills: domainTrack.skillsRequired,
    eligibility: domainTrack.eligibility,
    description: `${domainTrack.overview} Key Highlights: ${company.highlights}`,
    supervisorName: company.supervisor,
    supervisorTitle: company.supervisorTitle,
    supervisorEmail: company.supervisorEmail,
    datePosted: '2026-08-15'
  }));
});

export const INITIAL_COMPANIES = [
  {
    id: "comp-101",
    name: "Nexus Tech Solutions",
    businessEmail: "hr@nexustech.io",
    loginPassword: "CompanyPass@2026",
    contactPerson: "Dr. Rajesh V. Sharma",
    phone: "+91 98765 43210",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    website: "https://nexustech.io",
    industry: "Software & IT",
    location: "Bangalore, Karnataka",
    size: "50-200 Employees",
    verifiedBadge: true,
    verificationStatus: "Verified",
    connectionStatus: "Connected",
    accessGranted: true,
    accessGrantedAt: "2026-08-15 11:20:14",
    accessGrantedBy: "Admin (admin@interncatalyst.org)",
    description: "Enterprise cloud and full-stack software development partner."
  },
  {
    id: "comp-102",
    name: "CloudScale Global Systems",
    businessEmail: "careers@cloudscale.io",
    loginPassword: "",
    contactPerson: "Priya Sundaram",
    phone: "+91 98123 45678",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80",
    website: "https://cloudscale.io",
    industry: "Cloud & DevOps",
    location: "Hyderabad, Telangana",
    size: "200-500 Employees",
    verifiedBadge: false,
    verificationStatus: "Pending",
    connectionStatus: "Connected - Pending Admin Access",
    accessGranted: false,
    accessGrantedAt: null,
    accessGrantedBy: null,
    description: "Multi-cloud architecture, Kubernetes and high-scale DevOps automation partner."
  },
  {
    id: "comp-103",
    name: "CyberShield Defence Labs",
    businessEmail: "recruiting@cybershield.in",
    loginPassword: "",
    contactPerson: "Vikramaditya Roy",
    phone: "+91 98334 11223",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80",
    website: "https://cybershield.in",
    industry: "Cybersecurity & InfoSec",
    location: "Pune, Maharashtra",
    size: "100-250 Employees",
    verifiedBadge: false,
    verificationStatus: "Pending",
    connectionStatus: "Connected - Pending Admin Access",
    accessGranted: false,
    accessGrantedAt: null,
    accessGrantedBy: null,
    description: "Cybersecurity assessment, penetration testing, and security operations partner."
  },
  {
    id: "comp-801",
    name: "PeopleFirst HR Advisory Group",
    businessEmail: "hr@peoplefirst.co.in",
    loginPassword: "",
    contactPerson: "Malini Deshpande",
    phone: "+91 98450 77123",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    website: "https://peoplefirst.co.in",
    industry: "Human Resources (Non-IT)",
    location: "Bangalore, Karnataka",
    size: "100-300 Employees",
    verifiedBadge: true,
    verificationStatus: "Verified",
    connectionStatus: "Connected",
    accessGranted: true,
    accessGrantedAt: "2026-08-16 10:15:00",
    accessGrantedBy: "Admin (admin@interncatalyst.org)",
    description: "Pan-India corporate recruitment, talent acquisition, and people operations partner."
  },
  {
    id: "comp-901",
    name: "FinTrust Advisory & Capital Partners",
    businessEmail: "equity@fintrustcapital.com",
    loginPassword: "",
    contactPerson: "Pradeep K. Somani, CFA",
    phone: "+91 98200 44556",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=120&q=80",
    website: "https://fintrustcapital.com",
    industry: "Finance & Accounting (Non-IT)",
    location: "Mumbai, Maharashtra",
    size: "50-150 Employees",
    verifiedBadge: true,
    verificationStatus: "Verified",
    connectionStatus: "Connected",
    accessGranted: true,
    accessGrantedAt: "2026-08-16 11:30:00",
    accessGrantedBy: "Admin (admin@interncatalyst.org)",
    description: "Corporate finance modeling, valuation, equity research, and audit advisory partner."
  },
  {
    id: "comp-1001",
    name: "Apex Global Enterprises",
    businessEmail: "sales@apexglobal.in",
    loginPassword: "",
    contactPerson: "Raghavendra Rao",
    phone: "+91 98490 88990",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=80",
    website: "https://apexglobal.in",
    industry: "Business Development & Sales (Non-IT)",
    location: "Hyderabad, Telangana",
    size: "200-500 Employees",
    verifiedBadge: true,
    verificationStatus: "Verified",
    connectionStatus: "Connected",
    accessGranted: true,
    accessGrantedAt: "2026-08-16 14:00:00",
    accessGrantedBy: "Admin (admin@interncatalyst.org)",
    description: "B2B client acquisition, enterprise solution selling, and corporate growth alliances partner."
  }
];

export const INITIAL_STUDENT_PROFILE = {
  id: null,
  name: "",
  fullName: "",
  email: "",
  phone: "",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  domain: "Software & Full-Stack Web Development",
  preferredDomain: "Software & Full-Stack Web Development",
  institution: "",
  collegeName: "",
  degree: "B.Tech / B.E.",
  branch: "Computer Science & Engineering",
  yearOfStudy: "4th Year (Final Year)",
  currentYearOrSemester: "4th Year (Final Year)",
  graduationYear: "2026",
  cgpa: "",
  cgpaOrPercentage: "",
  dateOfBirth: "",
  gender: "Male",
  city: "",
  state: "",
  location: "",
  availability: "Immediate (Full-Time 6 Months)",
  internshipPreference: "Remote / Online",
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  workModePreference: "Online",
  stipendPreference: "Paid",
  resumeUrl: "",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  leetcodeUrl: "",
  codechefUrl: "",
  hackerrankUrl: "",
  status: "Active",
  isRegistered: false
};

export const INITIAL_STUDENTS_LIST = [];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    studentName: "Adithya S",
    studentEmail: "adithya@student.edu",
    studentPhone: "+91 98765 43210",
    studentCollege: "Alva's Institute of Engineering & Technology",
    studentDegree: "B.Tech Computer Science & Engineering",
    studentYear: "4th Year (Final Year)",
    domain: "Software & Full-Stack Web Development",
    internshipId: "int-101",
    internshipTitle: "Full-Stack Web Development Intern",
    companyId: "comp-101",
    companyName: "Nexus Tech Solutions",
    verifiedCompany: true,
    appliedDate: "2026-09-18",
    resumeName: "Adithya_Verma_ATS_Resume.pdf",
    resumeUrl: "#",
    txnId: "TXN_UPI_100_982341",
    matchScore: 94,
    assessmentStatus: "Completed",
    assessmentScore: 92,
    adminScreened: true,
    forwardedToEmployer: true,
    status: "Selected",
    companyStatus: "Selected & Hired for Vacant Seat",
    employerDecision: "Selected for Vacant Seat",
    adminSelectionStatus: "Top Candidate Selected & Sent to Company"
  },
  {
    id: "app-102",
    studentName: "Adithya S",
    studentEmail: "adithya@student.edu",
    studentPhone: "+91 98765 43210",
    studentCollege: "Alva's Institute of Engineering & Technology",
    studentDegree: "B.Tech Computer Science & Engineering",
    studentYear: "4th Year (Final Year)",
    domain: "Artificial Intelligence & Machine Learning",
    internshipId: "int-102",
    internshipTitle: "AI & Machine Learning Research Intern",
    companyId: "comp-104",
    companyName: "Cognitive AI Labs",
    verifiedCompany: true,
    appliedDate: "2026-09-19",
    resumeName: "Adithya_Verma_ATS_Resume.pdf",
    resumeUrl: "#",
    txnId: "TXN_UPI_100_982342",
    matchScore: 88,
    assessmentStatus: "Pending",
    assessmentScore: 0,
    adminScreened: false,
    forwardedToEmployer: false,
    status: "Pending Admin Screening",
    companyStatus: "Queued in Admin Dashboard",
    adminSelectionStatus: "Registered in Admin Dashboard"
  }
];

export const INITIAL_REPORTS = [
  {
    id: "rep-101",
    companyId: "comp-101",
    companyName: "Nexus Tech Solutions",
    studentId: "stud-101",
    studentName: "Adithya S",
    studentEmail: "adithya@student.edu",
    studentPhone: "+91 98765 43210",
    studentCollege: "Alva's Institute of Engineering & Technology",
    internshipId: "int-101",
    internshipTitle: "Full-Stack Web Development Intern",
    reportTitle: "Month 1 Progress & Milestone Deliverable Report",
    reportType: "Monthly Milestone Report",
    period: "Month 1 (Sprint 1-4)",
    submissionDate: "2026-10-10",
    supervisorName: "Dr. Rajesh V. Sharma",
    supervisorDesignation: "Engineering Director",
    supervisorEmail: "hr@nexustech.io",
    rating: 5,
    attendance: "98%",
    stipendStatus: "Processed (₹15,000 / month)",
    keyDeliverables: "Designed RESTful API endpoints for user authentication; configured automated test suites with 92% coverage; resolved 12 frontend UI bugs in React; assisted in Vite build pipeline optimization.",
    supervisorRemarks: "Adithya has demonstrated exceptional technical aptitude, proactive team collaboration, and high code quality. He delivered all initial sprint tasks ahead of schedule with thorough documentation. Highly recommended for continuation into advanced cloud integration modules.",
    fileName: "NexusTech_Adithya_Month1_Progress_Report.pdf",
    fileSize: "1.8 MB",
    fileUrl: "#",
    status: "Approved",
    uploadedBy: "Company Supervisor",
    createdAt: "2026-10-10 14:30:00"
  },
  {
    id: "rep-102",
    companyId: "comp-101",
    companyName: "Nexus Tech Solutions",
    studentId: "stud-101",
    studentName: "Adithya S",
    studentEmail: "adithya@student.edu",
    studentPhone: "+91 98765 43210",
    studentCollege: "Alva's Institute of Engineering & Technology",
    internshipId: "int-101",
    internshipTitle: "Full-Stack Web Development Intern",
    reportTitle: "Mid-Term Project Architecture & Sprint Evaluation",
    reportType: "Mid-Term Evaluation",
    period: "Mid-Term Review (Weeks 5-8)",
    submissionDate: "2026-10-14",
    supervisorName: "Dr. Rajesh V. Sharma",
    supervisorDesignation: "Engineering Director",
    supervisorEmail: "hr@nexustech.io",
    rating: 4,
    attendance: "100%",
    stipendStatus: "Eligible for Next Cycle",
    keyDeliverables: "Implemented role-based access control (RBAC), optimized PostgreSQL database queries reducing API latency by 35%, and conducted peer code reviews.",
    supervisorRemarks: "Consistently delivers quality code within project deadlines. Excellent grasp of backend architecture, database optimization, and web security protocols.",
    fileName: "NexusTech_MidTerm_CodeReview_Report.pdf",
    fileSize: "2.4 MB",
    fileUrl: "#",
    status: "Approved",
    uploadedBy: "Company Supervisor",
    createdAt: "2026-10-14 16:15:00"
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "cmp-01",
    reporterName: "Kavya Hegde",
    reporterEmail: "kavya@student.edu",
    targetType: "Internship Listing",
    targetId: "int-99",
    targetTitle: "Data Entry Unpaid Remote Job",
    reason: "Suspicious listing asking for registration fee before joining",
    status: "Pending Investigation", // Pending Investigation, Resolved, Dismissed
    dateReported: "2026-08-14"
  },
  {
    id: "cmp-02",
    reporterName: "Rahul Sharma",
    reporterEmail: "rahul@student.edu",
    targetType: "Company Account",
    targetId: "comp-88",
    targetTitle: "CyberTech Softwares",
    reason: "Company logo and email domain do not match registered website",
    status: "Resolved",
    dateReported: "2026-08-10"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "log-1001",
    timestamp: "2026-08-15 11:20:14",
    user: "Admin (admin@interncatalyst.org)",
    action: "VERIFY_EMPLOYER_BADGE",
    details: "Granted Verified Employer Badge to 'Nexus Tech Solutions' after GST document audit."
  },
  {
    id: "log-1002",
    timestamp: "2026-08-15 10:45:00",
    user: "Employer (hr@nexustech.io)",
    action: "CREATE_INTERNSHIP_LISTING",
    details: "Posted new opportunity: 'Full-Stack Web Development Intern' (5 Openings)."
  },
  {
    id: "log-1003",
    timestamp: "2026-08-14 16:30:22",
    user: "Candidate (student@interncatalyst.org)",
    action: "SUBMIT_APPLICATION",
    details: "Applied for 'AI & Machine Learning Research Intern' at Cognitive AI Labs."
  },
  {
    id: "log-1004",
    timestamp: "2026-08-13 14:15:10",
    user: "Admin (admin@interncatalyst.org)",
    action: "APPROVE_LISTING",
    details: "Approved public listing int-102 for Cognitive AI Labs."
  }
];

export const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "10 Cracking Resume Tips for Tech Internships in 2026",
    category: "Resume Tips",
    author: "InternCatalyst Career Team",
    date: "August 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    summary: "Learn how to format project links, quantify impact, and tailor tech skills to pass automated ATS screeners.",
    content: `When applying for tech internships, standard text resumes often fail to highlight practical skills.
    
    1. **Add Clickable GitHub & Portfolio Links**: Employers spend less than 10 seconds per resume. Clickable demo links make your projects instantly verifiable.
    2. **Quantify Results**: Instead of "Built a React site", write "Engineered a React SPA with 98 Lighthouse score serving 1,000+ active users".
    3. **Highlight Core Technical Stack First**: Group skills clearly into Frontend, Backend, AI/ML, and Tools.
    4. **Keep Contact Info Clear & Mandatory**: Ensure phone number, email, and location are prominent on top.`
  },
  {
    title: "Mastering the Technical & HR Interview: A Student's Checklist",
    id: "blog-2",
    category: "Interview Preparation",
    author: "Dr. Meenakshi S.",
    date: "August 05, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    summary: "From System Design basics to STAR method behavioral answers, prepare effectively for college placement drives.",
    content: `Interviews can be intimidating, but structured preparation guarantees success.
    
    - **Use STAR Technique**: Situation, Task, Action, Result when answering behavioral questions.
    - **Review Fundamentals**: Data Structures, OOPs, DBMS indexing, and web network protocols.
    - **Demonstrate Curiosity**: Ask the interviewer insightful questions about team workflow and tech stack.`
  },
  {
    title: "Why Verified Employer Badges Protect Students from Internship Scams",
    id: "blog-3",
    category: "Internship Advice",
    author: "InternCatalyst Trust & Safety",
    date: "July 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    summary: "How InternCatalyst manually verifies business identities, supervisor details, and legal certificates before listing opportunities.",
    content: `Never pay money to get an internship! Authentic internships pay stipends or provide structured hands-on mentorship. InternCatalyst strictly checks company identities, business documents, and corporate email domains.`
  }
];

export const INITIAL_FAQS = [
  {
    question: "Is InternCatalyst free for students?",
    answer: "Yes! InternCatalyst is 100% free for students to browse internships, create portfolios, apply, and receive verified certificates."
  },
  {
    question: "What is the Verified Employer Badge?",
    answer: "The Verified Employer Badge (✓) is awarded only after InternCatalyst compliance officers verify business identity documents, corporate emails, and genuine stipend commitments. Unverified posts are never published."
  },
  {
    question: "Can colleges partner with InternCatalyst for campus placement drives?",
    answer: "Absolutely! Colleges can request institutional access to track student application progress, host campus drives, and generate placement reports."
  },
  {
    question: "How do companies post internship opportunities?",
    answer: "Companies register with business email verification, upload business documents, choose a placement plan, and post listings with supervisor details and deadlines."
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    name: "Sneha Hegde",
    role: "Software Engineering Intern at Nexus Tech",
    college: "AIET Mangalore",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    quote: "InternCatalyst matched my React skills directly to Nexus Tech. The verified badge gave me confidence that the role was authentic!"
  },
  {
    name: "Rajesh V. Sharma",
    role: "VP of Engineering",
    company: "Nexus Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    quote: "We hired 5 exceptional intern developers through InternCatalyst's candidate matching tool within 7 days. Streamlined and reliable."
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    name: "Starter Free",
    price: "₹0",
    period: "Forever",
    badge: "Basic",
    features: [
      "1 Active Internship Post",
      "Standard Verification Check",
      "Basic Candidate Resumes View",
      "Email Application Alerts"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Growth Monthly",
    price: "₹2,499",
    period: "per month",
    badge: "Popular",
    features: [
      "5 Active Internship Listings",
      "Verified Employer Badge (✓)",
      "Smart AI Candidate Matcher",
      "Direct WhatsApp / SMS Student Notifications",
      "Supervisor Access Dashboard"
    ],
    cta: "Get Growth Plan",
    popular: true
  },
  {
    name: "Pro Annual",
    price: "₹19,999",
    period: "per year",
    badge: "Best Value",
    features: [
      "Unlimited Internship Postings",
      "Priority Verification & Featured Tag",
      "Campus Placement Drive Access",
      "Dedicated HR Account Manager",
      "Advanced Export Analytics"
    ],
    cta: "Upgrade to Pro",
    popular: false
  }
];
