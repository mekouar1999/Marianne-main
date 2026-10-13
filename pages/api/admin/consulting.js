import dbConnect from '../../../lib/mongodb';
import { Admin, ConsultingContent } from '../../../lib/models';
import { consultingDefaults } from '../../../lib/consultingDefaults';

const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) throw new Error('Authentication required');
  const admin = await Admin.findById(adminSession);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

const sanitizeCards = (cards) =>
  (Array.isArray(cards) ? cards : []).map((c) => ({
    title: String(c?.title || '').trim(),
    description: String(c?.description || '').trim(),
    features: (Array.isArray(c?.features) ? c.features : [])
      .map((f) => String(f || '').trim())
      .filter(Boolean),
    color: String(c?.color || ''),
  }));

export default async function handler(req, res) {
  try {
    await dbConnect();
    await requireAuth(req);
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  try {
    if (req.method === 'GET') {
      const doc = await ConsultingContent.findOne({ key: 'consulting-services' }).lean();
      return res.json({
        success: true,
        data: {
          fr: doc?.fr?.length ? doc.fr : consultingDefaults.fr,
          en: doc?.en?.length ? doc.en : consultingDefaults.en,
        },
        updatedAt: doc?.updatedAt || null,
      });
    }

    if (req.method === 'PUT') {
      const { fr, en } = req.body || {};
      const doc = await ConsultingContent.findOneAndUpdate(
        { key: 'consulting-services' },
        { fr: sanitizeCards(fr), en: sanitizeCards(en), updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: { fr: doc.fr, en: doc.en }, updatedAt: doc.updatedAt });
    }

    if (req.method === 'DELETE') {
      // Reset to default content
      await ConsultingContent.deleteOne({ key: 'consulting-services' });
      return res.json({ success: true, data: consultingDefaults });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin consulting error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};
