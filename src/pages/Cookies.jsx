// frontend/src/pages/Cookies.jsx
import ObfuscatedEmail from "../components/ObfuscatedEmail";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

const getSections = (language) => {
  const isEn = language === "en";
  return [
  {
    title: isEn ? "Cookies" : "Cookies",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "The site uses cookies to:" : "Le site utilise des cookies pour :"}</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          {isEn ? (
            <>
              <li>Measure audience</li>
              <li>Improve user experience</li>
              <li>Ensure the proper functioning of certain features</li>
            </>
          ) : (
            <>
              <li>Mesurer l'audience</li>
              <li>Améliorer l'expérience utilisateur</li>
              <li>Assurer le bon fonctionnement de certaines fonctionnalités</li>
            </>
          )}
        </ul>
        <p className="text-gray-700">
          {isEn
            ? "On your first visit, a consent management banner allows you to accept or refuse all or part of the cookies. You can also manage cookies via your browser settings."
            : "Lors de votre première visite, un bandeau de gestion du consentement vous permet d'accepter ou de refuser tout ou partie des cookies. Vous pouvez également gérer les cookies via les paramètres de votre navigateur."
          }
        </p>
      </>
    ),
  },
  {
    title: isEn ? "Security" : "Sécurité",
    content: (
      <p className="text-gray-700">
        {isEn
          ? "Customs Engineering Solutions implements all necessary technical and organisational measures to guarantee the security and confidentiality of personal data."
          : "Customs Engineering Solutions met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité des données personnelles."
        }
      </p>
    ),
  },
  {
    title: isEn ? "Amendments" : "Modifications",
    content: (
      <p className="text-gray-700">
        {isEn
          ? "This policy may be modified at any time to ensure compliance with current legislation. We advise you to consult this page regularly."
          : "La présente politique peut être modifiée à tout moment afin de garantir sa conformité avec la législation en vigueur. Nous vous conseillons de consulter régulièrement cette page."
        }
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p className="text-gray-700">
        {isEn
          ? "For any question regarding this cookie policy, you can contact us at : "
          : "Pour toute question concernant cette politique de cookies, vous pouvez nous contacter à l'adresse suivante : "
        }
        <ObfuscatedEmail
          user="martusiochenot"
          domain="customs-solutions"
          tld="fr"
          className="hover:underline"
        />
      </p>
    ),
  },
];
};

const Cookies = () => {
  const { t, language } = useLanguage();
  const sections = getSections(language);
  const pageTitle = t?.cookies?.title || "Politique de Cookies";
  const backLabel = language === "en" ? "← Back to home" : "← Retour à l'accueil";
  const updatedLabel = language === "en" ? "Last updated: February 24, 2026" : "Dernière mise à jour : 24 février 2026";
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
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-800 text-sm mb-10 transition-colors"
        >
          {backLabel}
        </Link>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-12">
          {pageTitle}
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
          {updatedLabel}
        </p>
      </div>
    </motion.div>
  );
};

export default Cookies;