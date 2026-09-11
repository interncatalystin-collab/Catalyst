import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  verifiedBadge: { type: Boolean, default: true },
  verificationStatus: { type: String, default: 'Verified' },
  legalDoc: { type: String, default: 'GSTIN_29AAACN1234F1Z9.pdf' },
  industry: { type: String, default: 'Software & Technology' },
  location: { type: String, default: 'Bangalore, India' },
  logo: { type: String },
  website: { type: String },
  description: { type: String }
}, { timestamps: true });

export const CompanyModel = mongoose.models.Company || mongoose.model('Company', companySchema);
export default CompanyModel;
