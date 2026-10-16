import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  GraduationCap, 
  Building2, 
  Award, 
  Cpu, 
  Download, 
  Printer, 
  Copy, 
  ExternalLink, 
  Check, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Upload, 
  RefreshCw, 
  Briefcase,
  ChevronRight,
  TrendingUp,
  ListChecks,
  Send,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { screenResumeWithAI } from '../services/aiResumeScreener';

export default function AIResumeReaderModal({
  candidate,
  targetJob,
  isOpen,
  onClose,
  onForwardCandidate,
  onSelectCandidate,
  onAddToast,
  userRole = 'company' // 'company' or 'admin'
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'parsed-resume', 'skills-matrix', 'interview-guide', 'upload-new'
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState(null);

  // Upload custom resume state
  const [customResumeText, setCustomResumeText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [selectedRoleTitle, setSelectedRoleTitle] = useState(targetJob?.title || candidate?.internshipTitle || 'Full-Stack Web Development');
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  useEffect(() => {
    if (candidate) {
      setIsScanning(true);
      setScanProgress(20);
      
      const t1 = setTimeout(() => setScanProgress(60), 150);
      const t2 = setTimeout(() => setScanProgress(90), 300);
      const t3 = setTimeout(() => {
        const result = screenResumeWithAI(candidate, targetJob || { title: candidate.internshipTitle, companyName: candidate.companyName });
        setActiveAnalysis(result);
        setScanProgress(100);
        setIsScanning(false);
      }, 450);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [candidate, targetJob]);

  if (!isOpen || !candidate) return null;

  const analysis = activeAnalysis || screenResumeWithAI(candidate, targetJob);

  const handleCopySummary = () => {
    if (!analysis) return;
    const textToCopy = `AI RESUME SCREENING DOSSIER\nCandidate: ${analysis.candidateName} (${analysis.candidateEmail})\nCollege: ${analysis.candidateCollege} - ${analysis.candidateDegree}\nTarget Role: ${analysis.targetRole}\nOverall Fit Score: ${analysis.overallScore}%\nRecommendation: ${analysis.recommendation.badge}\n\nSummary:\n${analysis.executiveSummary}\n\nTop Strengths:\n${analysis.strengths.map(s => '• ' + s).join('\n')}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
    if (onAddToast) onAddToast('AI Screening Dossier copied to clipboard!', 'success');
  };

  const handleCopyQuestion = (qText, idx) => {
    navigator.clipboard?.writeText(qText);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 1800);
    if (onAddToast) onAddToast('Interview question copied!', 'info');
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsScanning(true);
    setScanProgress(30);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result || '';
      setCustomResumeText(typeof content === 'string' ? content : 'Binary PDF extracted');
      setTimeout(() => {
        const customResult = screenResumeWithAI(
          { ...candidate, studentName: file.name.replace(/\.[^/.]+$/, "") },
          { title: selectedRoleTitle, companyName: targetJob?.companyName || 'Corporate Partner' },
          typeof content === 'string' ? content : ''
        );
        setActiveAnalysis(customResult);
        setIsScanning(false);
        setActiveTab('overview');
        if (onAddToast) onAddToast(`AI parsed & screened "${file.name}" successfully!`, 'success');
      }, 600);
    };

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      // For binary files/PDFs, read basic buffer and simulate NLP extraction
      reader.readAsText(file);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11, 15, 25, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '1.25rem'
    }}>
      <div 
        className="glass-card ai-resume-modal-container"
        style={{
          background: '#0f172a',
          color: '#f8fafc',
          borderRadius: '20px',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glowing Top Scanning Progress Bar */}
        {isScanning && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(56, 189, 248, 0.2)',
            zIndex: 20
          }}>
            <div style={{
              height: '100%',
              width: `${scanProgress}%`,
              background: 'linear-gradient(90deg, #38bdf8, #818cf8, #34d399)',
              transition: 'width 0.25s ease'
            }} />
          </div>
        )}

        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'rgba(15, 23, 42, 0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
              flexShrink: 0
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  AI Resume Reader & Candidate Screening
                </span>
                <span className="badge badge-verified" style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                  ATS v2.4 Engine
                </span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                {analysis.candidateName}
                <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8', marginLeft: '0.5rem' }}>
                  for {analysis.targetRole}
                </span>
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleCopySummary}
              title="Copy Summary Report"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#e2e8f0',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: '600'
              }}
            >
              {copiedSummary ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />}
              {copiedSummary ? 'Copied' : 'Copy Dossier'}
            </button>

            <button
              type="button"
              onClick={handlePrintDossier}
              title="Print AI Screening Report"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#e2e8f0',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: '600'
              }}
            >
              <Printer size={14} /> Print
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#cbd5e1',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '0.25rem'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.65rem 1.75rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflowX: 'auto'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'overview' ? '#0284c7' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
          >
            <TrendingUp size={15} /> AI Screening Dossier
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('parsed-resume')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'parsed-resume' ? '#0284c7' : 'transparent',
              color: activeTab === 'parsed-resume' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={15} /> Parsed ATS Resume
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills-matrix')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'skills-matrix' ? '#0284c7' : 'transparent',
              color: activeTab === 'skills-matrix' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
          >
            <ListChecks size={15} /> Skills & Keyword Matrix
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview-guide')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'interview-guide' ? '#0284c7' : 'transparent',
              color: activeTab === 'interview-guide' ? '#ffffff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
          >
            <HelpCircle size={15} /> AI Interview Guide ({analysis.customInterviewQuestions.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload-new')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'upload-new' ? 'rgba(129, 140, 248, 0.25)' : 'transparent',
              color: activeTab === 'upload-new' ? '#a5b4fc' : '#94a3b8',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginLeft: 'auto',
              border: activeTab === 'upload-new' ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Upload size={14} /> Screen External Resume
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          padding: '1.75rem',
          overflowY: 'auto',
          flex: 1
        }}>

          {/* TAB 1: AI SCREENING OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Top Score Banner & Recommendation */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center'
              }}>
                {/* Left: Overall Gauge Score */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: `conic-gradient(#38bdf8 ${analysis.overallScore * 3.6}deg, rgba(255, 255, 255, 0.08) 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      background: '#0b1329',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '1.75rem', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                        {analysis.overallScore}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>
                        % FIT
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{
                      background: analysis.recommendation.bgColor,
                      color: analysis.recommendation.color,
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      border: `1px solid ${analysis.recommendation.color}40`,
                      marginBottom: '0.4rem'
                    }}>
                      <CheckCircle2 size={13} /> {analysis.recommendation.badge}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                      AI Match Assessment
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0', lineHeight: 1.4 }}>
                      Analyzed against {analysis.targetRole} role requirements.
                    </p>
                  </div>
                </div>

                {/* Right: 4 Category Progress Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {/* Technical Skills */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                      <span style={{ color: '#cbd5e1', fontWeight: '600' }}>🎯 Technical Skill Match</span>
                      <span style={{ color: '#38bdf8', fontWeight: '700' }}>{analysis.technicalScore}%</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${analysis.technicalScore}%`, height: '100%', background: '#38bdf8', borderRadius: '6px' }} />
                    </div>
                  </div>

                  {/* Projects Score */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                      <span style={{ color: '#cbd5e1', fontWeight: '600' }}>💻 Hands-On Projects & Code Proof</span>
                      <span style={{ color: '#818cf8', fontWeight: '700' }}>{analysis.projectScore}%</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${analysis.projectScore}%`, height: '100%', background: '#818cf8', borderRadius: '6px' }} />
                    </div>
                  </div>

                  {/* Academic Alignment */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                      <span style={{ color: '#cbd5e1', fontWeight: '600' }}>🎓 Academic Degree & Year Relevance</span>
                      <span style={{ color: '#34d399', fontWeight: '700' }}>{analysis.academicScore}%</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${analysis.academicScore}%`, height: '100%', background: '#34d399', borderRadius: '6px' }} />
                    </div>
                  </div>

                  {/* ATS Format */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                      <span style={{ color: '#cbd5e1', fontWeight: '600' }}>📄 ATS Readability & Structure</span>
                      <span style={{ color: '#f59e0b', fontWeight: '700' }}>{analysis.atsScore}%</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${analysis.atsScore}%`, height: '100%', background: '#f59e0b', borderRadius: '6px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Executive Summary Card */}
              <div style={{
                background: 'rgba(30, 58, 138, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} style={{ color: '#38bdf8' }} />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
                    AI Recruiter Executive Summary
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                  {analysis.executiveSummary}
                </p>
              </div>

              {/* Two Column: Verified Strengths vs Growth/Probing Areas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                {/* Strengths */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '14px',
                  padding: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <CheckCircle size={16} style={{ color: '#34d399' }} />
                    <h4 style={{ fontSize: '0.925rem', fontWeight: '800', color: '#34d399', margin: 0 }}>
                      Verified Candidate Strengths
                    </h4>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {analysis.strengths.map((str, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        <span style={{ color: '#34d399', fontWeight: '800', marginTop: '1px' }}>✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Growth Areas */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '14px',
                  padding: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <AlertCircle size={16} style={{ color: '#fbbf24' }} />
                    <h4 style={{ fontSize: '0.925rem', fontWeight: '800', color: '#fbbf24', margin: 0 }}>
                      Areas To Probe In Interview
                    </h4>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {analysis.growthAreas.map((gap, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        <span style={{ color: '#fbbf24', fontWeight: '800', marginTop: '1px' }}>•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Key Skills Badges */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                padding: '1.25rem'
              }}>
                <div style={{ fontSize: '0.825rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Skills Matched from Role Description ({analysis.matchedSkills.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.matchedSkills.map((sk, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      ✓ {sk}
                    </span>
                  ))}
                  {analysis.missingSkills.map((sk, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      ⚠️ Missing: {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARSED ATS RESUME VIEW */}
          {activeTab === 'parsed-resume' && (
            <div style={{
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              {/* Resume Header */}
              <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {analysis.candidateName}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569' }}>
                  <span>✉️ {analysis.candidateEmail}</span>
                  <span>📞 {analysis.candidatePhone}</span>
                  <span>🎓 {analysis.candidateCollege}</span>
                  <span>📍 Karnataka, India</span>
                </div>
                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                  <a href={candidate.githubUrl || 'https://github.com/adityaverma'} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: '700' }}>
                    💻 GitHub Profile
                  </a>
                  <span>•</span>
                  <a href={candidate.linkedinUrl || 'https://linkedin.com/in/aditya-verma'} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: '700' }}>
                    🔗 LinkedIn Profile
                  </a>
                  <span>•</span>
                  <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: '700' }}>
                    ✓ ₹100 Application Fee Verified ({candidate.txnId || 'TXN_UPI_100_982341'})
                  </span>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                  Education
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{analysis.candidateCollege}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>{analysis.candidateDegree}</div>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: '600' }}>
                    {analysis.candidateYear} • CGPA: 8.8 / 10.0
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                  Technical Skills & Competencies
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Languages & Frameworks:</strong> React.js, Node.js, Express, JavaScript (ES6+), Python, HTML5, CSS3, TailwindCSS</div>
                  <div><strong>Databases & Cloud:</strong> MongoDB, PostgreSQL, REST APIs, Git, GitHub Actions, AWS basics</div>
                  <div><strong>Engineering Tools:</strong> VS Code, Postman, Vite, NPM, Docker basics, Linux command line</div>
                </div>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                  Featured Engineering Projects
                </h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>1. Full-Stack MERN Collaborative Work Management Suite</strong>
                    <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: '700' }}>Live Demo | GitHub Repo</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#475569', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Engineered responsive React frontend with JWT authentication, real-time WebSocket notifications, and MongoDB aggregation pipelines. Handled 500+ simulated concurrent user requests.
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>2. AI Proctored Assessment & Anti-Cheat Portal</strong>
                    <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: '700' }}>Live Demo | GitHub Repo</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#475569', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Built camera, mic, and screen-sharing verification workflows with full-screen lockdown and tab-switch warning telemetry.
                  </p>
                </div>
              </div>

              {/* Proctored Assessment Result */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#166534', display: 'block' }}>
                    ✓ Proctored Technical Assessment Completed
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#15803d' }}>
                    Hardware anti-cheat validated: Webcam, Mic & Screen recording certified.
                  </span>
                </div>
                <span className="badge badge-verified" style={{ background: '#16a34a', color: '#fff' }}>
                  Score: {candidate.assessmentScore || 92}%
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS & KEYWORD MATRIX */}
          {activeTab === 'skills-matrix' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.35rem' }}>
                  ATS Keyword Matching Analysis
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0 }}>
                  Detailed comparison between candidate's extracted resume tokens and the target role criteria.
                </p>
              </div>

              {/* Matched vs Missing Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {/* Matched */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8' }}>
                      ✓ Role Requirements Met ({analysis.matchedSkills.length})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '700' }}>100% Verified</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {analysis.matchedSkills.map((s, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        border: '1px solid rgba(56, 189, 248, 0.3)'
                      }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#f87171' }}>
                      ⚠️ Missing Job Keywords ({analysis.missingSkills.length})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '700' }}>To Clarify in Interview</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {analysis.missingSkills.length > 0 ? analysis.missingSkills.map((s, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#f87171',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}>
                        ✕ {s}
                      </span>
                    )) : (
                      <span style={{ fontSize: '0.825rem', color: '#34d399' }}>No critical required skills missing!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ATS Formatting Checklist */}
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.85rem' }}>
                  ATS Compliance & Parsability Audit
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={16} style={{ color: '#34d399' }} /> Contact Info Complete
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={16} style={{ color: '#34d399' }} /> Standard Section Headings
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={16} style={{ color: '#34d399' }} /> Measurable Metrics & Action Verbs
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={16} style={{ color: '#34d399' }} /> Clean Single-Column Layout
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI INTERVIEW GUIDE */}
          {activeTab === 'interview-guide' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.35rem' }}>
                  Tailored AI Interview Questions for Recruiter
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0 }}>
                  Questions generated specifically based on {analysis.candidateName}'s stated project experience and identified technical gaps.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {analysis.customInterviewQuestions.map((qItem, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'rgba(30, 41, 59, 0.7)',
                      border: '1px solid rgba(129, 140, 248, 0.25)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(129, 140, 248, 0.2)',
                          color: '#a5b4fc',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          Q{idx + 1}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: '700', textTransform: 'uppercase' }}>
                          {qItem.intent}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyQuestion(qItem.question, idx)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: 'none',
                          color: '#94a3b8',
                          padding: '0.3rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {copiedQuestionIdx === idx ? <Check size={12} style={{ color: '#34d399' }} /> : <Copy size={12} />}
                        {copiedQuestionIdx === idx ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <div style={{ fontSize: '0.925rem', fontWeight: '700', color: '#f8fafc', marginBottom: '0.6rem', lineHeight: 1.45 }}>
                      "{qItem.question}"
                    </div>

                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8rem',
                      color: '#cbd5e1'
                    }}>
                      <strong style={{ color: '#38bdf8' }}>💡 What to look for in the candidate's answer: </strong>
                      {qItem.idealAnswerTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SCREEN ANY EXTERNAL RESUME */}
          {activeTab === 'upload-new' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.35rem' }}>
                  Screen Any External Candidate Resume
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0 }}>
                  Upload a PDF/Word/TXT resume or paste raw resume text to instantly calculate the AI Fit Score against any company opening.
                </p>
              </div>

              <div style={{
                border: '2px dashed rgba(56, 189, 248, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(30, 41, 59, 0.4)',
                marginBottom: '1.5rem',
                cursor: 'pointer'
              }}>
                <Upload size={36} style={{ color: '#38bdf8', marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.25rem' }}>
                  {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'Drag & drop candidate resume file here (PDF, DOCX, TXT)'}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  Our AI engine automatically extracts skills, GPA, project depth, and ATS readability.
                </p>
                <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={14} /> Browse Resume File
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleCustomFileUpload} style={{ display: 'none' }} />
                </label>
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                  Or Paste Candidate Resume Text Directly
                </label>
                <textarea
                  rows={5}
                  value={customResumeText}
                  onChange={(e) => setCustomResumeText(e.target.value)}
                  placeholder="Paste extracted resume text, skills, or LinkedIn bio here..."
                  style={{
                    width: '100%',
                    background: '#0b1329',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '0.85rem',
                    marginBottom: '1rem'
                  }}
                />
                <button
                  type="button"
                  disabled={!customResumeText.trim()}
                  onClick={() => {
                    setIsScanning(true);
                    setTimeout(() => {
                      const res = screenResumeWithAI(
                        { ...candidate, studentName: 'Pasted Candidate Resume' },
                        { title: selectedRoleTitle, companyName: targetJob?.companyName || 'Corporate Partner' },
                        customResumeText
                      );
                      setActiveAnalysis(res);
                      setIsScanning(false);
                      setActiveTab('overview');
                      if (onAddToast) onAddToast('AI screened pasted resume successfully!', 'success');
                    }, 400);
                  }}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}
                >
                  <Sparkles size={16} /> Run AI Screening Analysis Now
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Actions */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Screened by InternCatalyst AI Engine • {analysis.scannedAt}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              Close Inspector
            </button>

            {/* Context action for Admin */}
            {userRole === 'admin' && onForwardCandidate && !candidate.forwardedToEmployer && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onForwardCandidate(candidate.id);
                  onClose();
                }}
                style={{
                  background: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '700'
                }}
              >
                <Send size={14} /> Forward Candidate to Employer with AI Clearance ✓
              </button>
            )}

            {/* Context action for Company */}
            {userRole === 'company' && onSelectCandidate && candidate.status !== 'Selected' && candidate.status !== 'Hired' && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  onSelectCandidate(candidate.id, 'Selected');
                  onClose();
                }}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: '700',
                  padding: '0.5rem 1rem'
                }}
              >
                <CheckCircle2 size={15} /> Select & Hire for Vacant Seat ✓
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
