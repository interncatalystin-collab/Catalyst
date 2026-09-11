/**
 * Internship Opportunities Controller
 * Manages fetching internship openings and employer job posting
 * Persisted in MongoDB with database.js memory fallback & auto-seeding
 */

import { internships as defaultInternships } from '../database.js';
import InternshipModel from '../models/Internship.js';

let isSeeded = false;

// Auto-seed default internships if collection is empty
const ensureInternshipsSeeded = async () => {
  if (isSeeded) return;
  try {
    const count = await InternshipModel.countDocuments();
    if (count === 0) {
      await InternshipModel.insertMany(defaultInternships);
      console.log('🌱 Seeded default internship listings into MongoDB.');
    }
    isSeeded = true;
  } catch (err) {
    // MongoDB offline, fallback active
  }
};

export const getInternshipsHandler = async (req, res) => {
  await ensureInternshipsSeeded();

  try {
    const dbInternships = await InternshipModel.find().sort({ createdAt: -1 }).lean();
    if (dbInternships && dbInternships.length > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(dbInternships));
      return;
    }
  } catch (err) {
    // Database error, proceed to fallback
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(defaultInternships));
};

export const createInternshipHandler = async (req, res, body) => {
  const newJob = {
    id: body.id || `int-${Date.now()}`,
    ...body,
    status: body.verified !== false ? 'Approved' : 'Pending',
    applicantsCount: body.applicantsCount || 0
  };

  try {
    await InternshipModel.create(newJob);
  } catch (dbErr) {
    // in-memory fallback
  }

  defaultInternships.unshift(newJob);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, internship: newJob }));
};
