// frontend/src/pages/Privacy.jsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Mail, Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 melissa2 text-white leading-tight">
            Politique de confidentialité
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Protection et traitement de vos données personnelles
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
              <h2>Introduction</h2>
              <p className="text-justify">
                La présente politique de confidentialité a pour but d'informer les utilisateurs du site
                customs-engineering-solutions.com sur la manière dont sont collectées, utilisées et protégées
                leurs données personnelles.
              </p>
              <p className="text-justify">
                Customs Engineering Solutions s'engage à ce que la collecte et le traitement de vos données
                soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la
                législation française en vigueur.
              </p>

              <h2>Responsable du traitement</h2>
              <p className="text-justify">Le responsable du traitement des données est :</p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p>
                  <strong>Marianne Artusio-Chenot</strong>
                  <br />
                  12 rue Defly 06000 Nice, France
                  <br />
                  Email : martusiochenot@customs-solutions.fr
                </p>
              </div>

              <h2>Données collectées</h2>
              <p className="text-justify">Les données personnelles pouvant être collectées sur le site sont :</p>
              <ul className="space-y-1">
                <li>Nom</li>
                <li>Prénom</li>
                <li>Société</li>
                <li>Adresse e-mail</li>
                <li>Téléphone</li>
                <li>Autres informations saisies dans le champ "message" du formulaire de contact</li>
              </ul>
              <p className="text-justify">
                Ces données sont fournies volontairement par l'utilisateur lors de l'envoi d'un message via le
                formulaire de contact.
              </p>
              <p className="text-justify">
                Le site peut également collecter automatiquement des données de navigation (adresses IP,
                données de localisation, type de navigateur, etc.) par le biais de cookies, à des fins statistiques
                et d'amélioration de l'expérience utilisateur.
              </p>

              <h2>Finalités du traitement</h2>
              <p className="text-justify">Les données sont collectées pour les finalités suivantes :</p>
              <ul className="space-y-1">
                <li>Répondre aux demandes envoyées via le formulaire de contact</li>
                <li>Assurer la gestion et le bon fonctionnement du site</li>
                <li>Analyser l'audience du site et améliorer les services proposés</li>
              </ul>

              <h2>Destinataires des données</h2>
              <p className="text-justify">
                Les données collectées sont destinées uniquement à Marianne Artusio-Chenot et ne sont
                jamais cédées, louées ou vendues à des tiers.
              </p>

              <h2>Durée de conservation</h2>
              <p className="text-justify">Les données personnelles sont conservées :</p>
              <ul className="space-y-1">
                <li>Pour les demandes de contact : pendant 12 mois à compter du dernier échange</li>
                <li>Pour les cookies : jusqu'à 13 mois maximum après dépôt</li>
              </ul>

              <h2>Droits des utilisateurs</h2>
              <p className="text-justify">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données
                personnelles :
              </p>
              <ul className="space-y-1">
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition</li>
                <li>Droit à la portabilité des données</li>
              </ul>
              <p className="text-justify">
                Vous pouvez exercer ces droits en envoyant un e-mail à : martusiochenot@customs-solutions.fr
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
  );
};

export default Privacy;