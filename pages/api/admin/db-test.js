import mongoose from 'mongoose';

export default async function handler(req, res) {
  const startTime = Date.now();
  const results = {};
  
  try {
    // Test 1: Check if already connected
    results.step1_initialState = {
      mongooseReadyState: mongoose.connection.readyState,
      timestamp: Date.now() - startTime
    };

    // Test 2: Try direct connection with aggressive timeout
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found');
    }

    results.step2_uriCheck = {
      hasUri: true,
      uriLength: MONGODB_URI.length,
      timestamp: Date.now() - startTime
    };

    // Test 3: Connection with very short timeout
    const connectionPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds only
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      bufferCommands: false,
      maxPoolSize: 1
    });

    // Race against timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout after 8 seconds')), 8000)
    );

    await Promise.race([connectionPromise, timeoutPromise]);
    
    results.step3_connection = {
      connected: true,
      readyState: mongoose.connection.readyState,
      timestamp: Date.now() - startTime
    };

    // Test 4: Simple query
    const queryPromise = mongoose.connection.db.admin().ping();
    const queryTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout after 3 seconds')), 3000)
    );

    await Promise.race([queryPromise, queryTimeoutPromise]);
    
    results.step4_query = {
      pingSuccessful: true,
      timestamp: Date.now() - startTime
    };

    res.json({
      success: true,
      message: 'Database connection test completed',
      totalTime: Date.now() - startTime,
      results
    });

  } catch (error) {
    results.error = {
      message: error.message,
      timestamp: Date.now() - startTime,
      mongooseState: mongoose.connection.readyState
    };

    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message,
      totalTime: Date.now() - startTime,
      results
    });
  }
}