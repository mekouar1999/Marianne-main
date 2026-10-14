import dbConnect from '../../lib/mongodb';
import { FormationContent } from '../../lib/models';
import { formationDefaults } from '../../lib/formationDefaults';

const mergeWithDefaults = (savedList, defaultList) => {
  if (!Array.isArray(savedList) || savedList.length === 0) return defaultList;
  return savedList.map((card, idx) => {
    const def = defaultList.find((d) => d.id === card.id) || defaultList[idx] || {};
    return {
      id: card.id || def.id || `training-${idx + 1}`,
      title: card.title || def.title || '',
      description: card.description || def.description || '',
      duration: card.duration !== undefined && card.duration !== '' ? card.duration : (def.duration || ''),
      targetAudience: card.targetAudience !== undefined && card.targetAudience !== '' ? card.targetAudience : (def.targetAudience || ''),
      prerequisites: card.prerequisites !== undefined && card.prerequisites !== '' ? card.prerequisites : (def.prerequisites || ''),
      objectives: Array.isArray(card.objectives) && card.objectives.length > 0 ? card.objectives : (def.objectives || []),
      details: card.details !== undefined && card.details !== '' ? card.details : (def.details || ''),
    };
  });
};

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
        fr: mergeWithDefaults(doc?.fr, formationDefaults.fr),
        en: mergeWithDefaults(doc?.en, formationDefaults.en),
      },
    });
  } catch (error) {
    console.error('Formation content error:', error);
    return res.json({ success: true, data: formationDefaults });
  }
}
