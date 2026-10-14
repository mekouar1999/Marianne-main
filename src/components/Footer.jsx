import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ObfuscatedEmail from "./ObfuscatedEmail";
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
  User,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

const Footer = () => {
  const { t, language } = useLanguage();
  const router = useRouter();
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
      { label: "Veille Réglementaire", path: "/veille" },
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
    <footer className="bg-gradient-to-br from-[#021832] via-[#052852] to-[#0a386d] text-white relative overflow-hidden z-50">
      {/* Decorative ambient gradients to make the logo pop */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="absolute -top-12 -left-12 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="mb-4">
                <Link href="/">
                  <span className="inline-block cursor-pointer">
                    <img
                      src="/Content/p.png"
                      alt="Customs Engineering Solutions"
                      className="h-14 sm:h-16 w-auto max-w-[220px] object-contain drop-shadow-sm"
                    />
                  </span>
                </Link>
              </div>
              <p className="text-blue-100/70 mb-6 text-left whitespace-pre-line text-sm leading-relaxed max-w-sm">
                {t.footer.description}
              </p>
            </div>

            {/* Navigation (2 blocks side-by-side) */}
            <div className="lg:col-span-5">
              <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">
                {language === 'fr' ? 'Navigation' : 'Navigation'}
              </h4>
              <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-3">
                {/* 1er bloc */}
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.home}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/consulting"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.consulting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/formation"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.formation}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experience"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.experience}
                    </Link>
                  </li>
                </ul>

                {/* 2ème bloc */}
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.about}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.blog}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/veille"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.veille || "Veille réglementaire"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {t.nav.contact}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold mb-6 text-white tracking-wide">{t.footer.contact}</h4>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-white flex-shrink-0" />
                  <a
                    href={`tel:${t.footer.info.phone}`}
                    className="text-gray-300 hover:text-white transition-colors leading-none"
                  >
                    {t.footer.info.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-white flex-shrink-0" />
                  <ObfuscatedEmail
                    user="martusiochenot"
                    domain="customs-solutions"
                    tld="fr"
                    className="text-gray-300 hover:text-white transition-colors leading-none"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-gray-300 leading-none">
                    {t.footer.info.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={t.footer.info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                    <span className="leading-none">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            <p className="text-blue-100/70 text-sm text-center md:text-left">
              {t.misc.copyright}
            </p>
            <div className="flex items-center space-x-4">
              {/* Legal Links */}
              <Link href="/legal" className="text-blue-100/70 hover:text-white text-sm transition-colors">
                {t.footer.legal}
              </Link>
              <Link href="/privacy" className="text-blue-100/70 hover:text-white text-sm transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/cookies" className="text-blue-100/70 hover:text-white text-sm transition-colors">
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 