import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

/**
 * Extracts and verifies JWT token from Request Authorization Header
 */
export const verifyAuthToken = (req) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Verifies that the requester is an authenticated Admin
 */
export const verifyAdminToken = (req) => {
  const decoded = verifyAuthToken(req);
  if (decoded && decoded.role === 'admin') {
    return decoded;
  }
  return null;
};

/**
 * Verifies that the requester is an authenticated Student
 */
export const verifyStudentToken = (req) => {
  const decoded = verifyAuthToken(req);
  if (decoded && (decoded.role === 'student' || decoded.role === 'admin')) {
    return decoded;
  }
  return null;
};
