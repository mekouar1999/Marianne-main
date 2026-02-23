import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Squares from "./Squares";
import TextReveal from "./TextReveal";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: t.services.consulting.features,
      ctaText: t.consulting.hero.cta,
      href: "/consulting",
      gradient: "from-blue-950 via-blue-900 to-blue-800",
      iconBg: "bg-cyan-400/20",
    },
    {
      title: t.services.formation.title,
      description: t.services.formation.description,
      features: t.services.formation.features,
      ctaText: t.formation.hero.cta,
      href: "/formation",
      gradient: "from-slate-800 via-slate-700 to-slate-600",
      iconBg: "bg-blue-400/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-mesh relative overflow-hidden">
      {/* Squares animated background */}
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#5881fe"
          hoverFillColor="#e5f1ff"
        />
      </div>

      {/* Light overlay so text stays readable */}
      <div className="absolute inset-0 z-0 bg-white/80 backdrop-blur-[1px]" />

      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-950/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow animation-delay-400" />

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
            <div className="w-16 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            <TextReveal text={t.services.title} delay={0.1} />
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
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
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group perspective-1000"
            >
              <TiltCard maxTilt={12} className="h-full">
              <div className="bg-slate-50/90 rounded-2xl p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-blue-100/60 hover:border-blue-200/80 relative overflow-hidden">
                {/* Hover gradient effect */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                {/* Animated scan line */}
                <motion.div
                  className={`absolute left-0 right-0 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100`}
                  initial={{ top: "0%" }}
                  whileHover={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>

                <div className="flex-grow">
                  <div className="mb-8 md:mb-10">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg lg:text-xl text-justify whitespace-pre-line">
                      {service.description}
                    </p>
                  </div>

                  <div className="mb-8 md:mb-10">
                    <h4 className="font-semibold text-gray-900 mb-4 md:mb-6 text-lg md:text-xl">
                      {t.services.title}
                    </h4>
                    <ul className="space-y-3 md:space-y-4">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * idx }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="w-2.5 h-2.5 bg-gradient-to-r from-blue-950 to-cyan-500 rounded-full mt-2.5 mr-3 md:mr-4 flex-shrink-0"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-gray-700 text-base md:text-lg leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <MagneticButton
                  className="w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 text-base md:text-lg shimmer-btn btn-glow"
                  onClick={() => window.location.href = service.href}
                >
                  <span>{service.ctaText}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </MagneticButton>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
