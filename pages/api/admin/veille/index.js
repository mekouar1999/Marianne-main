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

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
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
      const posts = await VeillePost.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: posts });
    }

    if (req.method === 'POST') {
      const { title, excerpt, summary, content, category, language, published, source, sourceUrl } = req.body || {};

      const textSummary = (excerpt || summary || '').trim();

      if (!title || !textSummary || !content) {
        return res.status(400).json({
          success: false,
          message: 'Le titre, le résumé et le contenu sont obligatoires.',
        });
      }

      let baseSlug = slugify(title);
      if (!baseSlug) baseSlug = `post-${Date.now()}`;
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (await VeillePost.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      const isPublished = published === true || published === 'true';

      const post = await VeillePost.create({
        title: title.trim(),
        slug: uniqueSlug,
        excerpt: textSummary,
        summary: textSummary,
        content,
        category: (category && category.trim()) || 'Réglementation',
        source: (source && source.trim()) || '',
        sourceUrl: (sourceUrl && sourceUrl.trim()) || '',
        language: language === 'en' ? 'en' : 'fr',
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({ success: true, data: post });
    }

    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Admin Veille API error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors du traitement de la requête',
    });
  }
}
