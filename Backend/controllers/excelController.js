import ExcelJS from 'exceljs';
import Student from '../models/Student.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

export const exportStudentsExcelHandler = async (req, res) => {
  try {
    // 1. Verify JWT token and Admin authorization
    const admin = verifyAdminToken(req);
    if (!admin) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized access. Only authenticated admins can download student reports.' }));
      return;
    }

    // 2. Fetch student records from MongoDB Atlas
    let students = [];
    try {
      students = await Student.find().select('-password').sort({ createdAt: -1 });
    } catch (err) {
      students = [];
    }

    // 3. Create Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'InternCatalyst Platform Admin';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Student Records', {
      pageSetup: { paperSize: 9, orientation: 'landscape' }
    });

    // 4. Define columns with custom widths
    worksheet.columns = [
      { header: 'Student ID', key: 'id', width: 26 },
      { header: 'Full Name', key: 'fullName', width: 24 },
      { header: 'Email Address', key: 'email', width: 28 },
      { header: 'Phone Number', key: 'phone', width: 18 },
      { header: 'College Name', key: 'collegeName', width: 32 },
      { header: 'Degree', key: 'degree', width: 22 },
      { header: 'Branch', key: 'branch', width: 24 },
      { header: 'Current Year / Sem', key: 'currentYearOrSemester', width: 20 },
      { header: 'CGPA / Percentage', key: 'cgpaOrPercentage', width: 18 },
      { header: 'Graduation Year', key: 'graduationYear', width: 16 },
      { header: 'Skills', key: 'skills', width: 30 },
      { header: 'Preferred Domain', key: 'preferredDomain', width: 24 },
      { header: 'City', key: 'city', width: 18 },
      { header: 'State', key: 'state', width: 18 },
      { header: 'Internship Preference', key: 'internshipPreference', width: 22 },
      { header: 'Registration Date', key: 'registrationDate', width: 20 }
    ];

    // 5. Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1E3A8A' } // Deep Navy Blue
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 28;

    // 6. Populate Rows
    students.forEach((student, index) => {
      const skillsStr = Array.isArray(student.skills) 
        ? student.skills.join(', ') 
        : (student.skills || '');
      
      const regDate = student.createdAt 
        ? new Date(student.createdAt).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0];

      const row = worksheet.addRow({
        id: student._id ? student._id.toString() : `STD-${index + 101}`,
        fullName: student.fullName || 'N/A',
        email: student.email || 'N/A',
        phone: student.phone || 'N/A',
        collegeName: student.collegeName || 'N/A',
        degree: student.degree || 'N/A',
        branch: student.branch || 'N/A',
        currentYearOrSemester: student.currentYearOrSemester || 'N/A',
        cgpaOrPercentage: student.cgpaOrPercentage || 'N/A',
        graduationYear: student.graduationYear || 'N/A',
        skills: skillsStr,
        preferredDomain: student.preferredDomain || 'N/A',
        city: student.city || 'N/A',
        state: student.state || 'N/A',
        internshipPreference: student.internshipPreference || 'N/A',
        registrationDate: regDate
      });

      // Alternating row styling
      if (index % 2 === 1) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F8FAFC' }
        };
      }
      row.alignment = { vertical: 'middle' };
      row.height = 22;
    });

    // 7. Write to buffer and send response
    const buffer = await workbook.xlsx.writeBuffer();

    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="InternCatalyst_Students_Report_${Date.now()}.xlsx"`,
      'Content-Length': buffer.length
    });

    res.end(buffer);
  } catch (error) {
    console.error('❌ Error generating Excel export:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to generate Excel report', details: error.message }));
  }
};
