/**
 * Domain Roles, Vacancies & Connected Companies Catalog
 * InternCatalyst (Edu2Work) - Central Placement Engine
 * 
 * Rules:
 * - Students view and apply for their specialized Domain Role.
 * - Students see total vacancies and the list of connected partner companies for that role.
 * - Students are allowed to apply for their domain, NOT for individual companies.
 * - Central Admin vets and allocates domain candidate profiles to connected employers.
 */

export const DOMAIN_ROLES_DATA = [
  {
    id: 'domain-software-web',
    domainName: 'Software & Full-Stack Web Development',
    trackType: 'IT',
    aliases: [
      'software development',
      'web development',
      'software & full-stack web development',
      'full-stack development',
      'computer science & engineering',
      'computer science'
    ],
    roleTitle: 'Full-Stack Web & Software Engineering Intern',
    badge: 'High Demand',
    category: 'Engineering & Technology',
    overview: 'Design, develop, and deploy scalable cloud applications, REST APIs, and modern responsive user interfaces with modern web frameworks and enterprise databases.',
    skillsRequired: [
      'React.js',
      'Node.js',
      'JavaScript (ES6+)',
      'MongoDB & SQL',
      'REST APIs',
      'Git & GitHub',
      'Tailwind CSS'
    ],
    eligibility: 'B.Tech / B.E. / BCA / MCA / B.Sc CS (2nd, 3rd, or Final Year)',
    stipendRange: '₹15,000 – ₹25,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online / Hybrid',
    totalVacancies: 18,
    connectedCompanies: [
      {
        id: 'comp-101',
        name: 'Nexus Tech Solutions',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        industry: 'Software & IT Services',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹18,000 / month',
        vacancies: 5,
        hired: 2,
        supervisor: 'Dr. Rajesh V. Sharma',
        supervisorTitle: 'VP of Engineering',
        supervisorEmail: 'hr@nexustech.io',
        highlights: 'SaaS cloud platform development, React 19 & Node.js microservices'
      },
      {
        id: 'comp-102',
        name: 'CloudScale Technologies',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
        industry: 'Cloud Infrastructure & DevOps',
        location: 'Hyderabad, Telangana',
        workMode: 'Hybrid',
        stipend: '₹22,000 / month',
        vacancies: 6,
        hired: 1,
        supervisor: 'Vikramaditya Rao',
        supervisorTitle: 'Principal Cloud Architect',
        supervisorEmail: 'careers@cloudscale.tech',
        highlights: 'Next.js frontend, Docker orchestration, and GraphQL services'
      },
      {
        id: 'comp-103',
        name: 'DevPulse Systems India',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
        industry: 'Enterprise Software',
        location: 'Pune / Remote',
        workMode: 'Online',
        stipend: '₹16,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Pooja Kulkarni',
        supervisorTitle: 'Engineering Manager',
        supervisorEmail: 'internships@devpulse.io',
        highlights: 'High-throughput API gateways and MongoDB cluster operations'
      },
      {
        id: 'comp-104',
        name: 'Infosys Springboard Partner Hub',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
        industry: 'IT Consulting & Training',
        location: 'Mangalore / Bangalore',
        workMode: 'Hybrid',
        stipend: '₹15,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Mahesh Nayak',
        supervisorTitle: 'Campus Placement Liaison',
        supervisorEmail: 'campus@springboard-partner.org',
        highlights: 'Enterprise application modernisation, Java Spring & Angular'
      }
    ]
  },
  {
    id: 'domain-ai-ml',
    domainName: 'Artificial Intelligence & Machine Learning',
    trackType: 'IT',
    aliases: [
      'ai & machine learning',
      'artificial intelligence & machine learning',
      'artificial intelligence',
      'machine learning',
      'ai/ml',
      'deep learning'
    ],
    roleTitle: 'AI & Machine Learning Research Intern',
    badge: 'Trending & Elite',
    category: 'Artificial Intelligence',
    overview: 'Train, fine-tune, and evaluate deep learning architectures, Large Language Models (LLMs), Computer Vision pipelines, and real-time inference endpoints.',
    skillsRequired: [
      'Python',
      'PyTorch / TensorFlow',
      'Scikit-Learn',
      'Hugging Face & LLMs',
      'NLP Techniques',
      'NumPy & Pandas',
      'Model Fine-Tuning'
    ],
    eligibility: 'B.Tech / M.Tech / BCA / Data Science / CS Students with ML Foundations',
    stipendRange: '₹20,000 – ₹30,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Hybrid / Online',
    totalVacancies: 12,
    connectedCompanies: [
      {
        id: 'comp-201',
        name: 'Cognitive AI Labs',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
        industry: 'Generative AI & NLP',
        location: 'Hyderabad, Telangana',
        workMode: 'Hybrid',
        stipend: '₹25,000 / month',
        vacancies: 4,
        hired: 1,
        supervisor: 'Dr. Ananya Deshmukh',
        supervisorTitle: 'Lead AI Scientist',
        supervisorEmail: 'research@cognitiveai.org',
        highlights: 'LLaMA-3 LoRA fine-tuning, RAG pipelines, and agentic workflows'
      },
      {
        id: 'comp-202',
        name: 'NeuralEdge Analytics',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        industry: 'Computer Vision & Robotics',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹24,000 / month',
        vacancies: 5,
        hired: 0,
        supervisor: 'Arjun Menon',
        supervisorTitle: 'Director of Vision Systems',
        supervisorEmail: 'careers@neuraledge.ai',
        highlights: 'YOLOv10 object detection and real-time video inference pipelines'
      },
      {
        id: 'comp-203',
        name: 'DeepMind Innovation Partner Lab',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        industry: 'Autonomous Systems',
        location: 'Gurugram / Remote',
        workMode: 'Online',
        stipend: '₹28,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Karan Mehra',
        supervisorTitle: 'Principal Research Fellow',
        supervisorEmail: 'partnerlab@deepmind-connect.in',
        highlights: 'Reinforcement learning environments and automated benchmark evaluations'
      }
    ]
  },
  {
    id: 'domain-data-analytics',
    domainName: 'Data Science & Business Intelligence',
    trackType: 'IT',
    aliases: [
      'data science & business intelligence',
      'data science & analytics',
      'data science',
      'business intelligence',
      'data analytics'
    ],
    roleTitle: 'Data Science & Business Analytics Intern',
    badge: 'Core Analytics',
    category: 'Data & Insights',
    overview: 'Transform raw multi-source business data into predictive insights, automated ETL pipelines, and interactive executive Tableau and PowerBI dashboards.',
    skillsRequired: [
      'Python',
      'SQL & Complex Queries',
      'PowerBI / Tableau',
      'Pandas & NumPy',
      'Statistical Analysis',
      'ETL Pipelines',
      'Excel Modeling'
    ],
    eligibility: 'Any STEM / CS / Commerce / Analytics Students with SQL Knowledge',
    stipendRange: '₹16,000 – ₹24,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online / Hybrid',
    totalVacancies: 15,
    connectedCompanies: [
      {
        id: 'comp-301',
        name: 'FinEdge Digital Analytics',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
        industry: 'Fintech & Risk Modeling',
        location: 'Mumbai, Maharashtra',
        workMode: 'Hybrid',
        stipend: '₹20,000 / month',
        vacancies: 6,
        hired: 2,
        supervisor: 'Ramesh Krishnamurthy',
        supervisorTitle: 'Head of Risk Analytics',
        supervisorEmail: 'analytics@finedge.com',
        highlights: 'Credit risk scoring algorithms and automated transaction telemetry'
      },
      {
        id: 'comp-302',
        name: 'QuantData Global Services',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=80',
        industry: 'Big Data Consulting',
        location: 'Gurugram, Haryana',
        workMode: 'Online',
        stipend: '₹22,000 / month',
        vacancies: 5,
        hired: 1,
        supervisor: 'Shweta Bhandari',
        supervisorTitle: 'Data Engineering Lead',
        supervisorEmail: 'jobs@quantdata.io',
        highlights: 'Snowflake data warehousing, dbt transformations, and Airflow orchestration'
      },
      {
        id: 'comp-303',
        name: 'MetroMetrics Market Insights',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
        industry: 'E-commerce & Retail Insights',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹17,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Nikhil Saxena',
        supervisorTitle: 'Senior Product Analyst',
        supervisorEmail: 'talent@metrometrics.in',
        highlights: 'Customer churn prediction models and automated marketing attribution'
      }
    ]
  },
  {
    id: 'domain-ui-ux',
    domainName: 'UI/UX & Product Design',
    trackType: 'Non-IT',
    aliases: [
      'ui/ux & product design',
      'ui/ux design',
      'product design',
      'ui/ux',
      'design & media'
    ],
    roleTitle: 'UI/UX & Product Experience Design Intern',
    badge: 'Creative Tech',
    category: 'Product & Design',
    overview: 'Craft human-centric user journeys, high-fidelity interactive Figma prototypes, accessible design systems, and responsive desktop and mobile design layouts.',
    skillsRequired: [
      'Figma & Auto-Layout',
      'User Flow & Wireframing',
      'Design Systems (Tokens)',
      'Usability Testing',
      'Design Accessibility (WCAG)',
      'Responsive Web Layouts'
    ],
    eligibility: 'Design, CS, IT, or any graduate with a verified Figma portfolio',
    stipendRange: '₹14,000 – ₹20,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online',
    totalVacancies: 10,
    connectedCompanies: [
      {
        id: 'comp-401',
        name: 'PixelCraft Design Studio',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80',
        industry: 'Digital Product Agency',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹18,000 / month',
        vacancies: 4,
        hired: 1,
        supervisor: 'Meera Sengupta',
        supervisorTitle: 'Principal Design Director',
        supervisorEmail: 'design@pixelcraft.studio',
        highlights: 'B2B SaaS design system tokens, atomic design component libraries'
      },
      {
        id: 'comp-402',
        name: 'Canvas Creative Labs',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80',
        industry: 'Mobile UX & Interaction',
        location: 'Remote / Delhi',
        workMode: 'Online',
        stipend: '₹16,000 / month',
        vacancies: 3,
        hired: 0,
        supervisor: 'Kavita Joshi',
        supervisorTitle: 'Head of Mobile UX',
        supervisorEmail: 'careers@canvaslabs.design',
        highlights: 'Mobile micro-interactions, motion prototyping, and onboarding flows'
      },
      {
        id: 'comp-403',
        name: 'HyperInterface SaaS Products',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&q=80',
        industry: 'Enterprise Product Suites',
        location: 'Mumbai, Maharashtra',
        workMode: 'Hybrid',
        stipend: '₹19,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Sameer Qureshi',
        supervisorTitle: 'VP of Product Experience',
        supervisorEmail: 'ux@hyperinterface.com',
        highlights: 'Complex data visualization dashboards and user research audits'
      }
    ]
  },
  {
    id: 'domain-cybersecurity',
    domainName: 'Cybersecurity & Cloud Audit',
    trackType: 'IT',
    aliases: [
      'cybersecurity & cloud audit',
      'cybersecurity',
      'cloud infrastructure & devops',
      'cyber security',
      'cloud security'
    ],
    roleTitle: 'Cybersecurity & Cloud Defense Intern',
    badge: 'Critical Infrastructure',
    category: 'Security & Cloud',
    overview: 'Monitor Security Operations Centers (SOC), conduct Vulnerability Assessments & Penetration Testing (VAPT), and audit AWS/Azure cloud security perimeters.',
    skillsRequired: [
      'Network Security Protocols',
      'OWASP Top 10',
      'Linux Administration',
      'AWS / Azure Security IAM',
      'Wireshark & Nmap',
      'VAPT Methodology'
    ],
    eligibility: 'B.Tech CS / IT / Cyber Security / ECE with Networking Basics',
    stipendRange: '₹18,000 – ₹26,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Hybrid / On-Site',
    totalVacancies: 8,
    connectedCompanies: [
      {
        id: 'comp-501',
        name: 'SecureNet Cyber Defense',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
        industry: 'Managed Threat Detection',
        location: 'Bangalore, Karnataka',
        workMode: 'Hybrid',
        stipend: '₹22,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Col. Arvind Natarajan',
        supervisorTitle: 'Chief Information Security Officer',
        supervisorEmail: 'soc@securenet-defense.com',
        highlights: '24/7 SIEM monitoring, threat hunting, and firewall configuration'
      },
      {
        id: 'comp-502',
        name: 'CloudShield Infosec Technologies',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
        industry: 'Cloud Compliance & Auditing',
        location: 'Pune, Maharashtra',
        workMode: 'Online',
        stipend: '₹20,000 / month',
        vacancies: 3,
        hired: 0,
        supervisor: 'Snehal Patil',
        supervisorTitle: 'Cloud Security Director',
        supervisorEmail: 'audit@cloudshield.tech',
        highlights: 'Kubernetes security posture, CIS benchmark auditing, and IAM policies'
      },
      {
        id: 'comp-503',
        name: 'VaultGuard Cyber Audit',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80',
        industry: 'Fintech Compliance',
        location: 'Hyderabad, Telangana',
        workMode: 'Hybrid',
        stipend: '₹25,000 / month',
        vacancies: 2,
        hired: 1,
        supervisor: 'Devendra Chawla',
        supervisorTitle: 'Lead Penetration Tester',
        supervisorEmail: 'infosec@vaultguard.org',
        highlights: 'Web application penetration testing and secure code reviews'
      }
    ]
  },
  {
    id: 'domain-digital-marketing',
    domainName: 'Digital Marketing & Growth Analytics',
    trackType: 'Non-IT',
    aliases: [
      'digital marketing & growth analytics',
      'digital marketing',
      'marketing & sales',
      'growth marketing'
    ],
    roleTitle: 'Digital Marketing & Growth Strategy Intern',
    badge: 'High Impact',
    category: 'Marketing & Growth',
    overview: 'Drive organic search visibility (SEO), craft viral social content strategies, optimize performance ad spend, and analyze conversion funnels.',
    skillsRequired: [
      'Search Engine Optimization (SEO)',
      'Google Analytics 4 & Search Console',
      'Content Strategy & Copywriting',
      'Social Media Performance',
      'Conversion Rate Optimization'
    ],
    eligibility: 'BBA / MBA / Mass Comm / Any Graduate with Growth Mindset',
    stipendRange: '₹12,000 – ₹18,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online',
    totalVacancies: 14,
    connectedCompanies: [
      {
        id: 'comp-601',
        name: 'GrowthGenix Media Group',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
        industry: 'Growth Marketing Agency',
        location: 'Delhi NCR',
        workMode: 'Online',
        stipend: '₹16,000 / month',
        vacancies: 5,
        hired: 1,
        supervisor: 'Ritika Khanna',
        supervisorTitle: 'Growth Marketing Director',
        supervisorEmail: 'careers@growthgenix.co',
        highlights: 'Technical SEO audits, schema markup, and backlink authority building'
      },
      {
        id: 'comp-602',
        name: 'BrandPulse Interactive Agency',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&q=80',
        industry: 'Brand Strategy & Media',
        location: 'Mumbai, Maharashtra',
        workMode: 'Online',
        stipend: '₹15,000 / month',
        vacancies: 5,
        hired: 2,
        supervisor: 'Aakash Singhania',
        supervisorTitle: 'Digital Campaign Manager',
        supervisorEmail: 'hello@brandpulse.agency',
        highlights: 'LinkedIn organic reach campaigns and B2B email sequence funnels'
      },
      {
        id: 'comp-603',
        name: 'AdVantage Global Marketing',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=120&q=80',
        industry: 'Performance Marketing',
        location: 'Remote',
        workMode: 'Online',
        stipend: '₹14,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Tanya Roy',
        supervisorTitle: 'Paid Media Strategist',
        supervisorEmail: 'internships@advantageglobal.com',
        highlights: 'Meta ad tracking, landing page A/B testing, and ROAS optimization'
      }
    ]
  },
  {
    id: 'domain-cloud-devops',
    domainName: 'Cloud Infrastructure & DevOps',
    trackType: 'IT',
    aliases: [
      'cloud infrastructure & devops',
      'cloud & devops',
      'devops',
      'cloud infrastructure',
      'site reliability'
    ],
    roleTitle: 'Cloud DevOps & Site Reliability Intern',
    badge: 'Enterprise Cloud',
    category: 'Cloud & Infrastructure',
    overview: 'Build automated CI/CD deployment pipelines, manage containerized Docker & Kubernetes clusters, configure AWS/GCP cloud networks, and monitor high-availability infrastructure.',
    skillsRequired: [
      'Docker & Containerization',
      'Kubernetes (K8s)',
      'AWS / GCP Cloud',
      'CI/CD (GitHub Actions / Jenkins)',
      'Linux & Bash Scripting',
      'Terraform & IaC'
    ],
    eligibility: 'B.Tech / B.E. (CS/IT/ECE) / MCA Students with Cloud Fundamentals',
    stipendRange: '₹18,000 – ₹28,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online / Hybrid',
    totalVacancies: 11,
    connectedCompanies: [
      {
        id: 'comp-701',
        name: 'TerraCloud Infrastructure Labs',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
        industry: 'Cloud Infrastructure',
        location: 'Bangalore, Karnataka',
        workMode: 'Hybrid',
        stipend: '₹22,000 / month',
        vacancies: 4,
        hired: 1,
        supervisor: 'Sunil K. Varma',
        supervisorTitle: 'Director of Cloud Operations',
        supervisorEmail: 'ops@terracloud.io',
        highlights: 'Kubernetes multi-region clusters and automated Terraform workflows'
      },
      {
        id: 'comp-702',
        name: 'DevOpsForge Technologies',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
        industry: 'DevOps & Automation',
        location: 'Hyderabad, Telangana',
        workMode: 'Online',
        stipend: '₹20,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Deepa Narayan',
        supervisorTitle: 'Lead SRE Architect',
        supervisorEmail: 'careers@devopsforge.tech',
        highlights: 'GitOps CI/CD delivery pipelines and Prometheus telemetry'
      },
      {
        id: 'comp-703',
        name: 'SkyScale Systems India',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
        industry: 'Cloud Architecture',
        location: 'Pune / Remote',
        workMode: 'Online',
        stipend: '₹24,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Manish Bhatia',
        supervisorTitle: 'Cloud Delivery Head',
        supervisorEmail: 'skyscale@talentconnect.in',
        highlights: 'Serverless architecture, AWS Lambda, and security hardening'
      }
    ]
  },
  {
    id: 'domain-hr-talent',
    domainName: 'Human Resources & Talent Acquisition',
    trackType: 'Non-IT',
    aliases: [
      'human resources & talent acquisition',
      'human resources',
      'hr & talent acquisition',
      'talent acquisition',
      'human resource management',
      'hr'
    ],
    roleTitle: 'Human Resources & Talent Acquisition Intern',
    badge: 'People & Culture',
    category: 'Human Resources',
    overview: 'Drive candidate recruitment pipelines, screen resumes, coordinate interview rounds with corporate hiring managers, manage onboarding logistics, and maintain employee engagement records.',
    skillsRequired: [
      'Talent Sourcing & Screening',
      'HRMS & ATS Portals',
      'Interview Coordination',
      'Employee Onboarding & Documentation',
      'Campus Recruitment Liaison',
      'Professional Communication'
    ],
    eligibility: 'BBA / MBA (HR) / B.Com / BA / Any Degree with Strong Interpersonal Skills',
    stipendRange: '₹12,000 – ₹18,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online / Hybrid',
    totalVacancies: 15,
    connectedCompanies: [
      {
        id: 'comp-801',
        name: 'PeopleFirst HR Advisory Group',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        industry: 'HR Consulting & Staffing',
        location: 'Bangalore, Karnataka',
        workMode: 'Hybrid',
        stipend: '₹16,000 / month',
        vacancies: 5,
        hired: 2,
        supervisor: 'Malini Deshpande',
        supervisorTitle: 'Head of Talent Acquisition',
        supervisorEmail: 'hr@peoplefirst.co.in',
        highlights: 'Pan-India corporate recruitment, LinkedIn Recruiter sourcing, and campus hiring drives'
      },
      {
        id: 'comp-802',
        name: 'TalentBridge Corporate Solutions',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
        industry: 'Executive Search & Placement',
        location: 'Mumbai, Maharashtra',
        workMode: 'Online',
        stipend: '₹15,000 / month',
        vacancies: 6,
        hired: 1,
        supervisor: 'Gaurav Singhal',
        supervisorTitle: 'Managing Partner - People Ops',
        supervisorEmail: 'internships@talentbridge.in',
        highlights: 'Structured interview frameworks, ATS tracking, and compensation benchmarking'
      },
      {
        id: 'comp-803',
        name: 'Vanguard People Operations',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80',
        industry: 'Corporate Talent Management',
        location: 'Delhi NCR / Remote',
        workMode: 'Online',
        stipend: '₹14,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Anushka Banerjee',
        supervisorTitle: 'Director of HR & Culture',
        supervisorEmail: 'careers@vanguardpeople.com',
        highlights: 'Employee lifecycle programs, performance appraisal records, and diversity hiring'
      }
    ]
  },
  {
    id: 'domain-finance-accounts',
    domainName: 'Finance, Accounting & Equity Research',
    trackType: 'Non-IT',
    aliases: [
      'finance, accounting & equity research',
      'finance & accounting',
      'corporate finance',
      'accounting',
      'financial analysis',
      'finance'
    ],
    roleTitle: 'Financial Analyst & Corporate Accounts Intern',
    badge: 'Core Finance',
    category: 'Finance & Banking',
    overview: 'Analyze financial statements, build DCF and valuation models in Excel, reconcile GST & TDS accounts in Tally, prepare audit workpapers, and evaluate market investment opportunities.',
    skillsRequired: [
      'Advanced MS Excel (VLOOKUP, Pivot, Macros)',
      'Financial Statement Analysis',
      'TallyPrime & GST Compliance',
      'Valuation Modeling & DCF',
      'Budget Variance Analysis',
      'Corporate Tax Principles'
    ],
    eligibility: 'B.Com / M.Com / BBA (Finance) / MBA (Finance) / CA Inter / Economics',
    stipendRange: '₹14,000 – ₹22,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Hybrid / Online',
    totalVacancies: 14,
    connectedCompanies: [
      {
        id: 'comp-901',
        name: 'FinTrust Advisory & Capital Partners',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=120&q=80',
        industry: 'Investment Banking & Advisory',
        location: 'Mumbai, Maharashtra',
        workMode: 'Hybrid',
        stipend: '₹20,000 / month',
        vacancies: 5,
        hired: 1,
        supervisor: 'Pradeep K. Somani, CFA',
        supervisorTitle: 'Partner - Corporate Finance',
        supervisorEmail: 'equity@fintrustcapital.com',
        highlights: 'M&A pitch deck preparation, EBITDA multiple valuation, and portfolio risk telemetry'
      },
      {
        id: 'comp-902',
        name: 'BlueChip Wealth & Audit Associates',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
        industry: 'Wealth Advisory & Tax Audit',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹18,000 / month',
        vacancies: 5,
        hired: 2,
        supervisor: 'Radhika Mehra, CA',
        supervisorTitle: 'Chief Financial Advisor',
        supervisorEmail: 'audit@bluechipwealth.in',
        highlights: 'Statutory audit verification, TDS e-filing reconciliations, and cash flow forecasting'
      },
      {
        id: 'comp-903',
        name: 'Credence Equity Research Labs',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
        industry: 'Equity Research & Market Insights',
        location: 'Gurugram, Haryana',
        workMode: 'Online',
        stipend: '₹17,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Saurabh Agarwal',
        supervisorTitle: 'Head of Equity Strategy',
        supervisorEmail: 'research@credence-equity.org',
        highlights: 'Quarterly earnings modeling, sector deep dives, and macro economic indicators'
      }
    ]
  },
  {
    id: 'domain-business-dev',
    domainName: 'Business Development & Corporate Sales',
    trackType: 'Non-IT',
    aliases: [
      'business development & corporate sales',
      'business development',
      'corporate sales',
      'b2b sales',
      'sales & marketing',
      'sales'
    ],
    roleTitle: 'Business Development & B2B Client Solutions Intern',
    badge: 'Revenue Growth',
    category: 'Sales & Growth',
    overview: 'Drive enterprise lead qualification, pitch software & service solutions to corporate executives, manage sales funnels in CRM, and negotiate strategic partnership agreements.',
    skillsRequired: [
      'B2B Sales Pitching & Cold Calling',
      'Lead Qualification & Prospecting',
      'CRM Pipeline Management (HubSpot/Zoho)',
      'Client Negotiation & Objection Handling',
      'Market Opportunity Research',
      'High-Impact Presentation Skills'
    ],
    eligibility: 'BBA / MBA / B.Com / Any Graduate with Strong Persuasive Skills',
    stipendRange: '₹15,000 – ₹25,000 / month + Incentives',
    duration: '3 to 6 Months',
    workMode: 'Hybrid / Online',
    totalVacancies: 18,
    connectedCompanies: [
      {
        id: 'comp-1001',
        name: 'Apex Global Enterprises',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=80',
        industry: 'Enterprise Solutions & SaaS',
        location: 'Hyderabad, Telangana',
        workMode: 'Hybrid',
        stipend: '₹20,000 / month',
        vacancies: 6,
        hired: 2,
        supervisor: 'Raghavendra Rao',
        supervisorTitle: 'VP - Global Business Development',
        supervisorEmail: 'sales@apexglobal.in',
        highlights: 'B2B enterprise pipeline conversion, C-suite demonstrations, and deal contract reviews'
      },
      {
        id: 'comp-1002',
        name: 'MarketLead Corporate Ventures',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
        industry: 'Corporate Alliances',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹18,000 / month',
        vacancies: 7,
        hired: 1,
        supervisor: 'Tanvi Nair',
        supervisorTitle: 'Director of Strategic Alliances',
        supervisorEmail: 'partnerships@marketlead.co',
        highlights: 'Outbound sales automation, LinkedIn enterprise outreach, and partnership proposals'
      },
      {
        id: 'comp-1003',
        name: 'Zenith Business Network India',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
        industry: 'Corporate Sales & Expansion',
        location: 'Delhi NCR / Remote',
        workMode: 'Online',
        stipend: '₹17,000 / month',
        vacancies: 5,
        hired: 0,
        supervisor: 'Aditya Mathur',
        supervisorTitle: 'National Sales Head',
        supervisorEmail: 'growth@zenithbusiness.in',
        highlights: 'Account mapping, institutional sales cycles, and cross-sell expansion'
      }
    ]
  },
  {
    id: 'domain-operations-logistics',
    domainName: 'Operations, Logistics & Supply Chain',
    trackType: 'Non-IT',
    aliases: [
      'operations, logistics & supply chain',
      'operations & supply chain',
      'operations management',
      'supply chain',
      'logistics',
      'operations'
    ],
    roleTitle: 'Operations & Supply Chain Management Intern',
    badge: 'Core Operations',
    category: 'Operations & Logistics',
    overview: 'Monitor warehouse order fulfillment, coordinate vendor procurement timelines, analyze inventory stock turnover, optimize freight logistics, and design lean operational procedures.',
    skillsRequired: [
      'Supply Chain & Logistics Workflow',
      'Vendor Coordination & Procurement',
      'Inventory Control & Stock Auditing',
      'ERP / WMS Software Platforms',
      'Process Bottleneck Optimization',
      'MIS Reporting & Dashboarding'
    ],
    eligibility: 'BBA (Operations) / MBA / B.Tech (Mechanical/Production) / B.Com / Any Graduate',
    stipendRange: '₹14,000 – ₹20,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Hybrid / On-Site / Online',
    totalVacancies: 13,
    connectedCompanies: [
      {
        id: 'comp-1101',
        name: 'LogiXpress Supply Chain India',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
        industry: 'Supply Chain & Freight Logistics',
        location: 'Chennai, Tamil Nadu',
        workMode: 'Hybrid',
        stipend: '₹18,000 / month',
        vacancies: 5,
        hired: 1,
        supervisor: 'Karthik Subramanian',
        supervisorTitle: 'Senior Operations Director',
        supervisorEmail: 'ops@logixpress.in',
        highlights: 'Real-time multi-modal shipment tracking, 3PL vendor SLA audits, and warehouse hub logistics'
      },
      {
        id: 'comp-1102',
        name: 'SwiftCargo Distribution Systems',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&q=80',
        industry: 'Express Freight & Warehousing',
        location: 'Mumbai, Maharashtra',
        workMode: 'On-Site',
        stipend: '₹16,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Milind Deodhar',
        supervisorTitle: 'Head of Hub Operations',
        supervisorEmail: 'careers@swiftcargo.com',
        highlights: 'Order dispatch reconciliation, safety compliance, and last-mile route optimization'
      },
      {
        id: 'comp-1103',
        name: 'OmniFlow Operations Consulting',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
        industry: 'Process Consulting & Automation',
        location: 'Bangalore, Karnataka',
        workMode: 'Online',
        stipend: '₹17,000 / month',
        vacancies: 4,
        hired: 1,
        supervisor: 'Shailaja Hegde',
        supervisorTitle: 'Operations Excellence Manager',
        supervisorEmail: 'internships@omniflow.io',
        highlights: 'Standard Operating Procedure (SOP) documentation, Six Sigma DMAIC projects'
      }
    ]
  },
  {
    id: 'domain-content-pr',
    domainName: 'Content Writing, PR & Corporate Communications',
    trackType: 'Non-IT',
    aliases: [
      'content writing, pr & corporate communications',
      'content writing',
      'public relations',
      'corporate communications',
      'content & pr',
      'content creation'
    ],
    roleTitle: 'Content Writing & Corporate PR Communications Intern',
    badge: 'Media & Brand',
    category: 'Media & Communications',
    overview: 'Draft corporate press releases, research and write thought-leadership blog articles, craft engaging executive LinkedIn posts, and coordinate editorial relationships with news media.',
    skillsRequired: [
      'Editorial Copywriting & Storytelling',
      'Press Release Drafting (AP Style)',
      'SEO Content Writing & Keyword Research',
      'Media Outreach & PR Liaison',
      'Brand Tone of Voice Consistency',
      'Proofreading & Fact-Checking'
    ],
    eligibility: 'BA (English / Journalism) / Mass Communication / Any Graduate with Exceptional Writing Skills',
    stipendRange: '₹12,000 – ₹18,000 / month',
    duration: '3 to 6 Months',
    workMode: 'Online',
    totalVacancies: 11,
    connectedCompanies: [
      {
        id: 'comp-1201',
        name: 'WordSmith Media & Editorial Group',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=120&q=80',
        industry: 'Digital Publishing & Media',
        location: 'Delhi NCR',
        workMode: 'Online',
        stipend: '₹16,000 / month',
        vacancies: 4,
        hired: 1,
        supervisor: 'Nandita Sengupta',
        supervisorTitle: 'Editor-in-Chief',
        supervisorEmail: 'editorial@wordsmithmedia.in',
        highlights: 'Authoritative B2B whitepapers, executive interview feature articles, and technical blogs'
      },
      {
        id: 'comp-1202',
        name: 'NarrativePR Strategic Communications',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
        industry: 'Public Relations Agency',
        location: 'Mumbai, Maharashtra',
        workMode: 'Online',
        stipend: '₹15,000 / month',
        vacancies: 4,
        hired: 0,
        supervisor: 'Farhan Zaidi',
        supervisorTitle: 'Senior PR Account Director',
        supervisorEmail: 'press@narrativepr.com',
        highlights: 'Tech startup funding announcements, media journalist pitching, and crisis PR memos'
      },
      {
        id: 'comp-1203',
        name: 'ContentCraft Creative Communications',
        verified: true,
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=120&q=80',
        industry: 'Content Strategy Agency',
        location: 'Bangalore / Remote',
        workMode: 'Online',
        stipend: '₹14,000 / month',
        vacancies: 3,
        hired: 1,
        supervisor: 'Trisha Chhabra',
        supervisorTitle: 'Content Strategy Lead',
        supervisorEmail: 'hello@contentcraft.agency',
        highlights: 'Website copy overhauls, conversion copywriting, and viral newsletter editions'
      }
    ]
  }
];

export const IT_DOMAINS = DOMAIN_ROLES_DATA.filter(d => d.trackType === 'IT');
export const NON_IT_DOMAINS = DOMAIN_ROLES_DATA.filter(d => d.trackType === 'Non-IT');

/**
 * Finds the matching domain role based on the student's profile domain string,
 * merging any live vacancies or connected companies posted by employers dynamically.
 */
export function getDomainRoleForStudent(domainString, dynamicInternships = []) {
  if (!domainString) {
    return DOMAIN_ROLES_DATA[0];
  }

  const normalized = domainString.toLowerCase().trim();

  // Match against exact domain name or aliases
  let matched = DOMAIN_ROLES_DATA.find(d => {
    if (d.domainName.toLowerCase() === normalized) return true;
    return d.aliases.some(alias => normalized.includes(alias) || alias.includes(normalized));
  });

  if (!matched) {
    matched = DOMAIN_ROLES_DATA[0]; // Default to Full-Stack Web Development
  }

  // Deep clone to safely augment with live dynamic postings if any exist
  const domainClone = JSON.parse(JSON.stringify(matched));

  if (Array.isArray(dynamicInternships) && dynamicInternships.length > 0) {
    dynamicInternships.forEach(job => {
      const jobDomain = (job.industry || job.title || '').toLowerCase();
      const isMatch = domainClone.aliases.some(alias => jobDomain.includes(alias)) ||
                      (job.industry === 'Software & IT' && domainClone.id === 'domain-software-web') ||
                      (job.industry === 'Artificial Intelligence' && domainClone.id === 'domain-ai-ml');

      if (isMatch && job.companyName) {
        const alreadyListed = domainClone.connectedCompanies.some(c => c.name.toLowerCase() === job.companyName.toLowerCase());
        if (!alreadyListed) {
          const liveCompany = {
            id: job.companyId || `comp-live-${job.id}`,
            name: job.companyName,
            verified: job.verified ?? true,
            logo: job.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
            industry: job.industry || 'Technology Partner',
            location: job.location || 'Bangalore, Karnataka',
            workMode: job.workMode || 'Online',
            stipend: job.stipendAmount || '₹18,000 / month',
            vacancies: parseInt(job.openings, 10) || 5,
            hired: parseInt(job.hiredCount, 10) || 0,
            supervisor: job.supervisorName || 'Hiring Supervisor',
            supervisorTitle: job.supervisorTitle || 'Technical Lead',
            supervisorEmail: job.supervisorEmail || 'hr@company.com',
            highlights: job.title || 'Dynamic Verified Placement Partner'
          };
          domainClone.connectedCompanies.push(liveCompany);
        }
      }
    });
  }

  // Re-calculate live total vacancies across all connected companies
  domainClone.totalVacancies = domainClone.connectedCompanies.reduce((acc, c) => acc + (c.vacancies || 0), 0);
  domainClone.remainingVacancies = domainClone.connectedCompanies.reduce((acc, c) => acc + Math.max(0, (c.vacancies || 0) - (c.hired || 0)), 0);

  return domainClone;
}
