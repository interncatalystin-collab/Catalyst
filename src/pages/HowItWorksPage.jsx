import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Send, 
  CheckCircle, 
  CheckCircle2,
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  Award,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Building2,
  Clock,
  Cpu,
  Compass,
  Zap,
  HelpCircle,
  Target,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  BadgeCheck,
  Check
} from 'lucide-react';

const STUDENT_ROADMAP_CHART = [
  {
    step: '01',
    phase: 'Stage 1',
    title: 'Sign Up & Build ATS Profile',
    time: '5 Mins',
    badge: '100% Free',
    badgeColor: '#1e3a8a',
    badgeBg: '#eff6ff',
    icon: UserCheck,
    accent: '#2563eb',
    points: [
      'Create free student account with Gmail & mobile number',
      'Select your degree (B.Tech, BCA, MCA, MBA) & branch',
      'Upload your ATS-optimized resume in PDF format'
    ],
    outcome: 'Activated Student Profile & ATS Resume Match Score'
  },
  {
    step: '02',
    phase: 'Stage 2',
    title: 'Choose Domain Track',
    time: '2 Mins',
    badge: 'Pooled Seats',
    badgeColor: '#7c3aed',
    badgeBg: '#f5f3ff',
    icon: Compass,
    accent: '#7c3aed',
    points: [
      'Select technical domain: Full-Stack, Data, AI/ML, Cyber, or UI/UX',
      'Explore verified companies offering ₹8k–₹25k/month stipends',
      'Single ₹100 verified application connects to all partner seats'
    ],
    outcome: 'Domain Pool Assigned & Seat Eligibility Confirmed'
  },
  {
    step: '03',
    phase: 'Stage 3',
    title: 'AI Proctored Online Test',
    time: '15 Mins',
    badge: 'Anti-Cheat Verified',
    badgeColor: '#059669',
    badgeBg: '#ecfdf5',
    icon: Cpu,
    accent: '#059669',
    points: [
      '1-click hardware test for Webcam, Microphone & Screen share',
      '10 timed domain technical MCQs in full-screen lockdown',
      'Score 70%+ to unlock "Top 10% Star Candidate" priority badge'
    ],
    outcome: 'Verified Technical Scorecard Generated'
  },
  {
    step: '04',
    phase: 'Stage 4',
    title: 'Central Vetting & Shortlisting',
    time: '24–48 Hours',
    badge: 'Admin Vetted',
    badgeColor: '#d97706',
    badgeBg: '#fffbeb',
    icon: ShieldCheck,
    accent: '#d97706',
    points: [
      'Catalyst trust team reviews proctored score & manual resume',
      'Real-time status tracking live in your Student Dashboard',
      'Top candidate profiles shortlisted & forwarded to employer HR'
    ],
    outcome: 'Central Vetting Clearance & Employer Portal Shortlist'
  },
  {
    step: '05',
    phase: 'Stage 5',
    title: 'Recruiter Interview & Offer',
    time: '3–5 Days',
    badge: 'Direct Connect',
    badgeColor: '#0891b2',
    badgeBg: '#ecfeff',
    icon: Building2,
    accent: '#0891b2',
    points: [
      'Receive virtual interview invite link via email and dashboard',
      'Direct technical conversation with company engineering manager',
      'Official offer letter issued stating stipend, duration & supervisor'
    ],
    outcome: 'Formal Digitally Signed Internship Offer Letter'
  },
  {
    step: '06',
    phase: 'Stage 6',
    title: 'Active Internship & Certification',
    time: '3–6 Months',
    badge: 'Stipend + LOR',
    badgeColor: '#e11d48',
    badgeBg: '#fff1f2',
    icon: Award,
    accent: '#e11d48',
    points: [
      'Collaborate on live company projects under designated supervisor',
      'Guaranteed monthly stipend disbursed directly on time',
      'Download verifiable certificate with unique QR code + official LOR'
    ],
    outcome: 'Verifiable Completion Certificate & Industry LOR'
  }
];

export default function HowItWorksPage({ setActiveTab, setCurrentRole }) {
  const [activeWorkflow, setActiveWorkflow] = useState('students'); // 'students' or 'companies'

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-pill" style={{ marginBottom: '0.75rem', color: '#1e3a8a', background: 'rgba(30, 58, 138, 0.08)' }}>
            <Sparkles size={14} /> Clear, Step-By-Step Career Journey
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            How <span className="text-gradient">InternCatalyst</span> Works
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            A transparent, guaranteed roadmap designed so students can easily land verified internships with on-time stipends and official certificates.
          </p>

          {/* Workflow Toggle */}
          <div 
            className="workflow-toggle-container"
            style={{
              display: 'inline-flex',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '30px',
              padding: '0.35rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <button 
              className="workflow-toggle-btn"
              onClick={() => setActiveWorkflow('students')}
              style={{
                background: activeWorkflow === 'students' ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: activeWorkflow === 'students' ? '#fff' : 'var(--text-muted)',
                padding: '0.65rem 1.8rem',
                borderRadius: '25px',
                fontWeight: '700',
                fontSize: '0.925rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: activeWorkflow === 'students' ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none'
              }}
            >
              <GraduationCap size={16} /> Roadmap For Students
            </button>

            <button 
              className="workflow-toggle-btn"
              onClick={() => setActiveWorkflow('companies')}
              style={{
                background: activeWorkflow === 'companies' ? 'var(--verified-color)' : 'transparent',
                border: 'none',
                color: activeWorkflow === 'companies' ? '#fff' : 'var(--text-muted)',
                padding: '0.65rem 1.8rem',
                borderRadius: '25px',
                fontWeight: '700',
                fontSize: '0.925rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: activeWorkflow === 'companies' ? '0 4px 12px rgba(16, 185, 129, 0.25)' : 'none'
              }}
            >
              <Building2 size={16} /> Workflow For Companies
            </button>
          </div>
        </div>

        {/* Workflow 1: Clean, Attractive Student Roadmap Chart */}
        {activeWorkflow === 'students' && (
          <div style={{ marginBottom: '3.5rem' }}>
            {/* Complete 6-Step Visual Roadmap Chart (All Visible At Once) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              {STUDENT_ROADMAP_CHART.map((item, idx) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.step}
                    className="glass-card"
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderTop: `4px solid ${item.accent}`,
                      borderRadius: '18px',
                      padding: '1.6rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div>
                      {/* Card Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: `${item.accent}15`,
                            color: item.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '900',
                            fontSize: '1.1rem',
                            flexShrink: 0
                          }}>
                            {item.step}
                          </div>
                          <div>
                            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: item.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {item.phase}
                            </span>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Clock size={12} /> {item.time}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          background: item.badgeBg,
                          color: item.badgeColor,
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}>
                          {item.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.85rem' }}>
                        {item.title}
                      </h3>

                      {/* 3 Simple Action Bullets */}
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {item.points.map((pt, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.45 }}>
                            <span style={{ color: item.accent, fontWeight: '800', marginTop: '1px' }}>✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Milestone Deliverable Box */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}>
                      <span style={{ fontSize: '0.78rem', color: item.accent, fontWeight: '800' }}>
                        🎯 Milestone:
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                        {item.outcome}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4 Pillars of the Student Placement Guarantee */}
            <div style={{
              background: '#f0f7ff',
              border: '1px solid #bfdbfe',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <span className="badge badge-verified" style={{ background: '#dbeafe', color: '#1d4ed8', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={13} /> The InternCatalyst Student Pledge
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Why Students Love & Trust This Roadmap
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}>
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <strong style={{ fontSize: '0.925rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    100% Scam-Free Companies
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    Every listing undergoes corporate GST verification and supervisor phone validation. Zero fake recruiters.
                  </p>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Cpu size={20} />
                  </div>
                  <strong style={{ fontSize: '0.925rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Hardware-Proctored Merit
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    Transparent 10-MCQ testing validates real skills so college tier doesn’t hold talented students back.
                  </p>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Briefcase size={20} />
                  </div>
                  <strong style={{ fontSize: '0.925rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Protected Monthly Stipends
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    Stipend ranges (₹8k–₹25k) are contractually locked in your offer letter with supervisor milestone approvals.
                  </p>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Award size={20} />
                  </div>
                  <strong style={{ fontSize: '0.925rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Verifiable Certificate & LOR
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    Receive a digitally verifiable completion certificate with unique ID + supervisor Letter of Recommendation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Workflow 2: Company Steps */}
        {activeWorkflow === 'companies' && (
          <div className="grid-4">
            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                01
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Register Business Email</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Register with corporate email domain, contact person details, and upload GST/registration certificates for identity check.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                02
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Earn Verification Badge</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Once verified by InternCatalyst trust officers, your profile receives the Verified Employer Badge (✓) to build candidate trust.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                03
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Post Opportunities</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Detail required skills, duration, work mode (Online/Offline), stipend amount, supervisor contacts, and application deadline.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                04
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Manual Resume Screening & Online Assessment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Perform manual resume screening and evaluate candidate proctored online assessment results on their applied domain tracks to finalize top internship hires.
              </p>
            </div>
          </div>
        )}

        {/* 7 Pillars: Defining Our Business Model */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge badge-pill" style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>
              <Briefcase size={14} /> Core Platform Architecture
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#0f172a' }}>
              Defining Our <span className="text-gradient">Business Model</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
              7 interconnected ecosystem steps connecting students, corporate employers, and higher education institutions
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Step 1 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #1e3a8a', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Student Registration & Manual Resume Screening</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Candidates register with verified contact numbers and upload authentic resumes. Academic credentials, branch, and GPA undergo manual resume screening before profile activation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #1e3a8a', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Domain Matching & Proctored Online Assessment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Matches students with specialized internship openings across technical domains (Full-Stack, Data, UI/UX, AI, Cyber) and unlocks hardware-proctored online assessments on the applied domain.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #059669', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Shortlisting Students for Companies</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Recruiters review shortlisted candidate profiles with verified manual resume screening reports and proctored online assessment domain scores.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #7c3aed', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                04
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Communication & Interview Scheduling</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Integrated messaging hub for employers to invite candidates, schedule online interviews, send SMS/email notifications, and issue formal offer letters.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #d97706', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                05
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Progress Tracking & Feedback</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Real-time milestone tracking for ongoing internships. Designated corporate supervisors log weekly feedback, stipend disbursal, and performance reports.
              </p>
            </div>

            {/* Step 6 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #0891b2', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                06
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Optional Mentor & Training Support</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: 'auto' }}>
                Dedicated technical mentor sessions, industry skill bootcamps, and mock interview practice to bridge candidate gaps and ensure 100% placement readiness.
              </p>
            </div>

            {/* Step 7 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #e11d48', gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                07
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.6rem', lineHeight: '1.4' }}>Approaching Students to Share & Support the Website</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Campus Ambassador Network & Peer Advocacy: Reaching out directly to student leaders, college TPO cells, and student communities to share platform success stories, drive grassroots website support, and expand career opportunities nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Features Breakdown Section */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge badge-pill" style={{ marginBottom: '0.5rem', color: '#2563eb' }}>
              <FileText size={14} /> Registration Features Overview
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
              Account & Registration <span className="text-gradient">Capabilities</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Distinct feature sets tailored specifically for candidate students and recruiting companies
            </p>
          </div>

          <div className="grid-2">
            {/* 1) Student Registration Features */}
            <div className="glass-card" style={{ border: '1px solid #cbd5e1', background: 'rgba(30, 58, 138, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(30, 58, 138, 0.1)', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: '800' }}>1) Student Registration Features</h3>
                  <span style={{ fontSize: '0.8rem', color: '#1e3a8a' }}>Free Candidate Account Setup</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#1e3a8a', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Authenticated Profile & Resume:</strong> Upload PDF resume, specify degree, college, branch, and graduation year.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#1e3a8a', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Work Mode & Stipend Preferences:</strong> Choose Online (Remote), Offline (On-Site), or Hybrid filters.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#1e3a8a', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Mandatory Contact Verification:</strong> Secure phone number input ensuring direct recruiter communication and SMS updates.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#1e3a8a', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Real-time Application Tracker:</strong> Monitor status changes (Under Review, Shortlisted, Selected, Withdrawn).
                  </div>
                </li>
              </ul>
            </div>

            {/* 2) Company Registration Features */}
            <div className="glass-card" style={{ border: '1px solid #a7f3d0', background: '#ecfdf5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: '800' }}>2) Company Registration Features</h3>
                  <span style={{ fontSize: '0.8rem', color: '#059669' }}>Employer & Recruiter Account Setup</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#059669', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Corporate Domain & GST Verification:</strong> Business email validation and legal document audit for trust approval.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#059669', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Verified Employer Badge (✓):</strong> Official badge assigned after identity audit to eliminate scam listings.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#059669', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Role Posting & Supervisor Assignment:</strong> Create listings with stipend, duration, workmode, and designated supervisor details.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#059669', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>AI Candidate Matching & ATS:</strong> Filter applicants by match score, evaluate resumes, and issue offer letters.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          {activeWorkflow === 'students' ? (
            <button className="btn btn-primary" onClick={() => { setCurrentRole('student'); setActiveTab('student-dash'); }}>
              Create Your Profile Now <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-emerald" onClick={() => { setCurrentRole('company'); setActiveTab('company-dash'); }}>
              Register Employer Account <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
