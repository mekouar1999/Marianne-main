// Simple health check without any database operations
export default async function handler(req, res) {
  const startTime = Date.now();
  
  try {
    // Test 1: Basic API response
    const basicTest = {
      timestamp: new Date().toISOString(),
      method: req.method,
      responseTime: Date.now() - startTime
    };

    res.json({
      success: true,
      message: 'API is responding',
      data: basicTest,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
      responseTime: Date.now() - startTime
    });
  }
}