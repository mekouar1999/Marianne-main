import dbConnect from '../../lib/mongodb';
import { ConsultingContent } from '../../lib/models';
import { consultingDefaults } from '../../lib/consultingDefaults';

// Public endpoint: returns the Consulting service cards (FR/EN)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const doc = await ConsultingContent.findOne({ key: 'consulting-services' }).lean();

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
      success: true,
      data: {
        fr: doc?.fr?.length ? doc.fr : consultingDefaults.fr,
        en: doc?.en?.length ? doc.en : consultingDefaults.en,
      },
    });
  } catch (error) {
    console.error('Consulting content error:', error);
    return res.json({ success: true, data: consultingDefaults });
  }
}
