import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: t.services.consulting.features,
      ctaText: t.consulting.hero.cta,
      href: "/consulting",
    },
    {
      title: t.services.formation.title,
      description: t.services.formation.description,
      features: t.services.formation.features,
      ctaText: t.formation.hero.cta,
      href: "/formation",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t.services.title}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-2"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                {service.title}
              </h3>

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
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-950 rounded-full mt-2.5 mr-3 md:mr-4 flex-shrink-0"></span>
                        <span className="text-gray-700 text-base md:text-lg leading-relaxed flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={service.href}
                className="w-full bg-blue-950 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-semibold hover:bg-blue-900 transition-all duration-300 inline-flex items-center justify-center space-x-2 group-hover:scale-105 text-base md:text-lg hover:scale-105"
              >
                <span>{service.ctaText}</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
