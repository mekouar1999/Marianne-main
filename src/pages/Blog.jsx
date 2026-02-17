// frontend/src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Blog = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blog?language=${language}&published=true`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data || []);
        } else {
          console.error('Failed to fetch posts');
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  const categories = [
    { key: "all", label: t.misc.allCategories },
    { key: "regulation", label: language === "fr" ? "Réglementation" : "Regulation" },
    { key: "international", label: language === "fr" ? "Commerce International" : "International Trade" },
    { key: "training", label: t.nav.formation },
    { key: "digitalization", label: language === "fr" ? "Digitalisation" : "Digitalization" },
    { key: "optimization", label: language === "fr" ? "Optimisation" : "Optimization" },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || 
      (post.categories && post.categories.some(cat => 
        cat.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory === "regulation" && cat.toLowerCase().includes("réglementation") ||
        selectedCategory === "international" && cat.toLowerCase().includes("commerce") ||
        selectedCategory === "training" && cat.toLowerCase().includes("formation") ||
        selectedCategory === "digitalization" && cat.toLowerCase().includes("digitalisation") ||
        selectedCategory === "optimization" && cat.toLowerCase().includes("optimisation")
      ));
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPost = posts[0];

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-modern-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 melissa2 text-white leading-tight"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            {t.blog.title}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-100 max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {t.blog.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.blog.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative">
                  <img
                    src={
                      featuredPost.imageData?.data 
                        ? `data:${featuredPost.imageData.contentType};base64,${featuredPost.imageData.data}`
                        : featuredPost.image || '/uploads/default-blog.jpg'
                    }
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/uploads/default-blog.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-950 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t.misc.featuredArticle}
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-end">

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center space-x-2 text-blue-950 hover:text-blue-800 font-medium"
                    >
                      <span>{t.blog.readMore}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative">
                    <img
                      src={
                        post.imageData?.data 
                          ? `data:${post.imageData.contentType};base64,${post.imageData.data}`
                          : post.image || '/uploads/default-blog.jpg'
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/uploads/default-blog.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.categories[0]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-950 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-end">

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-950 hover:text-blue-800 text-sm font-medium"
                      >
                        <span>{t.blog.readMore}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === index + 1
                        ? "bg-blue-950 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
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
    </motion.div>
  );
};

export default Blog;