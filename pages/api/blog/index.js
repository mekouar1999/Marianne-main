import dbConnect from '../../../lib/mongodb';
import { BlogPost, Admin } from '../../../lib/models';

const FALLBACK_POSTS = [
  {
    _id: "fb-1",
    title: "Les nouvelles réglementations douanières UE 2024",
    slug: "nouvelles-reglementations-douanieres-ue-2024",
    excerpt: "Découvrez les principales modifications réglementaires qui impactent les opérations d'import/export en 2024 au sein de l'Union européenne.",
    content: "<h2>Introduction</h2><p>L'année 2024 marque un tournant important dans la réglementation douanière européenne. Les entreprises doivent s'adapter rapidement aux nouvelles exigences pour maintenir leur conformité.</p>",
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
    content: "<h2>Introduction</h2><p>Dans un contexte économique tendu, l'optimisation des coûts douaniers devient cruciale pour maintenir la compétitivité. Voici cinq stratégies testées et approuvées.</p>",
    image: "/uploads/default-blog.jpg",
    categories: ["Optimisation", "Coûts", "Stratégie"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01")
  },
  {
    _id: "fb-3",
    title: "Certification OEA : Guide complet 2024",
    slug: "certification-oea-guide-complet-2024",
    excerpt: "Tout ce que vous devez savoir sur la certification OEA (Opérateur Économique Agréé) et ses avantages pour votre entreprise.",
    content: "<h2>Qu'est-ce que la certification OEA ?</h2><p>Le statut d'Opérateur Économique Agréé (OEA) est une certification délivrée par les autorités douanières aux entreprises qui respectent des critères stricts de sécurité et de conformité.</p>",
    image: "/uploads/default-blog.jpg",
    categories: ["OEA", "Certification", "Conformité"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-02-15"),
    createdAt: new Date("2024-02-15")
  },
  {
    _id: "fb-4",
    title: "Brexit et commerce : adaptation des flux commerciaux",
    slug: "brexit-commerce-adaptation-flux-commerciaux",
    excerpt: "Comment les entreprises s'adaptent-elles aux nouvelles réalités post-Brexit ? Analyse des impacts et solutions.",
    content: "<h2>Impact du Brexit sur le commerce</h2><p>Depuis la sortie effective du Royaume-Uni de l'Union européenne, les entreprises ont dû s'adapter à de nouvelles contraintes douanières et réglementaires.</p>",
    image: "/uploads/default-blog.jpg",
    categories: ["Brexit", "Commerce international", "Adaptation"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-03-01"),
    createdAt: new Date("2024-03-01")
  },
  {
    _id: "fb-5",
    title: "New EU Customs Regulations 2024",
    slug: "new-eu-customs-regulations-2024",
    excerpt: "Discover the main regulatory changes impacting import/export operations in 2024 within the European Union.",
    content: "<h2>Introduction</h2><p>2024 marks an important turning point in European customs regulation. Companies must quickly adapt to new requirements to maintain compliance.</p>",
    image: "/uploads/default-blog.jpg",
    categories: ["Regulation", "European Union", "2024"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15")
  },
  {
    _id: "fb-6",
    title: "Optimizing Customs Costs: 5 Effective Strategies",
    slug: "optimizing-customs-costs-5-effective-strategies",
    excerpt: "Significantly reduce your customs expenses with these five strategies proven by our experts.",
    content: "<h2>Introduction</h2><p>In a tight economic context, optimizing customs costs becomes crucial to maintain competitiveness.</p>",
    image: "/uploads/default-blog.jpg",
    categories: ["Optimization", "Costs", "Strategy"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01")
  }
];

// Authentication check for admin access
const checkAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) {
    return false;
  }
  
  try {
    await dbConnect();
    const admin = await Admin.findById(adminSession);
    return !!admin;
  } catch (error) {
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { language = 'fr', published = 'true' } = req.query;

  try {
    await dbConnect();
    const query = { language };
    
    // Security check: Only allow unpublished posts for authenticated admin users
    if (published === 'false') {
      const isAuthenticated = await checkAuth(req);
      if (!isAuthenticated) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required to access unpublished posts' 
        });
      }
      query.published = false;
    } else {
      query.published = true;
    }
    
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .select('-content -imageData.data');
      
    const postsWithImages = posts.map(post => {
      const postObj = post.toObject();
      if (postObj.imageData && !postObj.imageData.data) {
        postObj.image = `/api/images/${postObj._id}`;
      }
      return postObj;
    });

    if (postsWithImages.length > 0) {
      return res.json({ success: true, data: postsWithImages });
    }

    // Fallback if db is empty
    const filteredFallback = FALLBACK_POSTS.filter(
      (p) => p.language === language && (published === 'true' ? p.published : !p.published)
    );
    return res.json({ success: true, data: filteredFallback });
  } catch (error) {
    console.error('Blog DB fetch error, serving fallback data:', error.message);
    const filteredFallback = FALLBACK_POSTS.filter(
      (p) => p.language === language && (published === 'true' ? p.published : !p.published)
    );
    return res.json({ success: true, data: filteredFallback });
  }
}