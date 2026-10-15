// frontend/src/components/Header.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { language, toggleLanguage, t } = useLanguage();
  const router = useRouter();

  // Keep track of scroll for subtle shadow enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [router.pathname]);

  const navigationItems = [
    { key: "home", path: "/", label: t.nav.home },
    { key: "consulting", path: "/consulting", label: t.nav.consulting },
    { key: "formation", path: "/formation", label: t.nav.formation },
    { key: "experience", path: "/experience", label: t.nav.experience },
    { key: "blog", path: "/blog", label: t.nav.blog },
    { key: "about", path: "/about", label: t.nav.about },
    { key: "contact", path: "/contact", label: t.nav.contact },
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
  };

  const handleDropdownToggle = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 ${
        scrolled
          ? "shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
          : "shadow-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Bandeau au-dessus du menu */}
      <div className="bg-gradient-to-r from-[#001833] via-[#002B54] to-[#005596] text-white border-b border-cyan-400/20 py-1.5 sm:py-2 px-4 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Link
            href="/veille"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-white hover:text-cyan-200 transition-colors"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wide">
              {language === 'fr' ? 'Veille réglementaire' : 'Regulatory Watch'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-300 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo height="40" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-sm xl:text-[15px]">
            {navigationItems.map((item) => (
              <div key={item.key} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-1 transition-colors font-medium text-gray-700 hover:text-[#00346D] ${
                        isActivePath(item.path) ? "text-[#00346D] font-semibold" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              href={dropdownItem.path}
                              className="block px-4 py-2 text-gray-700 hover:text-[#00346D] hover:bg-gray-50 transition-colors"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`transition-colors font-medium ${
                      item.key === "contact"
                        ? `px-4 py-2 rounded-full transition-all duration-200 ${
                            isActivePath(item.path)
                              ? "bg-[#00346D] text-white shadow-sm"
                              : "border-2 border-[#00346D] text-[#00346D] hover:bg-[#00346D] hover:text-white"
                          }`
                        : `text-gray-700 hover:text-[#00346D] ${
                            isActivePath(item.path) ? "text-[#00346D] font-semibold" : ""
                          }`
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleLanguage}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border border-gray-200 bg-gray-50/80 text-gray-700 hover:border-[#00346D] hover:text-[#00346D]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Changer de langue"
              title="Changer de langue (FR / EN)"
            >
              <span className={language === "fr" ? "font-bold text-[#00346D]" : "opacity-60"}>FR</span>
              <span className="mx-1.5 opacity-30">/</span>
              <span className={language === "en" ? "font-bold text-[#00346D]" : "opacity-60"}>EN</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  <Link
                    href={item.path}
                    className={`block px-4 py-2 text-gray-700 hover:text-[#00346D] hover:bg-gray-50 rounded-lg transition-colors ${
                      isActivePath(item.path)
                        ? item.key === "contact"
                          ? "text-[#00346D] bg-white border-2 border-[#00346D]"
                          : "text-[#00346D] bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          href={dropdownItem.path}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#00346D] hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
