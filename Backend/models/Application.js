import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  internshipId: { type: String, required: true },
  internshipTitle: { type: String },
  companyName: { type: String },
  studentId: { type: String },
  studentName: { type: String },
  studentEmail: { type: String },
  studentPhone: { type: String },
  appliedDate: { type: String },
  status: { type: String, default: 'Under Review' },
  forwardedToEmployer: { type: Boolean, default: false },
  adminSelectionStatus: { type: String, default: 'Pending Admin Selection' },
  matchScore: { type: Number }
}, { timestamps: true });

export const ApplicationModel = mongoose.models.Application || mongoose.model('Application', applicationSchema);
