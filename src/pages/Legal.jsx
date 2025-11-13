// frontend/src/pages/Legal.jsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Legal = () => {
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
            Mentions légales
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Informations légales et réglementaires
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
              <h2>Éditeur du site</h2>
              <p className="text-justify">
                Le présent site, accessible à l'adresse customs-engineering-solutions.com est édité par :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p>
                  <strong>Customs Engineering Solutions</strong>
                </p>
                <p>
                  <strong>Statut :</strong> Société par actions simplifiée
                </p>
                <p>
                  <strong>SIRET :</strong> 87913830300026
                </p>
                <p>
                  <strong>Adresse :</strong> 12 rue Defly 06000 Nice, France
                </p>
              </div>

              <h2>Directeur de la publication</h2>
              <p className="text-justify">Marianne Artusio-Chenot</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>martusiochenot@customs-solutions.fr</span>
                </div>
              </div>

              <h2>Conception et développement du site</h2>
              <p className="text-justify">
                Le site a été conçu et développé par
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p>
                  <strong>Melissa BONNET</strong>
                </p>
                <p>
                  <strong>Adresse :</strong> 15 avenue des moulins, 06670 Saint-Martin-du-Var
                </p>
                <p>
                  <strong>Contact :</strong> contact@melissabonnet.fr
                </p>
                <p>
                  <strong>Site web :</strong> https://www.melissabonnet.fr/
                </p>
              </div>

              <h2>Hébergement</h2>
              <p className="text-justify">
                Le site est hébergé par la société <strong>OVH SAS</strong>
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p>
                  <strong>Adresse :</strong> 2 rue Kellermann – 59100 Roubaix – France
                </p>
                <p>
                  <strong>Site web :</strong> https://www.ovhcloud.com/fr/
                </p>
              </div>

              <h2>Activité du site</h2>
              <p className="text-justify">
                Le site customs-engineering-solutions.com est un site vitrine ayant pour objectif de présenter
                les prestations et services proposés par Customs Engineering Solutions. L'entreprise est
                spécialisée en douane et commerce international pour les entreprises industrielles,
                commerciales et financières ayant des activités transfrontalières de biens et de services au
                sein de l'Union européenne.
              </p>

              <h2>Données personnelles</h2>
              <p className="text-justify">
                Conformément au Règlement Général sur la Protection des Données (RGPD), les données
                collectées via le formulaire de contact sont utilisées uniquement pour répondre aux
                demandes des utilisateurs. Aucune information personnelle n'est cédée à des tiers.
              </p>
              <p className="text-justify">
                Vous disposez d'un droit d'accès, de rectification ou de suppression de vos données
                personnelles. Pour exercer ce droit, veuillez contacter : <strong>martusiochenot@customs-solutions.fr</strong>
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

export default Legal;