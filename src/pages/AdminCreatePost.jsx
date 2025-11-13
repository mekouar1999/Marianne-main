import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Image,
  X,
  Upload
} from 'lucide-react';
import BasicTextEditor from '../components/BasicTextEditor';

const AdminCreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categories: '',
    language: 'fr',
    published: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('La taille de l\'image doit être inférieure à 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    document.getElementById('image').value = '';
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.excerpt || !formData.content) {
      setError('Veuillez remplir tous les champs requis (titre, extrait, contenu)');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/admin/blog/create-mongodb', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `Erreur HTTP: ${response.status}`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Erreur lors de la création de l\'article');
      }
    } catch (error) {
      console.error('Create post error:', error);
      if (error.name === 'AbortError') {
        setError('La requête a pris trop de temps. Veuillez réessayer.');
      } else if (error.message.includes('Failed to fetch')) {
        setError('Problème de connexion réseau. Vérifiez votre connexion internet.');
      } else {
        setError(`Erreur de connexion: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au Tableau de Bord</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Créer un nouvel article</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Détails de l'Article</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  placeholder="Entrez le titre de l'article..."
                  required
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Langue
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                >
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </select>
              </div>

              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégories
                </label>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  placeholder="e.g., Réglementation, Commerce International"
                />
                <p className="text-sm text-gray-500 mt-1">Séparez les catégories multiples par des virgules</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Extrait *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  placeholder="Brève description de l'article..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Image à la Une (optionnelle)</h2>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <label htmlFor="image" className="cursor-pointer">
                  <span className="text-sm font-medium text-blue-950 hover:text-blue-800">
                    Télécharger une image
                  </span>
                  <span className="text-sm text-gray-500"> ou glisser-déposer</span>
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF jusqu'à 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-full max-w-md h-48 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Contenu *</h2>
            
            <BasicTextEditor
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              placeholder="Rédigez le contenu de votre article ici..."
            />
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-950 focus:ring-blue-950"
                  />
                  <span className="text-sm font-medium text-gray-700">Publier immédiatement</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-900 focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Création...' : 'Créer l\'Article'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminCreatePost;