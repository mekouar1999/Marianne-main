// frontend/src/pages/Veille.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Scale,
  ShieldCheck,
  ChevronDown,
  BookOpen,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from '../components/TextReveal';

const Veille = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/veille?language=${language}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data || []);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching veille posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  const categories = [
    { key: 'all', label: language === 'fr' ? 'Toutes les thématiques' : 'All topics' },
    { key: 'ue', label: language === 'fr' ? 'Réglementation UE' : 'EU Regulation' },
    { key: 'fiscalite', label: language === 'fr' ? 'Fiscalité & Carbone' : 'Tax & CBAM' },
    { key: 'normes', label: language === 'fr' ? 'Environnement & Normes' : 'Environment & Standards' },
    { key: 'origine', label: language === 'fr' ? 'Origine & Accords' : 'Origin & Agreements' },
  ];

  const filteredPosts = posts.filter((post) => {
    const textSummary = post.excerpt || post.summary || '';
    const titleMatch = (post.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const excerptMatch = textSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || excerptMatch;

    if (selectedCategory === 'all') return matchesSearch;

    const cat = (post.category || '').toLowerCase();
    let matchesCategory = false;
    if (selectedCategory === 'ue') matchesCategory = cat.includes('ue') || cat.includes('cdu') || cat.includes('réglementation');
    else if (selectedCategory === 'fiscalite') matchesCategory = cat.includes('fiscal') || cat.includes('carbone') || cat.includes('cbam') || cat.includes('macf');
    else if (selectedCategory === 'normes') matchesCategory = cat.includes('norme') || cat.includes('déforestation') || cat.includes('environnement');
    else if (selectedCategory === 'origine') matchesCategory = cat.includes('origine') || cat.includes('accord') || cat.includes('pem');
    else matchesCategory = cat.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section with Lightened Marine Gradient */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-16 bg-gradient-to-r from-[#002B54] via-[#004f8f] to-[#0078bd] relative overflow-hidden">
        {/* Discrete circular overlay shapes for depth */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-white/10 bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-white/5 bg-white/[0.02] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        {/* Animated glowing orb */}
        <motion.div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Title Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold melissa2 text-white leading-tight flex justify-center items-center">
            <TextReveal text={t.veille?.title || 'Veille réglementaire'} delay={0.1} />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 bg-slate-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.veille?.search || 'Rechercher une actualité...'}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent text-sm text-gray-900 shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full md:w-auto pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent appearance-none bg-white text-sm text-gray-800 shadow-sm font-medium"
                >
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Posts Grid - Pure elegant text cards without photos */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm animate-pulse flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="h-5 w-28 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 rounded mt-6"></div>
                </div>
              ))}
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/70 rounded-2xl border border-dashed border-gray-300 max-w-xl mx-auto px-6">
              <Scale className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {language === 'fr' ? 'Aucun post trouvé' : 'No posts found'}
              </h3>
              <p className="text-gray-500 text-sm">
                {language === 'fr'
                  ? 'Essayez de modifier votre recherche ou de sélectionner une autre thématique.'
                  : 'Try modifying your search or selecting another topic.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentPosts.map((post, index) => {
                const dateStr = post.publishedAt || post.createdAt;
                const formattedDate = dateStr
                  ? new Date(dateStr).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '';

                return (
                  <motion.article
                    key={post._id || post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl border border-gray-200/90 hover:border-cyan-400/60 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between overflow-hidden relative"
                  >
                    {/* Top gradient highlight on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002B54] via-blue-600 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <Link href={`/veille/${post.slug}`} className="p-7 sm:p-8 flex flex-col h-full justify-between">
                      <div>
                        {/* Meta row: Category pill + Date */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full font-semibold bg-blue-50 text-[#002B54] border border-blue-100/80 group-hover:bg-[#002B54] group-hover:text-white transition-colors">
                            <Tag className="w-3 h-3 mr-1.5 opacity-70" />
                            {post.category || (language === 'fr' ? 'Réglementation' : 'Regulation')}
                          </span>
                          {formattedDate && (
                            <span className="flex items-center text-gray-400 font-medium">
                              <Calendar className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                              {formattedDate}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#002B54] transition-colors leading-snug">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4 font-normal">
                          {post.excerpt || post.summary}
                        </p>
                      </div>

                      {/* Footer CTA */}
                      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                          {language === 'fr' ? '3 min de lecture' : '3 min read'}
                        </span>

                        <span className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#002B54] group-hover:text-cyan-600 transition-colors">
                          <span>{t.veille?.readMore || 'Lire le post'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex justify-center">
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all text-sm ${
                      currentPage === index + 1
                        ? 'bg-[#002B54] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Advisory CTA Banner */}
      <section className="py-14 bg-slate-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#002B54] via-[#004f8f] to-[#0078bd] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 melissa2">
                {language === 'fr'
                  ? 'Une question sur l’impact d’une réglementation ?'
                  : 'Questions about the impact of a new regulation?'}
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base mb-6 font-light">
                {language === 'fr'
                  ? 'Notre experte douanière vous accompagne dans l’analyse d’impact et la mise en conformité de vos flux import/export.'
                  : 'Our customs expert supports you in impact analysis and compliance of your import/export operations.'}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[#002B54] hover:bg-cyan-50 font-semibold text-sm shadow-md transition-all hover:scale-105"
              >
                <span>{language === 'fr' ? 'Nous contacter' : 'Contact us'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Veille;
