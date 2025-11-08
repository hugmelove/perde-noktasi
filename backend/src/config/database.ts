import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Database connected:', conn.connection.host);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
