import dbConnect from '../../../lib/mongodb';
import { Admin, ExperienceContent } from '../../../lib/models';
import { experienceDefaults } from '../../../lib/experienceDefaults';

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
    results: (Array.isArray(c?.results) ? c.results : [])
      .map((r) => String(r || '').trim())
      .filter(Boolean),
    photo: String(c?.photo || '').trim(),
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
      const doc = await ExperienceContent.findOne({ key: 'experience-testimonials' }).lean();
      return res.json({
        success: true,
        data: {
          fr: doc?.fr?.length ? doc.fr : experienceDefaults.fr,
          en: doc?.en?.length ? doc.en : experienceDefaults.en,
        },
        updatedAt: doc?.updatedAt || null,
      });
    }

    if (req.method === 'PUT') {
      const { fr, en } = req.body || {};
      const doc = await ExperienceContent.findOneAndUpdate(
        { key: 'experience-testimonials' },
        { fr: sanitizeTestimonials(fr), en: sanitizeTestimonials(en), updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: { fr: doc.fr, en: doc.en }, updatedAt: doc.updatedAt });
    }

    if (req.method === 'DELETE') {
      await ExperienceContent.deleteOne({ key: 'experience-testimonials' });
      return res.json({ success: true, data: experienceDefaults });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin experience error:', error);
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
