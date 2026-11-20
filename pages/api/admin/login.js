import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import { Admin } from '../../../lib/models';

const sanitizeText = (value = '') =>
  String(value)
    .replace(/[\u200B-\u200D\uFEFF\u200E\u200F\u202A-\u202E\u2060-\u206F]/g, '')
    .replace(/\u00A0/g, ' ')
    .trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const rawUsername = sanitizeText(body.username || '');
    const rawPassword = String(body.password || '');
    const cleanedPassword = sanitizeText(rawPassword);

    if (!rawUsername || !cleanedPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Case-insensitive match for username (e.g. CES or ces, Fruser or fruser)
    const escapedUsername = rawUsername.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const admin = await Admin.findOne({
      username: { $regex: new RegExp(`^\\s*${escapedUsername}\\s*$`, 'i') },
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Build password candidates to handle mobile keyboard quirks:
    // - trailing/leading whitespace or invisible copy-paste characters
    // - mobile auto-capitalization of the first character
    const firstChar = cleanedPassword.charAt(0);
    const toggledFirstCharPassword =
      firstChar
        ? (firstChar === firstChar.toUpperCase() ? firstChar.toLowerCase() : firstChar.toUpperCase()) +
          cleanedPassword.slice(1)
        : cleanedPassword;

    const passwordCandidates = [...new Set([rawPassword, cleanedPassword, toggledFirstCharPassword])].filter(Boolean);

    let isPasswordValid = false;
    for (const candidate of passwordCandidates) {
      if (await bcrypt.compare(candidate, admin.password)) {
        isPasswordValid = true;
        break;
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Session cookie compatible with desktop and mobile browsers
    res.setHeader('Set-Cookie', `admin-session=${admin._id}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);
    
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