import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  internshipId: { type: String, required: true },
  internshipTitle: { type: String, default: 'Internship Role' },
  companyId: { type: String },
  companyName: { type: String, default: 'Hiring Company' },
  verifiedCompany: { type: Boolean, default: false },

  // Student Details
  studentId: { type: String },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentPhone: { type: String },
  studentCollege: { type: String },
  studentDegree: { type: String },
  studentYear: { type: String },
  studentCgpa: { type: String },
  studentSkills: [{ type: String }],
  resumeName: { type: String },
  resumeUrl: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },

  // Payment Details
  paymentAmount: { type: String, default: '₹100.00' },
  paymentStatus: { type: String, default: 'Paid (Verified)' },
  txnId: { type: String },

  // Application Info & Hiring Pipeline
  appliedDate: { type: String },
  status: { type: String, default: 'Under Review' },
  stipend: { type: String },
  workMode: { type: String, default: 'Online' },
  duration: { type: String, default: '3 Months' },
  matchScore: { type: Number, default: 90 },
  coverNote: { type: String },
  
  // Admin & Employer Workflow
  domain: { type: String },
  isDomainApplication: { type: Boolean, default: false },
  connectedCompanies: [{ type: String }],
  assessmentScore: { type: Number },
  assessmentStatus: { type: String, default: 'Pending Assessment' },
  proctoringDetails: {
    cameraVerified: { type: Boolean, default: false },
    micVerified: { type: Boolean, default: false },
    screenShareVerified: { type: Boolean, default: false },
    fullScreenVerified: { type: Boolean, default: false },
    violationsCount: { type: Number, default: 0 },
    completedAt: { type: String }
  },
  forwardedToEmployer: { type: Boolean, default: false },
  adminSelectionStatus: { type: String, default: 'Pending Admin Selection' },
  employerDecision: { type: String, default: 'Awaiting Admin Selection' },
  employerSelectionStatus: { type: String }
}, { timestamps: true });

export const ApplicationModel = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default ApplicationModel;
