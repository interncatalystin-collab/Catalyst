import { sendOtpEmail } from '../Backend/services/emailService.js';
import { submitApplicationHandler, getApplicationsHandler } from '../Backend/controllers/applicationController.js';
import { getInternshipsHandler } from '../Backend/controllers/internshipController.js';

async function testFullStack() {
  console.log('--- 1. Testing OTP Email Dispatch ---');
  const otpRes = await sendOtpEmail('student.test@university.edu', '849201');
  console.log('OTP Email Result:', otpRes);

  console.log('\n--- 2. Testing Internship Fetching & Auto-Seed ---');
  let intData = '';
  const mockRes1 = {
    writeHead: () => {},
    end: (d) => { intData = d; }
  };
  await getInternshipsHandler({}, mockRes1);
  const parsedInternships = JSON.parse(intData);
  console.log(`Fetched ${parsedInternships.length} internships successfully. First: ${parsedInternships[0]?.title}`);

  console.log('\n--- 3. Testing Application Submission & Confirmation Email ---');
  let appData = '';
  const mockRes2 = {
    writeHead: () => {},
    end: (d) => { appData = d; }
  };
  await submitApplicationHandler({}, mockRes2, {
    internshipId: 'int-101',
    internshipTitle: 'Full-Stack Web Development Intern',
    companyName: 'Nexus Tech Solutions',
    studentName: 'Sneha Rao',
    studentEmail: 'sneha.rao@college.edu',
    studentPhone: '9845012345',
    stipend: '₹18,000 / month',
    workMode: 'Online',
    paymentAmount: '₹100.00',
    txnId: 'TXN_DEPLOY_TEST_99'
  });
  const parsedApp = JSON.parse(appData);
  console.log('Submitted App Result:', {
    id: parsedApp.application?.id,
    studentName: parsedApp.application?.studentName,
    emailDispatched: parsedApp.emailDispatched
  });
}

testFullStack();
