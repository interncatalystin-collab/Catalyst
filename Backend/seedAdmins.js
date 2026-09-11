import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import User from './models/User.js';

dotenv.config();

export const seedAdmins = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.log('⚠️ Database connection skipped for admin seeding (offline mode).');
      return;
    }

    const adminConfigs = [
      {
        username: 'admin-1',
        email: 'admin1@interncatalyst.org',
        password: process.env.ADMIN1_PASSWORD || 'admin123'
      },
      {
        username: 'admin-2',
        email: 'admin2@interncatalyst.org',
        password: process.env.ADMIN2_PASSWORD || 'admin123'
      },
      {
        username: 'admin-3',
        email: 'admin3@interncatalyst.org',
        password: process.env.ADMIN3_PASSWORD || 'admin123'
      }
    ];

    let createdCount = 0;

    for (const adminData of adminConfigs) {
      const existingUser = await User.findOne({ 
        $or: [{ username: adminData.username }, { email: adminData.email }] 
      });

      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);

        await User.create({
          username: adminData.username,
          email: adminData.email,
          password: hashedPassword,
          role: 'admin'
        });

        createdCount++;
        console.log(`✅ Admin account created: ${adminData.username} (${adminData.email})`);
      } else {
        console.log(`ℹ️ Admin account already exists: ${adminData.username}`);
      }
    }

    console.log(`🎉 Admin initialization complete. New accounts created: ${createdCount}`);
  } catch (error) {
    console.error('❌ Error during admin seeding:', error.message);
  }
};

// Auto-run if main module
if (process.argv[1] && (process.argv[1].includes('seedAdmins.js') || process.argv[1].includes('seedAdmins'))) {
  console.log('🚀 Running Admin Seed Script...');
  seedAdmins().then(() => {
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
    process.exit(0);
  });
}


