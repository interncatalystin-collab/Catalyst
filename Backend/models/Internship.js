import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  companyId: { type: String },
  companyName: { type: String, required: true },
  logo: { type: String },
  verified: { type: Boolean, default: true },
  location: { type: String, default: 'Bangalore / Remote' },
  workMode: { type: String, default: 'Online' },
  internshipType: { type: String, default: 'Full-time' },
  stipendType: { type: String, default: 'Paid' },
  stipendAmount: { type: String, default: '₹15,000 / month' },
  duration: { type: String, default: '3-6 Months' },
  openings: { type: Number, default: 3 },
  vacantSeats: { type: Number, default: 3 },
  hiredCount: { type: Number, default: 0 },
  workingHours: { type: String },
  industry: { type: String, default: 'Software & IT' },
  skills: [{ type: String }],
  deadline: { type: String },
  status: { type: String, default: 'Approved' },
  applicantsCount: { type: Number, default: 0 },
  supervisorName: { type: String },
  supervisorDesignation: { type: String },
  supervisorEmail: { type: String },
  supervisorPhone: { type: String },
  description: { type: String },
  requirements: [{ type: String }]
}, { timestamps: true });

export const InternshipModel = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);
export default InternshipModel;
