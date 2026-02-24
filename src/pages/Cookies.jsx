// frontend/src/pages/Cookies.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Cookies",
    content: (
      <>
        <p className="text-gray-700 mb-3">Le site utilise des cookies pour :</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>Mesurer l'audience</li>
          <li>Améliorer l'expérience utilisateur</li>
          <li>Assurer le bon fonctionnement de certaines fonctionnalités</li>
        </ul>
        <p className="text-gray-700">
          Lors de votre première visite, un bandeau de gestion du consentement vous permet
          d'accepter ou de refuser tout ou partie des cookies.
          Vous pouvez également gérer les cookies via les paramètres de votre navigateur.
        </p>
      </>
    ),
  },
  {
    title: "Sécurité",
    content: (
      <p className="text-gray-700">
        Customs Engineering Solutions met en œuvre toutes les mesures techniques et
        organisationnelles nécessaires pour garantir la sécurité et la confidentialité des données
        personnelles.
      </p>
    ),
  },
  {
    title: "Modifications",
    content: (
      <p className="text-gray-700">
        La présente politique peut être modifiée à tout moment afin de garantir sa conformité avec
        la législation en vigueur. Nous vous conseillons de consulter régulièrement cette page.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p className="text-gray-700">
        Pour toute question concernant cette politique de cookies, vous pouvez nous contacter à
        l'adresse suivante : <strong>martusiochenot@customs-solutions.fr</strong>
      </p>
    ),
  },
];

const Cookies = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-800 text-sm mb-10 transition-colors"
        >
          ← Retour à l'accueil
        </Link>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-12">
          Politique de Cookies
        </h1>

        {/* Section cards */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-2">{section.content}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Dernière mise à jour : 15 janvier 2025
        </p>
      </div>
    </motion.div>
  );
};

export default Cookies;