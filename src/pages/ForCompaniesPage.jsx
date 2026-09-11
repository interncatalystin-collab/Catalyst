import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Zap, 
  Check, 
  Sparkles, 
  ArrowRight,
  BadgeCheck,
  CreditCard
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export default function ForCompaniesPage({ setActiveTab, setCurrentRole }) {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge badge-verified" style={{ marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} /> Corporate & Startup Partner Portal
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            Hire Pre-Vetted Interns & Build Your <span className="text-gradient-emerald">Talent Pipeline</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
            InternCatalyst connects innovative companies with top engineering and design candidates from accredited institutions across India.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <BadgeCheck size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Verified Employer Badge (✓)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Stand out to top-tier candidates. Earning the Verified Employer Badge signals authenticity, corporate email verification, and genuine stipend commitments.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Smart AI Candidate Matcher</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Our proprietary matching algorithm filters student skill portfolios, year of study, and project repositories to deliver candidates with a 90%+ match score.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Users size={26} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Direct College Access</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Partner directly with top college placement cells (including AIET) for bulk intern hiring, virtual hackathons, and structured campus drives.
            </p>
          </div>
        </div>

        {/* Subscription Plans Matrix */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
              Transparent <span className="text-gradient">Subscription & Placement Plans</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Choose the plan that fits your startup or enterprise hiring volume</p>
          </div>

          <div className="grid-3">
            {SUBSCRIPTION_PLANS.map((plan, idx) => (
              <div 
                key={idx}
                className="glass-card" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: plan.popular ? '2px solid #16a34a' : '1px solid var(--border-color)',
                  position: 'relative',
                  background: plan.popular ? '#f0fdf4' : 'var(--bg-card)'
                }}
              >
                {plan.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '1.5rem',
                    background: '#16a34a',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    textTransform: 'uppercase'
                  }}>
                    Most Popular
                  </span>
                )}

                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: '800', color: plan.popular ? '#15803d' : '#0f172a' }}>{plan.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>{plan.period}</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <Check size={16} style={{ color: plan.popular ? '#16a34a' : '#2563eb', shrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  className={plan.popular ? 'btn btn-emerald' : 'btn btn-secondary'}
                  onClick={() => { setCurrentRole('company'); setActiveTab('company-dash'); }}
                  style={{ width: '100%' }}
                >
                  {plan.cta} <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            Ready to Post Your First Internship Opportunity?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Verify your corporate business email in 2 minutes and start receiving pre-screened student applications.
          </p>
          <button 
            className="btn btn-emerald"
            onClick={() => { setCurrentRole('company'); setActiveTab('company-dash'); }}
            style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
          >
            Register Employer & Post Role <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
