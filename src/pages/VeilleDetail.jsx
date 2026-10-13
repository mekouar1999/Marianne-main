// frontend/src/pages/VeilleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Scale,
  ArrowRight,
  Linkedin,
  Twitter,
  Check,
  User,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { proseClasses } from '../utils/proseClasses';

const VeilleDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { t, language } = useLanguage();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/veille/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching veille post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`/api/veille?language=${language}`);
        if (response.ok) {
          const data = await response.json();
          const filtered = (data.data || [])
            .filter((p) => p.slug !== slug)
            .slice(0, 3);
          setRelatedPosts(filtered);
        }
      } catch {
        setRelatedPosts([]);
      }
    };

    if (slug) {
      fetchRecentPosts();
    }
  }, [slug, language]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined' && post) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(post.title);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-36 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002B54]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 text-center px-4">
        <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'fr' ? 'Post réglementaire non trouvé' : 'Regulatory post not found'}
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          {language === 'fr'
            ? 'Ce post a peut-être été déplacé ou supprimé.'
            : 'This post may have been moved or removed.'}
        </p>
        <Link
          href="/veille"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#002B54] text-white rounded-xl font-medium text-sm hover:bg-[#004f8f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'fr' ? 'Retour à la veille réglementaire' : 'Back to Regulatory Watch'}</span>
        </Link>
      </div>
    );
  }

  const dateStr = post.publishedAt || post.createdAt;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Banner / Breadcrumb Header */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-12 bg-gradient-to-r from-[#002B54] via-[#004f8f] to-[#0078bd] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/veille"
            className="inline-flex items-center space-x-2 text-cyan-200 hover:text-white transition-colors text-sm font-medium mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'fr' ? 'Retour à la veille réglementaire' : 'Back to Regulatory Watch'}</span>
          </Link>

          {/* Badge & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
            <span className="inline-flex items-center px-3 py-1 rounded-full font-semibold bg-white/15 backdrop-blur-sm text-cyan-200 border border-white/20">
              <Tag className="w-3 h-3 mr-1.5 opacity-80" />
              {post.category || (language === 'fr' ? 'Réglementation' : 'Regulation')}
            </span>
            {formattedDate && (
              <span className="flex items-center text-blue-100/90 font-medium">
                <Calendar className="w-3.5 h-3.5 mr-1 text-cyan-300" />
                {formattedDate}
              </span>
            )}
            <span className="flex items-center text-blue-100/90 font-medium">
              <Clock className="w-3.5 h-3.5 mr-1 text-cyan-300" />
              {language === 'fr' ? '3 min de lecture' : '3 min read'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Author line */}
          <div className="flex items-center space-x-3 pt-2 text-sm text-blue-100">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
              M
            </div>
            <span>Marianne Artusio-Chenot — Experte Douane & Commerce International</span>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive summary highlight box */}
          {(post.excerpt || post.summary) && (
            <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-blue-50/70 border-l-4 border-[#002B54] text-gray-800 shadow-sm">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#002B54] mb-2">
                {language === 'fr' ? 'Point clé / Résumé exécutif' : 'Key Takeaways'}
              </h3>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-900">
                {post.excerpt || post.summary}
              </p>
            </div>
          )}

          {/* Rich Content */}
          <div
            className={`text-gray-800 leading-relaxed ${proseClasses}`}
            dangerouslySetInnerHTML={{
              __html: post.content?.includes('<')
                ? post.content
                : post.content
                    ?.split('\n\n')
                    .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
                    .join(''),
            }}
          />

          {/* Share & Actions Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-[#002B54]" />
                {language === 'fr' ? 'Partager ce post :' : 'Share this post:'}
              </span>
              <button
                onClick={handleShareLinkedIn}
                className="p-2.5 rounded-xl border border-gray-200 text-[#0077b5] hover:bg-blue-50 transition-colors"
                title="Partager sur LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium"
                title="Copier le lien"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600 font-semibold">Lien copié !</span>
                  </>
                ) : (
                  <span>Copier le lien</span>
                )}
              </button>
            </div>

            <Link
              href="/veille"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#002B54] hover:text-cyan-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'fr' ? 'Toutes les actualités' : 'All updates'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts: "Post récents" (using requested label) */}
      {relatedPosts.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 melissa2">
                {language === 'fr' ? 'Post récents' : 'Recent posts'}
              </h3>
              <Link
                href="/veille"
                className="inline-flex items-center space-x-1 text-sm font-semibold text-[#002B54] hover:text-cyan-600 transition-colors"
              >
                <span>{language === 'fr' ? 'Voir tout' : 'View all'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost._id || rPost.slug}
                  href={`/veille/${rPost.slug}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-cyan-400/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#002B54] mb-2">
                      {rPost.category || 'Réglementation'}
                    </div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#002B54] transition-colors line-clamp-2 mb-2">
                      {rPost.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {rPost.excerpt || rPost.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#002B54] group-hover:text-cyan-600">
                    <span>{language === 'fr' ? 'Lire le post' : 'Read post'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisory CTA banner */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#002B54] via-[#004f8f] to-[#0078bd] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 melissa2">
                {language === 'fr' ? 'Besoin d’assistance sur ce sujet ?' : 'Need guidance on this regulation?'}
              </h3>
              <p className="text-blue-100 text-sm font-light">
                {language === 'fr'
                  ? 'Contactez Marianne Artusio-Chenot pour un audit ou un accompagnement sur mesure.'
                  : 'Contact Marianne Artusio-Chenot for tailored customs advice.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-[#002B54] hover:bg-cyan-50 font-semibold text-sm transition-all flex-shrink-0 shadow-md"
            >
              <span>{language === 'fr' ? 'Prendre contact' : 'Get in touch'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VeilleDetail;
