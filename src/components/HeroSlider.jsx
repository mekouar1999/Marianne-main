// frontend/src/components/HeroSlider.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const HeroSlider = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Content/PREMIERE PHOTO PAGE D'ACCUEIL.jpg"
          alt={t.hero.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-white text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Main Title */}
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight text-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              CUSTOMS ENGINEERING SOLUTIONS
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-8 text-shadow opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.hero.title}
            </motion.h2>

            {/* Description Content */}
            <motion.div
              className="max-w-[53rem] mx-auto" // Reduced width for better justification
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="space-y-5">
                {/* First Paragraph */}
                <p 
                  className="text-base md:text-lg leading-relaxed md:leading-loose opacity-85 text-shadow"
                  dangerouslySetInnerHTML={{ __html: t.hero.subtitle }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
