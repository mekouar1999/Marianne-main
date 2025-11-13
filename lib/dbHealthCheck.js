import mongoose from 'mongoose';

// Health check utility to detect and fix stale connections
export async function ensureHealthyConnection() {
  const maxRetries = 2;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Check connection state
      const state = mongoose.connection.readyState;
      console.log(`MongoDB connection state: ${state} (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)`);

      if (state === 1) {
        // Test if connection is actually working
        await Promise.race([
          mongoose.connection.db.admin().ping(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Ping timeout')), 3000)
          )
        ]);
        
        console.log('Connection health check passed');
        return true;
      }

      if (state === 3 || state === 2) {
        // Connection is in transition, wait a bit
        console.log('Connection in transition, waiting...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      // Connection is down, need to reconnect
      console.log('Connection is down, attempting to reconnect...');
      if (state !== 0) {
        await mongoose.disconnect();
      }
      
      // Clear any cached connections
      global.mongoose = { conn: null, promise: null };
      
      return false; // Caller should reconnect

    } catch (error) {
      console.error(`Health check failed (attempt ${retries + 1}):`, error.message);
      retries++;
      
      if (retries >= maxRetries) {
        throw new Error(`Connection health check failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Try to reset connection
      try {
        await mongoose.disconnect();
      } catch (disconnectError) {
        console.error('Disconnect error:', disconnectError.message);
      }
      
      // Clear cache
      global.mongoose = { conn: null, promise: null };
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return false;
}