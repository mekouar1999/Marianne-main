import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "../components/TextReveal";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";

const ServiceCard = ({ title, description, features, delay }) => (
  <TiltCard maxTilt={12} className="h-full">
  <motion.div
    className="bg-slate-50/90 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100/60 group h-full relative overflow-hidden"
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
  >
    {/* Scan line effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover:translate-y-full transition-transform duration-1000" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
    <div className="min-h-[72px] flex items-start mb-6">
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center w-full">{description}</p>
    </div>

    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
  </TiltCard>
);

const ProcessStep = ({ number, title, description, delay }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 50, scale: 0.85 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
  >
    <div className="relative">
      <motion.div
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-950 to-blue-700 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-4"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {number}
      </motion.div>
      {number < 4 && (
        <motion.div
          className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-200 origin-left -translate-y-0.5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          viewport={{ once: true }}
        />
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
        title: "Help line",
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
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 md:pt-40 md:pb-12 bg-modern-blue relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute right-10 top-10 w-40 h-40 border border-cyan-400/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold melissa2 text-white leading-tight">
            <TextReveal text={t.consulting.hero.title} delay={0.1} />
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      <section className="py-14 md:py-18 bg-section-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            className="w-12 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          />
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light italic"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t.consulting.hero.subtitle}
          </motion.p>
          <motion.div
            className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-950 rounded-full mx-auto mt-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-section-tint">
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
      <section className="py-24 bg-mesh relative overflow-hidden">
        {/* Pulsing orbs */}
        <motion.div
          className="absolute -left-24 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/25 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        {/* Removed large decorative quote mark */}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top accent */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-10"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            {t.consulting.hero.description}
          </motion.p>

          {/* Bottom accent */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-950 rounded-full mx-auto mt-10"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
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
              <MagneticButton
                className="bg-white text-blue-950 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
              >
                <span>{t.misc.callToContact}</span>
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
