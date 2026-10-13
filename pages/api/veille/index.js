import dbConnect from '../../../lib/mongodb';
import { VeillePost } from '../../../lib/models';

export const FALLBACK_VEILLE_POSTS = [
  {
    _id: 'vp-1',
    title: 'Code des Douanes de l’Union (CDU) : Réforme majeure et nouveau calendrier',
    slug: 'cdu-reforme-majeure-nouveau-calendrier',
    excerpt: 'Analyse des dernières orientations de la Commission européenne sur la refonte du CDU, la création du Customs Data Hub et l’évolution du statut Trust & Check.',
    content: `
      <h2>La refonte du Code des Douanes de l’Union européenne</h2>
      <p>La Commission européenne a engagé la révision la plus ambitieuse de la réglementation douanière depuis 1968. Cette modernisation vise à harmoniser la surveillance aux frontières et à adapter les flux aux volumes colossaux du commerce numérique mondial.</p>
      
      <h2>1. Le Customs Data Hub européen</h2>
      <p>Au cœur de la réforme, le <strong>Customs Data Hub</strong> remplacera progressivement les systèmes nationaux disparates. Les opérateurs ne déclareront plus leurs marchandises frontière par frontière, mais déposeront leurs informations logistiques et douanières au sein d’un guichet numérique centralisé.</p>
      
      <h2>2. Le statut « Trust & Check » : Au-delà de l'OEA</h2>
      <p>Pour les entreprises les plus transparentes et conformes, un nouveau statut intitulé <strong>Trust & Check</strong> complétera ou succédera aux facilités OEA actuelles. Il permettra la libération immédiate des marchandises avec un minimum d'entraves administratives, en échange d'un accès en temps réel aux données de la chaîne d'approvisionnement.</p>
      
      <h2>3. Fin du seuil d'exonération des 150 € de droits de douane</h2>
      <p>La suppression de la franchise pour les petits colis inférieurs à 150 euros constitue un changement majeur visant à lutter contre la sous-évaluation massive et la concurrence déloyale du e-commerce transfrontalier.</p>

      <h2>Nos recommandations d'experts</h2>
      <p>Anticipez la mise en conformité de vos ERP et cartographiez vos flux de données dès aujourd'hui. L'adaptation progressive est la clé pour éviter toute rupture dans votre chaîne logistique.</p>
    `,
    category: 'Réglementation UE',
    language: 'fr',
    published: true,
    publishedAt: new Date('2026-10-05'),
    createdAt: new Date('2026-10-05'),
  },
  {
    _id: 'vp-2',
    title: 'MACF / CBAM : Entrée dans la phase de déclaration définitive et sanctions associées',
    slug: 'macf-cbam-phase-declaration-definitive',
    excerpt: 'Point d’étape sur le Mécanisme d’Ajustement Carbone aux Frontières : exigences déclaratives d’émissions incorporées, audits et risques de pénalités douanières.',
    content: `
      <h2>Le Mécanisme d’Ajustement Carbone aux Frontières (MACF)</h2>
      <p>Le dispositif carbone européen entre dans une phase cruciale. Les importateurs des secteurs concernés (acier, aluminium, ciment, engrais, hydrogène, électricité) font face à un durcissement des exigences déclaratives.</p>

      <h2>Ce qui change pour les importateurs</h2>
      <ul>
        <li><strong>Fin des valeurs par défaut tolérées :</strong> L’utilisation des valeurs estimatives est désormais strictement encadrée. Les données réelles d’émissions certifiées par les fournisseurs tiers deviennent la règle.</li>
        <li><strong>Contrôles accrus des douanes :</strong> Les services des douanes vérifient scrupuleusement la cohérence entre la nomenclature tarifaire déclarée et le rapport trimestriel MACF.</li>
        <li><strong>Sanctions financières :</strong> Les pénalités pour déclaration erronée ou manquante peuvent atteindre des montants très élevés par tonne de carbone non déclarée.</li>
      </ul>

      <h2>Comment sécuriser vos opérations ?</h2>
      <p>Auditez sans attendre vos fournisseurs hors-UE et formalisez vos clauses contractuelles pour garantir la transmission fluide des données certifiées d'émissions.</p>
    `,
    category: 'Fiscalité & Carbone',
    language: 'fr',
    published: true,
    publishedAt: new Date('2026-09-22'),
    createdAt: new Date('2026-09-22'),
  },
  {
    _id: 'vp-3',
    title: 'Règlement Déforestation (EUDR) : Préparer la conformité douanière et documentaire',
    slug: 'reglement-deforestation-eudr-conformite-douaniere',
    excerpt: 'Diligence raisonnée, géolocalisation des parcelles et numéro de référence de déclaration : décryptage des impératifs douaniers du règlement zéro déforestation.',
    content: `
      <h2>Objectif du règlement européen contre la déforestation</h2>
      <p>Le règlement EUDR interdit la mise sur le marché européen ou l'exportation de produits ayant contribué à la déforestation ou à la dégradation des forêts après le 31 décembre 2020. Sont visés : soja, bœuf, huile de palme, bois, cacao, café, caoutchouc et leurs dérivés.</p>

      <h2>Les 3 piliers de la diligence douanière</h2>
      <ol>
        <li><strong>Données de géolocalisation :</strong> Fournir les coordonnées précises de toutes les parcelles de production associées à chaque lot.</li>
        <li><strong>Déclaration de diligence raisonnée (DDR) :</strong> Soumission préalable sur le système d'information dédié de l'Union européenne pour obtenir un numéro de référence obligatoire au dédouanement.</li>
        <li><strong>Blocage à la frontière en cas d'omission :</strong> Sans référence DDR valide, aucune déclaration douanière d'importation ne peut être validée.</li>
      </ol>

      <h2>Conclusion pratique</h2>
      <p>Ne sous-estimez pas le temps nécessaire à la traçabilité géographique de vos chaînes d'approvisionnement mondiales.</p>
    `,
    category: 'Environnement & Normes',
    language: 'fr',
    published: true,
    publishedAt: new Date('2026-09-10'),
    createdAt: new Date('2026-09-10'),
  },
  {
    _id: 'vp-4',
    title: 'Règles d’origine préférentielle : Modernisation des conventions paneuro-méditerranéennes',
    slug: 'regles-origine-preferentielle-conventions-pem',
    excerpt: 'Les nouvelles règles d’origine PEM révisées facilitent les cumuls et assouplissent les critères de transformation suffisante entre pays partenaires.',
    content: `
      <h2>Modernisation de la zone Pan-Euro-Méditerranéenne (PEM)</h2>
      <p>Les règles transitoires de la convention PEM apportent une souplesse très attendue par les industriels et négociants exportateurs entre l'UE et ses partenaires méditerranéens et de l'AELE.</p>

      <h2>Principales simplifications</h2>
      <p>Parmi les avancées notables figurent l'assouplissement de la tolérance en valeur, la généralisation du principe de non-altération (remplaçant la règle stricte du transport direct) et l'introduction d'un cumul d'origine étendu.</p>
    `,
    category: 'Origine & Accords',
    language: 'fr',
    published: true,
    publishedAt: new Date('2026-08-28'),
    createdAt: new Date('2026-08-28'),
  },
  {
    _id: 'vp-5',
    title: 'Major Customs Union Reform: European Parliament and Council Timeline',
    slug: 'major-customs-union-reform-timeline',
    excerpt: 'A comprehensive briefing on the EU Customs Reform proposal, data hub deployment roadmap, and future operator responsibilities.',
    content: `
      <h2>The New Era of EU Customs Regulations</h2>
      <p>The European Union is redesigning its customs architecture. Businesses will experience fundamental shifts in reporting, governance, and liability.</p>
      <h2>Key Takeaways</h2>
      <p>The elimination of the 150 EUR duty exemption, combined with enhanced platform liability, will redefine trade compliance strategies across the single market.</p>
    `,
    category: 'EU Regulation',
    language: 'en',
    published: true,
    publishedAt: new Date('2026-10-01'),
    createdAt: new Date('2026-10-01'),
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const { language = 'fr', search = '', category = '' } = req.query;

  try {
    await dbConnect();

    const query = {
      published: true,
      language: language === 'en' ? 'en' : 'fr',
    };

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { excerpt: { $regex: new RegExp(search, 'i') } },
      ];
    }

    const posts = await VeillePost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    if (posts && posts.length > 0) {
      return res.status(200).json({ success: true, data: posts });
    }

    // Filter fallback posts
    let filteredFallbacks = FALLBACK_VEILLE_POSTS.filter((p) => p.language === (language === 'en' ? 'en' : 'fr'));
    if (category && category !== 'all') {
      filteredFallbacks = filteredFallbacks.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (search) {
      const q = search.toLowerCase();
      filteredFallbacks = filteredFallbacks.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({ success: true, data: filteredFallbacks });
  } catch (error) {
    console.error('Public Veille API error:', error);
    // Return filtered fallbacks even on DB failure
    const lang = language === 'en' ? 'en' : 'fr';
    return res.status(200).json({
      success: true,
      data: FALLBACK_VEILLE_POSTS.filter((p) => p.language === lang),
    });
  }
}
