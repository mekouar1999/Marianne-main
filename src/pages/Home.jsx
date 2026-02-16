import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import HeroSlider from "../components/HeroSlider";
import Services from "../components/Services";
import Stats from "../components/Stats";
import TestimonialsSection from "../components/TestimonialsSection";
import ValuePropositions from "../components/ValuePropositions";

const Home = () => {
  const { t } = useLanguage();
  const backgroundSectionRef = useRef(null);
  const parallaxSectionRef = useRef(null);

  // Scroll-based parallax animation with smooth transitions
  const { scrollYProgress } = useScroll({
    target: backgroundSectionRef,
    offset: ["start end", "end start"], // Triggers when section enters and leaves view
  });

  // Parallax section scroll animation
  const { scrollYProgress: parallaxScrollProgress } = useScroll({
    target: parallaxSectionRef,
    offset: ["start end", "end start"],
  });

  // Smoother parallax transformations
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]); // Subtle vertical shift
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1.05, 1]); // Gentle zoom effect
  const opacityBackground = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]); // Gradual fade-in

  // Parallax transformations for the new section
  const yParallax = useTransform(
    parallaxScrollProgress,
    [0, 1],
    ["-30%", "30%"]
  );
  const scaleParallax = useTransform(
    parallaxScrollProgress,
    [0, 0.5, 1],
    [1.1, 1, 0.95]
  );
  const opacityOverlay = useTransform(
    parallaxScrollProgress,
    [0, 0.5, 1],
    [0.3, 0.5, 0.7]
  );

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Services Section */}
      <div>
        <Services />
      </div>

      {/* Stats Section */}
      <div className="mt-8 md:mt-12 lg:mt-16">
        <Stats />
      </div>

      <div>
        <ValuePropositions />
      </div>

      {/* Trust Indicators */}
      <section className="pt-8 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-8 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-dots-pattern opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
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
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {t.misc.trustMessage}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8 items-center">
              {["Corteva Agriscience", "Dow Chemical", "GEFCO", "ALIS International", "VAT Solutions"].map((name, index) => (
                <motion.div
                  key={name}
                  className={`bg-gradient-to-br from-gray-50 to-gray-100 h-12 md:h-14 rounded-xl flex items-center justify-center px-4 border border-gray-200/50 hover:border-blue-200 hover:shadow-lg transition-all duration-500 group ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <span className="text-gray-600 group-hover:text-blue-950 font-semibold text-xs md:text-sm text-center transition-colors duration-300">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <div>
        <TestimonialsSection />
      </div>

      {/* Final CTA */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-950/3 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/3 rounded-full blur-3xl animate-float-slow animation-delay-400" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Background animated elements */}
          

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <span className="whitespace-pre-line">{t.misc.readyQuestion.replace('douanières ?', 'douanières\u00A0?')}</span>
            </motion.h2>

            <motion.div
              className="mb-4 md:mb-6"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-blue-950 to-blue-950 text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-semibold hover:from-blue-950 hover:to-blue-950 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 md:space-x-3 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{
                    scale: 0.95,
                    y: 0,
                    transition: { duration: 0.1 }
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  viewport={{ once: true }}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{
                      opacity: [0, 0.3, 0],
                      x: ["-100%", "100%"],
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />

                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {t.misc.learnMore}
                  </motion.span>

                  <motion.div
                    initial={{ x: 10, opacity: 0, rotate: -90 }}
                    whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
