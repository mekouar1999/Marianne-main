import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const { t } = useLanguage();
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
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white relative overflow-hidden z-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-950/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
      
      {/* Main Footer Content */}
      <div className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info - positioned left */}
            <div className="lg:pl-0 lg:justify-self-start">
              <div className="mb-4">
                <Link href="/">
                  <span className="inline-block cursor-pointer">
                    <Logo invert={true} />
                  </span>
                </Link>
              </div>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t.misc.copyright}
            </p>
            
            {/* Admin Login Icon */}
            <Link href="/admin/login" className="ml-2">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                title="Admin Login"
                className="flex items-center justify-center transition-colors"
                style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 20 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
