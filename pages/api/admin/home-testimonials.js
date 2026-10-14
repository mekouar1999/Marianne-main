import dbConnect from '../../../lib/mongodb';
import { Admin, HomeTestimonialsContent } from '../../../lib/models';
import { homeDefaults } from '../../../lib/homeDefaults';

const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) throw new Error('Authentication required');
  const admin = await Admin.findById(adminSession);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

const sanitizeTestimonials = (items) =>
  (Array.isArray(items) ? items : []).map((c) => ({
    name: String(c?.name || '').trim(),
    position: String(c?.position || '').trim(),
    company: String(c?.company || '').trim(),
    text: String(c?.text || '').trim(),
    image: String(c?.image || '').trim() || '/Content/LinkedPH.png',
    rating: Number(c?.rating) || 5,
    date: String(c?.date || '').trim(),
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
      const doc = await HomeTestimonialsContent.findOne({ key: 'home-testimonials' }).lean();
      return res.json({
        success: true,
        data: {
          fr: Array.isArray(doc?.fr) ? doc.fr : homeDefaults.fr,
          en: Array.isArray(doc?.en) ? doc.en : homeDefaults.en,
        },
        updatedAt: doc?.updatedAt || null,
      });
    }

    if (req.method === 'PUT') {
      const { fr, en } = req.body || {};
      const doc = await HomeTestimonialsContent.findOneAndUpdate(
        { key: 'home-testimonials' },
        { fr: sanitizeTestimonials(fr), en: sanitizeTestimonials(en), updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: { fr: doc.fr, en: doc.en }, updatedAt: doc.updatedAt });
    }

    if (req.method === 'DELETE') {
      await HomeTestimonialsContent.deleteOne({ key: 'home-testimonials' });
      return res.json({ success: true, data: homeDefaults });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin home testimonials error:', error);
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
