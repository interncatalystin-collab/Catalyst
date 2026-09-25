import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar, 
  Building2, 
  UserCheck, 
  Mail, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Lock,
  Send,
  GraduationCap,
  Upload,
  CreditCard,
  Layers,
  Briefcase
} from 'lucide-react';

export default function InternshipModal({ 
  internship, 
  onClose, 
  onConfirmApply, 
  studentProfile,
  hasApplied,
  currentRole,
  setCurrentRole,
  authenticatedRoles,
  setActiveTab,
  onAddToast,
  onUpdateStudentProfile
}) {
  const [phoneInput, setPhoneInput] = useState(studentProfile?.phone || '');
  const [emailInput, setEmailInput] = useState(studentProfile?.email || '');
  const [resumeNameInput, setResumeNameInput] = useState(studentProfile?.name ? `${studentProfile.name.replace(/\s+/g, '_')}_ATS_Resume.pdf` : 'Aditya_Verma_ATS_Resume.pdf');
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!internship) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Student Login Required Guard
    if (currentRole !== 'student' || !authenticatedRoles?.student) {
      onClose();
      if (onAddToast) onAddToast('Please log in to your Student account to apply for internships.', 'info');
      if (setActiveTab) setActiveTab('login');
      return;
    }

    // Mandatory contact number validation
    if (!phoneInput || phoneInput.trim().length < 10) {
      setErrorMsg('Mandatory Contact Number Required: Please enter a valid 10-digit contact phone number to apply.');
      return;
    }

    if (currentRole === 'visitor' && (!emailInput || !emailInput.includes('@'))) {
      setErrorMsg('Student Email Required: Please enter a valid student email address.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      // Authenticate visitor into student role if currently visitor
      if (currentRole === 'visitor') {
        if (setCurrentRole) setCurrentRole('student');
        if (onUpdateStudentProfile) {
          onUpdateStudentProfile(prev => ({
            ...prev,
            email: emailInput,
            phone: phoneInput
          }));
        }
      }

      onConfirmApply(internship.id, {
        phone: phoneInput,
        email: emailInput || studentProfile?.email,
        coverNote: coverNote
      });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            color: 'var(--text-muted)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header - Role Title & Domain Track */}
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <span style={{ 
              background: '#eff6ff', 
              color: '#1d4ed8', 
              border: '1px solid #bfdbfe', 
              borderRadius: '6px', 
              fontSize: '0.82rem', 
              padding: '0.2rem 0.65rem', 
              fontWeight: '700' 
            }}>
              {internship.domain || 'Domain Track'}
            </span>
            <span className="badge badge-verified">
              <ShieldCheck size={13} /> Verified Role
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: '0.25rem 0' }}>
            {internship.title}
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '4px' }}>
            <Briefcase size={13} /> Partner Corporate Hiring Pool (Centrally Vetted)
          </div>
        </div>

        {/* Highlight Grid */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Verification</span>
            <span style={{ fontWeight: '700', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ShieldCheck size={15} /> Verified Corporate Listing
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Commitment</span>
            <span className="badge badge-pill" style={{
              background: (internship.internshipType || 'Full-time') === 'Full-time' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(147, 51, 234, 0.1)',
              color: (internship.internshipType || 'Full-time') === 'Full-time' ? '#2563eb' : '#9333ea',
              fontWeight: '700',
              fontSize: '0.75rem',
              display: 'inline-block',
              marginTop: '2px'
            }}>
              {(internship.internshipType || 'Full-time') === 'Full-time' ? '🌕 Full-Time' : '🌓 Part-Time'}
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Duration & Mode</span>
            <span style={{ fontWeight: '700', color: '#0f172a' }}>
              {internship.duration} ({internship.workMode})
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block' }}>Schedule</span>
            <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.8rem' }}>
              {internship.workingHours || 'Standard Schedule'}
            </span>
          </div>
        </div>

        {/* Central Placement & Domain Role Policy (Replaces company supervisor contact for student view) */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.15rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem'
        }}>
          <h4 style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '800' }}>
            <ShieldCheck size={17} style={{ color: '#2563eb' }} /> Central Placement & Domain Role Policy
          </h4>
          <p style={{ color: '#334155', margin: 0, lineHeight: '1.5', fontSize: '0.825rem' }}>
            Students apply directly for the <strong>{internship.title}</strong> role in the <strong>{internship.domain || 'Domain'}</strong> track. To ensure fair and merit-based hiring, partner company identities and supervisor contacts are centrally managed by InternCatalyst Administration and disclosed upon interview shortlisting.
          </p>
        </div>

          {/* Application Form */}
          {hasApplied ? (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#16a34a',
              padding: '1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle size={28} />
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block' }}>Application & ₹100 Payment Verified!</strong>
                <p style={{ fontSize: '0.875rem', color: '#166534', marginTop: '4px', margin: 0 }}>
                  Your application and ATS resume have been submitted to InternCatalyst Central Admin Queue.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={20} style={{ color: '#2563eb' }} /> Student Application & ₹100 Payment
                </h4>
                <span className="badge badge-verified" style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}>
                  Application Fee: ₹100
                </span>
              </div>

              {errorMsg && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              {/* 1. STUDENT PERSONAL & ACADEMIC DETAILS */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={17} style={{ color: '#2563eb' }} /> Academic Information
                </h5>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      Student Full Name <span className="required">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Aditya Verma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      Contact Phone Number <span className="required">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      College / Institution Name <span className="required">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alva's Institute of Engineering & Tech / IIT"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      Course / Degree <span className="required">*</span>
                    </label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. B.Tech Computer Science / MCA / B.E."
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      Current Year of Study <span className="required">*</span>
                    </label>
                    <select 
                      className="form-select"
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      required
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Passed Out / Final Semester">Passed Out / Final Semester</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                      Student Gmail Address <span className="required">*</span>
                    </label>
                    <input 
                      type="email"
                      className="form-input"
                      placeholder="student@university.edu"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. UPLOAD RESUME SECTION */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={17} style={{ color: '#2563eb' }} /> Upload ATS Resume (.pdf, .docx)
                </h5>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <input 
                      type="text" 
                      className="form-input"
                      value={resumeNameInput}
                      onChange={(e) => setResumeNameInput(e.target.value)}
                      placeholder="e.g. Aditya_Verma_ATS_Resume.pdf"
                      required
                    />
                  </div>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                    <Upload size={15} /> Browse File
                    <input type="file" accept=".pdf,.docx,.doc" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </label>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.35rem' }}>
                  📄 Attached resume will be saved in your Student Profile and reviewed by Central Admin.
                </span>
              </div>

              {/* 3. ₹100 RUPEES ONLINE PAYMENT SECTION */}
              <div style={{
                background: '#faf5ff',
                border: '1.5px solid #d8b4fe',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#6b21a8', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CreditCard size={18} style={{ color: '#9333ea' }} /> Online Application Fee: ₹100.00
                  </h5>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#581c87', marginBottom: '1rem' }}>
                  A one-time application processing fee of <strong>₹100</strong> is required to submit your ATS profile to the Central Admin Vetting Queue.
                </p>

                {/* Payment Method Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button 
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: paymentMode === 'upi' ? '2px solid #9333ea' : '1px solid #e9d5ff',
                      background: paymentMode === 'upi' ? '#ffffff' : '#f3e8ff',
                      color: paymentMode === 'upi' ? '#6b21a8' : '#7e22ce',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    ⚡ UPI (GPay / PhonePe / Paytm)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMode('card')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: paymentMode === 'card' ? '2px solid #9333ea' : '1px solid #e9d5ff',
                      background: paymentMode === 'card' ? '#ffffff' : '#f3e8ff',
                      color: paymentMode === 'card' ? '#6b21a8' : '#7e22ce',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    💳 Debit / Credit Card
                  </button>
                </div>

                {/* Payment Fields */}
                {paymentMode === 'upi' ? (
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem', color: '#581c87', fontWeight: '700' }}>
                      Enter UPI Virtual Payment Address (VPA) <span className="required">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input"
                      style={{ background: '#ffffff', borderColor: '#c084fc' }}
                      placeholder="e.g. 9876543210@paytm or student@okicici"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="grid-2" style={{ gap: '0.75rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.78rem', color: '#581c87', fontWeight: '700' }}>
                        Card Number <span className="required">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-input"
                        style={{ background: '#ffffff', borderColor: '#c084fc' }}
                        placeholder="4532 •••• •••• 8901"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.78rem', color: '#581c87', fontWeight: '700' }}>
                        Expiry & CVV <span className="required">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-input"
                        style={{ background: '#ffffff', borderColor: '#c084fc' }}
                        placeholder="MM/YY  •  CVV"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald" style={{ padding: '0.75rem 1.5rem', fontWeight: '800' }} disabled={submitting}>
                  {submitting ? 'Processing ₹100 Payment...' : 'Pay ₹100 & Submit Application'}
                </button>
              </div>
            </form>
          )}
      </div>
    </div>
  );
}
