import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true
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
    required: [true, 'Password is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone Number is required'],
    trim: true
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
    required: [true, 'College Name is required'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch / Department is required'],
    trim: true
  },
  currentYearOrSemester: {
    type: String,
    default: ''
  },
  cgpaOrPercentage: {
    type: String,
    default: ''
  },
  graduationYear: {
    type: String,
    default: ''
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
