import dotenv from 'dotenv';

dotenv.config();

/**
 * InternCatalyst Backend Configuration
 */
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Database Configuration
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interncatalyst';

export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'interncatalyst_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || ''
};

// Auth & Security
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES || 10;

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CLIENT_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Email / SMTP Service Configuration
export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || '',
  from: process.env.EMAIL_FROM || 'InternCatalyst <no-reply@interncatalyst.org>'
};

