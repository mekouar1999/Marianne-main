// Default Formation page training cards and modal details (used when nothing is saved in the database yet)
export const formationDefaults = {
  fr: [
    {
      id: "douane-operations",
      title: "La douane",
      description:
        "Opération d'import/export opérationnelles et réglementaires. Orientée pratiques terrain.",
      duration: "1 à 2 jours (7h à 14h) — Présentiel ou distanciel",
      targetAudience: "Collaborateurs ADV, logistique, achats, déclarants en douane et compliance.",
      prerequisites: "Aucun prérequis spécifique. Connaissance générale du commerce international appréciée.",
      objectives: [
        "Comprendre les fondamentaux de la réglementation douanière et le rôle de l'administration",
        "Maîtriser les étapes d'une déclaration en douane à l'import et à l'export (Delta G / Delta IE)",
        "Identifier et gérer les risques fiscaux et douaniers liés aux flux de marchandises",
        "Optimiser ses processus déclaratifs et ses coûts de passage en frontière",
      ],
      details: `Module 1 : L'environnement douanier et le cadre réglementaire
• Les missions de la douane française et européenne (Code des Douanes de l'Union - CDU)
• Le statut d'Opérateur Économique Agréé (OEA) et ses avantages concurrentiels
• La responsabilité juridique de l'importateur, de l'exportateur et du déclarant

Module 2 : La mécanique opérationnelle de dédouanement
• La déclaration en douane : fonctionnement, documents obligatoires (DAU, facture commerciale, packing list)
• Les circuits de dédouanement (vert, orange, rouge) et les contrôles documentaires / physiques
• La liquidation douanière : calcul des droits de douane et de la TVA à l'importation

Module 3 : Les régimes douaniers particuliers
• Le perfectionnement actif et passif
• L'entrepôt douanier et le transit international (NCTS / T1, T2)
• L'admission temporaire et le carnet ATA

Module 4 : Cas pratiques & gestion des contrôles
• Audit de conformité des déclarations reçues de vos transitaires / RDE
• Gestion des rectifications, des contestations et des contentieux simples`,
    },
    {
      id: "classification",
      title: "La classification douanière",
      description:
        "Comprendre l'origine d'un produit et sa valeur, soit les fondamentaux douaniers.",
      duration: "1 jour (7h) — Pratique et interactif",
      targetAudience: "Gestionnaires supply chain, acheteurs, ingénieurs méthodes, équipes conformité douanière.",
      prerequisites: "Notions de base sur les flux import/export.",
      objectives: [
        "Maîtriser l'arborescence du Système Harmonisé (SH6), du Tarif Intégré (TARIC) et du code nomenclature",
        "Appliquer rigoureusement les Règles Générales Interprétatives (RGI 1 à 6)",
        "Déterminer la valeur en douane et l'origine (préférentielle et non préférentielle) d'un produit",
        "Sécuriser ses classements grâce au Renseignement Tarifaire Contraignant (RTC)",
      ],
      details: `Module 1 : Le triptyque fondamental de la douane
• L'Espèce tarifaire (code SH) : structure et enjeu financier des droits de douane
• L'Origine : différence clé entre provenance géographique, origine non préférentielle et origine préférentielle (accords de libre-échange)
• La Valeur en douane : méthode transactionnelle, frais à ajouter ou déduire (transport, assurances, redevances)

Module 2 : Méthodologie du classement tarifaire
• Les 6 Règles Générales Interprétatives (RGI) expliquées avec exemples concrets
• L'utilisation des notes de sections, de chapitres et des notes explicatives du SH
• Cas particuliers : assortiments, marchandises composites, emballages et pièces détachées

Module 3 : Sécurisation et outils officiels
• Consultation des bases RITA (France) et TARIC / EBTI (Union européenne)
• Préparer et déposer une demande de RTC (Renseignement Tarifaire Contraignant)
• Mettre en place un catalogue douanier interne pérenne`,
    },
    {
      id: "incoterms",
      title: "Les incoterms",
      description:
        "Être capable de choisir le bon règlement entre acheteur et vendeur lors d'échanges internationaux.",
      duration: "1 jour (7h) — Adapté à vos contrats",
      targetAudience: "Commerciaux export, acheteurs internationaux, ADV, coordinateurs transport & logistique.",
      prerequisites: "Aucun prérequis.",
      objectives: [
        "Comprendre le rôle juridique et pratique des règles Incoterms® 2020 de la CCI",
        "Distinguer clairement le transfert des frais et le transfert des risques",
        "Choisir l'Incoterm le plus adapté à chaque mode de transport (multimodal vs maritime)",
        "Éviter les pièges fréquents dans les contrats commerciaux et la valorisation douanière",
      ],
      details: `Module 1 : Fondements des Incoterms® 2020
• Qu'est-ce qu'un Incoterm et que régit-il (et ce qu'il ne régit pas !)
• Les 4 familles d'Incoterms : E (départ), F (transport principal non acquitté), C (transport principal acquitté), D (arrivée)
• Les nouveautés Incoterms® 2020 (DPU remplace DAT, options B/L pour FCA, niveaux d'assurance CIP/CIF)

Module 2 : Analyse détaillée des 11 règles
• Règles multimodales : EXW, FCA, CPT, CIP, DAP, DPU, DDP
• Règles maritimes pures : FAS, FOB, CFR, CIF
• Focus sur FCA vs EXW : pourquoi éviter le EXW à l'export ?
• Focus sur DDP : les obligations fiscales et douanières de l'expéditeur

Module 3 : Impact des Incoterms sur la douane et la facturation
• Comment l'Incoterm détermine la valeur en douane à l'importation
• Incoterms et justificatifs fiscaux d'exonération de TVA à l'export
• Ateliers pratiques : simulations de négociation et cas d'études réels`,
    },
    {
      id: "accise",
      title: "Les droits d'accise",
      description:
        "Comprendre la taxation des alcools, tabacs, pétroles et dérivés.",
      duration: "1 à 2 jours (selon secteur d'activité)",
      targetAudience: "Responsables douane & accises, directeurs financiers, comptables, logisticiens du secteur des produits soumis à accises (vins, spiritueux, bières, huiles minérales, etc.).",
      prerequisites: "Bases en comptabilité ou en gestion logistique commerciale.",
      objectives: [
        "Maîtriser le mécanisme des droits indirects et de la fiscalité des produits soumis à accise",
        "Gérer les statuts d'entrepositaire agréé et de destinataire enregistré",
        "Piloter la circulation des produits sous droits acquittés ou en suspension de droits (EMCS / GAMMA)",
        "Sécuriser la comptabilité matières et les déclarations récapitulatives mensuelles (DRM / CIEL)",
      ],
      details: `Module 1 : Le régime général des droits d'accise
• Champ d'application : alcools et boissons alcooliques, produits énergétiques, tabacs
• Le fait générateur et l'exigibilité de l'accise
• Les différents taux applicables, cotisations sécurité sociale et vignettes fiscales

Module 2 : Les statuts des opérateurs économiques
• L'Entrepositaire Agréé (EA) : conditions d'agrément, garanties financières et obligations
• Les statuts d'Expéditeur et Destinataire Enregistré
• Les exonérations et franchises applicables

Module 3 : La circulation des produits soumis à accises
• Mouvements en suspension de droits : fonctionnement du système EMCS / GAMMA
• Le document administratif électronique (e-AD / DAE) et l'apurement du document
• Mouvements en droits acquittés (DSA / e-SAD) et demandes de remboursement

Module 4 : La tenue de la comptabilité matières et contrôles
• Obligations de tenue des registres d'entrées et de sorties
• Déclaration Récapitulative Mensuelle (DRM) sur le portail CIEL
• Préparation et sécurisation face aux contrôles de la douane / DGDDI`,
    },
  ],
  en: [
    {
      id: "douane-operations",
      title: "Customs",
      description:
        "Operational and regulatory import/export operations. Field practice oriented.",
      duration: "1 to 2 days (7h to 14h) — On-site or remote",
      targetAudience: "Sales administration, supply chain, logistics, procurement, customs brokers.",
      prerequisites: "No specific prerequisites. General international trade knowledge helpful.",
      objectives: [
        "Understand the fundamentals of customs regulations and the role of administration",
        "Master the steps of import and export customs declarations",
        "Identify and mitigate customs and tax risks related to goods flows",
        "Optimize clearance lead times and border crossing costs",
      ],
      details: `Module 1: The Customs Environment and Legal Framework
• Union Customs Code (UCC) key principles and operator obligations
• Authorized Economic Operator (AEO) status and trade benefits
• Legal liabilities of importers, exporters and customs representatives

Module 2: Operational Customs Clearance
• Customs declarations: procedure, required documentation (commercial invoice, packing list, transport documents)
• Risk profiling channels (green, yellow, red) and physical/documentary controls
• Customs debt calculation: duty assessment and import VAT

Module 3: Special Customs Procedures
• Inward and outward processing reliefs
• Customs warehousing and transit procedures (NCTS / T1, T2)
• Temporary admission and ATA Carnet

Module 4: Case Studies and Compliance Audits
• Post-clearance audits of declarations provided by freight forwarders
• Handling regularizations and administrative dispute procedures`,
    },
    {
      id: "classification",
      title: "Customs classification",
      description:
        "Understanding the origin of a product and its value, the customs fundamentals.",
      duration: "1 day (7h) — Interactive workshop",
      targetAudience: "Supply chain managers, buyers, methods engineers, customs compliance teams.",
      prerequisites: "Basic knowledge of import/export flows.",
      objectives: [
        "Master the Harmonized System (HS6), Combined Nomenclature (CN8) and TARIC structures",
        "Strictly apply General Interpretative Rules (GIR 1 to 6)",
        "Determine customs valuation and rules of origin (preferential vs non-preferential)",
        "Secure classifications with Binding Tariff Information (BTI)",
      ],
      details: `Module 1: The Customs Triptych
• Tariff classification (HS code): structure, duty rate impacts
• Origin: origin vs provenance, non-preferential rules, free trade agreements (preferential origin)
• Customs valuation: transaction value method, additions/deductions (freight, insurance, royalties)

Module 2: Classification Methodology
• 6 General Rules for the Interpretation of the Harmonized System with real cases
• Section and Chapter legal notes, HS Explanatory Notes
• Complex cases: sets, composite goods, spare parts, packaging

Module 3: Security & Official Tools
• European TARIC and national customs databases (RITA)
• Filing a Binding Tariff Information (BTI) application
• Setting up and maintaining an internal customs item catalog`,
    },
    {
      id: "incoterms",
      title: "Incoterms",
      description:
        "Being able to choose the right settlement between buyer and seller during international exchanges.",
      duration: "1 day (7h) — Practical & tailored",
      targetAudience: "Export sales, international procurement, customer service, freight coordinators.",
      prerequisites: "None.",
      objectives: [
        "Master the legal and operational scope of ICC Incoterms® 2020 rules",
        "Clearly distinguish cost transfer from risk transfer",
        "Select the most appropriate Incoterm for each transport mode (multimodal vs sea)",
        "Avoid contractual traps and customs valuation discrepancies",
      ],
      details: `Module 1: Foundations of Incoterms® 2020
• What an Incoterm does and does not cover (title transfer vs risk transfer)
• The 4 groups: E, F, C, D
• Incoterms® 2020 key updates (DPU, FCA bill of lading option, insurance levels)

Module 2: Detailed Review of the 11 Rules
• Multimodal rules: EXW, FCA, CPT, CIP, DAP, DPU, DDP
• Sea & inland waterway rules: FAS, FOB, CFR, CIF
• Focus on FCA vs EXW: why avoid EXW in export contracts
• Focus on DDP: tax and customs obligations on the seller

Module 3: Customs & Financial Impacts
• How Incoterms determine customs value at import
• Incoterms and proof of export for VAT zero-rating
• Practical exercises: contract negotiation scenarios`,
    },
    {
      id: "accise",
      title: "Excise duties",
      description:
        "Understanding the taxation of alcohol, tobacco, petroleum and derivatives.",
      duration: "1 to 2 days (customized by product sector)",
      targetAudience: "Excise managers, CFOs, accountants, logistics managers handling excisable goods (wines, spirits, beers, mineral oils, etc.).",
      prerequisites: "Basic accounting or commercial logistics background.",
      objectives: [
        "Understand indirect taxation mechanisms for excisable products",
        "Manage authorized warehousekeeper and registered consignee statuses",
        "Control duty-suspended and duty-paid movements via EMCS / GAMMA",
        "Secure stock accounting records and monthly excise declarations",
      ],
      details: `Module 1: General Excise Duty Regime
• Scope of application: alcohol, energy products, manufactured tobacco
• Chargeable event and chargeability of excise duty
• Applicable tax rates, social security contributions and tax stamps

Module 2: Economic Operator Statuses
• Authorized Warehousekeeper: approval criteria, financial guarantees, duties
• Registered Consignor and Registered Consignee statuses
• Exemptions and duty reliefs

Module 3: Circulation of Excisable Goods
• Duty-suspension movements: EMCS / GAMMA system operations
• Electronic Administrative Document (e-AD / ARC) and discharge procedures
• Duty-paid movements (e-SAD / fallback DSA) and refund requests

Module 4: Stock Accounting and Audits
• Material balance accounting requirements (comptabilité matières)
• Monthly declarations (DRM / CIEL portal)
• Preparation and risk management for customs audits`,
    },
  ],
};
