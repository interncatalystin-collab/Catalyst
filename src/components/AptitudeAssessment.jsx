import React, { useState, useEffect, useMemo } from 'react';
import { 
  APTITUDE_QUESTIONS, 
  QUESTION_SET_OPTIONS 
} from '../data/aptitudeQuestions';
import { 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Flag, 
  Award, 
  BarChart3, 
  Sparkles, 
  Zap, 
  Target, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Layers,
  Flame
} from 'lucide-react';

export default function AptitudeAssessment({ onAddToast, studentName = 'Candidate' }) {
  // Test Setup States
  const [selectedCount, setSelectedCount] = useState(20); // 20, 30, 50
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All' or specific category
  const [isTimed, setIsTimed] = useState(true);
  const [testPhase, setTestPhase] = useState('setup'); // 'setup', 'active', 'results'

  // Live Test States
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [totalTimeSpentSeconds, setTotalTimeSpentSeconds] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Results & Solutions Review States
  const [solutionFilter, setSolutionFilter] = useState('all'); // 'all', 'correct', 'incorrect', 'skipped'
  const [testHistory, setTestHistory] = useState([]);

  // Available categories
  const categories = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'CS & Technical Aptitude'];

  // Start Assessment Handler
  const handleStartTest = () => {
    let pool = [...APTITUDE_QUESTIONS];

    if (selectedCategory !== 'All') {
      pool = pool.filter(q => q.category === selectedCategory);
    }

    // Shuffle pool for varied practice experience
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    // Slice to selected count (20, 30, or 50 questions)
    let selectedSet = shuffled.slice(0, selectedCount);

    // If pool is smaller than selected count (e.g. when filtering single category), take all available or fallback to mixed
    if (selectedSet.length < selectedCount && selectedCategory !== 'All') {
      const remainder = selectedCount - selectedSet.length;
      const otherQuestions = APTITUDE_QUESTIONS.filter(q => q.category !== selectedCategory).sort(() => 0.5 - Math.random());
      selectedSet = [...selectedSet, ...otherQuestions.slice(0, remainder)];
    }

    // Fallback if question set is still smaller than requested
    if (selectedSet.length === 0) {
      selectedSet = APTITUDE_QUESTIONS.slice(0, selectedCount);
    }

    setActiveQuestions(selectedSet);
    setCurrentIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    
    // Duration: 1 minute per question
    const totalSeconds = selectedCount * 60;
    setTimeLeftSeconds(totalSeconds);
    setTotalTimeSpentSeconds(0);
    setShowSubmitModal(false);
    setTestPhase('active');

    if (onAddToast) {
      onAddToast(`Started Practice Assessment with ${selectedSet.length} questions! Best of luck.`, 'success');
    }
  };

  // Timer Effect
  useEffect(() => {
    let timer = null;
    if (testPhase === 'active' && isTimed) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest(true); // auto-submit on timeout
            return 0;
          }
          return prev - 1;
        });
        setTotalTimeSpentSeconds(prev => prev + 1);
      }, 1000);
    } else if (testPhase === 'active' && !isTimed) {
      timer = setInterval(() => {
        setTotalTimeSpentSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testPhase, isTimed]);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Option Selection
  const handleSelectOption = (optionIdx) => {
    const currentQ = activeQuestions[currentIdx];
    if (!currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  // Clear Option Selection
  const handleClearOption = () => {
    const currentQ = activeQuestions[currentIdx];
    if (!currentQ) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Toggle Flag / Bookmark for review
  const handleToggleFlag = () => {
    const currentQ = activeQuestions[currentIdx];
    if (!currentQ) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Submit Test Handler
  const handleSubmitTest = (isAutoSubmit = false) => {
    setShowSubmitModal(false);
    setTestPhase('results');

    // Calculate score
    let correctCount = 0;
    activeQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / activeQuestions.length) * 100);
    
    // Save to session history
    const attemptRecord = {
      id: `attempt-${Date.now()}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalQuestions: activeQuestions.length,
      correctCount,
      percentage: percent,
      timeSpent: totalTimeSpentSeconds
    };
    setTestHistory(prev => [attemptRecord, ...prev]);

    if (onAddToast) {
      if (isAutoSubmit) {
        onAddToast(`Time is up! Assessment automatically submitted. Score: ${percent}%`, 'warning');
      } else {
        onAddToast(`Assessment completed! You scored ${correctCount}/${activeQuestions.length} (${percent}%)`, 'success');
      }
    }
  };

  // Results calculation
  const resultsData = useMemo(() => {
    if (activeQuestions.length === 0) return null;

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const categoryStats = {};

    activeQuestions.forEach(q => {
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total += 1;

      const ans = userAnswers[q.id];
      if (ans === undefined) {
        skipped += 1;
      } else if (ans === q.correctAnswer) {
        correct += 1;
        categoryStats[q.category].correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const scorePercent = Math.round((correct / activeQuestions.length) * 100);
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    let grade = 'Needs Practice';
    let gradeColor = '#ef4444';
    if (scorePercent >= 80) {
      grade = 'Outstanding / Placement Ready 🏆';
      gradeColor = '#10b981';
    } else if (scorePercent >= 60) {
      grade = 'Good Performance / Strong Potential 👍';
      gradeColor = '#3b82f6';
    } else if (scorePercent >= 40) {
      grade = 'Average / Review Weak Areas 📈';
      gradeColor = '#f59e0b';
    }

    return {
      total: activeQuestions.length,
      correct,
      incorrect,
      skipped,
      scorePercent,
      accuracy,
      grade,
      gradeColor,
      categoryStats
    };
  }, [activeQuestions, userAnswers]);

  // Filtered Questions for Review in Results
  const filteredSolutions = useMemo(() => {
    if (!activeQuestions.length) return [];
    return activeQuestions.filter(q => {
      const userAns = userAnswers[q.id];
      if (solutionFilter === 'correct') return userAns === q.correctAnswer;
      if (solutionFilter === 'incorrect') return userAns !== undefined && userAns !== q.correctAnswer;
      if (solutionFilter === 'skipped') return userAns === undefined;
      return true;
    });
  }, [activeQuestions, userAnswers, solutionFilter]);

  // Summary counts for current test
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = activeQuestions.length - answeredCount;

  // Render Setup Screen
  if (testPhase === 'setup') {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          color: '#fff',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={13} /> Official Student Practice Suite
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                • Curated for Top Tech Placement Drives
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.3rem 0', color: '#f8fafc' }}>
              Practice Aptitude Assessment
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.925rem', maxWidth: '650px', lineHeight: 1.5, margin: 0 }}>
              Sharpen your Quantitative Aptitude, Logical Reasoning, Verbal Communication, and Technical CS fundamentals with adaptive practice test options tailored for campus recruitment.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'center',
            minWidth: '180px'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600' }}>Question Bank</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#60a5fa' }}>{APTITUDE_QUESTIONS.length}+</div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Verified Questions</div>
          </div>
        </div>

        {/* Step 1: Select Number of Questions (20, 30, 50 Choice) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--primary, #3b82f6)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem'
            }}>1</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, color: 'var(--text-color, #1e293b)' }}>
              Choose Question Set Option (20, 30, or 50 Questions)
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {QUESTION_SET_OPTIONS.map((opt) => {
              const isSelected = selectedCount === opt.count;
              return (
                <div
                  key={opt.count}
                  onClick={() => setSelectedCount(opt.count)}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(145deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.08))' 
                      : '#ffffff',
                    border: isSelected 
                      ? '2px solid #3b82f6' 
                      : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected 
                      ? '0 10px 25px -5px rgba(59, 130, 246, 0.25)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    position: 'relative',
                    transform: isSelected ? 'translateY(-3px)' : 'none'
                  }}
                >
                  {/* Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: isSelected ? opt.badgeColor : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {opt.tag}
                    </span>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid #3b82f6' : '2px solid #cbd5e1',
                      background: '#fff'
                    }} />
                  </div>

                  {/* Question Count Highlight */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2.25rem', fontWeight: '900', color: opt.badgeColor }}>
                      {opt.count}
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>
                      Questions Set
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#334155', margin: '0 0 0.5rem 0' }}>
                    {opt.name}
                  </h4>

                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                    {opt.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} style={{ color: opt.badgeColor }} /> {opt.durationMinutes} Minutes
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Layers size={14} style={{ color: opt.badgeColor }} /> 4 Domains
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Customization (Category & Timer Mode) */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.75rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--primary, #3b82f6)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem'
            }}>2</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, color: '#1e293b' }}>
              Assessment Filters & Mode
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Category Focus */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', color: '#334155', marginBottom: '0.5rem' }}>
                <Filter size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                Topic Focus
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  fontWeight: '500',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? '🌟 All Domains (Balanced Quantitative, Logical, Verbal, CS)' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Mode */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', color: '#334155', marginBottom: '0.5rem' }}>
                <Clock size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                Timer Configuration
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsTimed(true)}
                  style={{
                    flex: 1,
                    padding: '0.7rem 0.85rem',
                    borderRadius: '10px',
                    border: isTimed ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                    background: isTimed ? 'rgba(59, 130, 246, 0.08)' : '#f8fafc',
                    color: isTimed ? '#1d4ed8' : '#64748b',
                    fontWeight: isTimed ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Flame size={15} style={{ color: isTimed ? '#3b82f6' : '#94a3b8' }} />
                  Timed Exam ({selectedCount} mins)
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimed(false)}
                  style={{
                    flex: 1,
                    padding: '0.7rem 0.85rem',
                    borderRadius: '10px',
                    border: !isTimed ? '2px solid #10b981' : '1px solid #cbd5e1',
                    background: !isTimed ? 'rgba(16, 185, 129, 0.08)' : '#f8fafc',
                    color: !isTimed ? '#065f46' : '#64748b',
                    fontWeight: !isTimed ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <BookOpen size={15} style={{ color: !isTimed ? '#10b981' : '#94a3b8' }} />
                  Self-Paced Practice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button to Start */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.25rem 1.75rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>
              Ready to begin, {studentName}?
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Selected: <strong>{selectedCount} Questions</strong> • Focus: <strong>{selectedCategory}</strong> • Mode: <strong>{isTimed ? `${selectedCount} Mins Timed` : 'Self-Paced'}</strong>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
              cursor: 'pointer'
            }}
          >
            Start Practice Assessment <ArrowRight size={18} />
          </button>
        </div>

        {/* Previous Attempt History in Current Session */}
        {testHistory.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#334155', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} style={{ color: '#3b82f6' }} /> Recent Test Attempts ({testHistory.length})
            </h3>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Time</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Question Set</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Percentage</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Time Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{item.date}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e293b' }}>{item.totalQuestions} Questions Choice</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{item.correctCount} / {item.totalQuestions}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: item.percentage >= 70 ? '#dcfce7' : item.percentage >= 50 ? '#fef3c7' : '#fee2e2',
                          color: item.percentage >= 70 ? '#166534' : item.percentage >= 50 ? '#92400e' : '#991b1b'
                        }}>
                          {item.percentage}%
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{formatTime(item.timeSpent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Active Test Interface
  if (testPhase === 'active') {
    const currentQ = activeQuestions[currentIdx];
    const isAnswered = userAnswers[currentQ?.id] !== undefined;
    const isFlagged = !!flaggedQuestions[currentQ?.id];

    return (
      <div style={{ animation: 'fadeIn 0.25s ease-in-out' }}>
        {/* Sticky Top Header Bar */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Practice Assessment • {selectedCount} Questions Set
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0.2rem 0 0 0', color: '#1e293b' }}>
              Question {currentIdx + 1} of {activeQuestions.length}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Countdown Timer */}
            {isTimed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: timeLeftSeconds < 180 ? '#fee2e2' : '#f1f5f9',
                border: timeLeftSeconds < 180 ? '1px solid #f87171' : '1px solid #cbd5e1',
                color: timeLeftSeconds < 180 ? '#b91c1c' : '#1e293b',
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.95rem'
              }}>
                <Clock size={16} style={{ color: timeLeftSeconds < 180 ? '#ef4444' : '#3b82f6' }} />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f1f5f9',
                color: '#475569',
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}>
                <Clock size={16} style={{ color: '#10b981' }} />
                <span>Time: {formatTime(totalTimeSpentSeconds)}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}
            >
              <ShieldCheck size={16} /> Submit Test
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '6px',
          background: '#e2e8f0',
          borderRadius: '3px',
          marginBottom: '1.75rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentIdx + 1) / activeQuestions.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Main Grid: Left Question Pane, Right Palette */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Question Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}>
            {/* Category & Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#2563eb',
                  fontWeight: '700',
                  fontSize: '0.775rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '20px'
                }}>
                  {currentQ.category}
                </span>
                <span style={{
                  background: currentQ.difficulty === 'Easy' ? '#dcfce7' : currentQ.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                  color: currentQ.difficulty === 'Easy' ? '#166534' : currentQ.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '20px'
                }}>
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Bookmark / Flag Button */}
              <button
                type="button"
                onClick={handleToggleFlag}
                style={{
                  background: isFlagged ? '#fef3c7' : '#f8fafc',
                  border: isFlagged ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                  color: isFlagged ? '#d97706' : '#64748b',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Flag size={13} style={{ fill: isFlagged ? '#d97706' : 'none' }} />
                {isFlagged ? 'Marked for Review' : 'Mark for Review'}
              </button>
            </div>

            {/* Question Text */}
            <h4 style={{
              fontSize: '1.15rem',
              fontWeight: '700',
              lineHeight: 1.5,
              color: '#0f172a',
              marginBottom: '1.75rem'
            }}>
              {currentIdx + 1}. {currentQ.question}
            </h4>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const optionLabel = String.fromCharCode(65 + optIdx); // 'A', 'B', 'C', 'D'

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                      background: isSelected ? 'rgba(59, 130, 246, 0.06)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isSelected ? '#3b82f6' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {optionLabel}
                    </div>
                    <div style={{
                      fontSize: '0.95rem',
                      fontWeight: isSelected ? '600' : '400',
                      color: isSelected ? '#1e293b' : '#334155',
                      lineHeight: 1.4
                    }}>
                      {optText}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation & Action Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: currentIdx === 0 ? '#cbd5e1' : '#334155',
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {isAnswered && (
                  <button
                    type="button"
                    onClick={handleClearOption}
                    style={{
                      background: 'transparent',
                      border: '1px dashed #cbd5e1',
                      color: '#94a3b8',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Choice
                  </button>
                )}
              </div>

              {currentIdx < activeQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  style={{
                    background: 'var(--primary, #3b82f6)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  Finish Assessment <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Question Palette */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>
              Question Palette ({activeQuestions.length})
            </h4>

            {/* Quick Status Legend */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              fontSize: '0.75rem',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span>Answered ({answeredCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0' }} />
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
                <span>Current Question</span>
              </div>
            </div>

            {/* Number Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              maxHeight: '340px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {activeQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const flag = flaggedQuestions[q.id];
                const isCur = currentIdx === idx;

                let bg = '#f8fafc';
                let color = '#475569';
                let border = '1px solid #cbd5e1';

                if (isCur) {
                  bg = '#3b82f6';
                  color = '#ffffff';
                  border = '2px solid #1d4ed8';
                } else if (flag) {
                  bg = '#fef3c7';
                  color = '#b45309';
                  border = '1px solid #f59e0b';
                } else if (ans !== undefined) {
                  bg = '#dcfce7';
                  color = '#15803d';
                  border = '1px solid #86efac';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      height: '38px',
                      borderRadius: '8px',
                      background: bg,
                      color: color,
                      border: border,
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Advice */}
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem',
              background: '#f8fafc',
              borderRadius: '10px',
              fontSize: '0.775rem',
              color: '#64748b',
              lineHeight: 1.4
            }}>
              💡 <strong>Tip:</strong> Click any number to jump directly to that question. You can review and change your answers anytime before final submission.
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <ShieldCheck size={32} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
                Submit Practice Assessment?
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Are you sure you want to end this test? You will instantly see your score, percentile breakdown, and step-by-step solutions.
              </p>

              {/* Counts Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.75rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#16a34a' }}>{answeredCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Answered</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#d97706' }}>{flaggedCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Flagged</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#dc2626' }}>{unansweredCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Unanswered</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmitTest(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Results & Detailed Solutions Interface
  if (testPhase === 'results' && resultsData) {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        {/* Results Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          borderRadius: '20px',
          padding: '2.5rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Left: Score & Status */}
          <div>
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#93c5fd',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '1rem'
            }}>
              <Award size={15} /> Assessment Completed Successfully
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3.75rem', fontWeight: '900', color: resultsData.gradeColor }}>
                {resultsData.scorePercent}%
              </span>
              <span style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: '600' }}>
                ({resultsData.correct} / {resultsData.total} Correct)
              </span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#f8fafc', marginBottom: '0.5rem' }}>
              {resultsData.grade}
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
              You solved the <strong>{selectedCount} Questions Choice</strong> set in {formatTime(totalTimeSpentSeconds)}. Practice consistently to maximize your campus placement screening success.
            </p>
          </div>

          {/* Right: Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.1rem'
            }}>
              <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>
                <CheckCircle2 size={15} /> Correct Answers
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem' }}>
                {resultsData.correct}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.1rem'
            }}>
              <div style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>
                <XCircle size={15} /> Incorrect
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem' }}>
                {resultsData.incorrect}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.1rem'
            }}>
              <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>
                <AlertCircle size={15} /> Skipped / Left
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem' }}>
                {resultsData.skipped}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.1rem'
            }}>
              <div style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>
                <Clock size={15} /> Total Time
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem' }}>
                {formatTime(totalTimeSpentSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Section */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.75rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} style={{ color: '#3b82f6' }} /> Domain-Wise Performance Analysis
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {Object.entries(resultsData.categoryStats).map(([catName, stats]) => {
              const catPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={catName} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>{catName}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: catPct >= 70 ? '#16a34a' : catPct >= 40 ? '#d97706' : '#dc2626' }}>
                      {catPct}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${catPct}%`,
                      height: '100%',
                      background: catPct >= 70 ? '#10b981' : catPct >= 40 ? '#f59e0b' : '#ef4444',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
                    {stats.correct} of {stats.total} correct
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Bar (Retake / Change Set) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} style={{ color: '#3b82f6' }} /> Step-by-Step Solutions & Explanations
          </h3>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setTestPhase('setup');
              }}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <RotateCcw size={15} /> Choose 20/30/50 Questions Set
            </button>

            <button
              onClick={handleStartTest}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Zap size={15} /> Retake Test Now
            </button>
          </div>
        </div>

        {/* Filter Pills for Solutions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All Questions (${activeQuestions.length})` },
            { id: 'correct', label: `Correct (${resultsData.correct})` },
            { id: 'incorrect', label: `Incorrect (${resultsData.incorrect})` },
            { id: 'skipped', label: `Skipped (${resultsData.skipped})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSolutionFilter(f.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: solutionFilter === f.id ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                background: solutionFilter === f.id ? 'rgba(59, 130, 246, 0.1)' : '#ffffff',
                color: solutionFilter === f.id ? '#1d4ed8' : '#64748b',
                fontWeight: solutionFilter === f.id ? '700' : '500',
                fontSize: '0.825rem',
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Solutions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredSolutions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isSkipped = userAns === undefined;

            return (
              <div
                key={q.id}
                style={{
                  background: '#ffffff',
                  border: isCorrect ? '1px solid #86efac' : isSkipped ? '1px solid #e2e8f0' : '1px solid #fca5a5',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      color: '#1e293b'
                    }}>
                      Question {activeQuestions.findIndex(item => item.id === q.id) + 1}
                    </span>
                    <span style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}>
                      {q.category}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span style={{
                        background: '#dcfce7',
                        color: '#15803d',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <CheckCircle2 size={14} /> Correct (+1)
                      </span>
                    ) : isSkipped ? (
                      <span style={{
                        background: '#f1f5f9',
                        color: '#64748b',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <AlertCircle size={14} /> Skipped
                      </span>
                    ) : (
                      <span style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <XCircle size={14} /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem' }}>
                  {q.question}
                </h4>

                {/* Options List with Visual Feedback */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {q.options.map((opt, oIdx) => {
                    const isTheCorrectAnswer = oIdx === q.correctAnswer;
                    const isUserChoice = userAns === oIdx;

                    let optBg = '#f8fafc';
                    let optBorder = '1px solid #e2e8f0';
                    let optColor = '#475569';

                    if (isTheCorrectAnswer) {
                      optBg = '#dcfce7';
                      optBorder = '2px solid #22c55e';
                      optColor = '#15803d';
                    } else if (isUserChoice && !isCorrect) {
                      optBg = '#fee2e2';
                      optBorder = '2px solid #ef4444';
                      optColor = '#b91c1c';
                    }

                    return (
                      <div
                        key={oIdx}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          background: optBg,
                          border: optBorder,
                          color: optColor,
                          fontSize: '0.875rem',
                          fontWeight: isTheCorrectAnswer || isUserChoice ? '700' : '400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem'
                        }}
                      >
                        <span style={{
                          fontWeight: '800',
                          fontSize: '0.8rem',
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: isTheCorrectAnswer ? '#22c55e' : isUserChoice ? '#ef4444' : '#e2e8f0',
                          color: isTheCorrectAnswer || isUserChoice ? '#ffffff' : '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                        {isTheCorrectAnswer && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: '700' }}>✓ Correct</span>}
                        {isUserChoice && !isTheCorrectAnswer && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: '700' }}>✗ Your Answer</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Step-by-Step Explanation */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  borderLeft: '4px solid #3b82f6',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.85rem 1rem',
                  fontSize: '0.85rem',
                  color: '#334155',
                  lineHeight: 1.5
                }}>
                  <strong style={{ color: '#1d4ed8', display: 'block', marginBottom: '0.25rem' }}>
                    💡 Step-by-Step Explanation:
                  </strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
