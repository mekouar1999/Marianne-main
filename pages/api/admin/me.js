import dbConnect from '../../../lib/mongodb';
import { Admin } from '../../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const adminSession = req.cookies['admin-session'];
    if (!adminSession) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    
    const admin = await Admin.findById(adminSession);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }
    
    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Authentication error' });
  }
}