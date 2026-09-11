import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, DollarSign, MapPin, Briefcase, RefreshCw } from 'lucide-react';
import InternshipCard from '../components/InternshipCard';

export default function BrowseInternshipsPage({ 
  internships, 
  onSelectInternship, 
  onApplyInternship 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedType, setSelectedType] = useState('All'); // 'All', 'Full-time', 'Part-time'
  const [selectedStipend, setSelectedStipend] = useState('All'); // 'All', 'Paid', 'Free'
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Industries list
  const industries = ['All', 'Software & IT', 'Artificial Intelligence', 'Design & Media', 'Cybersecurity', 'Marketing & Sales'];

  // Filtering Logic
  const filteredInternships = internships.filter(item => {
    // Only show approved posts in public browse
    if (item.status !== 'Approved') return false;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
    const matchesWorkMode = selectedWorkMode === 'All' || item.workMode === selectedWorkMode;
    const matchesType = selectedType === 'All' || (item.internshipType || 'Full-time') === selectedType;
    const matchesStipend = selectedStipend === 'All' || (item.stipendType || 'Paid') === selectedStipend;
    const matchesVerified = !verifiedOnly || item.verified === true;

    return matchesSearch && matchesIndustry && matchesWorkMode && matchesType && matchesStipend && matchesVerified;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('All');
    setSelectedWorkMode('All');
    setSelectedType('All');
    setSelectedStipend('All');
    setVerifiedOnly(false);
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Page Title & Search Bar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            Browse <span className="text-gradient">Internship Opportunities</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Explore verified full-time, part-time, paid stipend, and free mentorship internships with transparent supervisor contacts.
          </p>

          <div style={{
            marginTop: '1.5rem',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Search size={20} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search by job title, company name, or skills (e.g., React, Python, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#0f172a',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Filter Controls Row */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a', fontSize: '0.875rem', fontWeight: '700' }}>
              <Filter size={16} /> Filters:
            </div>

            {/* Commitment Filter (Full-time vs Part-time) */}
            <select 
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="All" style={{ background: '#ffffff' }}>Commitment: All</option>
              <option value="Full-time" style={{ background: '#ffffff' }}>🌕 Full-Time (40 hrs/wk)</option>
              <option value="Part-time" style={{ background: '#ffffff' }}>🌓 Part-Time (20 hrs/wk)</option>
            </select>

            {/* Compensation Filter (Paid Stipend vs Free) */}
            <select 
              className="form-select"
              value={selectedStipend}
              onChange={(e) => setSelectedStipend(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="All" style={{ background: '#ffffff' }}>Compensation: All</option>
              <option value="Paid" style={{ background: '#ffffff' }}>💵 Paid Stipend Only</option>
              <option value="Free" style={{ background: '#ffffff' }}>🎓 Free (Certificate + LOR)</option>
            </select>

            {/* Industry Filter */}
            <select 
              className="form-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              {industries.map(ind => (
                <option key={ind} value={ind} style={{ background: '#ffffff' }}>Industry: {ind}</option>
              ))}
            </select>

            {/* Work Mode Filter (Online / Offline / Hybrid) */}
            <select 
              className="form-select"
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              <option value="All" style={{ background: '#ffffff' }}>Work Mode: All</option>
              <option value="Online" style={{ background: '#ffffff' }}>Online (Remote)</option>
              <option value="Offline" style={{ background: '#ffffff' }}>Offline (On-Site)</option>
              <option value="Hybrid" style={{ background: '#ffffff' }}>Hybrid</option>
            </select>

            {/* Verified Employer Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#0f172a', fontWeight: '600' }}>
              <input 
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
              />
              <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Employers</span>
            </label>
          </div>

          <button 
            onClick={handleResetFilters}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <RefreshCw size={13} /> Reset Filters
          </button>
        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredInternships.length}</strong> available opportunities
          </span>
        </div>

        {/* Job Grid */}
        {filteredInternships.length > 0 ? (
          <div className="grid-3">
            {filteredInternships.map(internship => (
              <InternshipCard 
                key={internship.id}
                internship={internship}
                onSelect={onSelectInternship}
                onApply={onApplyInternship}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Briefcase size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
            <h3 style={{ color: '#0f172a', fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Internships Match Your Criteria</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Try loosening your filters or searching with different technical skill keywords.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
