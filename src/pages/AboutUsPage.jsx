import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Users, Sparkles, Award, UserCheck, CheckCircle, Send, FileText, Briefcase, GraduationCap } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge badge-pill" style={{ marginBottom: '0.75rem', color: '#1e3a8a' }}>
            <Sparkles size={14} /> Our Mission & Business Model
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            About <span className="text-gradient">InternCatalyst</span> Platform
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
            Empowering students to smoothly transition from classroom education to real-world career employment through transparent, scam-free, and verified opportunities.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid-2" style={{ marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 138, 0.08)', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={26} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.75rem' }}>
              Our Mission
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              To eradicate fraudulent internship listings and unconfirmed job claims. We aim to ensure that every ambitious student gets direct access to verified corporate stipends, structured supervisor mentorship, and a clear pathway from education into full-time employment.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Eye size={26} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.75rem' }}>
              Our Vision
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              To become India's most trusted national Education-to-Career infrastructure. By seamlessly connecting higher education institutions, students, and verified employers, we aim to place over 1,000,000 students into stipended internships by 2030.
            </p>
          </div>
        </div>

        {/* 7-Step Business Model Architecture */}
        <div style={{ marginBottom: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge badge-pill" style={{ marginBottom: '0.5rem', color: '#1e3a8a' }}>
              <Briefcase size={14} /> Ecosystem Framework
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a' }}>
              Defining Our <span className="text-gradient">Business Model</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              Our end-to-end 7-pillar operational methodology designed for candidate excellence and employer trust
            </p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {/* Step 1 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 01</span>
                <span className="badge badge-verified">Verified</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>1. Student Registration & Resume Verification</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Mandatory contact phone number registration, 6-digit OTP verification, and resume document validation before profile activation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 02</span>
                <span className="badge badge-verified">AI Engine</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>2. Matching Students with Relevant Internship Openings</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Automated matching based on student domain specialization, work mode preference (Online/Offline), stipend expectations, and location.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 03</span>
                <span className="badge badge-verified">Shortlisting</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>3. Shortlisting Students for Companies</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Screening candidate profiles for recruiting partners, providing AI match scores, and ranking applicants for instant corporate review.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 04</span>
                <span className="badge badge-verified">Direct Messaging</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>4. Communication & Interview Scheduling</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                In-app recruiter messaging hub, automated calendar slot booking for interviews, and real-time SMS & email notifications.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 05</span>
                <span className="badge badge-verified">Milestones</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>5. Progress Tracking & Feedback</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Supervisor progress logs, weekly work evaluation, stipend confirmation tracking, and institutional placement credit verification.
              </p>
            </div>

            {/* Step 6 */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0891b2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 06</span>
                <span className="badge badge-verified">Upskilling</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>6. Optional Mentor & Training Support</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                1-on-1 industry mentor guidance, technical bootcamps, and mock interview coaching for candidates seeking skill enhancements.
              </p>
            </div>

            {/* Step 7 */}
            <div className="glass-card" style={{ gridColumn: '1 / -1', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pillar 07</span>
                <span className="badge badge-verified">Grassroots Advocacy</span>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>7. Approaching Students to Share & Support the Website</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Active campus ambassador programs, peer-to-peer student outreach, college placement cell partnerships, and student advocate drives encouraging candidates nationwide to share platform opportunities and support the InternCatalyst mission.
              </p>
            </div>
          </div>
        </div>

        {/* Core Team Principles */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
              Core Team <span className="text-gradient">Principles</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>The foundational values that guide our technology and governance</p>
          </div>

          <div className="grid-3">
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={22} style={{ color: '#059669' }} />
                <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700' }}>1. Mandatory Verification</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Never list an opportunity without confirming that it is genuine. We audit company legal identity, corporate emails, and supervisor contacts before awarding the Verification Badge (✓).
              </p>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Users size={22} style={{ color: '#2563eb' }} />
                <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700' }}>2. Role-Based Access</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Protect student privacy while giving employers precise candidate data. Ensure administrators, staff, employers, and students see only information relevant to them.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Heart size={22} style={{ color: '#dc2626' }} />
                <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700' }}>3. Student-First Ethics</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Zero registration fees for candidates. We prohibit fake unpaid labor and enforce transparent stipend listings, working hours, and application deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

