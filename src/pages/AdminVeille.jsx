import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Scale,
  LogOut,
  User,
  ArrowRight,
  CheckCircle,
  Clock,
  Tag,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const AdminVeille = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const router = useRouter();

  const askConfirm = (options) => setConfirmState(options);
  const closeConfirm = () => setConfirmState(null);
  const flash = (type, title, description) => notify(type, title, description);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/veille', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching veille posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin');
      }
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDelete = (post) => {
    askConfirm({
      title: 'Supprimer le post',
      message: (
        <>
          Voulez-vous vraiment supprimer le post{' '}
          <strong className="text-gray-900">« {post.title} »</strong> ({post.language?.toUpperCase() || 'FR'}) ?
          Cette action est irréversible et retirera immédiatement le post de la veille réglementaire.
        </>
      ),
      confirmLabel: 'Supprimer',
      danger: true,
      onConfirm: async () => {
        closeConfirm();
        try {
          const response = await fetch(`/api/admin/veille/${post._id}`, {
            method: 'DELETE',
            credentials: 'include',
          });

          if (response.ok) {
            setPosts((prev) => prev.filter((p) => p._id !== post._id));
            flash(
              'success',
              'Post supprimé',
              `Le post « ${post.title} » a été supprimé avec succès.`
            );
          } else {
            const errorData = await response.json().catch(() => null);
            flash(
              'error',
              'Échec de la suppression',
              errorData?.message || 'Erreur lors de la suppression du post.'
            );
          }
        } catch (error) {
          flash('error', 'Erreur serveur', 'Impossible de joindre le serveur.');
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;
  const thisMonthCount = posts.filter((p) => {
    const postDate = new Date(p.createdAt || p.publishedAt);
    const now = new Date();
    return (
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <AdminSidebar admin={admin} onLogout={handleLogout} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Veille réglementaire</h1>
                  <p className="text-gray-600 text-sm">Gérez et partagez vos actualités douanières et réglementaires</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{admin?.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Scale className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total posts</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ce mois-ci</p>
                <p className="text-2xl font-bold text-gray-900">{thisMonthCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading & Actions - Exactly requested: "Post récents" */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Post récents</h2>
            <p className="text-xs text-gray-500 mt-0.5">Publications et actualités partagées dans la veille</p>
          </div>
          <Link
            href="/admin/veille/create-post"
            id="admin-create-veille-post-btn"
            className="inline-flex items-center space-x-2 bg-[#002B54] text-white px-4 py-2.5 rounded-lg hover:bg-[#004f8f] shadow-sm hover:shadow transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium text-sm">Nouveau post</span>
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#002B54] flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun post pour le moment</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                Partagez votre première actualité dans le domaine de la douane. Aucun besoin d'ajouter de photo pour cette section.
              </p>
              <Link
                href="/admin/veille/create-post"
                className="inline-flex items-center space-x-2 bg-[#002B54] text-white px-5 py-2.5 rounded-lg hover:bg-[#004f8f] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Créer le premier post</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Titre & Résumé
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Thématique
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Langue
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {posts.map((post) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <div className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {post.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                            {post.excerpt || post.summary}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-[#002B54] border border-blue-100">
                          <Tag className="w-3 h-3 mr-1 opacity-70" />
                          {post.category || 'Réglementation'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-700">
                        <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">
                          {(post.language || 'fr').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {new Date(post.createdAt || post.publishedAt || Date.now()).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-1.5">
                          {post.published && (
                            <Link
                              href={`/veille/${post.slug}`}
                              target="_blank"
                              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir le post sur le site"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/veille/edit-post/${post._id}`}
                            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Modifier le post"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer le post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back to site link */}
        <div className="flex justify-center mt-10">
          <Link
            href="/veille"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Accéder à la veille réglementaire publique
          </Link>
        </div>
      </main>

      <ConfirmModal
        open={!!confirmState}
        {...(confirmState || {})}
        onCancel={closeConfirm}
      />
    </div>
  );
};

export default AdminVeille;
