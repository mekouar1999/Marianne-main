import dbConnect from '../../lib/mongodb';
import { ExperienceContent } from '../../lib/models';
import { experienceDefaults } from '../../lib/experienceDefaults';

// Public endpoint: returns the Experience testimonials (FR/EN)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const doc = await ExperienceContent.findOne({ key: 'experience-testimonials' }).lean();

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
      success: true,
      data: {
        fr: doc?.fr?.length ? doc.fr : experienceDefaults.fr,
        en: doc?.en?.length ? doc.en : experienceDefaults.en,
      },
    });
  } catch (error) {
    console.error('Experience content error:', error);
    return res.json({ success: true, data: experienceDefaults });
  }
}
