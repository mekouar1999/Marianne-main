import dbConnect from '../../../lib/mongodb';
import { BlogPost } from '../../../lib/models';

const FALLBACK_POSTS = [
  {
    _id: "fb-1",
    title: "Les nouvelles réglementations douanières UE 2024",
    slug: "nouvelles-reglementations-douanieres-ue-2024",
    excerpt: "Découvrez les principales modifications réglementaires qui impactent les opérations d'import/export en 2024 au sein de l'Union européenne.",
    content: `<h2>Introduction</h2><p>L'année 2024 marque un tournant important dans la réglementation douanière européenne. Les entreprises doivent s'adapter rapidement aux nouvelles exigences pour maintenir leur conformité.</p><h2>Principales modifications</h2><h3>1. Renforcement des contrôles de sécurité</h3><p>Les autorités douanières européennes ont renforcé leurs protocoles de sécurité, particulièrement pour les marchandises sensibles.</p><h3>2. Digitalisation des procédures</h3><p>La dématérialisation des documents douaniers s'accélère. Les déclarations papier deviennent progressivement obsolètes.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Réglementation", "Union Européenne", "2024"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15")
  },
  {
    _id: "fb-2",
    title: "Optimiser ses coûts douaniers : 5 stratégies efficaces",
    slug: "optimiser-couts-douaniers-5-strategies",
    excerpt: "Réduisez significativement vos dépenses douanières grâce à ces cinq stratégies éprouvées par nos experts.",
    content: `<h2>Introduction</h2><p>Dans un contexte économique tendu, l'optimisation des coûts douaniers devient cruciale. Voici nos 5 stratégies testées et approuvées.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Optimisation", "Coûts", "Stratégie"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01")
  }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    await dbConnect();
    
    const post = await BlogPost.findOne({ 
      slug,
      published: true 
    });
    
    if (post) {
      return res.json({ success: true, data: post });
    }
  } catch (error) {
    console.error('Blog post fetch DB error:', error.message);
  }

  // Fallback search
  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
  if (fallback) {
    return res.json({ success: true, data: fallback });
  }

  return res.status(404).json({ success: false, message: 'Blog post not found' });
}