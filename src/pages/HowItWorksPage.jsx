import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  Award,
  ArrowRight,
  GraduationCap,
  Building2
} from 'lucide-react';

export default function HowItWorksPage({ setActiveTab, setCurrentRole }) {
  const [activeWorkflow, setActiveWorkflow] = useState('students'); // 'students' or 'companies'

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            How <span className="text-gradient">InternCatalyst</span> Works
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 2rem' }}>
            Simple, step-by-step guide for students to land internships and companies to hire top talent.
          </p>

          {/* Workflow Toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '30px',
            padding: '0.35rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <button 
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
                gap: '0.5rem'
              }}
            >
              <GraduationCap size={16} /> Roadmap For Students
            </button>

            <button 
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
                gap: '0.5rem'
              }}
            >
              <Building2 size={16} /> Workflow For Companies
            </button>
          </div>
        </div>

        {/* Workflow 1: Student Steps */}
        {activeWorkflow === 'students' && (
          <div className="grid-4">
            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                01
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Sign Up & Complete Profile</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Create your student account with Name, Gmail, and Password. Fill in mandatory contact number, branch, GPA, and upload your ATS resume.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                02
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Search Verified Roles</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Explore specialized domain tracks (Full-Stack, Data, UI/UX, AI, Cyber) backed by Employer Verification Badges (✓) and supervisor contacts.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                03
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Apply with Registration Fee</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Submit your profile for your chosen verified role by paying the nominal ₹100 registration fee via UPI or Debit/Credit Card.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                04
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Application Confirmation Mail</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Instantly receive an official email confirmation with your Application ID, proctored assessment link, and real-time status tracking.
              </p>
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
