import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

            setCount(Math.floor(progress * end));

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
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-950"
    >
      + {count}
      {suffix && suffix !== "+" ? suffix : ""}
    </span>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      number: 20,
      label: t.stats.experience,
    },
    {
      number: 200,
      label: t.stats.formations,
    },
    {
      number: 300,
      label: t.stats.clients,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 md:mb-6">
                <AnimatedCounter end={stat.number} duration={2.5} />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed px-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
