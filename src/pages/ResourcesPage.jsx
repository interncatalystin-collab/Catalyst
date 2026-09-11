import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle, Download, Search, Sparkles } from 'lucide-react';

export default function ResourcesPage({ blogs }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Resume Tips', 'Interview Preparation', 'Internship Advice'];

  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-pill" style={{ marginBottom: '0.75rem', color: '#2563eb' }}>
            <BookOpen size={14} /> Career Growth Knowledge Hub
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            Career Resources & <span className="text-gradient">Interview Preparation</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Expert resume crafting templates, technical interview guides, and internship advice to stand out to verified recruiters.
          </p>
        </div>

        {/* Category Filter & Search Bar */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--primary)' : '#f1f5f9',
                  border: '1px solid ' + (selectedCategory === cat ? 'var(--primary)' : 'var(--border-color)'),
                  color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', width: '280px' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '0.85rem', outline: 'none', width: '100%' }}
            />
          </div>
        </div>

        {/* Downloadable Resume Sample Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Free Downloadable Template
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: '0.25rem 0 0.5rem' }}>
              ATS-Optimized Tech Resume Template (2026 Edition)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Designed specifically for engineering and computer science students. Pre-formatted with project links, skills matrix, and education sections.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => alert("Downloading InternCatalyst_ATS_Tech_Resume_Template.pdf")}>
            <Download size={18} /> Download Sample PDF
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid-3">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-pill">{blog.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{blog.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.65rem', lineHeight: '1.3' }}>
                  {blog.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
                  {blog.summary}
                </p>
                <div style={{ whiteSpace: 'pre-line', fontSize: '0.825rem', color: '#334155', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                  {blog.content}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  By {blog.author} • {blog.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
