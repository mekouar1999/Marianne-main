// frontend/src/components/HeroSlider.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

// Floating particle component
// Position is set via CSS `left`/`top` (supports percent strings).
// Particle movement uses transform offsets (numeric) to avoid mixing unit types.
const FloatingParticle = ({ delay, duration, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-white/10"
    style={{ width: typeof size === "number" ? `${size}px` : size, height: typeof size === "number" ? `${size}px` : size, left: x, top: y }}
    initial={{ translateX: 0, translateY: 0, opacity: 0, scale: 0 }}
    animate={{
      translateY: [0, -100, 0],
      translateX: [0, 30, -20, 0],
      opacity: [0, 0.6, 0.3, 0],
      scale: [0, 1, 0.8, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const HeroSlider = () => {
  const { t } = useLanguage();

  const particles = [
    { delay: 0, duration: 6, x: "10%", y: "20%", size: 6 },
    { delay: 1, duration: 8, x: "80%", y: "30%", size: 4 },
    { delay: 2, duration: 7, x: "30%", y: "70%", size: 8 },
    { delay: 0.5, duration: 9, x: "60%", y: "50%", size: 5 },
    { delay: 3, duration: 6, x: "90%", y: "60%", size: 3 },
    { delay: 1.5, duration: 7, x: "15%", y: "80%", size: 7 },
    { delay: 2.5, duration: 8, x: "70%", y: "15%", size: 4 },
    { delay: 4, duration: 6, x: "45%", y: "85%", size: 6 },
  ];

  // Letter animation for title
  const titleText = "CUSTOMS ENGINEERING SOLUTIONS";
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.5 + i * 0.03,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img
          src="/Content/PREMIERE PHOTO PAGE D'ACCUEIL.jpg"
          alt={t.hero.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay" />
      
      {/* Animated mesh overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Animated gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, #0FC2F8, #00346D, #0FC2F8, transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-white text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative line above title */}
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Main Title - Letter by letter animation */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight perspective-1000">
              {titleText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle with slide-up */}
            <motion.h2
              className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-8 opacity-90"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              {t.hero.title}
            </motion.h2>

            {/* Description Content */}
            <motion.div
              className="max-w-[53rem] mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              <div className="space-y-5">
                <p
                  className="text-base md:text-lg leading-relaxed md:leading-loose opacity-85 text-shadow"
                  dangerouslySetInnerHTML={{ __html: t.hero.subtitle }}
                />
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
