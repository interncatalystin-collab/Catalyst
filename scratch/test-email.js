import { sendApplicationConfirmationEmail, sendRegistrationConfirmationMail } from '../Backend/services/emailService.js';

async function testEmail() {
  console.log('Testing sendApplicationConfirmationEmail...');
  const appResult = await sendApplicationConfirmationEmail({
    id: 'app-test-999',
    studentName: 'Aditya Verma',
    studentEmail: 'aditya.verma@student.edu',
    internshipTitle: 'Full-Stack Web Development Intern',
    companyName: 'Nexus Tech Solutions',
    stipend: '₹18,000 / month',
    workMode: 'Online',
    duration: '6 Months',
    paymentAmount: '₹100.00',
    txnId: 'TXN_UPI_TEST_123456',
    resumeName: 'Aditya_Verma_Resume.pdf'
  });
  console.log('Application Email Result:', appResult);

  console.log('\nTesting sendRegistrationConfirmationMail...');
  const regResult = await sendRegistrationConfirmationMail({
    fullName: 'Aditya Verma',
    email: 'aditya.verma@student.edu',
    collegeName: 'IIT Bombay',
    preferredDomain: 'Software Development'
  });
  console.log('Registration Email Result:', regResult);
}

testEmail();
