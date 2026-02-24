// frontend/src/pages/Formation.jsx - Simplified Version
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Clock, Target, ChevronDown } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "../components/TextReveal";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";

const Formation = () => {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    training: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const trainings = [
    {
      id: "douane-operations",
      title: t.formation.trainings.douane.title,
      description: t.formation.trainings.douane.description,
    },
    {
      id: "classification",
      title: t.formation.trainings.classification.title,
      description: t.formation.trainings.classification.description,
    },
    {
      id: "incoterms",
      title: t.formation.trainings.incoterms.title,
      description: t.formation.trainings.incoterms.description,
    },
    {
      id: "accise",
      title: t.formation.trainings.accise.title,
      description: t.formation.trainings.accise.description,
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: t.formation.benefits.experts.title,
      description: t.formation.benefits.experts.description,
    },
    {
      icon: Award,
      title: t.formation.benefits.certification.title,
      description: t.formation.benefits.certification.description,
    },
    {
      icon: Clock,
      title: t.formation.benefits.flexible.title,
      description: t.formation.benefits.flexible.description,
    },
    {
      icon: Target,
      title: t.formation.benefits.custom.title,
      description: t.formation.benefits.custom.description,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "formation",
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          training: "",
          message: "",
        });
        console.log("Formation contact form submitted successfully:", data);
      } else {
        console.error("Formation contact form error:", data);
        alert(data.message || "Erreur lors de l'envoi du formulaire");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12 bg-modern-blue relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute right-16 top-20 w-44 h-44 border border-cyan-400/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold melissa2 text-white leading-tight">
            <TextReveal text={t.nav.formation} delay={0.1} />
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      <section className="py-14 md:py-18 bg-section-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        <div
          className="absolute top-[-20px] left-1/2 -translate-x-1/2 font-serif text-blue-950 select-none pointer-events-none leading-none"
          style={{ fontSize: "200px", opacity: 0.04 }}
        >
          "
        </div>
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            className="w-12 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          />
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light italic"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t.formation.hero.subtitle}
          </motion.p>
          <motion.div
            className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-950 rounded-full mx-auto mt-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-section-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300"
                  whileHover={{ rotate: 360, scale: 1.2, background: "linear-gradient(to bottom right, #1e3a8a, #0891b2)" }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-mesh relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t.formation.hero.title}
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6 max-w-3xl mx-auto">
              <p 
                className="whitespace-pre-line text-justify md:text-left"
                style={{ 
                  textJustify: 'inter-word',
                  hyphens: 'auto'
                }}
              >
                {t.formation.hero.subtitle}
              </p>
              <p 
                className="text-justify md:text-left"
                style={{ 
                  textJustify: 'inter-word',
                  hyphens: 'auto'
                }}
              >
                {t.formation.hero.description}
              </p>
            </div>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 text-lg"
              >
                {t.formation.hero.cta}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20 bg-mesh relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-950/3 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.formation.programs.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.formation.programs.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {trainings.map((training, index) => (
              <TiltCard key={training.id} maxTilt={10} className="h-full">
              <motion.div
                className="bg-slate-50/90 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col border border-blue-100/60 hover:border-blue-200/50 group relative overflow-hidden h-full"
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-950 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {training.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                  {training.description}
                </p>
                <button 
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-blue-950 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 mt-auto"
                >
                  En savoir plus
                </button>
              </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-20 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-1.5 bg-gradient-to-r from-blue-950 to-cyan-400 rounded-full mx-auto mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-600 whitespace-pre-line">
              {t.contact.subtitle}
            </p>
          </motion.div>

          {success ? (
            <motion.div
              className="text-center bg-blue-50/80 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {t.contact.success}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t.misc.followUpMessage}
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-slate-50/90 rounded-2xl p-8 shadow-lg space-y-6"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.firstName} / {t.contact.lastName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.nav.formation}
                  </label>
                  <div className="relative">
                    <select
                      name="training"
                      value={formData.training}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                      <option value="">{t.common.filter}...</option>
                      {trainings.map((training) => (
                        <option key={training.id} value={training.title}>
                          {training.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t.contact.message + '...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-950 text-white py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>{t.common.loading}</span>
                  </>
                ) : (
                  <span>{t.contact.send}</span>
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Formation;
