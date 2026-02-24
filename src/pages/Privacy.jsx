// frontend/src/pages/Privacy.jsx
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

const getSections = (language) => {
  const isEn = language === "en";
  return [
  {
    title: isEn ? "Introduction" : "Introduction",
    content: (
      <>
        <p className="text-gray-700 mb-3">
          {isEn
            ? "This privacy policy aims to inform users of the site customs-engineering-solutions.com about how their personal data is collected, used and protected."
            : "La présente politique de confidentialité a pour but d'informer les utilisateurs du site customs-engineering-solutions.com sur la manière dont sont collectées, utilisées et protégées leurs données personnelles."
          }
        </p>
        <p className="text-gray-700">
          {isEn
            ? "Customs Engineering Solutions is committed to ensuring that the collection and processing of your data complies with the General Data Protection Regulation (GDPR) and applicable French legislation."
            : "Customs Engineering Solutions s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la législation française en vigueur."
          }
        </p>
      </>
    ),
  },
  {
    title: isEn ? "Data Controller" : "Responsable du traitement",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "The data controller is:" : "Le responsable du traitement des données est :"}</p>
        <p className="text-gray-700"><strong>Marianne Artusio-Chenot</strong></p>
        <p className="text-gray-700">12 rue Defly 06000 Nice, France</p>
        <p className="text-gray-700">Email : martusiochenot@customs-solutions.fr</p>
      </>
    ),
  },
  {
    title: isEn ? "Data Collected" : "Données collectées",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "Personal data that may be collected on the site includes:" : "Les données personnelles pouvant être collectées sur le site sont :"}</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          {isEn ? (
            <>
              <li>Last name</li>
              <li>First name</li>
              <li>Company</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Other information entered in the contact form</li>
            </>
          ) : (
            <>
              <li>Nom</li>
              <li>Prénom</li>
              <li>Société</li>
              <li>Adresse e-mail</li>
              <li>Téléphone</li>
              <li>Autres informations saisies dans le formulaire de contact</li>
            </>
          )}
        </ul>
        <p className="text-gray-700">
          {isEn
            ? "The site may also automatically collect browsing data (IP addresses, browser type, etc.) through cookies, for statistical purposes and to improve user experience."
            : "Le site peut également collecter automatiquement des données de navigation (adresses IP, type de navigateur, etc.) par le biais de cookies, à des fins statistiques et d'amélioration de l'expérience utilisateur."
          }
        </p>
      </>
    ),
  },
  {
    title: isEn ? "Purposes of Processing" : "Finalités du traitement",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "Data is collected for the following purposes:" : "Les données sont collectées pour les finalités suivantes :"}</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {isEn ? (
            <>
              <li>Responding to requests submitted via the contact form</li>
              <li>Ensuring the management and proper functioning of the site</li>
              <li>Analysing site traffic and improving offered services</li>
            </>
          ) : (
            <>
              <li>Répondre aux demandes envoyées via le formulaire de contact</li>
              <li>Assurer la gestion et le bon fonctionnement du site</li>
              <li>Analyser l'audience du site et améliorer les services proposés</li>
            </>
          )}
        </ul>
      </>
    ),
  },
  {
    title: isEn ? "Data Recipients" : "Destinataires des données",
    content: (
      <p className="text-gray-700">
        {isEn
          ? "Collected data is intended solely for Marianne Artusio-Chenot and is never transferred, rented or sold to third parties."
          : "Les données collectées sont destinées uniquement à Marianne Artusio-Chenot et ne sont jamais cédées, louées ou vendues à des tiers."
        }
      </p>
    ),
  },
  {
    title: isEn ? "Retention Period" : "Durée de conservation",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "Personal data is retained:" : "Les données personnelles sont conservées :"}</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {isEn ? (
            <>
              <li>For contact requests: for 12 months from the last exchange</li>
              <li>For cookies: up to 13 months maximum after deposit</li>
            </>
          ) : (
            <>
              <li>Pour les demandes de contact : pendant 12 mois à compter du dernier échange</li>
              <li>Pour les cookies : jusqu'à 13 mois maximum après dépôt</li>
            </>
          )}
        </ul>
      </>
    ),
  },
  {
    title: isEn ? "User Rights" : "Droits des utilisateurs",
    content: (
      <>
        <p className="text-gray-700 mb-3">{isEn ? "In accordance with the GDPR, you have the following rights:" : "Conformément au RGPD, vous disposez des droits suivants :"}</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          {isEn ? (
            <>
              <li>Right of access</li>
              <li>Right of rectification</li>
              <li>Right to erasure</li>
              <li>Right to restriction of processing</li>
              <li>Right to object</li>
              <li>Right to data portability</li>
            </>
          ) : (
            <>
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité des données</li>
            </>
          )}
        </ul>
        <p className="text-gray-700">
          {isEn
            ? <>You can exercise these rights by sending an email to: <strong>martusiochenot@customs-solutions.fr</strong></>
            : <>Vous pouvez exercer ces droits en envoyant un e-mail à :{" "}<strong>martusiochenot@customs-solutions.fr</strong></>
          }
        </p>
      </>
    ),
  },
];
};

const Privacy = () => {
  const { t, language } = useLanguage();
  const sections = getSections(language);
  const pageTitle = t?.privacy?.title || "Politique de confidentialité";
  const backLabel = language === "en" ? "← Back to home" : "← Retour à l'accueil";
  const updatedLabel = language === "en" ? "Last updated: January 15, 2025" : "Dernière mise à jour : 15 janvier 2025";
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

export default Privacy;