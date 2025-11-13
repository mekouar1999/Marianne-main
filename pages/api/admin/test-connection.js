import dbConnect from '../../../lib/mongodb';
import { Admin, BlogPost } from '../../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Testing database connection...');
    
    // Test database connection
    await dbConnect();
    console.log('Database connected successfully');
    
    // Test admin authentication
    const adminSession = req.cookies['admin-session'];
    console.log('Admin session:', adminSession ? 'exists' : 'missing');
    
    if (adminSession) {
      const admin = await Admin.findById(adminSession);
      console.log('Admin found:', admin ? admin.username : 'none');
    }
    
    // Test blog post query
    const postCount = await BlogPost.countDocuments();
    console.log('Blog posts count:', postCount);
    
    res.json({
      success: true,
      message: 'Connection test successful',
      data: {
        databaseConnected: true,
        adminAuthenticated: !!adminSession,
        postCount
      }
    });
    
  } catch (error) {
    console.error('Connection test error:', error);
    res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: error.message
    });
  }
}