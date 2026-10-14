import dbConnect from '../../../lib/mongodb';
import { Admin, FormationContent } from '../../../lib/models';
import { formationDefaults } from '../../../lib/formationDefaults';

const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) throw new Error('Authentication required');
  const admin = await Admin.findById(adminSession);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

const sanitizeCards = (cards) =>
  (Array.isArray(cards) ? cards : []).map((c, idx) => ({
    id: String(c?.id || `training-${idx + 1}`).trim(),
    title: String(c?.title || '').trim(),
    description: String(c?.description || '').trim(),
    duration: String(c?.duration || '').trim(),
    targetAudience: String(c?.targetAudience || '').trim(),
    prerequisites: String(c?.prerequisites || '').trim(),
    objectives: (Array.isArray(c?.objectives) ? c.objectives : [])
      .map((o) => String(o || '').trim())
      .filter(Boolean),
    details: String(c?.details || '').trim(),
  }));

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

export default async function handler(req, res) {
  try {
    await dbConnect();
    await requireAuth(req);
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  try {
    if (req.method === 'GET') {
      const doc = await FormationContent.findOne({ key: 'formation-trainings' }).lean();
      return res.json({
        success: true,
        data: {
          fr: mergeWithDefaults(doc?.fr, formationDefaults.fr),
          en: mergeWithDefaults(doc?.en, formationDefaults.en),
        },
        updatedAt: doc?.updatedAt || null,
      });
    }

    if (req.method === 'PUT') {
      const { fr, en } = req.body || {};
      const doc = await FormationContent.findOneAndUpdate(
        { key: 'formation-trainings' },
        { fr: sanitizeCards(fr), en: sanitizeCards(en), updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: { fr: doc.fr, en: doc.en }, updatedAt: doc.updatedAt });
    }

    if (req.method === 'DELETE') {
      await FormationContent.deleteOne({ key: 'formation-trainings' });
      return res.json({ success: true, data: formationDefaults });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin formation error:', error);
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
