import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Check if we already have a working connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Clear any stale connections
  if (mongoose.connection.readyState !== 0) {
    console.log('Closing stale connection...');
    await mongoose.disconnect();
  }

  // Reset cache if connection failed
  if (cached.promise && mongoose.connection.readyState === 3) {
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // 8 seconds - aggressive
      socketTimeoutMS: 15000, // 15 seconds - much shorter
      connectTimeoutMS: 8000, // 8 seconds
      maxPoolSize: 5,
      retryWrites: true,
      w: 'majority'
    };

    console.log('Creating new MongoDB connection with aggressive timeouts...');
    
    cached.promise = Promise.race([
      mongoose.connect(MONGODB_URI, opts),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB connection timeout after 10 seconds')), 10000)
      )
    ]).then((mongoose) => {
      console.log('MongoDB connected successfully, state:', mongoose.connection.readyState);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Verify connection is actually working
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB ping successful');
    
  } catch (e) {
    console.error('MongoDB connection failed:', e.message);
    cached.promise = null;
    cached.conn = null;
    throw new Error(`Database connection failed: ${e.message}`);
  }

  return cached.conn;
}

export default dbConnect;