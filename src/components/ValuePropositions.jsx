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
    },
    {
      icon: BookOpen,
      title: t.hero.section2.title,
      description: t.hero.section2.description,
      ctaText: t.hero.section2.cta,
      ctaLink: "/formation",
    },
    {
      icon: TrendingUp,
      title: t.hero.section3.title,
      description: t.hero.section3.description,
      ctaText: t.hero.section3.cta,
      ctaLink: "/consulting",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.misc.ourExpertise}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.misc.ourExpertiseSubtitle}
          </p>
        </motion.div>

        {/* Value Propositions Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {propositions.map((proposition, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full hover:-translate-y-2"
            >
              {/* Icon Header */}
              <div className="bg-blue-950 text-white p-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <proposition.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold leading-tight">
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
                    <button
                      className="w-full bg-blue-950 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 hover:scale-105"
                    >
                      <span className="text-center">{proposition.ctaText}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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
