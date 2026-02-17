// frontend/src/pages/Experience.jsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  const testimonials = [
  {
    id: 1,
    name: "Michelina Mammone",
    position: "European Customs Coordinator",
    company: "Dow Corning",
    text: "Marianne has an extensive knowledge in customs legislation and customs operations...",
    results: ["Système de dédouanement centralisé", "Expertise analytique reconnue", "Excellentes capacités de coaching"],
    date: "8 décembre 2017",
    photo: "/PHOTOS PAGE EXPERIENCE CLIENT/PHOTO 1 - TRANSPORT.jpg" // Chemin relatif depuis public
  },
  {
    id: 2,
    name: "Michelina Mammone",
    position: "European Customs Coordinator",
    company: "Dow Corning",
    text: "Marianne has an extensive knowledge in customs legislation and customs operations...",
    results: ["Système de dédouanement centralisé", "Expertise analytique reconnue", "Excellentes capacités de coaching"],
    date: "8 décembre 2017",
    photo: "/PHOTOS PAGE EXPERIENCE CLIENT/PHOTO 2 - PHARMACIE.jpg"
  },
  {
    id: 3,
    name: "Michelina Mammone",
    position: "European Customs Coordinator",
    company: "Dow Corning",
    text: "Marianne is extremely precise and pragmatic and always shows capability to work in an international work-context...",
    results: ["Vision stratégique long terme", "Gestion du changement", "Amélioration continue des processus"],
    date: "8 décembre 2017",
    photo: "/PHOTOS PAGE EXPERIENCE CLIENT/PHOTO 3 - ALCOOL.jpg"
  }
];

  const caseStudies = [
    {
      id: 1,
      title: "Optimisation Douanière - Secteur Automobile",
      client: "Constructeur Automobile Européen",
      challenge:
        "Réduction des coûts douaniers sur les importations de composants",
      solution:
        "Mise en place d'un régime de perfectionnement actif et optimisation de la classification tarifaire",
      results: {
        savings: "€2.3M",
        timeReduction: "60%",
        compliance: "100%",
        roi: "450%",
      },
      duration: "6 mois",
      image: "/api/placeholder/400/250",
      tags: ["Automobile", "Optimisation", "Perfectionnement Actif"],
    },
    {
      id: 2,
      title: "Digitalisation des Processus - E-commerce",
      client: "Plateforme E-commerce Internationale",
      challenge:
        "Automatisation des déclarations douanières pour 10,000+ colis/jour",
      solution:
        "Implémentation d'une solution digitale intégrée avec APIs douanières",
      results: {
        savings: "€800K",
        timeReduction: "85%",
        compliance: "99.9%",
        roi: "320%",
      },
      duration: "4 mois",
      image: "/api/placeholder/400/250",
      tags: ["E-commerce", "Digitalisation", "Automatisation"],
    },
    {
      id: 3,
      title: "Conformité Réglementaire - Pharmaceutique",
      client: "Laboratoire Pharmaceutique",
      challenge: "Mise en conformité avec les nouvelles réglementations UE",
      solution:
        "Audit complet et refonte des procédures de contrôle qualité douanier",
      results: {
        savings: "€1.2M",
        timeReduction: "40%",
        compliance: "100%",
        roi: "280%",
      },
      duration: "8 mois",
      image: "/api/placeholder/400/250",
      tags: ["Pharmaceutique", "Conformité", "Réglementation"],
    },
  ];

  const sectors = [
    { name: "Automobile", percentage: 25, color: "bg-blue-500" },
    { name: "Technologie", percentage: 20, color: "bg-green-500" },
    { name: "Pharmaceutique", percentage: 18, color: "bg-purple-500" },
    { name: "Agroalimentaire", percentage: 15, color: "bg-orange-500" },
    { name: "Textile", percentage: 12, color: "bg-red-500" },
    { name: "Autres", percentage: 10, color: "bg-gray-500" },
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            {t.experience.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-100 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {t.experience.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-mesh relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-950/3 rounded-full blur-3xl" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.experience.testimonials}
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les retours de nos clients satisfaits
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-blue-200/50 group"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
  <div className="text-center mb-6">
    {/* Professional photo with modern design */}
    <div className="relative mb-6 overflow-hidden rounded-xl">
      <motion.img
        src={testimonial.photo}
        alt={`${testimonial.name}`}
        className="w-full h-48 object-cover rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent rounded-xl"></div>
    </div>
    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
    <p className="text-gray-600 text-sm">{testimonial.position}</p>
    <p className="text-blue-950 text-sm font-medium">{testimonial.company}</p>
  </div>

  {/* Le reste du contenu reste inchangé */}
  <Quote className="w-8 h-8 text-blue-200 mb-4" />
  <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>

  <div className="space-y-2">
    <h5 className="font-semibold text-gray-900 text-sm">Résultats obtenus :</h5>
    {testimonial.results.map((result, idx) => (
      <div key={idx} className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span className="text-sm text-gray-600">{result}</span>
      </div>
    ))}
  </div>

  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
    {testimonial.date && (
      <span className="text-xs text-gray-500">{testimonial.date}</span>
    )}
  </div>
</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-950/3 rounded-full blur-3xl animate-float-slow" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
              {t.misc.joinSatisfiedClients}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.misc.ctaExperienceDescription}
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-2 text-sm sm:text-base shimmer-btn btn-glow"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t.misc.requestConsultation}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Experience;
