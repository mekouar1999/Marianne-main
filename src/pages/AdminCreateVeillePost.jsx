import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Scale,
  Sparkles,
} from 'lucide-react';
import BasicTextEditor from '../components/BasicTextEditor';

const CATEGORIES = [
  'Réglementation UE',
  'Fiscalité & Carbone',
  'Environnement & Normes',
  'Origine & Accords',
  'Contrôles & Sanctions',
  'Nomenclature & TARIC',
  'Procédures & Déclarations',
  'Actualité Douanière',
];

const AdminCreateVeillePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Réglementation UE',
    customCategory: '',
    excerpt: '',
    content: '',
    language: 'fr',
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.excerpt || !formData.content) {
      setError('Veuillez remplir tous les champs obligatoires (titre, résumé, contenu).');
      setLoading(false);
      return;
    }

    const selectedCategory =
      formData.category === 'Autre'
        ? formData.customCategory || 'Réglementation'
        : formData.category;

    try {
      const response = await fetch('/api/admin/veille', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          category: selectedCategory,
          excerpt: formData.excerpt,
          content: formData.content,
          language: formData.language,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || `Erreur serveur (${response.status})`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        router.push('/admin/veille');
      } else {
        setError(data.message || 'Erreur lors de la création du post.');
      }
    } catch (err) {
      console.error('Create veille post error:', err);
      setError('Impossible de joindre le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/veille"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la Veille</span>
              </Link>
              <div className="h-5 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#002B54]" />
                <h1 className="text-xl font-bold text-gray-900">Nouveau post réglementaire</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/veille')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center space-x-2 px-5 py-2 bg-[#002B54] text-white rounded-lg hover:bg-[#004f8f] transition-colors text-sm font-semibold shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Publication...' : formData.published ? 'Publier le post' : 'Sauvegarder brouillon'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Main Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Titre de l'actualité réglementaire *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="ex: Réforme du Code des Douanes de l'Union (CDU) : Déploiement du Customs Data Hub"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent text-gray-900 text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                  Thématique / Domaine
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent bg-white text-gray-900 text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Autre">Autre thématique...</option>
                </select>
                {formData.category === 'Autre' && (
                  <input
                    type="text"
                    name="customCategory"
                    value={formData.customCategory}
                    onChange={handleInputChange}
                    placeholder="Précisez la thématique"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                )}
              </div>

              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-semibold text-gray-900 mb-2">
                  Langue
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent bg-white text-gray-900 text-sm"
                >
                  <option value="fr">Français (FR)</option>
                  <option value="en">Anglais (EN)</option>
                </select>
              </div>

              {/* Publication Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Statut de publication
                </label>
                <div className="flex items-center space-x-3 pt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002B54]"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700">
                    {formData.published ? 'Publié immédiatement' : 'Enregistrer en brouillon'}
                  </span>
                </div>
              </div>
            </div>

            {/* Note badge: No photo needed */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-slate-600">
              <Sparkles className="w-4 h-4 text-[#002B54] flex-shrink-0" />
              <span>
                <strong>Section Veille Réglementaire :</strong> Les actualités sont directement présentées sous forme de dépêches analytiques épurées, sans photo requise.
              </span>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
                Résumé ou point clé (Extrait) *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                placeholder="Synthèse courte (1 à 3 phrases) affichée dans la liste des posts pour résumer l'impact de cette réglementation..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002B54] focus:border-transparent text-gray-900 text-sm"
              />
            </div>
          </div>

          {/* Card: Rich Text Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-900">
                Contenu détaillé de l'actualité *
              </label>
              <span className="text-xs text-gray-400">Éditeur de texte enrichi</span>
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden min-h-[360px] bg-white">
              <BasicTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Rédigez ici le détail de la veille : mise en contexte, points clés, obligations pour les entreprises, recommandations..."
              />
            </div>
          </div>

          {/* Submit bar */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Link
              href="/admin/veille"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#002B54] text-white rounded-xl hover:bg-[#004f8f] transition-all text-sm font-semibold shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Enregistrement...' : formData.published ? 'Publier le post' : 'Sauvegarder brouillon'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminCreateVeillePost;
