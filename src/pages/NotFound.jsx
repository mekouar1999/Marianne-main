// frontend/src/pages/NotFound.jsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/consulting', label: 'Consulting', icon: Search },
    { to: '/formation', label: 'Formation', icon: Search },
    { to: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Animation */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4">
              4
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                0
              </motion.span>
              4
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Non Trouvée
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
              Mais ne vous inquiétez pas, nous sommes là pour vous aider !
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/">
              <motion.button
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>Retour à l'Accueil</span>
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Page Précédente</span>
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Liens Rapides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    href={link.to}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <link.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Besoin d'Aide ?
            </h2>
            <p className="text-blue-100 mb-6">
              Notre équipe est là pour vous accompagner dans vos démarches douanières.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Nous Contacter</span>
                </motion.button>
              </Link>
              
              <motion.a
                href="tel:+33123456789"
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>+33 1 23 45 67 89</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
