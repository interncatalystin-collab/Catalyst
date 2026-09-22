import React from 'react';
import Logo from './Logo';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0b1528 0%, #060c18 100%)',
      borderTop: '1px solid rgba(56, 189, 248, 0.2)',
      padding: '3.5rem 0 2rem',
      marginTop: '4rem',
      boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.35)',
      color: '#94a3b8'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem', gap: '2rem' }}>
          {/* Col 1: Platform Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Logo 
              height={38} 
              mode="dark" 
              showTagline={true} 
              onClick={() => handleTabClick('home')} 
            />
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6' }}>
              InternCatalyst connects students, colleges, and verified employers for real, transparent, scam-free internship opportunities.
            </p>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              color: '#38bdf8', 
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.825rem', 
              fontWeight: '700',
              width: 'fit-content'
            }}>
              <ShieldCheck size={16} /> 100% Internship Opportunities
            </div>
          </div>

          {/* Col 2: For Students */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.1rem', letterSpacing: '-0.01em' }}>
              For Students
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              {[
                { label: 'Browse Internships', tab: 'browse' },
                { label: 'Student Profile Builder', tab: 'student-dash' },
                { label: 'Professional Resume Templates', tab: 'resume-templates' },
                { label: 'ATS Resume Tips & Examples', tab: 'resume-templates' },
                { label: 'Candidate Roadmap', tab: 'how-it-works' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleTabClick(link.tab)} 
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem 0', display: 'inline-block', textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Companies */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.1rem', letterSpacing: '-0.01em' }}>
              For Companies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              {[
                { label: 'Company Dashboard', tab: 'company-dash' },
                { label: 'Post Internship Opportunity', tab: 'company-dash' },
                { label: 'Company Verification Badge', tab: 'company-dash' },
                { label: 'Subscription Pricing Plans', tab: 'company-dash' },
                { label: 'Admin Governance', tab: 'admin-dash' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleTabClick(link.tab)} 
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem 0', display: 'inline-block', textAlign: 'left', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Verification Notice */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.1rem', letterSpacing: '-0.01em' }}>
              Contact & Support Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <a 
                  href="mailto:interncatalyst.in@gmail.com" 
                  style={{ color: '#cbd5e1', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s', padding: '0.2rem 0' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                >
                  interncatalyst.in@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <a 
                  href="tel:+919148762124" 
                  style={{ color: '#cbd5e1', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s', padding: '0.2rem 0' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                >
                  +91 9148762124
                </a>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', lineHeight: '1.5' }}>
                Operational hours: Mon – Sat, 9:30 AM – 6:30 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="footer-bottom-bar" style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.825rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} InternCatalyst Platform. All rights reserved.
          </div>
          <div className="footer-legal-links" style={{ display: 'flex', gap: '0.75rem 1.25rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', tab: 'about' },
              { label: 'Terms of Service', tab: 'about' },
              { label: 'Trust & Safety', tab: 'about' },
              { label: 'Audit Transparency', tab: 'admin-dash' },
            ].map((legal, idx) => (
              <span 
                key={idx} 
                style={{ cursor: 'pointer', transition: 'color 0.2s', padding: '0.2rem 0' }} 
                onClick={() => handleTabClick(legal.tab)}
                onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                {legal.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
