// frontend/src/pages/Cookies.jsx
import React from "react";
import { motion } from "framer-motion";
import { Cookie, Shield, Mail, Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cookies = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white antialiased">
      <Header />
      <motion.div
        className="bg-gray-50 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 melissa2 text-white leading-tight">
            Politique de Cookies
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Gestion et utilisation des cookies sur notre site
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <h2>Cookies</h2>
              <p className="text-justify">Le site utilise des cookies pour :</p>
              <ul className="space-y-1">
                <li>Mesurer l'audience</li>
                <li>Améliorer l'expérience utilisateur</li>
                <li>Assurer le bon fonctionnement de certaines fonctionnalités</li>
              </ul>
              <p className="text-justify">
                Lors de votre première visite, un bandeau de gestion du consentement vous permet
                d'accepter ou de refuser tout ou partie des cookies.
                Vous pouvez également gérer les cookies via les paramètres de votre navigateur.
              </p>

              <h2>Sécurité</h2>
              <p className="text-justify">
                Customs Engineering Solutions met en œuvre toutes les mesures techniques et
                organisationnelles nécessaires pour garantir la sécurité et la confidentialité des données
                personnelles.
              </p>

              <h2>Modifications</h2>
              <p className="text-justify">
                La présente politique de confidentialité peut être modifiée à tout moment afin de garantir sa
                conformité avec la législation en vigueur. Nous vous conseillons de consulter régulièrement
                cette page.
              </p>

              <h2>Contact</h2>
              <p className="text-justify">
                Pour toute question concernant cette politique de cookies, vous pouvez nous contacter à
                l'adresse suivante : <strong>martusiochenot@customs-solutions.fr</strong>
              </p>

              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dernière mise à jour : 15 janvier 2025</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </div>
  );
};

export default Cookies;