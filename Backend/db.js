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

// Cache the connection promise across warm serverless lambdas
let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    try {
      await cachedPromise;
      if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
      }
    } catch {
      cachedPromise = null;
    }
  }

  const uri = process.env.MONGODB_URI || MONGODB_URI;

  if (uri) {
    try {
      cachedPromise = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      const conn = await cachedPromise;
      console.log(`🍃 Connected to MongoDB Atlas successfully! Host: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      cachedPromise = null;
      console.warn(`⚠️ Atlas Connection Note: ${error.message}`);
      console.warn('📌 Tip: If using MongoDB Atlas, whitelist your IP (0.0.0.0/0) in Atlas Security settings.');
    }
  }

  // Try local MongoDB (only for local development, skip in cloud/serverless)
  if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
    try {
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/interncatalyst', { serverSelectionTimeoutMS: 2000 });
      console.log(`🍃 Connected to Local MongoDB server successfully!`);
      return localConn;
    } catch (localErr) {
      console.log('⚡ Server running in resilient in-memory mode for offline development.');
      return null;
    }
  }

  return null;
};

