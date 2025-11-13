const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import models
const { BlogPost } = require('../lib/models');

// Blog post data - French and English versions
const blogPosts = [
  // French Posts
  {
    title: "Les nouvelles réglementations douanières UE 2024",
    slug: "nouvelles-reglementations-douanieres-ue-2024",
    excerpt: "Découvrez les principales modifications réglementaires qui impactent les opérations d'import/export en 2024 au sein de l'Union européenne.",
    content: `<h2>Introduction</h2>
<p>L'année 2024 marque un tournant important dans la réglementation douanière européenne. Les entreprises doivent s'adapter rapidement aux nouvelles exigences pour maintenir leur conformité.</p>

<h2>Principales modifications</h2>
<h3>1. Renforcement des contrôles de sécurité</h3>
<p>Les autorités douanières européennes ont renforcé leurs protocoles de sécurité, particulièrement pour les marchandises sensibles. Les entreprises doivent désormais fournir des informations détaillées supplémentaires lors du dédouanement.</p>

<h3>2. Digitalisation des procédures</h3>
<p>La dématérialisation des documents douaniers s'accélère. Les déclarations papier deviennent progressivement obsolètes, remplacées par des systèmes électroniques plus efficaces.</p>

<h3>3. Nouvelles règles d'origine</h3>
<p>Les accords commerciaux récents ont modifié les règles d'origine pour plusieurs catégories de produits, impactant directement les droits de douane applicables.</p>

<h2>Impact sur les entreprises</h2>
<p>Ces changements nécessitent une mise à jour des processus internes et une formation des équipes. Il est essentiel de s'adapter rapidement pour éviter les retards et les pénalités.</p>

<h2>Recommandations</h2>
<ul>
<li>Audit des procédures existantes</li>
<li>Formation des équipes opérationnelles</li>
<li>Mise à jour des systèmes informatiques</li>
<li>Consultation d'experts en douane</li>
</ul>

<p>Pour un accompagnement personnalisé dans cette transition, n'hésitez pas à nous contacter.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Réglementation", "Union Européenne", "2024"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    title: "Optimiser ses coûts douaniers : 5 stratégies efficaces",
    slug: "optimiser-couts-douaniers-5-strategies",
    excerpt: "Réduisez significativement vos dépenses douanières grâce à ces cinq stratégies éprouvées par nos experts.",
    content: `<h2>Introduction</h2>
<p>Dans un contexte économique tendu, l'optimisation des coûts douaniers devient cruciale pour maintenir la compétitivité. Voici cinq stratégies testées et approuvées.</p>

<h2>Stratégie 1 : Classification tarifaire optimale</h2>
<p>Une classification précise de vos produits peut réduire considérablement vos droits de douane. Nos experts analysent chaque position tarifaire pour identifier les opportunités d'économies.</p>

<h2>Stratégie 2 : Utilisation des régimes préférentiels</h2>
<p>Les accords de libre-échange offrent de nombreuses possibilités de réduction ou d'exonération des droits. Il est essentiel de maîtriser les règles d'origine pour en bénéficier pleinement.</p>

<h2>Stratégie 3 : Régimes douaniers suspensifs</h2>
<p>L'entrepôt douanier, le perfectionnement actif, ou encore l'admission temporaire permettent de différer ou de réduire les coûts douaniers selon votre activité.</p>

<h2>Stratégie 4 : Négociation de la valeur en douane</h2>
<p>Une approche structurée de la valorisation douanière peut générer des économies substantielles, tout en respectant scrupuleusement la réglementation.</p>

<h2>Stratégie 5 : Automatisation et procédures simplifiées</h2>
<p>Les procédures simplifiées et l'automatisation réduisent les coûts de traitement et minimisent les risques d'erreur.</p>

<h2>Conclusion</h2>
<p>L'application combinée de ces stratégies peut générer des économies de 15 à 30% sur vos coûts douaniers annuels.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Optimisation", "Coûts", "Stratégie"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    title: "Certification OEA : Guide complet 2024",
    slug: "certification-oea-guide-complet-2024",
    excerpt: "Tout ce que vous devez savoir sur la certification OEA (Opérateur Économique Agréé) et ses avantages pour votre entreprise.",
    content: `<h2>Qu'est-ce que la certification OEA ?</h2>
<p>Le statut d'Opérateur Économique Agréé (OEA) est une certification délivrée par les autorités douanières aux entreprises qui respectent des critères stricts de sécurité et de conformité.</p>

<h2>Les avantages de la certification</h2>
<h3>Avantages opérationnels</h3>
<ul>
<li>Contrôles douaniers réduits</li>
<li>Traitement prioritaire des déclarations</li>
<li>Simplification des procédures</li>
<li>Reconnaissance mutuelle internationale</li>
</ul>

<h3>Avantages économiques</h3>
<ul>
<li>Réduction des délais de dédouanement</li>
<li>Diminution des coûts de stockage</li>
<li>Amélioration de la chaîne d'approvisionnement</li>
<li>Avantage concurrentiel</li>
</ul>

<h2>Critères d'éligibilité</h2>
<h3>Antécédents douaniers et fiscaux</h3>
<p>L'entreprise doit démontrer un historique de conformité avec la réglementation douanière et fiscale sur les trois dernières années.</p>

<h3>Système de gestion commerciale</h3>
<p>Mise en place de procédures permettant le contrôle des opérations commerciales et, le cas échéant, des activités de transport.</p>

<h3>Solvabilité financière</h3>
<p>Capacité financière suffisante pour respecter les obligations douanières.</p>

<h3>Normes de sécurité et de sûreté</h3>
<p>Application de normes appropriées de sûreté dans la chaîne logistique internationale.</p>

<h2>Processus de certification</h2>
<ol>
<li><strong>Préparation</strong> : Audit interne et mise en conformité</li>
<li><strong>Dépôt de candidature</strong> : Soumission du dossier complet</li>
<li><strong>Instruction</strong> : Examen par les services douaniers</li>
<li><strong>Contrôle sur site</strong> : Vérification des installations</li>
<li><strong>Décision</strong> : Octroi ou refus motivé</li>
</ol>

<h2>Notre accompagnement</h2>
<p>Customs Engineering Solutions vous accompagne à chaque étape du processus de certification OEA, de l'audit préparatoire à l'obtention de votre agrément.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["OEA", "Certification", "Conformité"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-02-15"),
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15")
  },
  {
    title: "Brexit et commerce : adaptation des flux commerciaux",
    slug: "brexit-commerce-adaptation-flux-commerciaux",
    excerpt: "Comment les entreprises s'adaptent-elles aux nouvelles réalités post-Brexit ? Analyse des impacts et solutions.",
    content: `<h2>Impact du Brexit sur le commerce</h2>
<p>Depuis la sortie effective du Royaume-Uni de l'Union européenne, les entreprises ont dû s'adapter à de nouvelles contraintes douanières et réglementaires.</p>

<h2>Principales modifications</h2>
<h3>Formalités douanières renforcées</h3>
<p>Les échanges avec le Royaume-Uni nécessitent désormais des déclarations douanières complètes, contrairement à la période d'exemption antérieure.</p>

<h3>Nouvelles règles d'origine</h3>
<p>L'accord de commerce et de coopération UE-RU introduit des règles d'origine spécifiques pour bénéficier de tarifs préférentiels.</p>

<h3>Normes et certifications</h3>
<p>Les produits destinés au marché britannique peuvent nécessiter des certifications spécifiques, différentes des normes CE.</p>

<h2>Stratégies d'adaptation</h2>
<h3>Optimisation logistique</h3>
<ul>
<li>Révision des chaînes d'approvisionnement</li>
<li>Mise en place d'entrepôts de stockage stratégiques</li>
<li>Diversification des routes commerciales</li>
</ul>

<h3>Conformité réglementaire</h3>
<ul>
<li>Formation des équipes aux nouvelles procédures</li>
<li>Mise à jour des systèmes informatiques</li>
<li>Partenariat avec des experts douaniers</li>
</ul>

<h2>Opportunités émergentes</h2>
<p>Malgré les défis, le Brexit a également créé de nouvelles opportunités commerciales pour les entreprises agiles et bien préparées.</p>

<h2>Conseils pratiques</h2>
<ol>
<li>Effectuer un audit de vos processus actuels</li>
<li>Identifier les points de friction potentiels</li>
<li>Mettre en place des solutions préventives</li>
<li>Former vos équipes aux nouvelles procédures</li>
</ol>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Brexit", "Commerce international", "Adaptation"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-03-01"),
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },

  // English Posts
  {
    title: "New EU Customs Regulations 2024",
    slug: "new-eu-customs-regulations-2024",
    excerpt: "Discover the main regulatory changes impacting import/export operations in 2024 within the European Union.",
    content: `<h2>Introduction</h2>
<p>2024 marks an important turning point in European customs regulation. Companies must quickly adapt to new requirements to maintain compliance.</p>

<h2>Main Changes</h2>
<h3>1. Enhanced Security Controls</h3>
<p>European customs authorities have strengthened their security protocols, particularly for sensitive goods. Companies must now provide additional detailed information during customs clearance.</p>

<h3>2. Digitalization of Procedures</h3>
<p>The dematerialization of customs documents is accelerating. Paper declarations are gradually becoming obsolete, replaced by more efficient electronic systems.</p>

<h3>3. New Rules of Origin</h3>
<p>Recent trade agreements have modified the rules of origin for several product categories, directly impacting applicable customs duties.</p>

<h2>Impact on Companies</h2>
<p>These changes require updating internal processes and training teams. It is essential to adapt quickly to avoid delays and penalties.</p>

<h2>Recommendations</h2>
<ul>
<li>Audit existing procedures</li>
<li>Train operational teams</li>
<li>Update computer systems</li>
<li>Consult customs experts</li>
</ul>

<p>For personalized support during this transition, please contact us.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Regulation", "European Union", "2024"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    title: "Optimizing Customs Costs: 5 Effective Strategies",
    slug: "optimizing-customs-costs-5-effective-strategies",
    excerpt: "Significantly reduce your customs expenses with these five strategies proven by our experts.",
    content: `<h2>Introduction</h2>
<p>In a tight economic context, optimizing customs costs becomes crucial to maintain competitiveness. Here are five tested and approved strategies.</p>

<h2>Strategy 1: Optimal Tariff Classification</h2>
<p>Precise classification of your products can significantly reduce your customs duties. Our experts analyze each tariff position to identify savings opportunities.</p>

<h2>Strategy 2: Use of Preferential Regimes</h2>
<p>Free trade agreements offer numerous possibilities for reducing or exempting duties. It is essential to master the rules of origin to fully benefit from them.</p>

<h2>Strategy 3: Suspensive Customs Regimes</h2>
<p>Customs warehousing, inward processing, or temporary admission allow deferring or reducing customs costs according to your activity.</p>

<h2>Strategy 4: Customs Value Negotiation</h2>
<p>A structured approach to customs valuation can generate substantial savings while strictly complying with regulations.</p>

<h2>Strategy 5: Automation and Simplified Procedures</h2>
<p>Simplified procedures and automation reduce processing costs and minimize the risk of errors.</p>

<h2>Conclusion</h2>
<p>The combined application of these strategies can generate savings of 15 to 30% on your annual customs costs.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Optimization", "Costs", "Strategy"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    title: "AEO Certification: Complete Guide 2024",
    slug: "aeo-certification-complete-guide-2024",
    excerpt: "Everything you need to know about AEO (Authorized Economic Operator) certification and its benefits for your business.",
    content: `<h2>What is AEO Certification?</h2>
<p>The Authorized Economic Operator (AEO) status is a certification issued by customs authorities to companies that meet strict security and compliance criteria.</p>

<h2>Certification Benefits</h2>
<h3>Operational Advantages</h3>
<ul>
<li>Reduced customs controls</li>
<li>Priority processing of declarations</li>
<li>Simplified procedures</li>
<li>International mutual recognition</li>
</ul>

<h3>Economic Benefits</h3>
<ul>
<li>Reduced customs clearance times</li>
<li>Decreased storage costs</li>
<li>Improved supply chain</li>
<li>Competitive advantage</li>
</ul>

<h2>Eligibility Criteria</h2>
<h3>Customs and Tax Record</h3>
<p>The company must demonstrate a history of compliance with customs and tax regulations over the past three years.</p>

<h3>Commercial Management System</h3>
<p>Implementation of procedures allowing control of commercial operations and, where applicable, transport activities.</p>

<h3>Financial Solvency</h3>
<p>Sufficient financial capacity to meet customs obligations.</p>

<h3>Security and Safety Standards</h3>
<p>Application of appropriate security standards in the international logistics chain.</p>

<h2>Certification Process</h2>
<ol>
<li><strong>Preparation</strong>: Internal audit and compliance</li>
<li><strong>Application Submission</strong>: Complete file submission</li>
<li><strong>Review</strong>: Examination by customs services</li>
<li><strong>Site Inspection</strong>: Facility verification</li>
<li><strong>Decision</strong>: Grant or reasoned refusal</li>
</ol>

<h2>Our Support</h2>
<p>Customs Engineering Solutions supports you at every stage of the AEO certification process, from preparatory audit to obtaining your authorization.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["AEO", "Certification", "Compliance"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-02-15"),
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15")
  },
  {
    title: "Brexit and Trade: Adapting Commercial Flows",
    slug: "brexit-trade-adapting-commercial-flows",
    excerpt: "How are companies adapting to post-Brexit realities? Analysis of impacts and solutions.",
    content: `<h2>Brexit Impact on Trade</h2>
<p>Since the UK's effective exit from the European Union, companies have had to adapt to new customs and regulatory constraints.</p>

<h2>Main Changes</h2>
<h3>Enhanced Customs Formalities</h3>
<p>Trade with the UK now requires complete customs declarations, unlike the previous exemption period.</p>

<h3>New Rules of Origin</h3>
<p>The EU-UK Trade and Cooperation Agreement introduces specific rules of origin to benefit from preferential tariffs.</p>

<h3>Standards and Certifications</h3>
<p>Products destined for the British market may require specific certifications, different from CE standards.</p>

<h2>Adaptation Strategies</h2>
<h3>Logistics Optimization</h3>
<ul>
<li>Supply chain revision</li>
<li>Strategic storage warehouse implementation</li>
<li>Commercial route diversification</li>
</ul>

<h3>Regulatory Compliance</h3>
<ul>
<li>Team training on new procedures</li>
<li>Computer system updates</li>
<li>Partnership with customs experts</li>
</ul>

<h2>Emerging Opportunities</h2>
<p>Despite challenges, Brexit has also created new commercial opportunities for agile and well-prepared companies.</p>

<h2>Practical Advice</h2>
<ol>
<li>Conduct an audit of your current processes</li>
<li>Identify potential friction points</li>
<li>Implement preventive solutions</li>
<li>Train your teams on new procedures</li>
</ol>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Brexit", "International Trade", "Adaptation"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-03-01"),
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },
  {
    title: "Digital Transformation in Customs: Trends 2024",
    slug: "digital-transformation-customs-trends-2024",
    excerpt: "Explore how digital technologies are revolutionizing customs operations and what it means for your business.",
    content: `<h2>The Digital Revolution in Customs</h2>
<p>The customs industry is undergoing a significant digital transformation, driven by technological advances and the need for more efficient processes.</p>

<h2>Key Digital Trends</h2>
<h3>1. Artificial Intelligence and Machine Learning</h3>
<p>AI technologies are being deployed for risk assessment, fraud detection, and automated classification of goods, making customs processes faster and more accurate.</p>

<h3>2. Blockchain Technology</h3>
<p>Blockchain ensures transparency and traceability in supply chains, providing immutable records of goods movement and reducing documentation fraud.</p>

<h3>3. Internet of Things (IoT)</h3>
<p>IoT devices enable real-time tracking of containers and goods, providing valuable data for customs authorities and improving security.</p>

<h3>4. Cloud-Based Solutions</h3>
<p>Cloud platforms offer scalable solutions for customs data management, enabling better collaboration between stakeholders.</p>

<h2>Benefits for Businesses</h2>
<ul>
<li>Faster customs clearance</li>
<li>Reduced compliance costs</li>
<li>Improved accuracy in declarations</li>
<li>Enhanced supply chain visibility</li>
<li>Better risk management</li>
</ul>

<h2>Implementation Challenges</h2>
<h3>Technical Integration</h3>
<p>Integrating new digital solutions with existing systems requires careful planning and technical expertise.</p>

<h3>Staff Training</h3>
<p>Employees need training to effectively use new digital tools and understand changing processes.</p>

<h3>Data Security</h3>
<p>Protecting sensitive trade data becomes increasingly important as digitalization expands.</p>

<h2>Future Outlook</h2>
<p>The pace of digital transformation in customs will continue to accelerate, with new technologies emerging to further streamline international trade.</p>

<h2>How We Can Help</h2>
<p>Our team stays at the forefront of these technological developments, helping clients navigate the digital transformation and leverage new opportunities for efficiency gains.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Digital Transformation", "Technology", "Innovation"],
    language: "en",
    published: true,
    publishedAt: new Date("2024-03-15"),
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15")
  },
  {
    title: "Transformation numérique en douane : Tendances 2024",
    slug: "transformation-numerique-douane-tendances-2024",
    excerpt: "Découvrez comment les technologies numériques révolutionnent les opérations douanières et leur impact sur votre entreprise.",
    content: `<h2>La révolution numérique en douane</h2>
<p>Le secteur douanier connaît une transformation numérique importante, portée par les avancées technologiques et le besoin de processus plus efficaces.</p>

<h2>Principales tendances numériques</h2>
<h3>1. Intelligence artificielle et apprentissage automatique</h3>
<p>Les technologies IA sont déployées pour l'évaluation des risques, la détection de fraudes et la classification automatisée des marchandises, rendant les processus douaniers plus rapides et précis.</p>

<h3>2. Technologie blockchain</h3>
<p>La blockchain assure la transparence et la traçabilité dans les chaînes d'approvisionnement, fournissant des enregistrements immuables des mouvements de marchandises.</p>

<h3>3. Internet des objets (IoT)</h3>
<p>Les dispositifs IoT permettent le suivi en temps réel des conteneurs et marchandises, fournissant des données précieuses aux autorités douanières.</p>

<h3>4. Solutions cloud</h3>
<p>Les plateformes cloud offrent des solutions évolutives pour la gestion des données douanières, permettant une meilleure collaboration entre les parties prenantes.</p>

<h2>Avantages pour les entreprises</h2>
<ul>
<li>Dédouanement plus rapide</li>
<li>Réduction des coûts de conformité</li>
<li>Amélioration de la précision des déclarations</li>
<li>Visibilité accrue de la chaîne d'approvisionnement</li>
<li>Meilleure gestion des risques</li>
</ul>

<h2>Défis de mise en œuvre</h2>
<h3>Intégration technique</h3>
<p>L'intégration de nouvelles solutions numériques avec les systèmes existants nécessite une planification minutieuse et une expertise technique.</p>

<h3>Formation du personnel</h3>
<p>Les employés ont besoin de formation pour utiliser efficacement les nouveaux outils numériques et comprendre les processus changeants.</p>

<h3>Sécurité des données</h3>
<p>La protection des données commerciales sensibles devient de plus en plus importante avec l'expansion de la numérisation.</p>

<h2>Perspectives d'avenir</h2>
<p>Le rythme de la transformation numérique en douane continuera de s'accélérer, avec de nouvelles technologies émergentes pour rationaliser davantage le commerce international.</p>

<h2>Comment nous pouvons vous aider</h2>
<p>Notre équipe reste à la pointe de ces développements technologiques, aidant nos clients à naviguer dans la transformation numérique et à tirer parti des nouvelles opportunités d'efficacité.</p>`,
    image: "/uploads/default-blog.jpg",
    categories: ["Transformation numérique", "Technologie", "Innovation"],
    language: "fr",
    published: true,
    publishedAt: new Date("2024-03-15"),
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15")
  }
];

async function connectToDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }

    const opts = {
      bufferCommands: false,
    };

    await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

async function seedBlogPosts() {
  try {
    console.log('Starting blog post seeding...');
    
    // Connect to database
    await connectToDatabase();
    
    // Clear existing blog posts (optional - remove if you want to keep existing posts)
    console.log('Clearing existing blog posts...');
    await BlogPost.deleteMany({});
    
    // Insert new blog posts
    console.log('Inserting new blog posts...');
    const insertedPosts = await BlogPost.insertMany(blogPosts);
    
    console.log(`Successfully seeded ${insertedPosts.length} blog posts:`);
    insertedPosts.forEach(post => {
      console.log(`- ${post.title} (${post.language})`);
    });
    
    // Display summary
    const frenchPosts = insertedPosts.filter(post => post.language === 'fr').length;
    const englishPosts = insertedPosts.filter(post => post.language === 'en').length;
    
    console.log(`\nSummary:`);
    console.log(`- French posts: ${frenchPosts}`);
    console.log(`- English posts: ${englishPosts}`);
    console.log(`- Total posts: ${insertedPosts.length}`);
    
  } catch (error) {
    console.error('Error seeding blog posts:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding script
if (require.main === module) {
  seedBlogPosts();
}

module.exports = { seedBlogPosts, blogPosts };