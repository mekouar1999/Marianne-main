// frontend/src/pages/Legal.jsx
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

const getSections = (language) => {
  const isEn = language === "en";
  return [
  {
    title: isEn ? "Site Publisher" : "Éditeur du site",
    content: (
      <>
        <p className="text-gray-700 mb-4">
          {isEn
            ? <><strong>The site</strong>, accessible at <strong>customs-engineering-solutions.com</strong>, is published by:</>
            : <>Le présent site, accessible à l'adresse{" "}<strong>customs-engineering-solutions.com</strong> est édité par :</>
          }
        </p>
        <p className="text-gray-700"><strong>Customs Engineering Solutions</strong></p>
        <p className="text-gray-700"><strong>{isEn ? "Status" : "Statut"} :</strong> {isEn ? "Simplified joint-stock company" : "Société par actions simplifiée"}</p>
        <p className="text-gray-700"><strong>SIRET :</strong> 87913830300026</p>
        <p className="text-gray-700"><strong>{isEn ? "Address" : "Adresse"} :</strong> 12 rue Defly 06000 Nice, France</p>
      </>
    ),
  },
  {
    title: isEn ? "Publication Director" : "Directeur de la publication",
    content: (
      <>
        <p className="text-gray-700">Marianne Artusio-Chenot</p>
        <p className="text-gray-700">Email : <strong>martusiochenot@customs-solutions.fr</strong></p>
      </>
    ),
  },
  {
    title: isEn ? "Site Design and Development" : "Conception et développement du site",
    content: (
      <>
        <p className="text-gray-700 mb-4">{isEn ? "The site was designed and developed by:" : "Le site a été conçu et développé par :"}</p>
        <p className="text-gray-700"><strong>Melissa BONNET</strong></p>
        <p className="text-gray-700"><strong>{isEn ? "Address" : "Adresse"} :</strong> 15 avenue des moulins, 06670 Saint-Martin-du-Var</p>
        <p className="text-gray-700"><strong>Contact :</strong> contact@melissabonnet.fr</p>
        <p className="text-gray-700"><strong>{isEn ? "Website" : "Site web"} :</strong> https://www.melissabonnet.fr/</p>
      </>
    ),
  },
  {
    title: isEn ? "Hosting" : "Hébergement",
    content: (
      <>
        <p className="text-gray-700 mb-4">{isEn ? <>The site is hosted by <strong>OVH SAS</strong></> : <>Le site est hébergé par la société <strong>OVH SAS</strong></>}</p>
        <p className="text-gray-700"><strong>{isEn ? "Address" : "Adresse"} :</strong> 2 rue Kellermann – 59100 Roubaix – France</p>
        <p className="text-gray-700"><strong>{isEn ? "Website" : "Site web"} :</strong> https://www.ovhcloud.com/fr/</p>
      </>
    ),
  },
  {
    title: isEn ? "Site Activity" : "Activité du site",
    content: (
      <p className="text-gray-700">
        {isEn
          ? "The site customs-engineering-solutions.com is a showcase website presenting the services offered by Customs Engineering Solutions. The company specialises in customs and international trade for industrial, commercial and financial companies with cross-border activities in goods and services within the European Union."
          : "Le site customs-engineering-solutions.com est un site vitrine ayant pour objectif de présenter les prestations et services proposés par Customs Engineering Solutions. L'entreprise est spécialisée en douane et commerce international pour les entreprises industrielles, commerciales et financières ayant des activités transfrontalières de biens et de services au sein de l'Union européenne."
        }
      </p>
    ),
  },
  {
    title: isEn ? "Personal Data" : "Données personnelles",
    content: (
      <>
        <p className="text-gray-700 mb-3">
          {isEn
            ? "In accordance with the General Data Protection Regulation (GDPR), data collected via the contact form is used solely to respond to user requests. No personal information is passed to third parties."
            : "Conformément au Règlement Général sur la Protection des Données (RGPD), les données collectées via le formulaire de contact sont utilisées uniquement pour répondre aux demandes des utilisateurs. Aucune information personnelle n'est cédée à des tiers."
          }
        </p>
        <p className="text-gray-700">
          {isEn
            ? <>You have the right to access, correct or delete your personal data. To exercise this right, please contact: <strong>martusiochenot@customs-solutions.fr</strong></>
            : <>Vous disposez d'un droit d'accès, de rectification ou de suppression de vos données personnelles. Pour exercer ce droit, veuillez contacter :{" "}<strong>martusiochenot@customs-solutions.fr</strong></>
          }
        </p>
      </>
    ),
  },
];
};

const Legal = () => {
  const { t, language } = useLanguage();
  const sections = getSections(language);
  const pageTitle = t?.legal?.title || "Mentions légales";
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

export default Legal;