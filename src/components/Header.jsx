// frontend/src/components/Header.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { language, toggleLanguage, t } = useLanguage();
  const router = useRouter();

  // Pages that have white backgrounds and need dark header styling from the start
  const whiteBackgroundPages = [
    // All pages now use transparent header except home
  ];
  const isWhiteBackgroundPage = whiteBackgroundPages.some(
    (page) =>
      router.pathname === page || router.pathname.startsWith(page + "/")
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50 || isWhiteBackgroundPage);
    };

    // Set initial state
    setScrolled(window.scrollY > 50 || isWhiteBackgroundPage);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isWhiteBackgroundPage]);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [router.pathname]);

  const navigationItems = [
    { key: "home", path: "/", label: t.nav.home },
    { key: "consulting", path: "/consulting", label: t.nav.consulting },
    { key: "formation", path: "/formation", label: t.nav.formation },
    { key: "experience", path: "/experience", label: t.nav.experience },
    { key: "about", path: "/about", label: t.nav.about },
    { key: "blog", path: "/blog", label: t.nav.blog },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo height="40" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
                      className={`flex items-center space-x-1 transition-colors font-medium ${
                        scrolled
                          ? `text-gray-700 hover:text-[#00346D] ${
                              isActivePath(item.path) ? "text-[#00346D]" : ""
                            }`
                          : `text-white hover:text-[#00346D] ${
                              isActivePath(item.path) ? "text-[#00346D]" : ""
                            }`
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
                        ? `px-4 py-2 rounded-full ${
                            isActivePath(item.path)
                              ? "bg-white text-[#00346D] hover:bg-gray-100"
                              : scrolled
                              ? "border-2 border-[#00346D] text-[#00346D] hover:bg-[#00346D] hover:text-white"
                              : "border-2 border-white text-white hover:bg-white hover:text-[#00346D]"
                          }`
                        : scrolled
                        ? `text-gray-700 hover:text-[#00346D] ${
                            isActivePath(item.path) ? "text-[#00346D]" : ""
                          }`
                        : `text-white hover:text-[#00346D] ${
                            isActivePath(item.path) ? "text-[#00346D]" : ""
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
              className={`flex items-center space-x-1 transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-[#00346D]"
                  : "text-white hover:text-[#00346D]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/10 text-white"
              }`}
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
            className="md:hidden bg-white border-t border-gray-200"
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
