import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };
  const footerLinks = {
    services: [
      { label: "Consulting Douanier", path: "/consulting" },
      { label: "Formation", path: "/formation" },
      { label: "Audit & Conformité", path: "/consulting" },
      { label: "Expérience Client", path: "/experience" },
    ],
    company: [
      { label: "À Propos", path: "/about" },
      { label: "Notre Équipe", path: "/about" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
    ],
    legal: [
      { label: t.footer.legal, path: "/legal" },
      { label: t.footer.privacy, path: "/privacy" },
      { label: t.footer.cookies, path: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info - positioned left */}
            <div className="lg:pl-0 lg:justify-self-start">
              <h3 className="text-xl font-bold mb-4">{t.footer.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            {/* Quick Links - positioned center */}
            <div className="lg:px-4 lg:justify-self-center">
              <h4 className="text-lg font-semibold mb-6">{t.footer.links}</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/consulting"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.nav.consulting}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formation"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.nav.formation}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experience"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.nav.experience}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact - positioned right */}
            <div className="lg:px-4 lg:justify-self-end">
              <h4 className="text-lg font-semibold mb-6">{t.footer.contact}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-white" />
                  <a
                    href={`tel:${t.footer.info.phone}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.info.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-white" />
                  <a
                    href={`mailto:${t.footer.info.email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.info.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-gray-400">
                    {t.footer.info.location}
                  </span>
                </div>
                <div className="mt-4">
                  <a
                    href={t.footer.info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Legal - positioned center */}
            <div className="lg:pr-0 lg:justify-self-center">
              <h4 className="text-lg font-semibold mb-6">{t.legal.title}</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/legal"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.legal}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.cookies}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm whitespace-pre-line">
              {t.misc.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
