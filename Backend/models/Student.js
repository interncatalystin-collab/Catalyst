import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    default: 'Registered Student'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  // Education Information
  collegeName: {
    type: String,
    default: 'Accredited Institution',
    trim: true
  },
  degree: {
    type: String,
    default: 'B.Tech / B.E.',
    trim: true
  },
  branch: {
    type: String,
    default: 'Computer Science & Engineering',
    trim: true
  },
  currentYearOrSemester: {
    type: String,
    default: '4th Year'
  },
  cgpaOrPercentage: {
    type: String,
    default: ''
  },
  graduationYear: {
    type: String,
    default: '2026'
  },
  // Professional Information
  skills: {
    type: [String],
    default: []
  },
  preferredDomain: {
    type: String,
    default: 'Software Development'
  },
  resumeLink: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  // Location & Preferences
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  internshipPreference: {
    type: String,
    default: 'Remote / Online'
  },
  role: {
    type: String,
    default: 'student'
  }
}, {
  timestamps: true
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
