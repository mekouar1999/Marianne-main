import dbConnect from '../../lib/mongodb';
import { FormationContent } from '../../lib/models';
import { formationDefaults } from '../../lib/formationDefaults';

// Public endpoint: returns the Formation training cards (FR/EN)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const doc = await FormationContent.findOne({ key: 'formation-trainings' }).lean();

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
      success: true,
      data: {
        fr: doc?.fr?.length ? doc.fr : formationDefaults.fr,
        en: doc?.en?.length ? doc.en : formationDefaults.en,
      },
    });
  } catch (error) {
    console.error('Formation content error:', error);
    return res.json({ success: true, data: formationDefaults });
  }
}
