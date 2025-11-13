// frontend/src/pages/BlogPost.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Tag,
  BookOpen,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { proseClasses } from "../utils/proseClasses";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useLanguage();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
        } else {
          console.error('Failed to fetch currentPost');
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching currentPost:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Mock currentPost data for fallback
  const mockPost = {
    _id: 1,
    title: "Nouvelles Réglementations Douanières UE 2025",
    slug: "nouvelles-reglementations-ue-2025",
    excerpt:
      "Découvrez les principales évolutions réglementaires qui impacteront vos opérations douanières cette année.",
    content: `
      <h2>Introduction</h2>
      <p>L'année 2025 marque un tournant important dans la réglementation douanière européenne. Avec l'entrée en vigueur de nouvelles directives, les entreprises doivent adapter leurs processus pour rester conformes.</p>
      
      <h2>Principales Évolutions</h2>
      <h3>1. Nouveau Système de Déclaration Électronique</h3>
      <p>Le système de déclaration électronique évolue avec de nouvelles fonctionnalités qui simplifient les démarches tout en renforçant les contrôles. Les entreprises devront migrer vers cette nouvelle plateforme avant le 31 mars 2025.</p>
      
      <h3>2. Renforcement des Contrôles d'Origine</h3>
      <p>Les contrôles sur l'origine des marchandises sont renforcés, particulièrement pour les produits en provenance de pays tiers. Une documentation plus précise sera exigée.</p>
      
      <h3>3. Nouvelles Obligations de Traçabilité</h3>
      <p>La traçabilité des marchandises devient une obligation renforcée, avec des exigences particulières pour certains secteurs comme l'agroalimentaire et la pharmacie.</p>
      
      <h2>Impact sur les Entreprises</h2>
      <p>Ces évolutions auront un impact significatif sur les opérations des entreprises. Il est essentiel de se préparer dès maintenant pour éviter les disruptions.</p>
      
      <h2>Nos Recommandations</h2>
      <ul>
        <li>Effectuer un audit de vos processus actuels</li>
        <li>Former vos équipes aux nouvelles procédures</li>
        <li>Mettre à jour vos systèmes informatiques</li>
        <li>Établir un plan de migration progressif</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>L'adaptation à ces nouvelles réglementations représente un défi mais aussi une opportunité d'optimiser vos processus douaniers. N'hésitez pas à nous contacter pour un accompagnement personnalisé.</p>
    `,
    author: "Marianne Artusio-Chenot",
    publishedAt: "2025-01-15",
    categories: ["Réglementation", "Union Européenne"],
    tags: ["douanes", "réglementation", "UE", "commerce"],
    readTime: "5 min de lecture",
    image: "https://images.unsplash.com/photo-1554774853-719586f82d77",
    language: "fr",
  };

  // Use fetched post or fallback to mock data for demo
  const currentPost = post || mockPost;
  
  // Safe client-side only operations
  const [shareUrl, setShareUrl] = useState('');
  const [shareTitle, setShareTitle] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
      setShareTitle(currentPost?.title || '');
    }
  }, [currentPost]);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article non trouvé
          </h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 truncate">{currentPost.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au blog</span>
          </Link>

          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {(currentPost.categories || []).map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(currentPost.publishedAt || new Date()).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{currentPost.readTime || '5 min de lecture'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">Partager:</span>
                <div className="flex space-x-2">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <img
              src={
                currentPost.imageData?.data 
                  ? `data:${currentPost.imageData.contentType};base64,${currentPost.imageData.data}`
                  : currentPost.image || '/uploads/default-blog.jpg'
              }
              alt={currentPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.target.src = '/uploads/default-blog.jpg';
              }}
            />
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div
              className={proseClasses}
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            {/* Tags */}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentPost.author || 'Marianne Artusio-Chenot'}
                  </h3>
                  <p className="text-gray-600">
                    Expert en conseil douanier avec plus de 20 ans d'expérience.
                    Fondatrice de Customs Engineering Solutions, elle accompagne
                    les entreprises dans l'optimisation de leurs opérations
                    douanières.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Articles Similaires
              </h2>
              <p className="text-gray-600">
                Découvrez d'autres articles qui pourraient vous intéresser
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(relatedPost.publishedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedPost.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {relatedPost.title}
                    </h3>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Lire l'article</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'Aide avec Vos Opérations Douanières ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nos experts sont là pour vous accompagner dans l'optimisation de
              vos processus douaniers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              <span>Nous Contacter</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPost;
