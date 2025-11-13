// frontend/src/pages/About.jsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-blue-950">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 melissa2 text-white">
            {t.about?.title || "À propos"}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-4xl">
            {t.about?.subtitle ||
              "Votre partenaire de solutions douanes sur mesure"}
          </p>
        </div>
      </section>

      {/* History Section - Card Layout like Notre expertise */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Icon Header */}
                <div className="bg-blue-950 text-white p-8 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: t.about?.pillars?.title || "Nos Valeurs" }}
            ></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon Header */}
                <div className="bg-blue-950 text-white p-8 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.about?.team || "La Direction"}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
      <section className="py-20 bg-gradient-to-r from-customs-dark to-customs-medium text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              <motion.button
                className="bg-white text-customs-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t.about?.cta?.button || "Parlons-en !"}</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
