import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  FileCheck,
  PlusCircle
} from 'lucide-react';
import InternshipCard from '../components/InternshipCard';

export default function HomePage({ 
  internships, 
  onSelectInternship, 
  onApplyInternship, 
  setActiveTab, 
  setCurrentRole,
  testimonials,
  blogs
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('browse');
  };

  const featuredInternships = internships.filter(i => i.status === 'Approved').slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Trust Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#1e3a8a',
              padding: '0.45rem 1.25rem',
              borderRadius: '30px',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)'
            }}>
              <ShieldCheck size={16} style={{ color: '#1e3a8a' }} />
              <span>100% Verified Internships & Scam-Free Guarantee</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            maxWidth: '900px',
            margin: '0 auto 1.25rem',
            color: '#0f172a'
          }}>
            Connecting <span className="text-gradient">Students to Careers</span> with Real Internships
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            Accelerate your career with 100% verified internships, ATS resume tools, and direct corporate hiring.
          </p>

          {/* Main Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
              onClick={() => setActiveTab('browse')}
            >
              <Search size={18} /> Find Internships <ArrowRight size={18} />
            </button>
          </div>

          {/* Interactive Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hero-search-form"
            style={{
              maxWidth: '750px',
              margin: '0 auto',
              background: '#ffffff',
              border: '1px solid var(--border-highlight)',
              borderRadius: 'var(--radius-xl)',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, padding: '0 1rem' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search by role or skill (e.g. Web Developer, AI, Python)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </section>

      {/* Target Audiences: Who It Helps */}
      <section style={{ padding: '3.5rem 0', background: '#f1f5f9', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
              Who <span className="text-gradient">InternCatalyst</span> Helps
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Empowering all stakeholders in the career ecosystem</p>
          </div>

          <div className="grid-2">
            {/* Box 1: Students */}
            <div className="glass-card">
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9',
                color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
              }}>
                <GraduationCap size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>For Students & Freshers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Build an authenticated profile, upload ATS resumes, specify work mode (Online/Offline) and stipend expectations, and apply to 100% verified opportunities.
              </p>
              <button 
                onClick={() => { setCurrentRole('student'); setActiveTab('student-dash'); }}
                style={{ background: 'none', border: 'none', color: '#1e3a8a', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}
              >
                Go to Student Dashboard <ArrowRight size={14} />
              </button>
            </div>

            {/* Box 2: Domain-Based Career Tracks */}
            <div className="glass-card">
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4',
                color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
              }}>
                <Briefcase size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>Domain Placement Tracks</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Apply once for your specialized domain track and get pooled across verified hiring partners with guaranteed stipends and proctored assessment credentials.
              </p>
              <button 
                onClick={() => setActiveTab('browse')}
                style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}
              >
                Explore Domain Roles <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Employer Badge Commitment Banner */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: '0 1px 4px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <div className="badge badge-verified" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck size={14} /> Strict Safety Standard
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Our Guarantee: Employer Verification Badge System
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                We only display the Employer Verification Badge (✓) after checking business legal identity, corporate emails, and supervisor contact details. We never list unconfirmed or suspicious listings.
              </p>
            </div>
            <button 
              className="btn btn-emerald"
              onClick={() => setActiveTab('how-it-works')}
            >
              Learn About Verification <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Internships Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
                Featured <span className="text-gradient">Internship Opportunities</span>
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>Explore top openings from verified tech & design partners</p>
            </div>
            <button className="btn btn-secondary" onClick={() => setActiveTab('browse')}>
              View All Openings <ArrowRight size={16} />
            </button>
          </div>

          {featuredInternships.length > 0 ? (
            <div className="grid-3">
              {featuredInternships.map(internship => (
                <InternshipCard 
                  key={internship.id}
                  internship={internship}
                  onSelect={onSelectInternship}
                  onApply={onApplyInternship}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', background: '#ffffff' }}>
              <Briefcase size={44} style={{ color: '#2563eb', marginBottom: '1rem', margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                No Active Internship Listings Yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                Be the first corporate employer to post an internship opportunity and hire top verified student talent!
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => { setCurrentRole('company'); setActiveTab('company-dash'); }}
              >
                <PlusCircle size={16} /> Post First Internship Role
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 0', background: '#f1f5f9', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
              Student & Employer <span className="text-gradient">Success Stories</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Real feedback from candidates and hiring leaders</p>
          </div>

          <div className="grid-2">
            {testimonials.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                <p style={{ fontSize: '1rem', color: '#334155', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{item.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '700' }}>{item.name}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {item.role} {item.college ? `• ${item.college}` : `• ${item.company}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Resume Templates Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
                Professional <span className="text-gradient">Resume Templates</span>
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>ATS-optimized, recruiter-approved single page resume layouts</p>
            </div>
            <button className="btn btn-primary" onClick={() => setActiveTab('resume-templates')}>
              Browse All Templates <ArrowRight size={16} />
            </button>
          </div>

          <div 
            className="responsive-banner-card"
            style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <span className="badge badge-verified" style={{ marginBottom: '0.75rem', background: '#f8fafc', color: '#1e3a8a', border: '1px solid #cbd5e1' }}>
                100% Free & ATS Compatible (99% Parsing Score)
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Land 3x More Interviews With Our Pre-Formatted Candidate CVs
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Choose from domain-specific resume formats built for Software Engineers, AI Researchers, Product Designers, Data Analysts, and Campus Freshers.
              </p>
            </div>
            <button 
              className="btn btn-emerald"
              onClick={() => setActiveTab('resume-templates')}
            >
              Explore Resume Templates <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
