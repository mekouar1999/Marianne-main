export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    res.setHeader('Set-Cookie', 'admin-session=; HttpOnly; Path=/; Max-Age=0');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout error' });
  }
}