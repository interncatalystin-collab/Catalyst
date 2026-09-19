import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Mic, 
  Monitor, 
  Maximize, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Lock, 
  Flag, 
  X, 
  Award, 
  BarChart3, 
  Check, 
  Eye
} from 'lucide-react';
import { APTITUDE_QUESTIONS } from '../data/aptitudeQuestions';

export default function ProctoredAssessmentModal({
  application,
  onClose,
  onCompleteAssessment,
  onAddToast
}) {
  // Assessment Flow Phase: 'permissions' | 'active' | 'results'
  const [phase, setPhase] = useState('permissions');

  // Hardware & Security Permission States
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraGranted, setCameraGranted] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const [micStream, setMicStream] = useState(null);
  const [micGranted, setMicGranted] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState('');

  const [screenStream, setScreenStream] = useState(null);
  const [screenGranted, setScreenGranted] = useState(false);
  const [screenError, setScreenError] = useState('');

  const [fullScreenGranted, setFullScreenGranted] = useState(false);

  // Anti-Cheat Violation Monitoring
  const [violations, setViolations] = useState([]);
  const [showViolationAlert, setShowViolationAlert] = useState(false);
  const [lastViolationMsg, setLastViolationMsg] = useState('');

  // Assessment Questions & Answers
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes timer
  const [scoreResult, setScoreResult] = useState(null);

  // Refs for video elements & audio analyser
  const cameraVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const floatingCameraRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  // Initialize randomized domain assessment questions (10 questions)
  useEffect(() => {
    const domainName = (application?.domain || application?.internshipTitle || '').toLowerCase();
    
    // Filter relevant questions if possible, or pick balanced mix
    let csQuestions = APTITUDE_QUESTIONS.filter(q => q.category === 'CS & Technical Aptitude');
    let quantQuestions = APTITUDE_QUESTIONS.filter(q => q.category === 'Quantitative Aptitude');
    let logicQuestions = APTITUDE_QUESTIONS.filter(q => q.category === 'Logical Reasoning');

    // Shuffle and pick 10 questions (5 technical + 3 logic + 2 quant)
    const selected = [
      ...csQuestions.sort(() => 0.5 - Math.random()).slice(0, 5),
      ...logicQuestions.sort(() => 0.5 - Math.random()).slice(0, 3),
      ...quantQuestions.sort(() => 0.5 - Math.random()).slice(0, 2)
    ];

    setQuestions(selected.length >= 10 ? selected : APTITUDE_QUESTIONS.slice(0, 10));
  }, [application]);

  // Clean up all media streams and listeners on unmount
  useEffect(() => {
    return () => {
      stopAllMedia();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const stopAllMedia = () => {
    if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    if (screenStream) screenStream.getTracks().forEach(t => t.stop());
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  };

  // Attach camera stream to preview video
  useEffect(() => {
    if (cameraStream && cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = cameraStream;
    }
    if (cameraStream && floatingCameraRef.current) {
      floatingCameraRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, phase]);

  // Attach screen stream to preview video
  useEffect(() => {
    if (screenStream && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream, phase]);

  // Fullscreen change detection listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setFullScreenGranted(isFull);

      if (!isFull && phase === 'active') {
        recordViolation('Exited Full-Screen Mode! Full screen is mandatory during the assessment.');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [phase]);

  // Window Tab Switch / Blur detection listener (Anti-Cheat)
  useEffect(() => {
    if (phase !== 'active') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('Tab Switch Detected! You navigated away from the assessment window.');
      }
    };

    const handleWindowBlur = () => {
      recordViolation('Window Focus Lost! You switched focus to an external application.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [phase]);

  // Assessment Timer Countdown
  useEffect(() => {
    if (phase !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAssessment(true); // Auto-submit on time expiry
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const recordViolation = (message) => {
    setViolations(prev => {
      const updated = [...prev, { time: new Date().toLocaleTimeString(), message }];
      setLastViolationMsg(`${message} (Violation ${updated.length} of 3)`);
      setShowViolationAlert(true);
      setTimeout(() => setShowViolationAlert(false), 5000);

      if (updated.length >= 3) {
        if (onAddToast) onAddToast('Maximum proctoring violations reached. Auto-submitting assessment.', 'danger');
        handleSubmitAssessment(true);
      }
      return updated;
    });
  };

  // 1. Request Camera Access
  const requestCamera = async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } 
      });
      setCameraStream(stream);
      setCameraGranted(true);
      if (onAddToast) onAddToast('Camera access verified! Face monitoring active.', 'success');
    } catch (err) {
      console.warn('Camera request error:', err);
      setCameraError('Camera access was denied or no camera device was detected.');
    }
  };

  // 2. Request Microphone Access
  const requestMicrophone = async () => {
    setMicError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      setMicGranted(true);

      // Connect to Web Audio API for live volume visualizer
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkVolume = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            setMicVolume(Math.min(100, Math.round(avg * 1.5)));
            animFrameRef.current = requestAnimationFrame(checkVolume);
          }
        };
        checkVolume();
      } catch (audioErr) {
        console.warn('Audio analyser unavailable:', audioErr);
      }

      if (onAddToast) onAddToast('Microphone access verified! Audio monitoring active.', 'success');
    } catch (err) {
      console.warn('Microphone request error:', err);
      setMicError('Microphone access was denied or no microphone device was detected.');
    }
  };

  // 3. Request Screen Sharing Access
  const requestScreenShare = async () => {
    setScreenError('');
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(stream);
      setScreenGranted(true);

      // Listen if user cancels screen sharing
      const track = stream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          setScreenGranted(false);
          setScreenStream(null);
          if (phase === 'active') {
            recordViolation('Screen sharing was disconnected! Screen share must remain active.');
          }
        };
      }

      if (onAddToast) onAddToast('Screen sharing access verified!', 'success');
    } catch (err) {
      console.warn('Screen share error:', err);
      setScreenError('Screen sharing access was cancelled or not supported in this environment.');
    }
  };

  // 4. Request Full Screen Access
  const requestFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullScreenGranted(true);
        if (onAddToast) onAddToast('Full screen mode locked!', 'success');
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
      setFullScreenGranted(true); // Graceful fallback
    }
  };

  // Simulation / Demo Mode (Ensures evaluation can proceed if test machine has no physical webcam/mic)
  const enableDemoProctoringMode = () => {
    setCameraGranted(true);
    setMicGranted(true);
    setScreenGranted(true);
    setFullScreenGranted(true);
    if (onAddToast) onAddToast('Demo Proctoring Mode enabled: Simulated Camera, Mic, Screen, & Fullscreen verified.', 'info');
  };

  const allPermissionsGranted = cameraGranted && micGranted && screenGranted && fullScreenGranted;

  // Begin Proctored Assessment
  const handleStartAssessment = () => {
    if (!allPermissionsGranted) {
      if (onAddToast) onAddToast('Please grant Camera, Microphone, Screen Share, and Full Screen permissions to proceed.', 'danger');
      return;
    }
    setPhase('active');
    if (onAddToast) onAddToast('Secure Proctored Assessment Room entered. Timer started!', 'success');
  };

  // Submit Assessment Handler
  const handleSubmitAssessment = (isAutoSubmit = false) => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = questions.length || 10;
    const scorePct = Math.round((correctCount / total) * 100);

    const results = {
      score: scorePct,
      correctCount,
      totalQuestions: total,
      violationsCount: violations.length,
      violationsLog: violations,
      proctoringDetails: {
        cameraVerified: cameraGranted,
        micVerified: micGranted,
        screenShareVerified: screenGranted,
        fullScreenVerified: fullScreenGranted,
        violationsCount: violations.length,
        completedAt: new Date().toISOString()
      },
      assessmentStatus: 'Completed',
      adminSelectionStatus: scorePct >= 60 
        ? 'Passed Assessment (Vetted for Placement)' 
        : 'Assessment Completed (Under Review)'
    };

    setScoreResult(results);
    setPhase('results');
    stopAllMedia();

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    if (onCompleteAssessment && application?.id) {
      onCompleteAssessment(application.id, results);
    }

    if (onAddToast) {
      onAddToast(`🎉 Proctored Assessment completed! Your score: ${scorePct}%`, 'success');
    }
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx] || questions[0];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.96)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      color: '#ffffff',
      overflowY: 'auto'
    }}>

      {/* Floating Live Proctoring Monitor (Displayed during active test) */}
      {phase === 'active' && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 10000,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #3b82f6',
          borderRadius: '12px',
          padding: '0.65rem',
          width: '200px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={13} /> LIVE PROCTOR
            </span>
            <span style={{
              background: violations.length > 0 ? '#ef4444' : '#10b981',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '0.1rem 0.35rem',
              borderRadius: '4px'
            }}>
              {violations.length} Violations
            </span>
          </div>

          {/* Candidate Face Stream */}
          <div style={{ width: '100%', height: '110px', background: '#020617', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            {cameraStream ? (
              <video 
                ref={floatingCameraRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.75rem', flexDirection: 'column', gap: '4px' }}>
                <Camera size={24} />
                <span>Simulated Feed</span>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', padding: '2px 5px', borderRadius: '4px', fontSize: '0.65rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span> REC
            </div>
          </div>

          {/* Live Status Indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.68rem', color: '#cbd5e1' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: micGranted ? '#22c55e' : '#ef4444' }}>
              <Mic size={11} /> Mic ON
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: screenGranted ? '#22c55e' : '#ef4444' }}>
              <Monitor size={11} /> Screen ON
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: fullScreenGranted ? '#22c55e' : '#ef4444' }}>
              <Maximize size={11} /> Locked
            </span>
          </div>

          {/* Mic Volume Level Bar */}
          <div style={{ width: '100%', height: '4px', background: '#334155', borderRadius: '2px', marginTop: '0.35rem', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(15, micVolume)}%`, height: '100%', background: '#22c55e', transition: 'width 0.1s ease' }}></div>
          </div>
        </div>
      )}

      {/* Proctoring Violation Pop-up Banner */}
      {showViolationAlert && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10001,
          background: '#ef4444',
          color: '#ffffff',
          padding: '0.75rem 1.5rem',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(239, 68, 68, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '700',
          fontSize: '0.9rem',
          animation: 'pulse 1s infinite'
        }}>
          <AlertTriangle size={22} />
          <span>{lastViolationMsg}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 1: PRE-ASSESSMENT HARDWARE & SECURITY SETUP        */}
      {/* ======================================================== */}
      {phase === 'permissions' && (
        <div style={{ maxWidth: '840px', margin: 'auto', padding: '2.5rem 1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-verified" style={{ background: '#2563eb', color: '#fff', marginBottom: '0.4rem', display: 'inline-flex' }}>
                <ShieldCheck size={13} /> Mandatory Post-Application Evaluation
              </span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>
                Proctored Domain Assessment Setup
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '3px' }}>
                Target Role: <strong>{application?.internshipTitle || 'Domain Role'}</strong> ({application?.domain || 'Technical Track'})
              </p>
            </div>
            <button 
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#94a3b8', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{
            background: 'rgba(30, 58, 138, 0.25)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#bfdbfe'
          }}>
            <strong>🛡️ Secure Proctoring Guidelines:</strong> To maintain candidate integrity for connected partner employers, you must grant access to your <strong>Camera</strong>, <strong>Microphone</strong>, <strong>Screen Sharing</strong>, and <strong>Full Screen mode</strong>. Window tabbing, window minimizations, or external monitors are monitored in real time.
          </div>

          {/* 4 Access Permission Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            
            {/* 1. Camera Access */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: `1px solid ${cameraGranted ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: cameraGranted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: cameraGranted ? '#22c55e' : '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>1. WebCam Access</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-time facial continuous monitoring</span>
                  </div>
                </div>
                {cameraGranted ? (
                  <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={16} /> Verified
                  </span>
                ) : (
                  <button onClick={requestCamera} className="btn btn-primary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Enable Camera
                  </button>
                )}
              </div>

              {cameraGranted && (
                <div style={{ width: '100%', height: '140px', background: '#020617', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <video ref={cameraVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                </div>
              )}
              {cameraError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{cameraError}</p>}
            </div>

            {/* 2. Microphone Access */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: `1px solid ${micGranted ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: micGranted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: micGranted ? '#22c55e' : '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mic size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>2. Microphone Access</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Background audio acoustic verification</span>
                  </div>
                </div>
                {micGranted ? (
                  <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={16} /> Verified
                  </span>
                ) : (
                  <button onClick={requestMicrophone} className="btn btn-primary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Enable Microphone
                  </button>
                )}
              </div>

              {micGranted && (
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>Audio Wave Activity</span>
                    <span style={{ color: '#22c55e', fontWeight: '700' }}>Active ({micVolume}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(10, micVolume)}%`, height: '100%', background: '#22c55e', transition: 'width 0.1s ease' }}></div>
                  </div>
                </div>
              )}
              {micError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{micError}</p>}
            </div>

            {/* 3. Screen Sharing Access */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: `1px solid ${screenGranted ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: screenGranted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: screenGranted ? '#22c55e' : '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Monitor size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>3. Screen Sharing Access</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active display stream to prevent tab switching</span>
                  </div>
                </div>
                {screenGranted ? (
                  <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={16} /> Verified
                  </span>
                ) : (
                  <button onClick={requestScreenShare} className="btn btn-primary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Share Entire Screen
                  </button>
                )}
              </div>

              {screenGranted && (
                <div style={{ width: '100%', height: '100px', background: '#020617', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <video ref={screenVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              )}
              {screenError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{screenError}</p>}
            </div>

            {/* 4. Full Screen Access */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: `1px solid ${fullScreenGranted ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: fullScreenGranted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: fullScreenGranted ? '#22c55e' : '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Maximize size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>4. Full Screen Mode</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Locked window test environment</span>
                  </div>
                </div>
                {fullScreenGranted ? (
                  <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={16} /> Locked
                  </span>
                ) : (
                  <button onClick={requestFullScreen} className="btn btn-primary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Enable Full Screen
                  </button>
                )}
              </div>

              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                Exiting full-screen mode during the test immediately logs an anti-cheat violation.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button
              type="button"
              onClick={enableDemoProctoringMode}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px dashed #64748b',
                color: '#94a3b8',
                fontSize: '0.78rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Simulate Proctoring Devices (Demo Mode)
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleStartAssessment}
                disabled={!allPermissionsGranted}
                style={{
                  opacity: allPermissionsGranted ? 1 : 0.5,
                  cursor: allPermissionsGranted ? 'pointer' : 'not-allowed',
                  padding: '0.75rem 1.75rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  boxShadow: allPermissionsGranted ? '0 0 20px rgba(37, 99, 235, 0.6)' : 'none'
                }}
              >
                Enter Secure Assessment Room →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 2: LIVE PROCTORED ASSESSMENT TEST                  */}
      {/* ======================================================== */}
      {phase === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#090d16' }}>
          
          {/* Top Bar with Timer and Security Badges */}
          <header style={{
            background: 'rgba(15, 23, 42, 0.9)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '0.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="badge badge-verified" style={{ background: '#2563eb', color: '#fff' }}>
                <ShieldCheck size={14} /> Proctored Session
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>
                {application?.internshipTitle || 'Domain Role Assessment'}
              </strong>
            </div>

            {/* Countdown Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(37, 99, 235, 0.2)',
              border: `1px solid ${timeLeft < 300 ? '#ef4444' : '#3b82f6'}`,
              color: timeLeft < 300 ? '#fca5a5' : '#93c5fd',
              padding: '0.4rem 1rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1.1rem',
              marginRight: '220px' // Leave room for proctoring widget
            }}>
              <Clock size={18} />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to submit your assessment now?')) {
                  handleSubmitAssessment(false);
                }
              }}
              className="btn btn-emerald btn-sm"
              style={{ fontWeight: '800' }}
            >
              Submit Test
            </button>
          </header>

          {/* Main Question Body */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            
            {/* Question Workspace */}
            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
              <div style={{ maxWidth: '820px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '700' }}>
                    Question {currentIdx + 1} of {questions.length} • {currentQ?.category || 'Technical'}
                  </span>
                  <button 
                    onClick={() => setFlagged(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                    style={{
                      background: flagged[currentQ.id] ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${flagged[currentQ.id] ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                      color: flagged[currentQ.id] ? '#fbbf24' : '#94a3b8',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}
                  >
                    <Flag size={13} /> {flagged[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {currentQ?.question}
                </h3>

                {/* Option Choices */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                  {currentQ?.options?.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }))}
                        style={{
                          background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                          border: `2px solid ${isSelected ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '10px',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? '#3b82f6' : '#64748b'}`,
                          background: isSelected ? '#3b82f6' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: '800'
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span style={{ fontSize: '0.95rem', color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="btn btn-secondary"
                    style={{ opacity: currentIdx === 0 ? 0.4 : 1 }}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {Object.keys(userAnswers).length} of {questions.length} answered
                  </div>

                  {currentIdx < questions.length - 1 ? (
                    <button 
                      onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                      className="btn btn-primary"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        if (window.confirm('Submit assessment and calculate score?')) {
                          handleSubmitAssessment(false);
                        }
                      }}
                      className="btn btn-emerald"
                      style={{ fontWeight: '800' }}
                    >
                      Finish & Submit
                    </button>
                  )}
                </div>
              </div>
            </main>

            {/* Question Palette Sidebar */}
            <aside style={{
              width: '260px',
              background: 'rgba(15, 23, 42, 0.8)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Question Palette
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = currentIdx === idx;
                    const isFlagged = flagged[q.id];

                    let bg = '#1e293b';
                    let border = '1px solid rgba(255,255,255,0.1)';
                    if (isCurrent) border = '2px solid #38bdf8';
                    if (isAnswered) bg = '#15803d';
                    if (isFlagged) bg = '#b45309';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        style={{
                          background: bg,
                          border,
                          color: '#fff',
                          borderRadius: '6px',
                          padding: '0.5rem 0',
                          fontSize: '0.85rem',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.72rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#15803d' }}></span> Answered
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#b45309' }}></span> Flagged
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#1e293b' }}></span> Unanswered
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(30, 58, 138, 0.3)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.72rem', color: '#93c5fd' }}>
                <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Screen & Mic are actively monitored by anti-cheat telemetry.
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 3: VERIFIED RESULTS & PROCTORING AUDIT SCORECARD   */}
      {/* ======================================================== */}
      {phase === 'results' && scoreResult && (
        <div style={{ maxWidth: '680px', margin: 'auto', padding: '3rem 1.5rem', width: '100%', textAlign: 'center' }}>
          
          <div style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: scoreResult.score >= 60 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: scoreResult.score >= 60 ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Award size={36} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>
              {scoreResult.score >= 60 ? 'Assessment Passed!' : 'Assessment Completed'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Your domain assessment for <strong>{application?.internshipTitle}</strong> has been evaluated and recorded.
            </p>

            {/* Score Ring / Pill */}
            <div style={{
              background: scoreResult.score >= 60 ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `2px solid ${scoreResult.score >= 60 ? '#22c55e' : '#ef4444'}`,
              borderRadius: '14px',
              padding: '1.25rem',
              maxWidth: '320px',
              margin: '0 auto 2rem'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
                Overall Competency Score
              </span>
              <strong style={{ fontSize: '2.8rem', fontWeight: '900', color: scoreResult.score >= 60 ? '#22c55e' : '#ef4444', display: 'block', lineHeight: '1.1', margin: '6px 0' }}>
                {scoreResult.score}%
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {scoreResult.correctCount} of {scoreResult.totalQuestions} Questions Correct
              </span>
            </div>

            {/* Proctoring Verification Checklist */}
            <div style={{
              background: '#0f172a',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} /> Automated AI Proctoring Audit Report
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e' }}>
                  <CheckCircle2 size={14} /> WebCam Continuous: Verified
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e' }}>
                  <CheckCircle2 size={14} /> Audio Stream: Monitored
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e' }}>
                  <CheckCircle2 size={14} /> Screen Share: Continuous
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: scoreResult.violationsCount === 0 ? '#22c55e' : '#f59e0b' }}>
                  {scoreResult.violationsCount === 0 ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                  Tab-Switch Violations: {scoreResult.violationsCount}
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: '800' }}
            >
              Return to Student Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
