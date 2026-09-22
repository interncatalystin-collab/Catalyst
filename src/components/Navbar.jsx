import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Home,
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
        background: '#0b1528',
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
        padding: '0.75rem 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)'
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
                  className="btn btn-sm nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  style={{ 
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: '700', 
                    padding: '0.45rem 1.15rem',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Lock size={14} /> Login
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {currentRole === 'student' && (
                  <button 
                    className="btn btn-sm"
                    onClick={() => handleNavClick('student-dash')}
                    style={{ background: '#0284c7', color: '#ffffff', fontWeight: '700', border: 'none', fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '6px' }}
                  >
                    <GraduationCap size={14} /> Student Dashboard
                  </button>
                )}
                {currentRole === 'company' && (
                  <button 
                    className="btn btn-emerald btn-sm"
                    onClick={() => handleNavClick('company-dash')}
                    style={{ background: '#15803d', color: '#ffffff', border: 'none', fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '6px' }}
                  >
                    <Building2 size={14} /> Company Dashboard
                  </button>
                )}
                {currentRole === 'admin' && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleNavClick('admin-dash')}
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff', background: '#0f172a', fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '6px' }}
                  >
                    <Shield size={14} /> Admin Dashboard
                  </button>
                )}
              </div>
            )}

            {/* Mobile menu trigger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                padding: '0.45rem',
                borderRadius: '8px',
                cursor: 'pointer',
                minWidth: '40px',
                minHeight: '40px',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{
          background: '#0b1528',
          borderBottom: '2px solid #0284c7',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
        }}>
          {currentRole === 'visitor' ? (
            <button 
              className="btn" 
              style={{ 
                background: '#0284c7', 
                color: '#ffffff', 
                fontWeight: '700',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                minHeight: '44px'
              }} 
              onClick={() => handleNavClick('login')}
            >
              <Lock size={16} /> Student & Employer Login
            </button>
          ) : (
            <>
              {currentRole === 'student' && (
                <button 
                  className="btn" 
                  style={{ background: '#0284c7', color: '#ffffff', fontWeight: '700', padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minHeight: '44px' }} 
                  onClick={() => handleNavClick('student-dash')}
                >
                  <GraduationCap size={16} /> Student Dashboard
                </button>
              )}
              {currentRole === 'company' && (
                <button 
                  className="btn btn-emerald" 
                  style={{ background: '#15803d', color: '#ffffff', fontWeight: '700', padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minHeight: '44px' }} 
                  onClick={() => handleNavClick('company-dash')}
                >
                  <Building2 size={16} /> Company Dashboard
                </button>
              )}
              {currentRole === 'admin' && (
                <button 
                  className="btn" 
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff', background: '#0f172a', fontWeight: '700', padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minHeight: '44px' }} 
                  onClick={() => handleNavClick('admin-dash')}
                >
                  <Shield size={16} /> Admin Dashboard
                </button>
              )}
            </>
          )}
          <hr style={{ borderColor: 'rgba(255,255,255,0.12)', margin: '0.35rem 0' }} />
          {[
            { id: 'home', label: 'Home', icon: <Home size={16} /> },
            { id: 'browse', label: 'Find Internships', icon: <Search size={16} /> },
            { id: 'how-it-works', label: 'How It Works', icon: <HelpCircle size={16} /> },
            { id: 'resume-templates', label: 'Resume Templates', icon: <FileText size={16} /> },
            { id: 'about', label: 'About Us', icon: <Info size={16} /> },
          ].map((navItem) => {
            const isActive = activeTab === navItem.id || (navItem.id === 'resume-templates' && activeTab === 'resources');
            return (
              <button 
                key={navItem.id}
                className="btn" 
                style={{ 
                  background: isActive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.06)', 
                  color: isActive ? '#38bdf8' : '#e2e8f0', 
                  fontWeight: isActive ? '700' : '600', 
                  border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)', 
                  padding: '0.75rem 1rem', 
                  fontSize: '0.9rem', 
                  justifyContent: 'flex-start',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  minHeight: '44px',
                  transition: 'all 0.15s ease'
                }} 
                onClick={() => handleNavClick(navItem.id)}
              >
                {navItem.icon}
                <span>{navItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
