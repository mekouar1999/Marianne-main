// frontend/src/pages/Experience.jsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "../components/TextReveal";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";

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
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        {/* Animated orbs */}
        <motion.div
          className="absolute top-16 right-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-60 h-60 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <TextReveal text={t.experience.title} delay={0.1} />
          </div>
          <motion.p
            className="text-lg md:text-xl text-blue-100 max-w-4xl"
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              <TiltCard key={testimonial.id} maxTilt={10} className="h-full">
              <motion.div
                className="bg-slate-50/90 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100/70 hover:border-blue-200/50 group h-full flex flex-col"
                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
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

  {/* Quote and text */}
  <div className="flex-1">
    <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
  </div>

  {/* Results always at bottom */}
  <div className="mt-auto">
    <div className="space-y-1 mb-4">
      <h5 className="font-semibold text-gray-900 text-sm mb-1">Résultats obtenus :</h5>
      {testimonial.results.map((result, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-sm text-gray-600">{result}</span>
        </div>
      ))}
    </div>
    {/* Removed date display */}
  </div>
</motion.div>
              </TiltCard>
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
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <Link href="/contact">
                <MagneticButton className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center space-x-2 shimmer-btn btn-glow">
                  <span>{t.misc.requestConsultation}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Experience;
