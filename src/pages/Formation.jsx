// frontend/src/pages/Formation.jsx - Simplified Version
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, Award, Clock, Target, ChevronDown, X, HelpCircle, BookOpen, ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "../components/TextReveal";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";

const Formation = () => {
  const { t, language } = useLanguage();
  const currentLanguage = language || 'fr';
  const [isDesktop, setIsDesktop] = useState(false);
  const [remoteTrainings, setRemoteTrainings] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  useEffect(() => {
    fetch('/api/formation')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && data.data) setRemoteTrainings(data.data);
      })
      .catch(() => {});
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    training: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSelectTrainingAndContact = (trainingTitle) => {
    setFormData((prev) => ({ ...prev, training: trainingTitle }));
    setSelectedTraining(null);
    setTimeout(() => {
      const el = document.getElementById('contact-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

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
          language: currentLanguage || 'fr',
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
      <section className="pt-32 pb-14 md:pt-40 md:pb-16 bg-gradient-to-r from-[#002B54] via-[#004f8f] to-[#0078bd] relative overflow-hidden">
        {/* Discrete circular overlay shapes for depth */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-white/10 bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-white/5 bg-white/[0.02] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        {/* Animated glowing orb */}
        <motion.div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative rotating circle contour */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-52 h-52 border border-cyan-300/15 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        {/* Title Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold melissa2 text-white leading-tight flex justify-center items-center">
            <TextReveal text={t.nav.formation} delay={0.1} />
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      <section className="py-14 md:py-18 bg-section-tint relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        {/* Removed decorative large quote mark */}
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
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light italic whitespace-pre-line"
            style={{ textAlign: 'center' }}
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
              <p className="whitespace-pre-line" style={{ textAlign: 'center' }}>
                {t.formation.hero.subtitle}
              </p>
              <p style={{ textAlign: 'center' }}>
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
            {(remoteTrainings?.[currentLanguage]?.length ? remoteTrainings[currentLanguage] : trainings).map((training, index) => (
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
                  onClick={() => setSelectedTraining(training)}
                  className="w-full bg-blue-950 text-white py-3 rounded-full font-semibold hover:bg-cyan-600 transition-all duration-300 mt-auto flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-lg"
                >
                  <span>{currentLanguage === 'en' ? 'Learn more' : 'En savoir plus'}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
                      <option value=""></option>
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

      {/* Modal Window for "En savoir plus" */}
      <AnimatePresence>
        {selectedTraining && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              className="fixed inset-0 bg-[#040E25]/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTraining(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 z-10 border border-blue-100 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top Accent Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-950 via-cyan-400 to-blue-950 flex-shrink-0" />

              {/* Modal Content - Scrollable */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-cyan-100/80 text-cyan-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                      {currentLanguage === 'en' ? 'Training Program' : 'Programme de formation'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      {selectedTraining.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTraining(null)}
                    aria-label="Fermer"
                    className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtitle / Intro */}
                {selectedTraining.description && (
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic border-l-4 border-cyan-400 pl-4 py-2 bg-slate-50 rounded-r-xl">
                    "{selectedTraining.description}"
                  </p>
                )}

                {/* Key badges / specs - Spacious 2-row layout */}
                <div className="space-y-2.5 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Durée */}
                    <div className="flex items-center space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                      <div className="w-9 h-9 rounded-lg bg-cyan-100/80 flex items-center justify-center flex-shrink-0 text-cyan-800">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                          {currentLanguage === 'en' ? 'Duration' : 'Durée'}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 block">
                          {selectedTraining.duration || (currentLanguage === 'en' ? 'Tailored' : 'Sur mesure')}
                        </span>
                      </div>
                    </div>

                    {/* Prérequis */}
                    <div className="flex items-center space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                      <div className="w-9 h-9 rounded-lg bg-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-900">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                          {currentLanguage === 'en' ? 'Prerequisites' : 'Prérequis'}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 block">
                          {selectedTraining.prerequisites || (currentLanguage === 'en' ? 'None' : 'Aucun')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Public visé - Pleine largeur pour éviter tout chevauchement */}
                  <div className="flex items-start space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100/80 flex items-center justify-center flex-shrink-0 text-indigo-900 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                        {currentLanguage === 'en' ? 'Target Audience' : 'Public visé'}
                      </span>
                      <span className="text-sm text-gray-800 leading-relaxed block mt-0.5">
                        {selectedTraining.targetAudience || (currentLanguage === 'en' ? 'All teams' : 'Tous collaborateurs')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                {selectedTraining.objectives && selectedTraining.objectives.filter(Boolean).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3 flex items-center space-x-2">
                      <Target className="w-4 h-4 text-cyan-600" />
                      <span>{currentLanguage === 'en' ? 'Training Objectives' : 'Objectifs pédagogiques'}</span>
                    </h4>
                    <div className="space-y-2.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                      {selectedTraining.objectives.filter(Boolean).map((obj, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed syllabus / modules */}
                {selectedTraining.details && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3 flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-cyan-600" />
                      <span>{currentLanguage === 'en' ? 'Detailed Program & Modules' : 'Programme détaillé'}</span>
                    </h4>
                    <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-gray-200/80 text-sm text-gray-800 leading-relaxed space-y-3 font-sans">
                      {selectedTraining.details.split('\n\n').map((block, idx) => {
                        const lines = block.split('\n');
                        const header = lines[0];
                        const items = lines.slice(1);
                        const isModule = header.trim().toLowerCase().startsWith('module');
                        return (
                          <div key={idx} className={isModule ? "p-3.5 bg-white rounded-xl border border-gray-200/60 shadow-sm" : ""}>
                            <p className={isModule ? "font-bold text-blue-950 text-sm mb-2" : "font-semibold text-gray-900 text-sm mb-1"}>
                              {header}
                            </p>
                            {items.length > 0 && (
                              <ul className="space-y-1.5 pl-1">
                                {items.map((line, lIdx) => (
                                  <li key={lIdx} className="text-xs sm:text-sm text-gray-700 flex items-start space-x-2">
                                    <span className="text-cyan-600 font-bold leading-tight select-none">•</span>
                                    <span className="leading-relaxed">{line.replace(/^[•\-\*]\s*/, '')}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedTraining(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors shadow-sm order-2 sm:order-1"
                >
                  {currentLanguage === 'en' ? 'Close' : 'Fermer'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTrainingAndContact(selectedTraining.title)}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-950 hover:bg-cyan-600 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 order-1 sm:order-2"
                >
                  <span>{currentLanguage === 'en' ? 'Request this training' : 'Demander cette formation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Formation;
