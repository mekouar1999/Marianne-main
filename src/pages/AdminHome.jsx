import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  Save,
  RotateCcw,
  LogOut,
  User,
  ChevronUp,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  Star,
  Quote,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const emptyTestimonial = () => ({
  name: '',
  position: '',
  company: '',
  text: '',
  image: '/Content/LinkedPH.png',
  rating: 5,
  date: '',
});

const AdminHome = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [content, setContent] = useState({ fr: [], en: [] });
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmState, setConfirmState] = useState(null);

  const askConfirm = (options) => setConfirmState(options);
  const closeConfirm = () => setConfirmState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetch('/api/admin/me', { credentials: 'include' });
        if (!me.ok) return router.push('/admin/login');
        setAdmin((await me.json()).admin);

        const res = await fetch('/api/admin/home-testimonials', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setContent(data.data);
        }
      } catch (e) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const flash = (type, title, description) => notify(type, title, description);

  const updateItems = (updater) =>
    setContent((prev) => ({ ...prev, [lang]: updater([...(prev[lang] || [])]) }));

  const updateCard = (index, field, value) =>
    updateItems((items) => {
      items[index] = { ...items[index], [field]: value };
      return items;
    });

  const handleImageUpload = (cardIndex, file) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      flash('error', 'Image trop volumineuse', 'La taille maximale autorisée est de 15 Mo.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 960;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        updateCard(cardIndex, 'image', optimizedDataUrl);
        flash('success', 'Photo chargée et optimisée', 'Aperçu mis à jour. Pensez à enregistrer vos modifications.');
      };
      img.onerror = () => {
        updateCard(cardIndex, 'image', e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const addCard = () => updateItems((items) => [...items, emptyTestimonial()]);

  const removeCard = (index) => {
    const card = content[lang][index];
    const name = card?.name?.trim();
    askConfirm({
      title: 'Supprimer ce témoignage',
      message: (
        <>
          Voulez-vous vraiment supprimer le témoignage de{' '}
          {name ? (
            <strong className="text-gray-900">« {name} »</strong>
          ) : (
            <>
              la <strong className="text-gray-900">carte {index + 1}</strong>
            </>
          )}{' '}
          de la version <strong className="text-gray-900">{lang.toUpperCase()}</strong> de la page d'accueil ?
        </>
      ),
      confirmLabel: 'Supprimer',
      danger: true,
      onConfirm: () => {
        updateItems((items) => items.filter((_, i) => i !== index));
        flash(
          'success',
          name ? `Témoignage de « ${name} » supprimé` : `Témoignage ${index + 1} supprimé`,
          `Version ${lang.toUpperCase()} — n'oubliez pas de cliquer sur « Enregistrer » pour valider.`
        );
        closeConfirm();
      },
    });
  };

  const moveCard = (index, dir) =>
    updateItems((items) => {
      const target = index + dir;
      if (target < 0 || target >= items.length) return items;
      [items[index], items[target]] = [items[target], items[index]];
      return items;
    });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/home-testimonials', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setContent(data.data);
        flash(
          'success',
          'Témoignages enregistrés',
          `${data.data.fr.length} témoignage(s) FR et ${data.data.en.length} témoignage(s) EN sont maintenant en ligne sur la page d'accueil.`
        );
      } else {
        flash('error', "Échec de l'enregistrement", data?.message || `Erreur serveur (${res.status})`);
      }
    } catch (e) {
      flash('error', "Échec de l'enregistrement", e.message || 'Impossible de joindre le serveur. Vérifiez votre connexion.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () =>
    askConfirm({
      title: 'Restaurer les témoignages par défaut',
      message: (
        <>
          Les <strong className="text-gray-900">{content.fr?.length || 0} témoignage(s) FR</strong> et{' '}
          <strong className="text-gray-900">{content.en?.length || 0} témoignage(s) EN</strong> actuels
          de la page d'accueil seront remplacés par le contenu d'origine. Cette action est immédiate.
        </>
      ),
      confirmLabel: 'Restaurer',
      danger: true,
      onConfirm: async () => {
        closeConfirm();
        try {
          const res = await fetch('/api/admin/home-testimonials', {
            method: 'DELETE',
            credentials: 'include',
          });
          if (res.ok) {
            const data = (await res.json()).data;
            setContent(data);
            flash(
              'success',
              'Témoignages d\'origine restaurés',
              `${data.fr.length} témoignage(s) FR et ${data.en.length} témoignage(s) EN d'origine sont de nouveau en ligne.`
            );
          }
        } catch (e) {
          flash('error', 'Échec de la restauration', 'Impossible de joindre le serveur.');
        }
      },
    });

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    if (typeof window !== 'undefined') localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  const items = content[lang] || [];
  const inputClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition bg-white';

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <AdminSidebar admin={admin} onLogout={handleLogout} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3">
                <Quote className="w-6 h-6 text-cyan-600" />
                <h1 className="text-2xl font-bold text-gray-900">Page d'accueil — Témoignages</h1>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Gérez les témoignages clients visibles sur la page d'accueil (ajout, modification, suppression).
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium">{admin?.name}</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="inline-flex bg-white rounded-lg shadow p-1">
              {['fr', 'en'].map((l) => (
                <button
                  key={l}
                  id={`home-lang-${l}`}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    lang === l ? 'bg-blue-950 text-white' : 'text-gray-600 hover:text-blue-950'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="home-reset"
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Par défaut</span>
              </button>
              <button
                id="home-save"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors disabled:opacity-60 shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((card, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50/90 rounded-2xl p-5 shadow-lg border border-blue-100/60 flex flex-col relative"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-950">
                    Témoignage {i + 1}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveCard(i, -1)}
                      title="Déplacer vers la gauche / Monter"
                      className="p-1 text-gray-400 hover:text-blue-950 rounded transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveCard(i, 1)}
                      title="Déplacer vers la droite / Descendre"
                      className="p-1 text-gray-400 hover:text-blue-950 rounded transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeCard(i)}
                      title="Supprimer ce témoignage"
                      className="p-1 text-red-500 hover:text-red-700 rounded transition-colors ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Avatar Preview & Upload */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Photo du client</label>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-950/20 shadow-md flex-shrink-0 flex items-center justify-center">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.name || 'Aperçu'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/Content/LinkedPH.png';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        placeholder="Chemin ou URL de l'image"
                        className={`${inputClass} text-xs`}
                        value={card.image || ''}
                        onChange={(e) => updateCard(i, 'image', e.target.value)}
                      />
                      <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700 whitespace-nowrap shadow-sm">
                        <Upload className="w-3.5 h-3.5 mr-1.5 text-cyan-600" />
                        <span>Téléverser une image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(i, e.target.files?.[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Client Name & Company */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Nom du client *</label>
                    <input
                      className={`${inputClass} font-semibold`}
                      placeholder="Javier Madina"
                      value={card.name || ''}
                      onChange={(e) => updateCard(i, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Entreprise</label>
                    <input
                      className={inputClass}
                      placeholder="Corteva Agriscience"
                      value={card.company || ''}
                      onChange={(e) => updateCard(i, 'company', e.target.value)}
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="mb-3">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Poste / Fonction</label>
                  <input
                    className={inputClass}
                    placeholder="EMEA Order Fulfillment and Logistics leader"
                    value={card.position || ''}
                    onChange={(e) => updateCard(i, 'position', e.target.value)}
                  />
                </div>

                {/* Date & Note */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Date (optionnelle)</label>
                    <input
                      className={inputClass}
                      placeholder="2 décembre 2018"
                      value={card.date || ''}
                      onChange={(e) => updateCard(i, 'date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Évaluation (étoiles)</label>
                    <div className="flex items-center space-x-1 py-1.5 px-2 bg-white rounded-lg border border-gray-200">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => updateCard(i, 'rating', star)}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= (card.rating || 5)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mb-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Citation / Témoignage *</label>
                  <textarea
                    rows={4}
                    className={`${inputClass} resize-none italic leading-relaxed`}
                    placeholder="Rédigez le témoignage ici..."
                    value={card.text || ''}
                    onChange={(e) => updateCard(i, 'text', e.target.value)}
                  />
                </div>
              </motion.div>
            ))}

            <button
              id="home-add-card"
              onClick={addCard}
              className="min-h-[280px] rounded-2xl border-2 border-dashed border-blue-200 text-blue-950 hover:border-cyan-400 hover:bg-white transition-all flex flex-col items-center justify-center space-y-2 group shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-cyan-50 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-blue-950 group-hover:text-cyan-600 transition-colors" />
              </div>
              <span className="text-sm font-semibold">Ajouter un témoignage</span>
              <span className="text-xs text-gray-500">Visible sur le carrousel d'accueil</span>
            </button>
          </div>
        </main>
      </div>

      <ConfirmModal
        open={!!confirmState}
        {...(confirmState || {})}
        onCancel={closeConfirm}
      />
    </div>
  );
};

export default AdminHome;
