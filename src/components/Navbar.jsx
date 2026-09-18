import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Briefcase, 
  Search, 
  User, 
  Building2, 
  Shield, 
  GraduationCap, 
  Menu, 
  X, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Info,
  HelpCircle,
  Lock
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentRole, setCurrentRole, unreadNotificationsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="nav-header">
      {/* Main Navbar */}
      <nav style={{
        background: 'rgba(30, 41, 59, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.35)',
        padding: '0.75rem 0',
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.3)'
      }}>
        <div className="nav-container">
          {/* Logo */}
          <Logo 
            height={38} 
            mode="dark" 
            showTagline={true}
            onClick={() => handleNavClick('home')} 
            style={{ flexShrink: 0, marginRight: '0.5rem' }}
          />

          {/* Desktop Navigation Links */}
          <div className="desktop-links">
            <button 
              onClick={() => handleNavClick('home')}
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('browse')}
              className={`nav-link-btn ${activeTab === 'browse' ? 'active' : ''}`}
            >
              <Search size={14} /> Find Internships
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className={`nav-link-btn ${activeTab === 'how-it-works' ? 'active' : ''}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('resume-templates')}
              className={`nav-link-btn ${(activeTab === 'resume-templates' || activeTab === 'resources') ? 'active' : ''}`}
            >
              <FileText size={14} /> Resume Templates
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`nav-link-btn ${activeTab === 'about' ? 'active' : ''}`}
            >
              About Us
            </button>
          </div>

          {/* Action CTAs */}
          <div className="nav-action-ctas" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
            {currentRole === 'visitor' ? (
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button 
                  className="btn btn-secondary btn-sm nav-reg-btn"
                  onClick={() => {
                    if (setCurrentRole) setCurrentRole('student');
                    handleNavClick('student-profile');
                  }}
                  style={{ 
                    borderColor: '#38bdf8', 
                    color: '#38bdf8', 
                    fontWeight: '700', 
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <GraduationCap size={14} /> Register / Profile Form
                </button>
                <button 
                  className="btn btn-primary btn-sm nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  style={{ 
                    background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '700', 
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    boxShadow: '0 0 12px rgba(6, 182, 212, 0.35)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <Lock size={14} /> Login
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {currentRole === 'student' && (
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleNavClick('student-dash')}
                      style={{ background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', border: 'none', fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                    >
                      <GraduationCap size={14} /> Dashboard
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleNavClick('student-profile')}
                      style={{ borderColor: '#38bdf8', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                    >
                      <User size={14} /> Profile Form
                    </button>
                  </div>
                )}
                {currentRole === 'company' && (
                  <button 
                    className="btn btn-emerald btn-sm"
                    onClick={() => handleNavClick('company-dash')}
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', border: 'none', fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                  >
                    <Building2 size={14} /> Company Dashboard
                  </button>
                )}
                {currentRole === 'admin' && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleNavClick('admin-dash')}
                    style={{ borderColor: '#38bdf8', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                  >
                    <Shield size={14} /> Admin
                  </button>
                )}
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setCurrentRole('visitor'); handleNavClick('home'); }}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.15)', fontSize: '0.8rem', padding: '0.45rem 0.65rem' }}
                >
                  <Lock size={13} /> Exit
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: '#334155',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0f172a',
          borderBottom: '2px solid rgba(6, 182, 212, 0.4)',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <button 
            className="btn btn-primary" 
            style={{ 
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', 
              color: '#ffffff', 
              fontWeight: '800',
              padding: '0.75rem 1rem',
              fontSize: '0.925rem'
            }} 
            onClick={() => handleNavClick('login')}
          >
            <Lock size={16} /> Student & Employer Login
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ 
              background: '#ffffff', 
              color: '#0f172a', 
              fontWeight: '800', 
              border: '1.5px solid #cbd5e1',
              padding: '0.75rem 1rem',
              fontSize: '0.925rem'
            }} 
            onClick={() => {
              if (setCurrentRole) setCurrentRole('student');
              handleNavClick('student-profile');
            }}
          >
            <GraduationCap size={16} style={{ color: '#2563eb' }} /> Student Profile & Registration Form
          </button>
          <hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '0.25rem 0' }} />
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#0f172a', fontWeight: '800', border: '1.5px solid #cbd5e1', padding: '0.7rem 1rem', fontSize: '0.9rem' }} 
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#0f172a', fontWeight: '800', border: '1.5px solid #cbd5e1', padding: '0.7rem 1rem', fontSize: '0.9rem' }} 
            onClick={() => handleNavClick('browse')}
          >
            Find Internships
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#0f172a', fontWeight: '800', border: '1.5px solid #cbd5e1', padding: '0.7rem 1rem', fontSize: '0.9rem' }} 
            onClick={() => handleNavClick('how-it-works')}
          >
            How It Works
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#0f172a', fontWeight: '800', border: '1.5px solid #cbd5e1', padding: '0.7rem 1rem', fontSize: '0.9rem' }} 
            onClick={() => handleNavClick('resume-templates')}
          >
            Resume Templates
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#0f172a', fontWeight: '800', border: '1.5px solid #cbd5e1', padding: '0.7rem 1rem', fontSize: '0.9rem' }} 
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
        </div>
      )}
    </header>
  );
}
