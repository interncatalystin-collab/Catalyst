/**
 * Internship Reports Controller
 * Handles uploading, viewing, updating and deleting reports filed by companies for hired students
 */

import { reports as memoryReports } from '../database.js';

export const getReportsHandler = async (req, res, url) => {
  const companyId = url?.searchParams?.get('companyId');
  const studentEmail = url?.searchParams?.get('studentEmail');
  const studentId = url?.searchParams?.get('studentId');

  let filtered = memoryReports || [];

  if (companyId) {
    filtered = filtered.filter(r => String(r.companyId).trim() === String(companyId).trim());
  }

  if (studentEmail || studentId) {
    filtered = filtered.filter(r => 
      (studentEmail && r.studentEmail?.toLowerCase() === studentEmail.toLowerCase()) ||
      (studentId && String(r.studentId) === String(studentId))
    );
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(filtered));
};

export const createReportHandler = async (req, res, body) => {
  if (!body.studentName || !body.reportTitle) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Student Name and Report Title are mandatory fields' }));
    return;
  }

  const newReport = {
    id: body.id || `rep-${Date.now()}`,
    companyId: body.companyId || 'comp-101',
    companyName: body.companyName || 'Nexus Tech Solutions',
    applicationId: body.applicationId || null,
    studentId: body.studentId || null,
    studentName: body.studentName,
    studentEmail: body.studentEmail || '',
    studentPhone: body.studentPhone || '',
    studentCollege: body.studentCollege || '',
    internshipId: body.internshipId || '',
    internshipTitle: body.internshipTitle || 'Internship',
    reportTitle: body.reportTitle,
    reportType: body.reportType || 'Monthly Milestone Report',
    submissionDate: body.submissionDate || new Date().toISOString().split('T')[0],
    supervisorName: body.supervisorName || 'Corporate Supervisor',
    supervisorDesignation: body.supervisorDesignation || 'HR / Project Lead',
    supervisorEmail: body.supervisorEmail || '',
    rating: Number(body.rating) || 5,
    attendance: body.attendance || '100%',
    stipendStatus: body.stipendStatus || 'Approved',
    keyDeliverables: body.keyDeliverables || '',
    supervisorRemarks: body.supervisorRemarks || '',
    fileName: body.fileName || 'Internship_Report.pdf',
    fileSize: body.fileSize || '1.5 MB',
    fileUrl: body.fileUrl || '#',
    status: body.status || 'Approved',
    uploadedBy: body.uploadedBy || 'Company Supervisor',
    createdAt: new Date().toISOString()
  };

  if (!Array.isArray(memoryReports)) {
    // initialize if needed
  }
  memoryReports.unshift(newReport);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: 'Report uploaded successfully', 
    report: newReport 
  }));
};

export const updateReportHandler = async (req, res, reportId, body) => {
  const index = memoryReports.findIndex(r => String(r.id) === String(reportId));
  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Report not found' }));
    return;
  }

  memoryReports[index] = {
    ...memoryReports[index],
    ...body,
    updatedAt: new Date().toISOString()
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: 'Report updated successfully', 
    report: memoryReports[index] 
  }));
};

export const deleteReportHandler = async (req, res, reportId) => {
  const index = memoryReports.findIndex(r => String(r.id) === String(reportId));
  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Report not found' }));
    return;
  }

  const deleted = memoryReports.splice(index, 1)[0];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: 'Report deleted successfully', 
    report: deleted 
  }));
};
