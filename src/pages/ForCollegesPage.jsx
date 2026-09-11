import React, { useState } from 'react';
import { Award, Building2, CheckCircle, GraduationCap, Send, ShieldCheck, Users, BarChart3, ArrowRight } from 'lucide-react';

export default function ForCollegesPage() {
  const [collegeName, setCollegeName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentCount, setStudentCount] = useState('500-1000');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge badge-pill" style={{ marginBottom: '0.75rem', color: '#0284c7' }}>
            <Award size={14} /> Higher Education Institution Portal
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            Institutional Partnerships for <span className="text-gradient">Colleges & Universities</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
            Partner with InternCatalyst to automate your institution's placement cell, onboard entire student batches, track NIRF internship data, and host campus hiring drives.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Users size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Bulk Student Onboarding</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Import your entire student roster via CSV. Automated verification checks ensure every student gets a pre-verified career profile.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <BarChart3 size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Placement Analytics & Reports</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Generate comprehensive NIRF and NBA accreditation reports showing stipend amounts, company verification statuses, and department-wise placement metrics.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Building2 size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Campus Internship Drives</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Invite verified corporate recruiters directly to host exclusive campus placement drives for your final-year and pre-final year students.
            </p>
          </div>
        </div>

        {/* Partnership Form & Case Study Box */}
        <div className="grid-2">
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.5rem' }}>
              Request College Partnership Access
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Fill out the form below. Our Institutional Outreach Coordinator will schedule a demonstration and setup your custom college portal dashboard.
            </p>

            {submitted ? (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#16a34a',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <CheckCircle size={36} style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.25rem' }}>Inquiry Submitted Successfully!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Our team will contact <strong>{contactPerson}</strong> at <strong>{email}</strong> within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Institution / College Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Alva's Institute of Engineering & Technology (AIET)"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Placement Officer / Contact Person <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Prof. Rajesh Kumar (Head of Placements)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    required
                  />
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Official Email <span className="required">*</span></label>
                    <input 
                      type="email" 
                      className="form-input"
                      placeholder="placements@aiet.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Approximate Annual Batch Size</label>
                  <select 
                    className="form-select"
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                  >
                    <option value="100-500">100 - 500 Students</option>
                    <option value="500-1000">500 - 1,000 Students</option>
                    <option value="1000-5000">1,000 - 5,000 Students</option>
                    <option value="5000+">5,000+ Students</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Submit Institutional Request <Send size={16} />
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card">
              <span className="badge badge-verified" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck size={14} /> Verified Partner
              </span>
              <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Case Study: Alva's Institute of Engineering & Technology (AIET)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                "InternCatalyst helped AIET streamline our final-year internship placements. Over 450+ students secured verified stipended roles in software, AI research, and cloud infrastructure with zero unconfirmed listings."
              </p>
              <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700' }}>
                — Placement & Training Cell, AIET Mangalore
              </div>
            </div>

            <div className="glass-card" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <h4 style={{ color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.5rem' }}>What Colleges Receive:</h4>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Dedicated TPO (Training & Placement Officer) Dashboard</li>
                <li>Real-time application tracking for all enrolled students</li>
                <li>One-click CSV data export for NAAC & NBA audits</li>
                <li>Direct communication channel with Verified Employers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
