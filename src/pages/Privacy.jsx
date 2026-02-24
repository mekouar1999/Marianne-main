// frontend/src/pages/Privacy.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Privacy = () => {
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
          Politique de confidentialité
        </h1>

        {/* Section cards */}
        <div className="space-y-6">

          {[
            {
              title: "Introduction",
              content: (
                <>
                  <p className="text-gray-700 mb-3">
                    La présente politique de confidentialité a pour but d'informer les utilisateurs du site
                    customs-engineering-solutions.com sur la manière dont sont collectées, utilisées et protégées
                    leurs données personnelles.
                  </p>
                  <p className="text-gray-700">
                    Customs Engineering Solutions s'engage à ce que la collecte et le traitement de vos données
                    soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la
                    législation française en vigueur.
                  </p>
                </>
              ),
            },
            {
              title: "Responsable du traitement",
              content: (
                <>
                  <p className="text-gray-700 mb-3">Le responsable du traitement des données est :</p>
                  <p className="text-gray-700"><strong>Marianne Artusio-Chenot</strong></p>
                  <p className="text-gray-700">12 rue Defly 06000 Nice, France</p>
                  <p className="text-gray-700">Email : martusiochenot@customs-solutions.fr</p>
                </>
              ),
            },
            {
              title: "Données collectées",
              content: (
                <>
                  <p className="text-gray-700 mb-3">Les données personnelles pouvant être collectées sur le site sont :</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Nom, Prénom</li>
                    <li>Société</li>
                    <li>Adresse e-mail, Téléphone</li>
                    <li>Autres informations saisies dans le formulaire de contact</li>
                  </ul>
                  <p className="text-gray-700">
                    Le site peut également collecter automatiquement des données de navigation (adresses IP,
                    type de navigateur, etc.) par le biais de cookies, à des fins statistiques et d'amélioration
                    de l'expérience utilisateur.
                  </p>
                </>
              ),
            },
            {
              title: "Finalités du traitement",
              content: (
                <>
                  <p className="text-gray-700 mb-3">Les données sont collectées pour les finalités suivantes :</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Répondre aux demandes envoyées via le formulaire de contact</li>
                    <li>Assurer la gestion et le bon fonctionnement du site</li>
                    <li>Analyser l'audience du site et améliorer les services proposés</li>
                  </ul>
                </>
              ),
            },
            {
              title: "Destinataires des données",
              content: (
                <p className="text-gray-700">
                  Les données collectées sont destinées uniquement à Marianne Artusio-Chenot et ne sont
                  jamais cédées, louées ou vendues à des tiers.
                </p>
              ),
            },
            {
              title: "Durée de conservation",
              content: (
                <>
                  <p className="text-gray-700 mb-3">Les données personnelles sont conservées :</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Pour les demandes de contact : pendant 12 mois à compter du dernier échange</li>
                    <li>Pour les cookies : jusqu'à 13 mois maximum après dépôt</li>
                  </ul>
                </>
              ),
            },
            {
              title: "Droits des utilisateurs",
              content: (
                <>
                  <p className="text-gray-700 mb-3">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Droit d'accès</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit d'opposition</li>
                    <li>Droit à la portabilité des données</li>
                  </ul>
                  <p className="text-gray-700">
                    Vous pouvez exercer ces droits en envoyant un e-mail à :{" "}
                    <strong>martusiochenot@customs-solutions.fr</strong>
                  </p>
                </>
              ),
            },
          ].map((section, i) => (
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

export default Privacy;