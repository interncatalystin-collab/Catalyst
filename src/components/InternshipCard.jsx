import React from 'react';
import { ShieldCheck, MapPin, Clock, Users, Calendar, ArrowRight, Building2, Layers, Briefcase } from 'lucide-react';

export default function InternshipCard({ internship, onSelect, onApply }) {
  const isFullTime = (internship.internshipType || 'Full-time') === 'Full-time';

  return (
    <div className="glass-card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      position: 'relative',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.25rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease'
    }}>
      {/* Top Header - Domain Track & Verified Status */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        gap: '0.5rem', 
        marginBottom: '0.85rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ 
              background: '#eff6ff', 
              color: '#1d4ed8', 
              border: '1px solid #bfdbfe', 
              borderRadius: '6px', 
              fontSize: '0.78rem', 
              padding: '0.2rem 0.55rem', 
              fontWeight: '700'
            }}>
              {internship.domain || 'Domain Track'}
            </span>
            <span style={{ 
              background: '#f0fdf4', 
              color: '#15803d', 
              border: '1px solid #bbf7d0', 
              borderRadius: '6px', 
              fontSize: '0.72rem', 
              padding: '0.2rem 0.5rem', 
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <ShieldCheck size={12} /> Verified Role
            </span>
          </div>
          <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '4px' }}>
            <Briefcase size={12} /> Partner Enterprise Pool
          </span>
        </div>

        {/* Work Mode & Type Badge */}
        <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0, alignItems: 'center' }}>
          <span style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#334155',
            borderRadius: '6px',
            fontSize: '0.725rem',
            padding: '2px 8px',
            fontWeight: '600'
          }}>
            {internship.workMode}
          </span>
          <span style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#334155',
            borderRadius: '6px',
            fontSize: '0.725rem',
            padding: '2px 8px',
            fontWeight: '600'
          }}>
            {isFullTime ? 'Full-Time' : 'Part-Time'}
          </span>
        </div>
      </div>

      {/* Role Title */}
      <h3 
        onClick={() => onSelect(internship)}
        style={{
          fontSize: '1.025rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '0.65rem',
          cursor: 'pointer',
          lineHeight: '1.35'
        }}
      >
        {internship.title}
      </h3>

      {/* Meta Specs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem 0.75rem',
        margin: '0.25rem 0 1rem',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
          <Calendar size={13} style={{ color: '#64748b', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Apply by {internship.deadline || 'Sept 30'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
          <Clock size={13} style={{ color: '#64748b', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{internship.duration || '3 Months'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
          <MapPin size={13} style={{ color: '#64748b', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{internship.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
          <Users size={13} style={{ color: '#64748b', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{internship.openings || 5} Openings</span>
        </div>
      </div>

      {/* Skill Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
        {internship.skills.slice(0, 4).map((skill, idx) => (
          <span key={idx} style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#475569',
            padding: '2px 7px',
            borderRadius: '5px',
            fontSize: '0.74rem',
            fontWeight: '600'
          }}>
            {skill}
          </span>
        ))}
        {internship.skills.length > 4 && (
          <span style={{ fontSize: '0.74rem', color: '#64748b', alignSelf: 'center' }}>
            +{internship.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '0.75rem', 
        borderTop: '1px solid #e2e8f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem' 
      }}>
        <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
          <Calendar size={13} /> Deadline: {internship.deadline || 'Sept 30'}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
          <button 
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ 
              background: '#f8fafc', 
              border: '1px solid #cbd5e1', 
              color: '#334155',
              fontSize: '0.8rem',
              padding: '0.35rem 0.75rem',
              fontWeight: '600'
            }}
            onClick={() => onSelect(internship)}
          >
            Details
          </button>
          <button 
            type="button"
            className="btn btn-primary btn-sm"
            style={{ 
              background: '#1e3a8a', 
              color: '#ffffff', 
              border: 'none',
              fontSize: '0.8rem',
              padding: '0.35rem 0.85rem',
              fontWeight: '700'
            }}
            onClick={() => onApply(internship)}
          >
            Apply <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
