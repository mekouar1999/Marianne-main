// frontend/src/App.jsx - Cleaned Version
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Import contexts and components
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import CookieBanner from "./components/CookieBanner";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Consulting = lazy(() => import("./pages/Consulting"));
const Formation = lazy(() => import("./pages/Formation"));
const Experience = lazy(() => import("./pages/Experience"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCreatePost = lazy(() => import("./pages/AdminCreatePost"));

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-lg">
            <div className="text-6xl mb-6">😕</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oups ! Une erreur s'est produite
            </h1>
            <p className="text-gray-600 mb-8">
              Nous nous excusons pour ce problème technique.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple Loading Component
const PageLoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <h2 className="text-2xl font-bold text-gray-900 mt-4">Chargement...</h2>
        <p className="text-gray-600 mt-2">Préparation de votre expérience...</p>
      </div>
    </div>
  );
};

// Analytics component
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update page title based on route
    const titles = {
      "/": "Customs Engineering Solutions - Votre partenaire douanes sur mesure",
      "/consulting": "Services de Consulting Douanier - CES",
      "/formation": "Formations Douanières Professionnelles - CES",
      "/experience": "Expérience Client & Témoignages - CES",
      "/about": "À Propos de Customs Engineering Solutions",
      "/contact": "Nous Contacter - CES",
      "/blog": "Blog & Actualités Douanières - CES",
      "/legal": "Mentions Légales - CES",
      "/privacy": "Politique de Confidentialité - CES",
      "/cookies": "Politique de Cookies - CES",
    };

    document.title =
      titles[location.pathname] || "Customs Engineering Solutions";
  }, [location]);

  return null;
};

// Route transition wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    const initApp = async () => {
      try {
        // Simulate app initialization
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("App initialization error:", error);
        setIsLoading(false);
      }
    };

    initApp();

    // Add global styles for smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <Analytics />

          <div className="min-h-screen bg-white antialiased">
            {/* Header */}
            <Header />

            {/* Main Content with Page Transitions */}
            <main className="relative">
              <PageTransition>
                <Suspense fallback={<PageLoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/consulting" element={<Consulting />} />
                    <Route path="/formation" element={<Formation />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/create-post" element={<AdminCreatePost />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </main>

            {/* Footer */}
            <Footer />

            {/* Additional Components */}
            <CookieBanner />

            {/* Toast Notifications */}
            <Toaster position="top-right" />
          </div>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
