import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  verified: { type: Boolean, default: false },
  location: { type: String },
  workMode: { type: String },
  stipendAmount: { type: String },
  duration: { type: String },
  openings: { type: Number, default: 1 },
  industry: { type: String },
  skills: [{ type: String }],
  deadline: { type: String },
  status: { type: String, default: 'Approved' },
  applicantsCount: { type: Number, default: 0 }
}, { timestamps: true });

export const InternshipModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);
