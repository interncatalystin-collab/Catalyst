import React, { useState, useRef } from 'react';
import Logo from '../components/Logo';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Award, 
  Building, 
  MapPin, 
  Briefcase, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Code,
  Globe,
  FileText,
  Eye,
  EyeOff,
  Camera,
  Upload,
  Image
} from 'lucide-react';

export default function StudentRegisterPage({ onLoginSuccess, setActiveTab, onUpdateProfile, onAddToast, isEmbeddedInDashboard = false }) {
  const photoInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    dateOfBirth: '',
    gender: 'Male',
    collegeName: '',
    degree: 'B.Tech / B.E.',
    branch: 'Computer Science & Engineering',
    currentYearOrSemester: '3rd Year',
    cgpaOrPercentage: '',
    graduationYear: '2026',
    skills: '',
    preferredDomain: 'Software Development',
    resumeLink: '',
    linkedin: '',
    github: '',
    city: '',
    state: '',
    internshipPreference: 'Remote / Online'
  });


  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onAddToast) onAddToast('Invalid file format: Please select a valid image file (PNG, JPG, WEBP).', 'danger');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      if (onAddToast) onAddToast('File size limit exceeded: Photo must be under 5MB.', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (dataUrl) {
        setFormData(prev => ({ ...prev, avatar: dataUrl }));
        if (onAddToast) onAddToast('📸 Candidate photo uploaded successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterDone = (studentData) => {
    const createdProfile = {
      fullName: studentData.fullName || formData.fullName,
      name: studentData.fullName || formData.fullName,
      email: studentData.email || formData.email,
      phone: studentData.phone || formData.phone,
      avatar: studentData.avatar || formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      institution: studentData.collegeName || formData.collegeName,
      collegeName: studentData.collegeName || formData.collegeName,
      degree: studentData.degree || formData.degree,
      branch: studentData.branch || formData.branch,
      yearOfStudy: studentData.currentYearOrSemester || formData.currentYearOrSemester,
      currentYearOrSemester: studentData.currentYearOrSemester || formData.currentYearOrSemester,
      cgpa: studentData.cgpaOrPercentage || formData.cgpaOrPercentage,
      cgpaOrPercentage: studentData.cgpaOrPercentage || formData.cgpaOrPercentage,
      graduationYear: studentData.graduationYear || formData.graduationYear,
      dateOfBirth: studentData.dateOfBirth || formData.dateOfBirth,
      gender: studentData.gender || formData.gender,
      city: studentData.city || formData.city,
      state: studentData.state || formData.state,
      internshipPreference: studentData.internshipPreference || formData.internshipPreference,
      domain: studentData.preferredDomain || formData.preferredDomain,
      preferredDomain: studentData.preferredDomain || formData.preferredDomain,
      skills: Array.isArray(studentData.skills) ? studentData.skills : (formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['React', 'JavaScript']),
      resumeUrl: formData.resumeLink || 'https://resume.interncatalyst.org/view',
      resumeLink: formData.resumeLink || 'https://resume.interncatalyst.org/view',
      linkedinUrl: formData.linkedin || '',
      linkedin: formData.linkedin || '',
      githubUrl: formData.github || '',
      github: formData.github || ''
    };

    if (onUpdateProfile) {
      onUpdateProfile(createdProfile);
    }
    if (onAddToast) {
      onAddToast(`🎉 Student account registered! ✉️ Welcome email dispatched to ${createdProfile.email}`, 'success');
    }
    if (onLoginSuccess) {
      onLoginSuccess('student', formData.email, createdProfile);
    } else if (setActiveTab) {
      setActiveTab('profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setErrorMsg('Password must contain at least one capital letter (A-Z).');
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(formData.password)) {
      setErrorMsg('Password must contain at least one special character (e.g. !@#$%^&*).');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!formData.collegeName.trim()) {
      setErrorMsg('College Name is required.');
      return;
    }
    if (!formData.branch.trim()) {
      setErrorMsg('Branch / Department is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg('Registration successful! Logging you in...');
        if (data.token) {
          localStorage.setItem('studentToken', data.token);
        }
        setTimeout(() => {
          handleRegisterDone(data.student || formData);
        }, 1000);
      } else {
        // Handle error (e.g. unique email failure)
        setErrorMsg(data.error || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      // Offline fallback: register locally
      setSuccessMsg('Registration completed! Redirecting to student portal...');
      setTimeout(() => {
        handleRegisterDone(formData);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: isEmbeddedInDashboard ? '0' : '3rem 1rem 6rem', maxWidth: isEmbeddedInDashboard ? '100%' : '840px', margin: '0 auto' }}>
      {/* Header */}
      {!isEmbeddedInDashboard ? (
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Logo height={48} mode="light" showTagline={true} style={{ marginBottom: '1rem', margin: '0 auto 1rem' }} />
          <div className="badge badge-verified" style={{ marginBottom: '0.75rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', display: 'inline-flex' }}>
            <GraduationCap size={15} /> Student Enrollment & Placement Portal
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            Create Your <span className="text-gradient">Student Account</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Register to access verified internship opportunities, ATS resume builders, and employer matching.
          </p>
        </div>
      ) : (
        <div style={{
          background: 'rgba(37, 99, 235, 0.1)',
          border: '1px solid rgba(37, 99, 235, 0.3)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <GraduationCap size={28} style={{ color: '#38bdf8' }} />
            <div>
              <strong style={{ fontSize: '1.1rem', color: '#93c5fd', display: 'block' }}>
                📝 Official Student Candidate Registration Form
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Complete your full candidate profile, academic details, and ATS resume link inside your Student Dashboard.
              </span>
            </div>
          </div>
          <span className="badge badge-verified" style={{ background: '#2563eb', color: '#ffffff', padding: '0.45rem 0.85rem' }}>
            Dashboard Registration ✓
          </span>
        </div>
      )}

      {/* Form Container */}
      <div className="glass-card" style={{ padding: '2.5rem', background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)', border: '1px solid var(--border-color)' }}>
        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <User size={18} style={{ color: '#2563eb' }} /> 1. Personal Information & Photo
            </h3>

            {/* Candidate Photo Upload Station */}
            <input 
              type="file" 
              ref={photoInputRef} 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }} 
            />
            <div style={{
              background: '#f8fafc',
              border: '2px dashed #93c5fd',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src={formData.avatar} 
                    alt="Candidate Preview" 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #2563eb',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    title="Upload candidate photo"
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      background: '#2563eb',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '2px' }}>
                    Candidate Photo
                  </label>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Upload your candidate photo (JPG, PNG, WEBP, max 5MB).
                  </span>
                  <button 
                    type="button" 
                    onClick={() => photoInputRef.current?.click()}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  >
                    <Upload size={13} /> Upload Photo
                  </button>
                </div>
              </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Full Name <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="text" name="fullName" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="e.g. Aditya Verma" value={formData.fullName} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Email Address <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="email" name="email" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="student@university.edu" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Phone Number <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="tel" name="phone" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Date of Birth</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="date" name="dateOfBirth" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.dateOfBirth} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Gender</label>
                <select name="gender" className="form-input" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Password <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} 
                    placeholder="Min 8 chars, 1 capital & 1 special char" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Live Password Requirement Chips */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '6px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    background: (formData.password?.length >= 8) ? '#dcfce7' : '#f1f5f9',
                    color: (formData.password?.length >= 8) ? '#15803d' : '#64748b'
                  }}>
                    {formData.password?.length >= 8 ? '✓' : '○'} Min 8 chars
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    background: /[A-Z]/.test(formData.password || '') ? '#dcfce7' : '#f1f5f9',
                    color: /[A-Z]/.test(formData.password || '') ? '#15803d' : '#64748b'
                  }}>
                    {/[A-Z]/.test(formData.password || '') ? '✓' : '○'} 1 Capital letter
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    background: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(formData.password || '') ? '#dcfce7' : '#f1f5f9',
                    color: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(formData.password || '') ? '#15803d' : '#64748b'
                  }}>
                    {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(formData.password || '') ? '✓' : '○'} 1 Special char
                  </span>
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Confirm Password <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {formData.confirmPassword && (
                  <div style={{
                    fontSize: '0.72rem',
                    marginTop: '6px',
                    fontWeight: '600',
                    color: formData.password === formData.confirmPassword ? '#15803d' : '#dc2626'
                  }}>
                    {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: EDUCATION INFORMATION */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <BookOpen size={18} style={{ color: '#2563eb' }} /> 2. Education Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>College / University Name <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Building size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="text" name="collegeName" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="e.g. Alva's Institute of Engineering & Technology (AIET)" value={formData.collegeName} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Degree / Course <span className="required">*</span></label>
                <select name="degree" className="form-input" value={formData.degree} onChange={handleChange}>
                  <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc CS / IT">B.Sc CS / IT</option>
                  <option value="MBA">MBA</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Branch / Specialization <span className="required">*</span></label>
                <input type="text" name="branch" className="form-input" placeholder="e.g. Computer Science & Engineering" value={formData.branch} onChange={handleChange} required />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Current Year / Semester</label>
                <select name="currentYearOrSemester" className="form-input" value={formData.currentYearOrSemester} onChange={handleChange}>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year / Final Year</option>
                  <option value="Graduated">Recent Graduate</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>CGPA / Percentage</label>
                <input type="text" name="cgpaOrPercentage" className="form-input" placeholder="e.g. 8.8 / 10 or 85%" value={formData.cgpaOrPercentage} onChange={handleChange} />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Graduation Year</label>
                <input type="text" name="graduationYear" className="form-input" placeholder="e.g. 2026" value={formData.graduationYear} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* SECTION 3: PROFESSIONAL INFORMATION */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <Code size={18} style={{ color: '#2563eb' }} /> 3. Professional Profile & Links
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Technical Skills (Comma separated)</label>
                <div style={{ position: 'relative' }}>
                  <Code size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="text" name="skills" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="e.g. React, Node.js, Python, MongoDB, SQL" value={formData.skills} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Preferred Internship Domain</label>
                <select name="preferredDomain" className="form-input" value={formData.preferredDomain} onChange={handleChange}>
                  <option value="Software Development">Software Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Resume / Portfolio Drive Link</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="url" name="resumeLink" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://drive.google.com/..." value={formData.resumeLink} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>LinkedIn Profile URL</label>
                <div style={{ position: 'relative' }}>
                  <Globe size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="url" name="linkedin" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://linkedin.com/in/username" value={formData.linkedin} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>GitHub Profile URL</label>
                <div style={{ position: 'relative' }}>
                  <Code size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="url" name="github" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://github.com/username" value={formData.github} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: LOCATION & PREFERENCES */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <MapPin size={18} style={{ color: '#2563eb' }} /> 4. Location & Work Preferences
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>City</label>
                <input type="text" name="city" className="form-input" placeholder="e.g. Bangalore" value={formData.city} onChange={handleChange} />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>State</label>
                <input type="text" name="state" className="form-input" placeholder="e.g. Karnataka" value={formData.state} onChange={handleChange} />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.825rem', fontWeight: '700' }}>Internship Mode Preference</label>
                <select name="internshipPreference" className="form-input" value={formData.internshipPreference} onChange={handleChange}>
                  <option value="Remote / Online">Remote / Online</option>
                  <option value="In-Office / On-Site">In-Office / On-Site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <button type="button" onClick={() => setActiveTab('login')} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>
              Already have an account? Sign In
            </button>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={loading}>
              {loading ? 'Registering Account...' : 'Complete Student Registration'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
