import React from 'react';
import Logo from './Logo';
import { Briefcase, ShieldCheck, Mail, Phone, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#0f172a',
      borderTop: '1px solid #1e293b',
      padding: '4rem 0 2rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* Col 1: Platform Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Logo 
              height={44} 
              mode="dark" 
              showTagline={true} 
              onClick={() => handleTabClick('home')} 
            />
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              InternCatalyst connects students, colleges, and verified employers for internship opportunities.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontSize: '0.85rem', fontWeight: '600' }}>
              <ShieldCheck size={16} /> 100% Verified Employer Opportunities
            </div>
          </div>

          {/* Col 2: For Candidates */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>For Students</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleTabClick('browse')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Browse Internships</button></li>
              <li><button onClick={() => handleTabClick('student-dash')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Student Profile Builder</button></li>
              <li><button onClick={() => handleTabClick('resume-templates')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>20+ Professional Resume Templates</button></li>
              <li><button onClick={() => handleTabClick('resume-templates')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>ATS Resume Analyzer & Tips</button></li>
              <li><button onClick={() => handleTabClick('how-it-works')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Candidate Roadmap</button></li>
            </ul>
          </div>

          {/* Col 3: For Employers */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>For Employers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleTabClick('for-companies')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Post Internship Opportunity</button></li>
              <li><button onClick={() => handleTabClick('for-companies')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Employer Verification Badge</button></li>
              <li><button onClick={() => handleTabClick('for-companies')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Subscription Pricing Plans</button></li>
              <li><button onClick={() => handleTabClick('admin-dash')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Admin Governance</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification Notice */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>Contact & Safety Desk</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} style={{ color: '#818cf8' }} /> interncatalyst.in@gmail.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} style={{ color: '#818cf8' }} /> +91 9148762124
              </div>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#fbbf24',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                marginTop: '0.5rem'
              }}>
                <strong>Notice:</strong> InternCatalyst does not charge candidates any fees. Please report any suspicious postings.
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} InternCatalyst Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Trust & Safety</span>
            <span>Audit Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
