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
  FileText,
  LogOut,
  User,
  Settings,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me', {
        credentials: 'include'
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
      const response = await fetch('/api/admin/blog', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin');
      }
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de la suppression: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Erreur lors de la suppression de l\'article');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration du blog</h1>
              <p className="text-gray-600">Gérez vos articles de blog</p>
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total articles</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter(post => post.published).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Edit className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter(post => !post.published).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ce mois-ci</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter(post => {
                    const postDate = new Date(post.createdAt);
                    const now = new Date();
                    return postDate.getMonth() === now.getMonth() && 
                           postDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Articles récents</h2>
          <Link
            href="/admin/create-post"
            className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvel article</span>
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article pour le moment</h3>
              <p className="text-gray-600 mb-4">Commencez par créer votre premier article de blog.</p>
              <Link
                href="/admin/create-post"
                className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Créer le Premier Article</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Langue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Créé le
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.language.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {post.published && (
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Voir l'Article"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/edit-post/${post._id}`}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Modifier l'Article"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Supprimer l'Article"
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
      </main>
      {/* Back to site button */}
      <div className="flex justify-center mt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <ArrowRight className="w-4 h-4 mr-2" />
          Retour au site
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;