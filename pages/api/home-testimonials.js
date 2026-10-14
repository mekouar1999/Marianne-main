import dbConnect from '../../lib/mongodb';
import { HomeTestimonialsContent } from '../../lib/models';
import { homeDefaults } from '../../lib/homeDefaults';

// Public endpoint: returns the Home testimonials (FR/EN)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const doc = await HomeTestimonialsContent.findOne({ key: 'home-testimonials' }).lean();

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
      success: true,
      data: {
        fr: Array.isArray(doc?.fr) ? doc.fr : homeDefaults.fr,
        en: Array.isArray(doc?.en) ? doc.en : homeDefaults.en,
      },
    });
  } catch (error) {
    console.error('Home testimonials content error:', error);
    return res.json({ success: true, data: homeDefaults });
  }
}
