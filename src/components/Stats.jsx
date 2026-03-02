import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Users } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          let animationId;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(
              (timestamp - startTime) / (duration * 1000),
              1
            );
            // Ease-out cubic for smoother feel
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              animationId = requestAnimationFrame(animate);
            }
          };

          animationId = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold counter-glow"
      style={{
        background: "linear-gradient(135deg, #00346D, #0FC2F8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      + {count}
      {suffix && suffix !== "+" ? suffix : ""}
    </span>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  
  const stats = [
    { number: 20, label: t.stats.experience, icon: Award },
    { number: 200, label: t.stats.formations, icon: BookOpen },
    { number: 300, label: t.stats.clients, icon: Users },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
            >
              {/* Icon above counter */}
              <motion.div
                className="flex items-center justify-center mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ background: "linear-gradient(135deg, #00346D, #0FC2F8)" }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </motion.div>
              <motion.div
                className="relative inline-block mb-4 md:mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow ring behind counter */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 to-cyan-400/10 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <AnimatedCounter end={stat.number} duration={2.5} />
              </motion.div>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed px-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>
              {/* Decorative line under each stat */}
              <motion.div
                className="w-12 h-0.5 bg-gradient-to-r from-blue-950 to-cyan-400 mx-auto mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
