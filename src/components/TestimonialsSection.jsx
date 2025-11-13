// frontend/src/components/TestimonialsSection.jsx
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t.experience.testimonials}
          </h2>
          {/* <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Découvrez ce que nos clients disent de nos services
            </p>
          </div> */}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10 lg:p-12 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 md:top-8 left-6 md:left-8">
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-blue-950" />
            </div>

            <div className="relative">
              {/* Testimonial Text */}
              <div className="mb-8 md:mb-10 lg:mb-12 mt-4 md:mt-6">
                <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed px-4 md:px-8 text-justify">
                  "{testimonial.text}"
                </blockquote>
              </div>

              {/* Client Info */}
              <div className="flex flex-col items-center space-y-4 md:space-y-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-blue-950 shadow-lg"
                />
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
          </div>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center space-x-6 md:space-x-8 mt-8 md:mt-10">
            <button
              onClick={prevTestimonial}
              className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:bg-blue-950 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 md:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 w-3 md:h-4 md:w-4 rounded-full transition-all hover:scale-125 ${
                    index === currentTestimonial
                      ? "bg-blue-950 w-6 md:w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:bg-blue-950 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
