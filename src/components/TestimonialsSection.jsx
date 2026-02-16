// frontend/src/components/TestimonialsSection.jsx
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Building,
  CheckCircle,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      id: 1,
      name: "Javier Madina",
      position: "EMEA Crop Protection Order Fulfillment and Logistics leader",
      company: "Corteva Agriscience",
      image: "/Content/LinkedPH.png",
      rating: 5,
      text: "As a former manager of Marianne at Dow AgroSciences SAS I strongly recommend her positions in the International Trade Compliance/ International Trade Operations area due to her high interpersonal skills, professionalism, thorough knowledge and work commitment.",
      date: "2 décembre 2018",
    },
    {
      id: 2,
      name: "Michelina Mammone",
      position: "European Customs Coordinator",
      company: "Dow Corning",
      image: "/Content/LinkedPH.png",
      rating: 5,
      text: "Marianne has an extensive knowledge in customs legislation and customs operations. She put in place the Centralized Clearance System gathering 6 different Dow France sites. She is analytical, knows the figures, is an expert in excel.",
      date: "8 décembre 2017",
    },
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[currentTestimonial];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-950/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-400/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t.experience.testimonials}
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10 lg:p-12 relative border border-gray-100/80"
            >
              {/* Decorative gradient corner */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-950/5 to-transparent rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-400/5 to-transparent rounded-br-2xl" />

              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 md:top-8 left-6 md:left-8"
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Quote className="h-8 w-8 md:h-10 md:w-10 text-blue-950/20" />
              </motion.div>

              <div className="relative">
                {/* Testimonial Text */}
                <div className="mb-8 md:mb-10 lg:mb-12 mt-4 md:mt-6">
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed px-4 md:px-8 text-justify italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>

                {/* Client Info */}
                <div className="flex flex-col items-center space-y-4 md:space-y-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full blur-md opacity-30 scale-110" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-blue-950 shadow-lg relative z-10"
                    />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-lg md:text-xl lg:text-2xl mb-1 md:mb-2">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-950 font-medium text-base md:text-lg mb-2 md:mb-3">
                      {testimonial.position}
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                      <Building className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <span className="text-gray-600 text-sm md:text-base">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-6 md:space-x-8 mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={prevTestimonial}
              className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.1, backgroundColor: "#172554", color: "white" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 md:space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentTestimonial ? 1 : -1);
                    setCurrentTestimonial(index);
                  }}
                  className={`h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-blue-950 to-cyan-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-3"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  layout
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.1, backgroundColor: "#172554", color: "white" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
