import http from 'http';
import { submitApplicationHandler } from '../Backend/controllers/applicationController.js';

async function testSubmitApplication() {
  console.log('Testing submitApplicationHandler...');

  let responseData = '';
  let statusCode = 0;
  const mockRes = {
    writeHead: (code, headers) => {
      statusCode = code;
    },
    end: (data) => {
      responseData = data;
    }
  };

  const payload = {
    internshipId: 'int-101',
    internshipTitle: 'Full-Stack Web Development Intern',
    companyName: 'Nexus Tech Solutions',
    studentName: 'Pooja Hegde',
    studentEmail: 'pooja.hegde@student.edu',
    studentPhone: '9876543210',
    stipend: '₹18,000 / month',
    workMode: 'Online',
    paymentAmount: '₹100.00',
    txnId: 'TXN_UPI_TEST_789',
    resumeName: 'Pooja_ATS_Resume.pdf'
  };

  await submitApplicationHandler({}, mockRes, payload);

  console.log('Status Code:', statusCode);
  console.log('Response JSON:', JSON.parse(responseData));
}

testSubmitApplication();
