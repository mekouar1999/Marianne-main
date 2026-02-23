// frontend/src/pages/About.jsx
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Target,
  Lightbulb,
  Globe,
  CheckCircle,
  Linkedin,
  Briefcase,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "../components/TextReveal";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";
import GlitchText from "../components/GlitchText";

const About = () => {
  const { t } = useLanguage();

  // Add error boundary for debugging
  if (!t || !t.about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Translation Error
          </h1>
          <p className="text-gray-600">
            Unable to load translations for About page
          </p>
        </div>
      </div>
    );
  }

  const timeline = [
    {
      year: "2019",
      title: "Création de l'entreprise",
      description:
        "Création de l'entreprise par sa dirigeante actuelle, Mme Marianne Artusio-Chenot, juriste spécialisée en douane.",
      icon: Target,
    },
    {
      year: "2024",
      title: "Partenariat stratégique",
      description:
        "Partenariat stratégique avec VAT Solutions, société Luxembourgeoise spécialisée dans les questions de TVA.",
      icon: Globe,
    },
  ];

  const director = {
    name: t.about.director?.name || "Marianne Artusio-Chenot",
    position: t.about.director?.title || "Dirigeante fondatrice",
    image: "/Photo Marianne.jpeg",
    bio: t.about.director?.description || "",
    experience: t.about.director?.experience || "",
    expertise: t.about.director?.expertise || "",
    location: t.about.director?.location || "",
    services: t.about.director?.services || [],
    linkedin: "https://www.linkedin.com/in/marianne-artusio-chenot-1ba5442a/",
  };

  const pillars = [
    {
      icon: Award,
      title: t.about.pillars?.expertise?.title || "Expertise reconnue",
      description:
        t.about.pillars?.expertise?.description ||
        "Notre expertise garantit des solutions adaptées.",
      color: "from-customs-dark to-customs-medium",
    },
    {
      icon: Lightbulb,
      title: t.about.pillars?.solutions?.title || "Solutions sur mesure",
      description:
        t.about.pillars?.solutions?.description || "Chaque mission est unique.",
      color: "from-customs-medium to-customs-light",
    },
    {
      icon: CheckCircle,
      title: t.about.pillars?.trust?.title || "Partenaire de confiance",
      description:
        t.about.pillars?.trust?.description ||
        "Transparence et professionnalisme.",
      color: "from-customs-dark to-customs-medium",
    },
  ];

  const qualifications = [
    {
      name: "DESS Juriste Européen",
      issuer: "Université Paris-Est Créteil (UPEC)",
      year: "1998-1999",
      type: "Formation",
      description: "Droit international",
    },
    {
      name: "Formatrice accréditée ICC France",
      issuer: "ICC France",
      year: "2020",
      type: "Certification",
      description: "Incoterms 2020",
    },
    {
      name: "Certification OEA 'Full'",
      issuer: "GEFCO",
      year: "2010",
      type: "Projet",
      description: "Douane & sûreté - Projet dirigé",
    },
    {
      name: "Plus de 500 relations",
      issuer: "LinkedIn",
      year: "Actuel",
      type: "Réseau",
      description: "Réseau professionnel douanier",
    },
  ];

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-modern-blue relative overflow-hidden">
        {/* Animated pulsing orbs */}
        <motion.div
          className="absolute top-10 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Rotating ring */}
        <motion.div
          className="absolute right-10 top-20 w-48 h-48 border border-cyan-400/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-16 top-24 w-36 h-36 border border-blue-400/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 melissa2 text-white leading-tight">
            <TextReveal text={t.about?.title || "À propos"} delay={0.1} />
          </div>
          <motion.p
            className="text-lg md:text-xl text-blue-100 max-w-4xl"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t.about?.subtitle || "Votre partenaire de solutions douanes sur mesure"}
          </motion.p>
        </div>
      </section>

      {/* History Section - Card Layout like Notre expertise */}
      <section className="py-12 sm:py-16 lg:py-20 bg-mesh relative">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {t.about?.history?.title || "Notre Histoire"}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              {t.misc.ourJourney}
            </p>
          </motion.div>

          {/* History Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <TiltCard key={index} maxTilt={10} className="h-full">
              <motion.div
                className="bg-slate-50/90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-blue-100/70 hover:border-blue-200/50"
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.25, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                {/* Icon Header */}
                <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <motion.div
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="text-white/80 font-semibold">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-section-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            className="text-center mb-20"
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
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: t.about?.pillars?.title || "Nos Valeurs" }}
            ></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <TiltCard key={index} maxTilt={12} className="h-full">
              <motion.div
                className="bg-slate-50/90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-blue-100/70 hover:border-blue-200/50"
                initial={{ opacity: 0, y: 50, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                {/* Icon Header */}
                <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <motion.div
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <pillar.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold leading-tight">
                    {pillar.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-mesh relative overflow-hidden">
        <div className="absolute top-10 left-0 w-64 h-64 bg-blue-950/3 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.about?.team || "La Direction"}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-slate-50/90 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100/70"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-32 h-32 rounded-full mx-auto md:mx-0 mb-4 object-cover"
                  />
                  <a
                    href={director.linkedin}
                    className="inline-flex items-center justify-center w-10 h-10 bg-customs-dark text-white rounded-full hover:bg-customs-medium transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">
                    {director.name}
                  </h3>
                  <p className="text-customs-dark font-medium mb-2">
                    {director.position}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {director.location}
                  </p>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p className="text-justify">{director.bio}</p>
                    <p className="text-justify">{director.experience}</p>
                    <p className="text-justify">{director.expertise}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t.misc.servicesOffered}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {director.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-customs-dark rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Animated ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.05, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-8"
              dangerouslySetInnerHTML={{ __html: t.about?.cta?.title || "Une question ? Un projet ?" }}
            ></h2>
            <Link href="/contact">
              <MagneticButton
                className="bg-white text-blue-950 px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">{t.about?.cta?.button || "Parlons-en !"}</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
