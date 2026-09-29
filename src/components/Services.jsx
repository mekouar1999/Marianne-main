import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Briefcase,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: t.services.consulting.features,
      ctaText: t.consulting.hero.cta,
      href: "/consulting",
      gradient: "from-[#002B54] via-[#005596] to-[#0FC2F8]",
    },
    {
      icon: GraduationCap,
      title: t.services.formation.title,
      description: t.services.formation.description,
      features: t.services.formation.features,
      ctaText: t.formation.hero.cta,
      href: "/formation",
      gradient: "from-[#002B54] via-[#005596] to-[#0FC2F8]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-[#040E25] via-[#002B54] to-[#005596]">
      {/* Animated background ambient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)', top: '-10%', left: '-10%' }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', bottom: '-5%', right: '-5%' }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-[#002B54] via-[#005596] to-[#0FC2F8] rounded-full mx-auto" />
          </motion.div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            <TextReveal text={t.services.title} delay={0.1} />
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-blue-200/80 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col h-full border border-blue-100/60 relative overflow-hidden">
                  {/* Top Animated Gradient Border */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#002B54] via-[#005596] to-[#0FC2F8] rounded-t-2xl" />

                  {/* Soft Background Radial Glow on Hover */}
                  <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-cyan-400/10 via-blue-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Animated Icon Badge */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002B54]/10 to-[#0FC2F8]/20 flex items-center justify-center text-[#00346D] border border-blue-200/50 shadow-inner"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon className="w-8 h-8 text-[#002B54]" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center min-h-[3.5rem] flex items-center justify-center"
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <div className="mb-8 min-h-[4rem]">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg text-center whitespace-pre-line">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8 flex-grow flex flex-col justify-start">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">
                      {t.services.title}
                    </h4>
                    <ul className="space-y-3.5">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 group/item transition-transform duration-200 hover:translate-x-1"
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#0FC2F8] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 text-base leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <MagneticButton
                    className="w-full bg-gradient-to-r from-[#002B54] to-[#0FC2F8] text-white py-3.5 px-6 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 text-base md:text-lg shimmer-btn btn-glow hover:opacity-95 hover:shadow-lg hover:shadow-cyan-500/25 group-hover:scale-[1.02]"
                    onClick={() => window.location.href = service.href}
                  >
                    <span>{service.ctaText}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
