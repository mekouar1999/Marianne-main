// frontend/src/contexts/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Complete translations for both French and English
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      consulting: "Consulting",
      formation: "Formation",
      experience: "Expérience client",
      about: "À propos",
      contact: "Contact",
      blog: "Blog",
    },
    hero: {
      title: "Votre partenaire de solutions douanes sur mesure",
      subtitle:
        "Nous accompagnons les entreprises industrielles, commerciales et financières dans leurs démarches douanières et de commerce international au sein de l'Union européenne.<br />Notre expertise s'adresse aux structures ayant des activités transfrontalières de biens et de services.",
      cta: "Assurez votre conformité douanière",
      ctaSecondary: "Accédez à notre programme de formation",
      section1: {
        title: "Sécurisez vos opérations d'import/export",
        description:
          "Que ce soit en prévision d'un contrôle douanier ou simplement pour dérisquer vos opérations d'import/export, vous avez besoin d'un spécialiste à vos côtés qui rentre dans vos process et votre documentation pour garantir les bonnes pratiques en matière douanière. Évitez tout contentieux avec l'administration douanière des pays concernés.",
        cta: "Assurez votre conformité douanière",
      },
      section2: {
        title: "Formation d'opérateurs douane",
        description:
          "La législation douanière est en constante évolution. C'est souvent difficile de rester à la page pour les équipes prises pour l'opérationnel, mais aussi d'intégrer de nouveaux collaborateurs. Nous formons des dizaines d'opérateurs douanes chaque année pour garantir un savoir-faire en conformité avec les dernières contraintes législatives en matière d'import/export.",
        cta: "Accédez à notre programme de formation",
      },
      section3: {
        title: "Optimisez vos flux d'import/export",
        description:
          "Vous souhaitez optimiser financièrement vos opérations ? Vous souhaitez simplifier administrativement vos opérations ? Nous sommes à vos côtés pour optimiser toutes vos opérations d'import/export.",
        cta: "Simplifiez vos démarches dès aujourd'hui",
      },
    },
    services: {
      title: "Nos services",
      subtitle:
        "Des solutions complètes pour optimiser vos opérations douanières",
      consulting: {
        title: "Consulting douanier",
        description:
          "Expertise personnalisée pour optimiser vos procédures douanières et réduire vos coûts.",
        features: [
          "Audit des procédures",
          "Optimisation fiscale",
          "Mise en conformité",
          "Formation équipes",
        ],
      },
      formation: {
        title: "Formation professionnelle",
        description:
          "Programmes de formation adaptés à vos besoins en matière douanière.",
        features: [
          "Formations certifiantes",
          "Programmes sur-mesure",
          "E-learning disponible",
          "Suivi personnalisé",
        ],
      },
      audit: {
        title: "Audit & conformité",
        description:
          "Évaluation complète de vos processus douaniers et recommandations.",
        features: [
          "Audit complet",
          "Analyse des risques",
          "Plan d'action",
          "Suivi des améliorations",
        ],
      },
    },
    formation: {
      hero: {
        title: "Formations douanières professionnelles",
        subtitle:
          "Nous proposons des formations professionnelles adaptées aux besoins des entreprises dans le domaine de la douane et du commerce international.\nConçues pour être accessibles et directement applicables, nos formations sont disponibles en présentiel ou en ligne.",
        description:
          "Chaque session inclut des supports pédagogiques, des études de cas pratiques, et des conseils personnalisés pour maitriser les réglementations douanières et optimiser vos opérations commerciales. Découvrez une approche pédagogique orientée terrain, conçue pour répondre aux défis du quotidien.",
        cta: "Rejoignez nos formations",
        download: "Télécharger le catalogue",
      },
      programs: {
        title: "Nos programmes de formation",
        subtitle:
          "Des formations pratiques et opérationnelles pour maîtriser tous les aspects de la douane.",
      },
      trainings: {
        douane: {
          title: "La douane",
          description:
            "Opération d'import/export opérationnelles et réglementaires. Orientée pratiques terrain.",
        },
        classification: {
          title: "La classification douanière",
          description:
            "Comprendre l'origine d'un produit et sa valeur, soit les fondamentaux douaniers.",
        },
        incoterms: {
          title: "Les incoterms",
          description:
            "Être capable de choisir le bon règlement entre acheteur et vendeur lors d'échanges internationaux.",
        },
        accise: {
          title: "Les droits d'accise",
          description:
            "Comprendre la taxation des alcools, tabacs, pétroles et dérivés.",
        },
      },
      benefits: {
        experts: {
          title: "Formateurs experts",
          description: "Plus de 20 ans d'expérience terrain"
        },
        certification: {
          title: "Certification",
          description: "Attestation de formation délivrée"
        },
        flexible: {
          title: "Flexible",
          description: "Formats adaptés à vos contraintes"
        },
        custom: {
          title: "Sur-mesure",
          description: "Contenu personnalisé possible"
        }
      },
    },
    consulting: {
      hero: {
        title: "Consulting douanier expert",
        subtitle:
          "Nos services de consulting offrent un accompagnement sur-mesure pour vos besoins spécifiques en matière de douane et de commerce international. Que ce soit pour résoudre des problématiques complexes, optimiser vos processus ou vous mettre en conformité avec les réglementations en vigueur, nous mettons à votre disposition notre expertise reconnue.",
        description:
          "Parmi nos prestations, nous proposons une assistance immédiate via notre help-line, des audits approfondis de vos opérations douanières, ainsi que des interventions ponctuelles adaptées à vos projets. Nous sommes votre partenaire stratégique pour sécuriser et simplifier vos échanges internationaux.",
        cta: "Parlons de vos besoins",
      },
      services: {
        title: "Nos services de consulting",
        subtitle: "Une approche personnalisée pour chaque entreprise",
        helpline: {
          title: "Help\nline",
          description:
            "Assistance immédiate pour toutes vos questions douanières urgentes.",
        },
        audit: {
          title: "Audit",
          description:
            "Évaluation complète de vos processus douaniers avec recommandations d'amélioration.",
        },
        missions: {
          title: "Missions ponctuelles à la demande",
          description:
            "Interventions spécialisées adaptées à vos projets spécifiques.",
        },
      },
    },
    experience: {
      title: "Expérience client",
      subtitle:
        "Découvrez comment nous accompagnons nos clients vers l'excellence douanière",
      testimonials: "Témoignages clients",
      caseStudies: "Études de cas",
      results: "Résultats obtenus",
    },
    about: {
      title: "À propos",
      subtitle:
        "Créée en 2019, Customs Engineering Solutions accompagne les grands groupes mais aussi les ETI et les PME pour optimiser et sécuriser leurs opérations d'import/export partout en Europe.",
      story: "Histoire",
      team: "La direction",
      values: "Nos Valeurs",
      certifications: "Certifications",
      history: {
        title: "Histoire",
        items: [
          {
            year: "2019",
            description:
              "Création de l'entreprise par sa dirigeante actuelle, Mme Marianne Artusio-Chenot, juriste spécialisée en douane.",
          },
          {
            year: "2024",
            description:
              "Partenariat stratégique avec VAT Solutions, société Luxembourgeoise spécialisée dans les questions de TVA.",
          },
        ],
      },
      director: {
        name: "Marianne Artusio-Chenot",
        title: "Fondatrice & associée",
        location: "Nice, Provence-Alpes-Côte d'Azur, France",
        description:
          "Marianne Artusio-Chenot, fondatrice de Customs Engineering Solutions, est diplômée de l'Université Paris-Est Créteil en droit international (DESS Juriste Européen, 1998-1999). Avec plus de 20 ans d'expérience dans le domaine douanier, elle a développé une expertise reconnue auprès de grands groupes internationaux.",
        experience:
          "Son parcours professionnel l'a menée de GEFCO (Groupe PSA) où elle était Manager du service Douane et Représentation Fiscale (2000-2011), à The Dow Chemical Company en tant qu'International Trade Compliance specialist (2013-2019), en passant par ALIS International (2011-2013). Cette expérience diversifiée lui confère une connaissance approfondie des besoins des entreprises de toutes tailles.",
        expertise:
          "Spécialiste en ingénierie douanière, audit, formation et conseil en organisation, elle est également formatrice accréditée ICC France Incoterms 2020. En contact régulier avec les services douaniers des pays de l'UE, elle fait bénéficier ses clients de sa connaissance approfondie de la douane européenne.",
        services: [
          "Audit & préconisations",
          "Accompagnement à la certification OEA",
          "Mise en place de procédures et régimes douaniers",
          "Assistance en cas de contrôle douanier",
          "Conseil en organisation et stratégie douanière",
          "Formations douane",
          "Formatrice accréditée ICC France Incoterms 2020",
        ],
        professionalExperience: [
          {
            period: "Nov. 2019 - aujourd'hui",
            position: "Consultante douane",
            company: "Customs Engineering Solutions",
            type: "Fondatrice & Associée",
            description:
              "Ingénierie douanière – Audit – Formation - Conseil en organisation. Customs Engineering Solutions est une entreprise indépendante spécialisée en douane et commerce international pour les entreprises industrielles, commerciales et financières ayant des activités transfrontalières de biens.",
          },
          {
            period: "Déc. 2013 - Nov. 2019",
            position:
              "International Trade Compliance specialist - Responsable France",
            company: "Dow AgroSciences - The Dow Chemical Company",
            location: "Valbonne (06)",
            description:
              "Management des opérations douanes France pour les entités Dow Agrosciences, Dow Chemical, Rohm & Haas : définition de la stratégie douanière, conception et mise en œuvre des procédures simplifiées et régimes douaniers, mise en place et maintien des certifications OEA, organisation du dédouanement, suivi des audits douanes.",
          },
          {
            period: "2011 - 2013",
            position: "Chargée de mission douane",
            company: "ALIS International (Crystal Group)",
            location: "Roissy Charles de Gaulle",
            description:
              "Missions OEA : accompagnement des clients à la certification OEA, ingénierie douanière, formations douane et fiscalité.",
          },
          {
            period: "Août 2000 - Juil. 2011",
            position: "Juriste Douane & Représentation Fiscale",
            company: "GEFCO (Groupe PSA)",
            location: "Courbevoie",
            description:
              "Manager en charge du Bureau d'Etudes et Développement Douane et RF, du Pôle opérationnel RF spécialiste de la TVA Intracommunautaire, et du projet OEA avec certification 'Full' obtenue en Octobre 2010.",
          },
        ],
      },
      pillars: {
        title: "CUSTOMS ENGINEERING SOLUTIONS<br />c'est avant tout",
        expertise: {
          title: "Une expertise reconnue",
          description:
            "Nous offrons des formations spécialisées et des services de consulting pour aider les entreprises à naviguer dans les complexités de la réglementation douanière. Notre expertise garantit des solutions adaptées aux besoins spécifiques de chaque client, assurant une conformité totale et des processus optimisés.",
        },
        solutions: {
          title: "Des solutions sur mesure",
          description:
            "Chez Customs Engineering Solutions, chaque mission est unique. Nous analysons en détail vos enjeux douaniers pour proposer des stratégies personnalisées. Qu'il s'agisse de formations ou de conseil, nous vous accompagnons pas à pas pour simplifier vos démarches et maximiser opportunités commerciales.",
        },
        trust: {
          title: "Un partenaire de confiance",
          description:
            "Nous avons à cœur de bâtir une relation de confiance avec nos clients. Transparence, professionnalisme et engagement sont les piliers de notre approche. Ensemble, nous construisons des solutions efficaces qui répondent à vos attentes et renforcent votre compétitivité.",
        },
      },
      cta: {
        title: "Une question ? Un projet ?",
        button: "Parlons-en !",
      },
    },
    contact: {
      title: "Contact",
      subtitle:
        "Vous avez une question ou un projet à me soumettre ?\nJe vous invite à utiliser le formulaire de contact pour toute demande d'information.",
      firstName: "Prénom",
      lastName: "Nom",
      company: "Société*",
      email: "Mail*",
      phone: "Téléphone",
      subject: "Objet*",
      subjectOptions: ["Option 1", "Option 2", "Option 3", "Option 4"],
      message: "Message*",
      send: "Envoyer",
      success: "Message envoyé avec succès !",
      error: "Erreur lors de l'envoi du message",
      required: "Les champs marqués d'une étoile (*) sont obligatoires",
      info: {
        title: "Informations de contact",
        phone: "06.02.01.53.69",
        email: "martusiochenot@customs-solutions.fr",
        location: "France et Europe",
        linkedin:
          "https://www.linkedin.com/in/marianne-artusio-chenot-1ba5442a/",
      },
    },
    blog: {
      title: "Blog & actualités",
      subtitle:
        "Restez informé des dernières évolutions douanières et règlementaires",
      readMore: "Lire la suite",
      categories: "Catégories",
      tags: "Mots-clés",
      recent: "Articles récents",
      search: "Rechercher...",
    },
    footer: {
      title: "Customs Engineering Solutions",
      description:
        "Solutions personnalisées en gestion douanière et commerce international.",
      links: "Liens rapides",
      contact: "Contact",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Cookies",
      info: {
        phone: "06.02.01.53.69",
        email: "martusiochenot@customs-solutions.fr",
        location: "France et Europe",
        linkedin:
          "https://www.linkedin.com/in/marianne-artusio-chenot-1ba5442a/",
      },
    },
    stats: {
      experience: "Années d'expérience",
      formations: "Formations réalisées",
      clients: "Clients satisfaits",
    },
    common: {
      loading: "Chargement...",
      error: "Une erreur est survenue",
      retry: "Réessayer",
      close: "Fermer",
      save: "Enregistrer",
      cancel: "Annuler",
      confirm: "Confirmer",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      download: "Télécharger",
      upload: "Téléverser",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      next: "Suivant",
      previous: "Précédent",
      page: "Page",
      of: "sur",
      results: "résultats",
    },
    advancedSearch: {
      title: "Recherche avancée",
      placeholder: "Que recherchez-vous ?",
      searching: "Recherche en cours...",
      noResults: "Aucun résultat trouvé",
      noResultsDescription:
        "Essayez de modifier vos critères de recherche ou utilisez des mots-clés différents.",
      resetSearch: "Réinitialiser la recherche",
      resultsFound: "résultat trouvé",
      resultsFoundPlural: "résultats trouvés",
      filters: {
        contentType: "Type de contenu",
        category: "Catégorie",
        difficulty: "Niveau",
        clear: "Effacer",
      },
      contentTypes: {
        all: "Tous types",
        document: "Documents",
        video: "Vidéos",
        course: "Formations",
        tool: "Outils",
      },
      categories: {
        all: "Tout",
        formation: "Formation",
        consulting: "Consulting",
        actualites: "Actualités",
        outils: "Outils",
      },
      difficulty: {
        all: "Tous niveaux",
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé",
      },
      views: "vues",
    },
    cookies: {
      title: "Gestion des cookies",
      message: "Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser",
      customize: "Personnaliser"
    },
    legal: {
      title: "Mentions légales",
      subtitle: "Informations légales et conditions d'utilisation",
      editor: "Directeur de publication",
      hosting: "Hébergement",
      content: "Contenu et propriété intellectuelle",
      liability: "Responsabilité",
      personalData: "Données personnelles"
    },
    privacy: {
      title: "Politique de confidentialité",
      subtitle: "Protection et traitement de vos données personnelles",
      dataCollection: "Collecte des données",
      dataUse: "Utilisation des données",
      dataSharing: "Partage des données",
      userRights: "Vos droits"
    },
    notFound: {
      title: "Page non trouvée",
      subtitle: "La page que vous recherchez n'existe pas ou a été déplacée",
      homeButton: "Retour à l'accueil",
      contactButton: "Nous contacter",
      helpTitle: "Comment pouvons-nous vous aider ?",
      helpText: "Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.",
      quickLinks: "Liens rapides"
    },
    misc: {
      trustMessage: "Ils nous font confiance",
      readyQuestion: "Prêt à optimiser\nvos opérations douanières ?",
      learnMore: "En savoir plus",
      callToContact: "Nous contacter",
      featuredArticle: "Article Vedette",
      allCategories: "Toutes les catégories",
      authorBy: "par",
      followUpMessage: "Nous vous recontacterons dans les plus brefs délais.",
      servicesOffered: "Services proposés :",
      ourJourney: "Notre parcours depuis la création...",
      ourExpertise: "Notre expertise",
      ourExpertiseSubtitle: "Des solutions professionnelles adaptées à chaque étape de vos opérations douanières",
      copyright: "© 2025 Customs Engineering Solutions.\nTous droits réservés.",
      joinSatisfiedClients: "Rejoignez nos clients satisfaits",
      ctaExperienceDescription: "Découvrez comment nous pouvons vous aider à optimiser vos opérations douanières et générer des économies significatives.",
      requestConsultation: "Demander une consultation"
    }
  },
  en: {
    nav: {
      home: "Home",
      consulting: "Consulting",
      formation: "Training",
      experience: "Client Experience",
      about: "About",
      contact: "Contact",
      blog: "Blog",
    },
    hero: {
      title: "Your partner for customized customs solutions",
      subtitle:
        "We support industrial, commercial and financial companies in their customs and international trade procedures within the European Union. Our expertise addresses structures with cross-border activities in goods and services.",
      cta: "Ensure your customs compliance",
      ctaSecondary: "Access our training program",
      section1: {
        title: "Secure your import/export operations",
        description:
          "Whether in anticipation of a customs control or simply to de-risk your import/export operations, you need a specialist by your side who enters your processes and documentation to guarantee best practices in customs matters. Avoid any dispute with the customs administration of the countries concerned.",
        cta: "Ensure your customs compliance",
      },
      section2: {
        title: "Customs operators training",
        description:
          "Customs legislation is constantly evolving. It is often difficult to stay up to date for teams caught up in operations, but also to integrate new collaborators. We train dozens of customs operators each year to guarantee know-how in compliance with the latest legislative constraints in import/export matters.",
        cta: "Access our training program",
      },
      section3: {
        title: "Optimize your import/export flows",
        description:
          "Do you want to financially optimize your operations? Do you want to administratively simplify your operations? We are by your side to optimize all your import/export operations.",
        cta: "Simplify your procedures today",
      },
    },
    services: {
      title: "Our services",
      subtitle: "Complete solutions to optimize your customs operations",
      consulting: {
        title: "Customs consulting",
        description:
          "Personalized expertise to optimize your customs procedures and reduce your costs.",
        features: [
          "Process audit",
          "Tax optimization",
          "Compliance",
          "Team training",
        ],
      },
      formation: {
        title: "Professional training",
        description: "Training programs adapted to your customs needs.",
        features: [
          "Certified training",
          "Custom programs",
          "E-learning available",
          "Personal follow-up",
        ],
      },
      audit: {
        title: "Audit & compliance",
        description:
          "Complete evaluation of your customs processes and recommendations.",
        features: [
          "Complete audit",
          "Risk analysis",
          "Action plan",
          "Improvement tracking",
        ],
      },
    },
    formation: {
      hero: {
        title: "Professional customs training",
        subtitle:
          "We offer professional training adapted to the needs of companies in the field of customs and international trade. Designed to be accessible and directly applicable, our training is available in person or online.",
        description:
          "Each session includes educational materials, practical case studies, and personalized advice to master customs regulations and optimize your commercial operations. Discover a field-oriented pedagogical approach, designed to meet daily challenges.",
        cta: "Join our training",
        download: "Download catalog",
      },
      programs: {
        title: "Our training programs",
        subtitle:
          "Practical and operational training to master all aspects of customs.",
      },
      trainings: {
        douane: {
          title: "Customs",
          description:
            "Operational and regulatory import/export operations. Field practice oriented.",
        },
        classification: {
          title: "Customs classification",
          description:
            "Understanding the origin of a product and its value, the customs fundamentals.",
        },
        incoterms: {
          title: "Incoterms",
          description:
            "Being able to choose the right settlement between buyer and seller during international exchanges.",
        },
        accise: {
          title: "Excise duties",
          description:
            "Understanding the taxation of alcohol, tobacco, petroleum and derivatives.",
        },
      },
      benefits: {
        experts: {
          title: "Expert trainers",
          description: "Over 20 years of field experience"
        },
        certification: {
          title: "Certification",
          description: "Training certificate provided"
        },
        flexible: {
          title: "Flexible",
          description: "Formats adapted to your constraints"
        },
        custom: {
          title: "Tailor-made",
          description: "Personalized content possible"
        }
      },
    },
    consulting: {
      hero: {
        title: "Expert customs consulting",
        subtitle:
          "Our consulting services offer tailor-made support for your specific needs in customs and international trade. Whether to solve complex problems, optimize your processes or bring you into compliance with current regulations, we make our recognized expertise available to you.",
        description:
          "Among our services, we offer immediate assistance via our help line, in-depth audits of your customs operations, as well as one-off interventions adapted to your projects. We are your strategic partner to secure and simplify your international exchanges.",
        cta: "Let's talk about your needs",
      },
      services: {
        title: "Our consulting services",
        subtitle: "A personalized approach for each company",
        helpline: {
          title: "Help\nline",
          description:
            "Immediate assistance for all your urgent customs questions.",
        },
        audit: {
          title: "Audit",
          description:
            "Complete evaluation of your customs processes with improvement recommendations.",
        },
        missions: {
          title: "One-off missions on demand",
          description:
            "Specialized interventions adapted to your specific projects.",
        },
      },
    },
    experience: {
      title: "Client experience",
      subtitle: "Discover how we guide our clients towards customs excellence",
      testimonials: "Client testimonials",
      caseStudies: "Case studies",
      results: "Results achieved",
    },
    about: {
      title: "About CES",
      subtitle:
        "Created in 2019, Customs Engineering Solutions supports large groups as well as mid-sized and small companies to optimize and secure their import/export operations throughout Europe.",
      story: "Our Story",
      team: "Management",
      values: "Our Values",
      certifications: "Certifications",
      history: {
        title: "History",
        items: [
          {
            year: "2019",
            description:
              "Company creation by its current director, Mrs. Marianne Artusio-Chenot, lawyer specialized in customs.",
          },
          {
            year: "2024",
            description:
              "Strategic partnership with VAT Solutions, Luxembourg company specialized in VAT matters.",
          },
        ],
      },
      director: {
        name: "Marianne Artusio-Chenot",
        title: "Founder & partner",
        location: "Nice, Provence-Alpes-Côte d'Azur, France",
        description:
          "Marianne Artusio-Chenot, founder of Customs Engineering Solutions, graduated from Université Paris-Est Créteil in international law (DESS European Lawyer, 1998-1999). With over 20 years of experience in customs, she has developed recognized expertise with major international groups.",
        experience:
          "Her professional journey led her from GEFCO (PSA Group) where she was Manager of the Customs and Tax Representation service (2000-2011), to The Dow Chemical Company as International Trade Compliance specialist (2013-2019), through ALIS International (2011-2013). This diverse experience gives her in-depth knowledge of the needs of companies of all sizes.",
        expertise:
          "Specialist in customs engineering, audit, training and organizational consulting, she is also an accredited ICC France Incoterms 2020 trainer. In regular contact with customs services in EU countries, she provides her clients with her in-depth knowledge of European customs.",
        services: [
          "Audit & recommendations",
          "AEO certification support",
          "Implementation of customs procedures and regimes",
          "Assistance during customs controls",
          "Organizational and strategic customs advice",
          "Customs training",
          "Accredited ICC France Incoterms 2020 trainer",
        ],
        professionalExperience: [
          {
            period: "Nov. 2019 - present",
            position: "Customs consultant",
            company: "Customs Engineering Solutions",
            type: "Founder & Partner",
            description:
              "Customs engineering – Audit – Training - Organizational consulting. Customs Engineering Solutions is an independent company specialized in customs and international trade for industrial, commercial and financial companies with cross-border activities of goods.",
          },
          {
            period: "Dec. 2013 - Nov. 2019",
            position:
              "International Trade Compliance specialist - France Manager",
            company: "Dow AgroSciences - The Dow Chemical Company",
            location: "Valbonne (06)",
            description:
              "Management of France customs operations for Dow Agrosciences, Dow Chemical, Rohm & Haas entities: customs strategy definition, design and implementation of simplified procedures and customs regimes, establishment and maintenance of AEO certifications, customs clearance organization, customs audit monitoring.",
          },
          {
            period: "2011 - 2013",
            position: "Customs mission manager",
            company: "ALIS International (Crystal Group)",
            location: "Roissy Charles de Gaulle",
            description:
              "AEO missions: supporting clients for AEO certification, customs engineering, customs and tax training.",
          },
          {
            period: "Aug. 2000 - Jul. 2011",
            position: "Customs & Tax Representation Lawyer",
            company: "GEFCO (PSA Group)",
            location: "Courbevoie",
            description:
              "Manager in charge of the Customs and Tax Representation Studies and Development Office, the Tax Representation operational unit specializing in Intra-Community VAT, and the AEO project with 'Full' certification obtained in October 2010.",
          },
        ],
      },
      pillars: {
        title: "CUSTOMS ENGINEERING SOLUTIONS is above all",
        expertise: {
          title: "Recognized expertise",
          description:
            "We offer specialized training and consulting services to help companies navigate the complexities of customs regulations. Our expertise guarantees solutions adapted to the specific needs of each client, ensuring total compliance and optimized processes.",
        },
        solutions: {
          title: "Tailor-made solutions",
          description:
            "At Customs Engineering Solutions, each mission is unique. We analyze your customs challenges in detail to propose personalized strategies. Whether for training or consulting, we support you step by step to simplify your procedures and maximize commercial opportunities.",
        },
        trust: {
          title: "A trusted partner",
          description:
            "We are committed to building a relationship of trust with our clients. Transparency, professionalism and commitment are the pillars of our approach. Together, we build effective solutions that meet your expectations and strengthen your competitiveness.",
        },
      },
      cta: {
        title: "A question? A project?",
        button: "Let's talk!",
      },
    },
    contact: {
      title: "A question? A project?",
      subtitle:
        "Do you have a question or a project to submit? I invite you to use the contact form for any information request.",
      firstName: "First Name",
      lastName: "Last Name",
      company: "Company*",
      email: "Email*",
      phone: "Phone",
      subject: "Subject*",
      subjectOptions: ["Option 1", "Option 2", "Option 3", "Option 4"],
      message: "Message*",
      send: "Send",
      success: "Message sent successfully!",
      error: "Error sending message",
      required: "Fields marked with an asterisk (*) are required",
      info: {
        title: "Contact information",
        phone: "06.02.01.53.69",
        email: "martusiochenot@customs-solutions.fr",
        location: "France and Europe",
        linkedin:
          "https://www.linkedin.com/in/marianne-artusio-chenot-1ba5442a/",
      },
    },
    blog: {
      title: "Blog & news",
      subtitle:
        "Stay informed about the latest customs and regulatory developments",
      readMore: "Read more",
      categories: "Categories",
      tags: "Keywords",
      recent: "Recent articles",
      search: "Search...",
    },
    footer: {
      title: "Customs Engineering Solutions",
      description:
        "Customized solutions in customs management and international trade.",
      links: "Quick links",
      contact: "Contact",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      info: {
        phone: "06.02.01.53.69",
        email: "martusiochenot@customs-solutions.fr",
        location: "France and Europe",
        linkedin:
          "https://www.linkedin.com/in/marianne-artusio-chenot-1ba5442a/",
      },
    },
    stats: {
      experience: "20 years of experience",
      formations: "200 training sessions delivered",
      clients: "300 satisfied clients",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      download: "Download",
      upload: "Upload",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      next: "Next",
      previous: "Previous",
      page: "Page",
      of: "of",
      results: "results",
    },
    advancedSearch: {
      title: "Advanced search",
      placeholder: "What are you looking for?",
      searching: "Searching...",
      noResults: "No results found",
      noResultsDescription:
        "Try modifying your search criteria or use different keywords.",
      resetSearch: "Reset search",
      resultsFound: "result found",
      resultsFoundPlural: "results found",
      filters: {
        contentType: "Content type",
        category: "Category",
        difficulty: "Level",
        clear: "Clear",
      },
      contentTypes: {
        all: "All types",
        document: "Documents",
        video: "Videos",
        course: "Courses",
        tool: "Tools",
      },
      categories: {
        all: "All",
        formation: "Training",
        consulting: "Consulting",
        actualites: "News",
        outils: "Tools",
      },
      difficulty: {
        all: "All levels",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
      views: "views",
    },
    cookies: {
      title: "Cookie management",
      subtitle: "Manage your cookie preferences and learn how we use cookies.",
      message: "We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies.",
      accept: "Accept",
      decline: "Decline",
      customize: "Customize"
    },
    legal: {
      title: "Legal notice",
      subtitle: "Legal information and terms of use",
      editor: "Publication director",
      hosting: "Hosting",
      content: "Content and intellectual property",
      liability: "Liability",
      personalData: "Personal data"
    },
    privacy: {
      title: "Privacy policy",
      subtitle: "Protection and processing of your personal data",
      dataCollection: "Data collection",
      dataUse: "Data usage",
      dataSharing: "Data sharing",
      userRights: "Your rights"
    },
    notFound: {
      title: "Page not found",
      subtitle: "The page you are looking for does not exist or has been moved",
      homeButton: "Back to home",
      contactButton: "Contact us",
      helpTitle: "How can we help you?",
      helpText: "If you can't find what you're looking for, don't hesitate to contact us.",
      quickLinks: "Quick links"
    },
    misc: {
      trustMessage: "They trust us",
      readyQuestion: "Ready to optimize your customs operations?",
      learnMore: "Learn more",
      callToContact: "Contact us",
      featuredArticle: "Featured Article",
      allCategories: "All categories",
      authorBy: "by",
      followUpMessage: "We will contact you as soon as possible.",
      servicesOffered: "Services offered:",
      ourJourney: "Our journey since creation...",
      ourExpertise: "Our Expertise",
      ourExpertiseSubtitle: "Professional solutions adapted to each stage of your customs operations",
      copyright: "© 2025 Customs Engineering Solutions. All rights reserved.",
      joinSatisfiedClients: "Join our satisfied clients",
      ctaExperienceDescription: "Discover how we can help you optimize your customs operations and generate significant savings.",
      requestConsultation: "Request a consultation"
    }
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");

  const t = translations[language];

  useEffect(() => {
    // Initialize language from localStorage on client side only
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Save language preference to localStorage and update document
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
