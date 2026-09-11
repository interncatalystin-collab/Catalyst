/**
 * Database Connection Module
 * Connects InternCatalyst backend server to MongoDB Atlas using Mongoose
 */

import mongoose from 'mongoose';
import dns from 'dns';
import { MONGODB_URI } from './config.js';

// Configure DNS resolution for MongoDB Atlas SRV records on Windows
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (dnsErr) {
  // Ignore DNS override errors if system policies restrict custom DNS
}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || MONGODB_URI;

  if (uri) {
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log(`🍃 Connected to MongoDB Atlas successfully! Host: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.warn(`⚠️ Atlas Connection Note: ${error.message}`);
      console.warn('📌 Tip: If using MongoDB Atlas, whitelist your IP (0.0.0.0/0) in Atlas Security settings.');
    }
  }

  // Try local MongoDB
  try {
    const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/interncatalyst', { serverSelectionTimeoutMS: 2000 });
    console.log(`🍃 Connected to Local MongoDB server successfully!`);
    return localConn;
  } catch (localErr) {
    console.log('⚡ Server running in resilient in-memory mode for offline development.');
    return null;
  }
};
