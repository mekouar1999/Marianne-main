// frontend/src/pages/Legal.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p className="text-gray-700 mb-4">
          Le présent site, accessible à l'adresse{" "}
          <strong>customs-engineering-solutions.com</strong> est édité par :
        </p>
        <p className="text-gray-700"><strong>Customs Engineering Solutions</strong></p>
        <p className="text-gray-700"><strong>Statut :</strong> Société par actions simplifiée</p>
        <p className="text-gray-700"><strong>SIRET :</strong> 87913830300026</p>
        <p className="text-gray-700"><strong>Adresse :</strong> 12 rue Defly 06000 Nice, France</p>
      </>
    ),
  },
  {
    title: "Directeur de la publication",
    content: (
      <>
        <p className="text-gray-700">Marianne Artusio-Chenot</p>
        <p className="text-gray-700">Email : <strong>martusiochenot@customs-solutions.fr</strong></p>
      </>
    ),
  },
  {
    title: "Conception et développement du site",
    content: (
      <>
        <p className="text-gray-700 mb-4">Le site a été conçu et développé par :</p>
        <p className="text-gray-700"><strong>Melissa BONNET</strong></p>
        <p className="text-gray-700"><strong>Adresse :</strong> 15 avenue des moulins, 06670 Saint-Martin-du-Var</p>
        <p className="text-gray-700"><strong>Contact :</strong> contact@melissabonnet.fr</p>
        <p className="text-gray-700"><strong>Site web :</strong> https://www.melissabonnet.fr/</p>
      </>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <>
        <p className="text-gray-700 mb-4">Le site est hébergé par la société <strong>OVH SAS</strong></p>
        <p className="text-gray-700"><strong>Adresse :</strong> 2 rue Kellermann – 59100 Roubaix – France</p>
        <p className="text-gray-700"><strong>Site web :</strong> https://www.ovhcloud.com/fr/</p>
      </>
    ),
  },
  {
    title: "Activité du site",
    content: (
      <p className="text-gray-700">
        Le site customs-engineering-solutions.com est un site vitrine ayant pour objectif de présenter
        les prestations et services proposés par Customs Engineering Solutions. L'entreprise est
        spécialisée en douane et commerce international pour les entreprises industrielles,
        commerciales et financières ayant des activités transfrontalières de biens et de services au
        sein de l'Union européenne.
      </p>
    ),
  },
  {
    title: "Données personnelles",
    content: (
      <>
        <p className="text-gray-700 mb-3">
          Conformément au Règlement Général sur la Protection des Données (RGPD), les données
          collectées via le formulaire de contact sont utilisées uniquement pour répondre aux
          demandes des utilisateurs. Aucune information personnelle n'est cédée à des tiers.
        </p>
        <p className="text-gray-700">
          Vous disposez d'un droit d'accès, de rectification ou de suppression de vos données
          personnelles. Pour exercer ce droit, veuillez contacter :{" "}
          <strong>martusiochenot@customs-solutions.fr</strong>
        </p>
      </>
    ),
  },
];

const Legal = () => {
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
          Mentions légales
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

export default Legal;