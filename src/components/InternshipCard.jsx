import React from 'react';
import { ShieldCheck, MapPin, Clock, DollarSign, Users, Calendar, ArrowRight, Building2 } from 'lucide-react';

export default function InternshipCard({ internship, onSelect, onApply }) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Header with Company Logo & Badges */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img 
            src={internship.logo} 
            alt={internship.companyName}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              objectFit: 'cover',
              border: '1px solid var(--border-color)',
              background: '#fff'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: '700', fontSize: '0.925rem', color: '#0f172a' }}>
                {internship.companyName}
              </span>
              {internship.verified ? (
                <span className="badge badge-verified" title="Verified Employer Identity & Genuine Stipend">
                  <ShieldCheck size={12} /> Verified
                </span>
              ) : (
                <span className="badge badge-pending" title="Pending Verification Audit">
                  Pending Audit
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
              <Building2 size={13} /> {internship.industry}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
          <span className="badge badge-pill" style={{
            background: internship.workMode === 'Online' ? '#e0f2fe' : '#f3e8ff',
            color: internship.workMode === 'Online' ? '#0369a1' : '#6b21a8',
            borderColor: 'transparent'
          }}>
            {internship.workMode}
          </span>
          <span className="badge badge-pill" style={{
            background: (internship.internshipType || 'Full-time') === 'Full-time' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(147, 51, 234, 0.1)',
            color: (internship.internshipType || 'Full-time') === 'Full-time' ? '#2563eb' : '#9333ea',
            borderColor: (internship.internshipType || 'Full-time') === 'Full-time' ? '#bfdbfe' : '#e9d5ff',
            fontSize: '0.725rem'
          }}>
            {(internship.internshipType || 'Full-time') === 'Full-time' ? '🌕 Full-Time' : '🌓 Part-Time'}
          </span>
        </div>
      </div>

      {/* Role Title */}
      <h3 
        onClick={() => onSelect(internship)}
        style={{
          fontSize: '1.15rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '0.65rem',
          cursor: 'pointer',
          lineHeight: '1.3'
        }}
      >
        {internship.title}
      </h3>

      {/* Key Specifications Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.65rem',
        margin: '0.5rem 0 1rem',
        fontSize: '0.825rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <DollarSign size={14} style={{ color: (internship.stipendType || 'Paid') === 'Paid' ? '#059669' : '#d97706' }} />
          <span>
            {(internship.stipendType || 'Paid') === 'Paid' ? (
              <strong style={{ color: '#059669' }}>{internship.stipendAmount}</strong>
            ) : (
              <span className="badge badge-verified" style={{ background: '#fffbe8', color: '#b45309', borderColor: '#fde68a', fontSize: '0.7rem' }}>
                🎓 Free (Certificate + LOR)
              </span>
            )}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Clock size={14} style={{ color: '#2563eb' }} />
          <span>{internship.duration} ({internship.workingHours ? internship.workingHours.split('(')[1]?.replace(')', '') || 'Std' : 'Std'})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MapPin size={14} style={{ color: '#dc2626' }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{internship.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Users size={14} style={{ color: '#0284c7' }} />
          <span>{internship.openings} Openings</span>
        </div>
      </div>

      {/* Skill Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
        {internship.skills.slice(0, 4).map((skill, idx) => (
          <span key={idx} style={{
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: '#475569',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {skill}
          </span>
        ))}
        {internship.skills.length > 4 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
            +{internship.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Calendar size={13} /> Deadline: {internship.deadline}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onSelect(internship)}
          >
            Details
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onApply(internship)}
          >
            Apply <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
