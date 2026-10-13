import dbConnect from '../../../lib/mongodb';
import { VeillePost } from '../../../lib/models';
import { FALLBACK_VEILLE_POSTS } from './index';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ success: false, message: 'Slug requis' });
  }

  try {
    await dbConnect();

    const post = await VeillePost.findOne({
      slug: slug.toLowerCase(),
      published: true,
    }).lean();

    if (post) {
      return res.status(200).json({ success: true, data: post });
    }

    // Check fallback posts
    const fallbackPost = FALLBACK_VEILLE_POSTS.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase()
    );

    if (fallbackPost) {
      return res.status(200).json({ success: true, data: fallbackPost });
    }

    return res.status(404).json({ success: false, message: 'Post réglementaire non trouvé' });
  } catch (error) {
    console.error('Public Veille [slug] API error:', error);
    const fallbackPost = FALLBACK_VEILLE_POSTS.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase()
    );
    if (fallbackPost) {
      return res.status(200).json({ success: true, data: fallbackPost });
    }
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
