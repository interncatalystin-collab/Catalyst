import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, DollarSign, MapPin, Briefcase, RefreshCw, Sparkles, Layers } from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { DOMAIN_ROLES_DATA } from '../data/domainRolesData';

export default function BrowseInternshipsPage({ 
  internships, 
  onSelectInternship, 
  onApplyInternship 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedType, setSelectedType] = useState('All'); // 'All', 'Full-time', 'Part-time'
  const [selectedStipend, setSelectedStipend] = useState('All'); // 'All', 'Paid', 'Free'
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Industries list
  const industries = ['All', 'Software & IT', 'Artificial Intelligence', 'Data Science & Analytics', 'UI/UX & Product Design', 'Cybersecurity', 'Marketing & Growth'];

  // Filtering Logic
  const filteredInternships = internships.filter(item => {
    // Only show approved posts in public browse
    if (item.status !== 'Approved') return false;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.domain && item.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || 
      (item.domain && item.domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim()) ||
      (item.domain && item.domain.toLowerCase().includes(selectedDomain.toLowerCase()));

    const matchesIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
    const matchesWorkMode = selectedWorkMode === 'All' || item.workMode === selectedWorkMode;
    const matchesType = selectedType === 'All' || (item.internshipType || 'Full-time') === selectedType;
    const matchesStipend = selectedStipend === 'All' || (item.stipendType || 'Paid') === selectedStipend;
    const matchesVerified = !verifiedOnly || item.verified === true;

    return matchesSearch && matchesDomain && matchesIndustry && matchesWorkMode && matchesType && matchesStipend && matchesVerified;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
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
            Available Roles <span className="text-gradient">by Domain</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Explore verified internship roles across specialized domain tracks. Students apply directly for their chosen domain role, with applications centrally vetted by Administration and routed to partner enterprises.
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
              placeholder="Search by available role, domain, or skills (e.g., Full Stack, React, Python, Data Analyst)..."
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

        {/* Specialized Domain Tracks List Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#1e3a8a" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Specialized Placement Domain Tracks
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Select a domain to filter open opportunities across connected companies
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setSelectedDomain('All')}
              style={{
                padding: '0.75rem 0.95rem',
                borderRadius: '8px',
                border: selectedDomain === 'All' ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
                background: selectedDomain === 'All' ? '#1e3a8a' : '#ffffff',
                color: selectedDomain === 'All' ? '#ffffff' : '#334155',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease'
              }}
            >
              <span>All Domain Tracks</span>
              <span className="badge" style={{ background: selectedDomain === 'All' ? 'rgba(255,255,255,0.2)' : '#f1f5f9', color: selectedDomain === 'All' ? '#ffffff' : '#64748b', fontSize: '0.72rem' }}>
                {internships.filter(i => i.status === 'Approved').length}
              </span>
            </button>

            {DOMAIN_ROLES_DATA.map(d => {
              const count = internships.filter(i => i.status === 'Approved' && i.domain && i.domain.toLowerCase().includes(d.domainName.toLowerCase())).length;
              const isSelected = selectedDomain.toLowerCase().includes(d.domainName.toLowerCase());
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDomain(isSelected ? 'All' : d.domainName)}
                  style={{
                    padding: '0.75rem 0.95rem',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
                    background: isSelected ? '#1e3a8a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontWeight: '700',
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '6px' }}>
                    {d.domainName}
                  </span>
                  <span className="badge" style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : '#f1f5f9', color: isSelected ? '#ffffff' : '#64748b', fontSize: '0.72rem', flexShrink: 0 }}>
                    {count || d.totalVacancies} seats
                  </span>
                </button>
              );
            })}
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

            {/* Domain Track Filter Dropdown */}
            <select 
              className="form-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: '700', color: '#1e3a8a', background: 'rgba(30, 58, 138, 0.08)', border: '1px solid #cbd5e1' }}
            >
              <option value="All" style={{ background: '#ffffff', color: '#0f172a' }}>Domain Track: All (6 Domains)</option>
              {DOMAIN_ROLES_DATA.map(d => (
                <option key={d.id} value={d.domainName} style={{ background: '#ffffff', color: '#0f172a' }}>
                  {d.domainName}
                </option>
              ))}
            </select>

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


            {/* Industry Filter */}
            <select 
              className="form-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              {industries.map((ind, idx) => (
                <option key={idx} value={ind} style={{ background: '#ffffff' }}>
                  Industry: {ind}
                </option>
              ))}
            </select>

            {/* Work Mode Filter (Online / Offline / Hybrid) */}
            <select 
              className="form-select"
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="All" style={{ background: '#ffffff' }}>Work Mode: All</option>
              <option value="Online / Remote" style={{ background: '#ffffff' }}>Online (Remote)</option>
              <option value="Offline" style={{ background: '#ffffff' }}>Offline (On-Site)</option>
              <option value="Hybrid" style={{ background: '#ffffff' }}>Hybrid</option>
            </select>

            {/* Verified Employer Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#0f172a', fontWeight: '600' }}>
              <input 
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#1e3a8a' }}
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
