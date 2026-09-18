// Initial Mock Data for InternCatalyst Platform

export const INITIAL_INTERNSHIPS = [];

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
  }
];

export const INITIAL_STUDENT_PROFILE = {
  id: "std-8821",
  name: "Aditya Verma",
  fullName: "Aditya Verma",
  email: "aditya.verma@student.edu",
  phone: "+91 98450 12345", // Mandatory contact number
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  domain: "Software & Full-Stack Web Development",
  preferredDomain: "Software & Full-Stack Web Development",
  institution: "Alva's Institute of Engineering & Technology (AIET)",
  collegeName: "Alva's Institute of Engineering & Technology (AIET)",
  degree: "B.Tech in Computer Science & Engineering",
  branch: "Computer Science & Engineering",
  yearOfStudy: "4th Year (Final Year)",
  currentYearOrSemester: "4th Year (Final Year)",
  graduationYear: "2026",
  cgpa: "8.85 / 10",
  cgpaOrPercentage: "8.85 / 10",
  dateOfBirth: "2004-05-15",
  gender: "Male",
  city: "Bangalore",
  state: "Karnataka",
  location: "Bangalore, Karnataka",
  availability: "Immediate (Full-Time 6 Months)",
  internshipPreference: "Remote / Online",
  skills: ["React.js", "Node.js", "JavaScript (ES6+)", "Python", "MongoDB", "SQL", "Git & GitHub", "Tailwind CSS", "Figma"],
  projects: [
    {
      title: "InternCatalyst Placement Portal",
      link: "https://github.com/aditya/interncatalyst",
      desc: "Full-stack React platform matching students to verified companies with role-based access control."
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Meta Front-End Developer Specialization"
  ],
  languages: ["English (Fluent)", "Kannada (Native)", "Hindi (Professional)"],
  interests: ["Web Development", "AI Agents", "Open Source Contributing"],
  workModePreference: "Online", // Online, Offline, Hybrid
  stipendPreference: "Paid (Min ₹15,000)",
  resumeUrl: "https://drive.google.com/file/d/sample-resume-aditya-verma/view",
  portfolioUrl: "https://adityaverma.dev",
  githubUrl: "https://github.com/adityaverma",
  linkedinUrl: "https://linkedin.com/in/aditya-verma-dev",
  status: "Active" // Active, Suspended
};

export const INITIAL_STUDENTS_LIST = [];

export const INITIAL_APPLICATIONS = [];

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
    user: "Student (aditya.verma@student.edu)",
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
