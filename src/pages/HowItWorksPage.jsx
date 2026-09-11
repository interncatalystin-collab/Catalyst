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
          <div className="grid-4" style={{ position: 'relative' }}>
            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(37, 99, 235, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>01</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <UserCheck size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>1. Build Profile & Resume</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Register using email/phone, add education, skills, projects, and portfolio links. Specify mandatory contact number and work mode preferences (Online/Offline).
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(37, 99, 235, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>02</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>2. Search Verified Roles</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Filter opportunities by skills, stipend, location, and Verified Employer Badges (✓). Review supervisor details and transparent deadlines.
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(37, 99, 235, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>03</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Send size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>3. 1-Click Application</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Submit applications directly with mandatory contact details. Track real-time recruiter updates (Shortlisted, Interview Scheduled, Offer).
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(37, 99, 235, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>04</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>4. Completion & Feedback</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Complete the internship, receive stipends, give authentic feedback about the employer, and boost your college placement transcript.
              </p>
            </div>
          </div>
        )}

        {/* Workflow 2: Company Steps */}
        {activeWorkflow === 'companies' && (
          <div className="grid-4">
            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(22, 163, 74, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>01</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>1. Register Business Email</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Register with corporate email domain, contact person details, and upload GST/registration certificates for identity check.
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(22, 163, 74, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>02</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>2. Earn Verification Badge</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Once verified by InternCatalyst trust officers, your profile receives the Verified Employer Badge (✓) to build candidate trust.
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(22, 163, 74, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>03</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Briefcase size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>3. Post Opportunities</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Detail required skills, duration, work mode (Online/Offline), stipend amount, supervisor contacts, and application deadline.
              </p>
            </div>

            <div className="glass-card" style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'rgba(22, 163, 74, 0.15)', position: 'absolute', top: '1rem', right: '1.25rem' }}>04</span>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '0.5rem' }}>4. AI Match & Hire</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Use InternCatalyst candidate matching engine to filter student skill profiles, review portfolios, schedule interviews, and finalize placements.
              </p>
            </div>
          </div>
        )}

        {/* 7 Pillars: Defining Our Business Model */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge badge-pill" style={{ marginBottom: '0.5rem', color: '#2563eb' }}>
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
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #2563eb' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 01</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>1. Student Registration & Resume Verification</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Candidates register with verified mobile number OTP and upload authentic resumes. Background credentials, branch, and GPA are validated before profile activation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #0284c7' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 02</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>2. Domain-Based Candidate Matching</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Matches students with relevant internship openings based on technical domains (Full-Stack, Data, UI/UX, AI), work mode (Online/Offline), and stipend preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #059669' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 03</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>3. Shortlisting Students for Companies</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Recruiters review AI-ranked candidate shortlists, inspect portfolio projects, and select top applicants based on verified skill badges.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #7c3aed' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 04</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>4. Communication & Interview Scheduling</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Integrated messaging hub for employers to invite candidates, schedule online interviews, send SMS/email notifications, and issue formal offer letters.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #d97706' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 05</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>5. Progress Tracking & Feedback</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Real-time milestone tracking for ongoing internships. Designated corporate supervisors log weekly feedback, stipend disbursal, and performance reports.
              </p>
            </div>

            {/* Step 6 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #0891b2' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 06</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>6. Optional Mentor & Training Support</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Dedicated technical mentor sessions, industry skill bootcamps, and mock interview practice to bridge candidate gaps and ensure 100% placement readiness.
              </p>
            </div>

            {/* Step 7 */}
            <div className="glass-card" style={{ position: 'relative', borderLeft: '4px solid #e11d48', gridColumn: '1 / -1' }}>
              <span className="badge badge-verified" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>Step 07</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>7. Approaching Students to Share & Support the Website</h3>
              </div>
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
            <div className="glass-card" style={{ border: '1px solid #bfdbfe', background: '#eff6ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: '800' }}>1) Student Registration Features</h3>
                  <span style={{ fontSize: '0.8rem', color: '#2563eb' }}>Free Candidate Account Setup</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#2563eb', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Authenticated Profile & Resume:</strong> Upload PDF resume, specify degree, college, branch, and graduation year.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#2563eb', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Work Mode & Stipend Preferences:</strong> Choose Online (Remote), Offline (On-Site), or Hybrid filters.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#2563eb', shrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Mandatory Contact Verification:</strong> Secure phone number input ensuring direct recruiter communication and SMS updates.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} style={{ color: '#2563eb', shrink: 0, marginTop: '2px' }} />
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
            <button className="btn btn-emerald" onClick={() => { setCurrentRole('company'); setActiveTab('for-companies'); }}>
              Register Employer Account <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
