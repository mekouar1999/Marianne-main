import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import { Admin } from '../../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const rawUsername = (req.body.username || '').trim();
    const rawPassword = req.body.password || '';
    
    // Case-insensitive match for username (e.g. CES or ces)
    const escapedUsername = rawUsername.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${escapedUsername}$`, 'i') },
    });

    if (!admin || !await bcrypt.compare(rawPassword, admin.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // For simplicity, we'll use a basic session approach
    // In production, consider using JWT or next-auth
    res.setHeader('Set-Cookie', `admin-session=${admin._id}; HttpOnly; Path=/; Max-Age=86400`);
    
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
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login error' });
  }
}