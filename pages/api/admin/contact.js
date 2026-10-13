import dbConnect from '../../../lib/mongodb';
import { Admin, Contact } from '../../../lib/models';

const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) throw new Error('Authentication required');
  const admin = await Admin.findById(adminSession);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

export default async function handler(req, res) {
  try {
    await dbConnect();
    await requireAuth(req);
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  try {
    if (req.method === 'GET') {
      const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
      return res.json({ success: true, data: contacts });
    }

    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (!id || !status) {
        return res.status(400).json({ success: false, message: 'ID et statut requis' });
      }
      const updated = await Contact.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
      ).lean();
      return res.json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'ID requis' });
      }
      await Contact.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Message supprimé' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin contact error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
