import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Check if user has already accepted cookies (client-side only)
    if (typeof window !== 'undefined') {
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (!cookieConsent) {
        // Show banner after a short delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'accepted');
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'declined');
    }
    setIsVisible(false);
  };

  const cookieContent = t.cookies;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-customs-dark mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{cookieContent.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cookieContent.message}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {cookieContent.decline}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-customs-dark text-white text-sm font-medium rounded-lg hover:bg-customs-medium transition-colors"
                >
                  {cookieContent.accept}
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
