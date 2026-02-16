// frontend/src/components/ValuePropositions.jsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BookOpen, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const ValuePropositions = () => {
  const { t } = useLanguage();

  const propositions = [
    {
      icon: Shield,
      title: t.hero.section1.title,
      description: t.hero.section1.description,
      ctaText: t.hero.section1.cta,
      ctaLink: "/consulting",
      gradient: "from-blue-950 to-blue-800",
      accentColor: "cyan-400",
    },
    {
      icon: BookOpen,
      title: t.hero.section2.title,
      description: t.hero.section2.description,
      ctaText: t.hero.section2.cta,
      ctaLink: "/formation",
      gradient: "from-slate-900 to-slate-700",
      accentColor: "blue-400",
    },
    {
      icon: TrendingUp,
      title: t.hero.section3.title,
      description: t.hero.section3.description,
      ctaText: t.hero.section3.cta,
      ctaLink: "/consulting",
      gradient: "from-blue-900 to-indigo-800",
      accentColor: "sky-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="py-20 bg-mesh relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-950/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.misc.ourExpertise}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.misc.ourExpertiseSubtitle}
          </p>
        </motion.div>

        {/* Value Propositions Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {propositions.map((proposition, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100/80 hover:border-blue-200/50">
                {/* Icon Header with gradient */}
                <div className={`bg-gradient-to-br ${proposition.gradient} text-white p-8 text-center relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700 delay-100" />
                  </div>
                  
                  <motion.div
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <proposition.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold leading-tight relative z-10">
                    {proposition.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <p 
                    className="text-gray-700 leading-relaxed mb-8 flex-1"
                    style={{ 
                      textAlign: 'justify', 
                      textJustify: 'inter-word',
                      textAlignLast: 'justify',
                      wordSpacing: '0.1em',
                      hyphens: 'auto'
                    }}
                  >
                    {proposition.description}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link href={proposition.ctaLink}>
                      <motion.button
                        className="w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shimmer-btn"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-center">{proposition.ctaText}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Des Questions Spécifiques ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Chaque entreprise a des besoins uniques. Contactez-nous pour une
              consultation personnalisée.
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-blue-950 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Nous Contacter</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ValuePropositions;
