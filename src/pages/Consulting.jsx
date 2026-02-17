import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const ServiceCard = ({ title, description, features, delay }) => (
  <motion.div
    className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
  >
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 whitespace-pre-line">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{description}</p>

    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProcessStep = ({ number, title, description, delay }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className="relative">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      {number < 4 && (
        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-y-0.5" />
      )}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Consulting = () => {
  const { t, language } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const services = {
    fr: [
      {
        title: "Help\nline",
        description:
          "Support immédiat pour vos urgences douanières avec nos experts disponibles.",
        features: [
          "Réponse sous 2h en urgence",
          "Experts dédiés par secteur",
          "Support multilingue",
          "Assistance 24/7 pour les cas critiques",
        ],
        color: "from-green-500 to-green-600",
      },
      {
        title: "Audit douanier",
        description:
          "Analyse complète de vos processus douaniers pour identifier les risques et optimisations.",
        features: [
          "Audit complet des procédures",
          "Analyse des risques de conformité",
          "Recommandations personnalisées",
          "Plan d'action détaillé",
        ],
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Missions ponctuelles",
        description:
          "Interventions spécialisées adaptées à vos projets et besoins spécifiques.",
        features: [
          "Expertise projet sur mesure",
          "Accompagnement contrôles douaniers",
          "Mise en conformité express",
          "Support négociations administratives",
        ],
        color: "from-purple-500 to-purple-600",
      },
    ],
    en: [
      {
        title: "Help line",
        description:
          "Immediate support for your customs emergencies with our available experts.",
        features: [
          "Response within 2h for emergencies",
          "Dedicated experts by sector",
          "Multilingual support",
          "24/7 assistance for critical cases",
        ],
        color: "from-green-500 to-green-600",
      },
      {
        title: "Customs Audit",
        description:
          "Complete analysis of your customs processes to identify risks and optimizations.",
        features: [
          "Complete procedure audit",
          "Compliance risk analysis",
          "Personalized recommendations",
          "Detailed action plan",
        ],
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Specific Missions",
        description:
          "Specialized interventions adapted to your projects and specific needs.",
        features: [
          "Custom project expertise",
          "Customs control support",
          "Express compliance setup",
          "Administrative negotiation support",
        ],
        color: "from-purple-500 to-purple-600",
      },
    ],
  };

  const process = {
    fr: [
      {
        title: "Analyse des Besoins",
        description:
          "Étude approfondie de votre situation et identification des enjeux prioritaires.",
      },
      {
        title: "Diagnostic Expert",
        description:
          "Évaluation complète par nos spécialistes avec recommandations personnalisées.",
      },
      {
        title: "Plan d'Action",
        description:
          "Élaboration d'une stratégie sur mesure avec planification détaillée.",
      },
      {
        title: "Accompagnement",
        description:
          "Mise en œuvre avec support continu et ajustements selon les résultats.",
      },
    ],
    en: [
      {
        title: "Needs Analysis",
        description:
          "In-depth study of your situation and identification of priority issues.",
      },
      {
        title: "Expert Diagnosis",
        description:
          "Complete evaluation by our specialists with personalized recommendations.",
      },
      {
        title: "Action Plan",
        description: "Development of a custom strategy with detailed planning.",
      },
      {
        title: "Support",
        description:
          "Implementation with continuous support and adjustments based on results.",
      },
    ],
  };

  const benefits = {
    fr: [
      {
        title: "Sécurité Juridique",
        description: "Conformité garantie avec les réglementations en vigueur",
      },
      {
        title: "Optimisation Financière",
        description: "Réduction des coûts et optimisation fiscale",
      },
      {
        title: "Gain de Temps",
        description: "Procédures accélérées et démarches simplifiées",
      },
      {
        title: "Expertise Reconnue",
        description: "20+ ans d'expérience et certifications officielles",
      },
    ],
    en: [
      {
        title: "Legal Security",
        description: "Guaranteed compliance with current regulations",
      },
      {
        title: "Financial Optimization",
        description: "Cost reduction and tax optimization",
      },
      {
        title: "Time Saving",
        description: "Accelerated procedures and simplified processes",
      },
      {
        title: "Recognized Expertise",
        description: "20+ years of experience and official certifications",
      },
    ],
  };

  const currentLanguage = language;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-modern-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 melissa2 text-white leading-tight"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            {t.consulting.hero.title}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-blue-100 max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {t.consulting.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t.consulting.services.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.consulting.services.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services[currentLanguage].map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Description Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <div className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 space-y-6">
              <p 
                className="whitespace-pre-line md:text-justify"
                style={{ 
                  textJustify: 'inter-word',
                  textAlignLast: 'justify',
                  wordSpacing: '0.1em',
                  hyphens: 'auto'
                }}
              >
                {t.consulting.hero.description}
              </p>
            </div>
            <Link href="/contact">
              <motion.button
                className="bg-blue-950 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {t.consulting.hero.cta}
                </span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-950 to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 whitespace-pre-line">
              {t.misc.readyQuestion}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t.misc.ctaExperienceDescription}
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-white text-blue-950 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {t.misc.callToContact}
                </span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
