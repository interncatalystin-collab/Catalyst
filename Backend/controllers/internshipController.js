/**
 * Internship Opportunities Controller
 * Manages fetching internship openings and employer job posting
 */

import { internships } from '../database.js';

export const getInternshipsHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(internships));
};

export const createInternshipHandler = (req, res, body) => {
  const newJob = {
    id: `int-${Date.now()}`,
    ...body,
    status: body.verified ? 'Approved' : 'Pending',
    applicantsCount: 0
  };
  internships.unshift(newJob);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, internship: newJob }));
};
