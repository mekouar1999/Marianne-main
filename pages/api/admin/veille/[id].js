import dbConnect from '../../../../lib/mongodb';
import { Admin, VeillePost } from '../../../../lib/models';
import { ensureHealthyConnection } from '../../../../lib/dbHealthCheck';

const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) throw new Error('Authentication required');

  const isHealthy = await ensureHealthyConnection();
  if (!isHealthy) {
    await dbConnect();
  }

  const adminPromise = Admin.findById(adminSession);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Admin query timeout')), 8000)
  );

  const admin = await Promise.race([adminPromise, timeoutPromise]);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();
    await requireAuth(req);
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  try {
    if (req.method === 'GET') {
      const post = await VeillePost.findById(id).lean();
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post introuvable' });
      }
      return res.status(200).json({ success: true, data: post });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { title, excerpt, summary, content, category, language, published, source, sourceUrl } = req.body || {};

      const existingPost = await VeillePost.findById(id);
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Post introuvable' });
      }

      if (title) existingPost.title = title.trim();
      const textSummary = excerpt !== undefined ? excerpt : summary;
      if (textSummary !== undefined) {
        existingPost.excerpt = textSummary.trim();
        existingPost.summary = textSummary.trim();
      }
      if (content) existingPost.content = content;
      if (category !== undefined) existingPost.category = category.trim() || 'Réglementation';
      if (source !== undefined) existingPost.source = source.trim();
      if (sourceUrl !== undefined) existingPost.sourceUrl = sourceUrl.trim();
      if (language) existingPost.language = language === 'en' ? 'en' : 'fr';

      if (published !== undefined) {
        const isPublished = published === true || published === 'true';
        if (isPublished && !existingPost.publishedAt) {
          existingPost.publishedAt = new Date();
        }
        existingPost.published = isPublished;
      }

      existingPost.updatedAt = new Date();
      await existingPost.save();

      return res.status(200).json({ success: true, data: existingPost });
    }

    if (req.method === 'DELETE') {
      const deleted = await VeillePost.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Post introuvable' });
      }
      return res.status(200).json({ success: true, message: 'Post supprimé avec succès' });
    }

    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Admin Veille [id] API error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors du traitement de la requête',
    });
  }
}
