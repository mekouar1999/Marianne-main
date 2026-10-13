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
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const emptyTestimonial = () => ({
  name: '',
  position: '',
  company: '',
  text: '',
  results: [''],
  photo: '/PHOTOS PAGE EXPERIENCE CLIENT/PHOTO 1 - TRANSPORT.jpg',
  date: '',
});

const AdminExperience = () => {
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

        const res = await fetch('/api/admin/experience', { credentials: 'include' });
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
        // Optimize image to max 960px to ensure ultra-fast saving and loading
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
        updateCard(cardIndex, 'photo', optimizedDataUrl);
        flash('success', 'Image chargée et optimisée', 'Aperçu mis à jour. Cliquez sur Enregistrer pour valider.');
      };
      img.onerror = () => {
        updateCard(cardIndex, 'photo', e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const updateResult = (cardIndex, resIndex, value) =>
    updateItems((items) => {
      const results = [...items[cardIndex].results];
      results[resIndex] = value;
      items[cardIndex] = { ...items[cardIndex], results };
      return items;
    });

  const addResult = (cardIndex) =>
    updateItems((items) => {
      items[cardIndex] = {
        ...items[cardIndex],
        results: [...(items[cardIndex].results || []), ''],
      };
      return items;
    });

  const removeResult = (cardIndex, resIndex) =>
    updateItems((items) => {
      items[cardIndex] = {
        ...items[cardIndex],
        results: items[cardIndex].results.filter((_, i) => i !== resIndex),
      };
      return items;
    });

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
          de la version <strong className="text-gray-900">{lang.toUpperCase()}</strong> ? Pensez à
          cliquer sur « Enregistrer » pour appliquer la suppression sur le site.
        </>
      ),
      confirmLabel: 'Supprimer',
      danger: true,
      onConfirm: () => {
        updateItems((items) => items.filter((_, i) => i !== index));
        flash(
          'success',
          name ? `Témoignage de « ${name} » supprimé` : `Témoignage ${index + 1} supprimé`,
          `Version ${lang.toUpperCase()} — cliquez sur « Enregistrer » pour publier ce changement.`
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
      const res = await fetch('/api/admin/experience', {
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
          'Modifications enregistrées',
          `${data.data.fr.length} témoignage(s) FR et ${data.data.en.length} témoignage(s) EN sont maintenant en ligne sur la page Expérience.`
        );
      } else {
        flash('error', 'Échec de l\'enregistrement', data?.message || `Erreur serveur (${res.status})`);
      }
    } catch (e) {
      flash('error', 'Échec de l\'enregistrement', e.message || 'Impossible de joindre le serveur. Vérifiez votre connexion.');
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
          seront remplacés par le contenu d'origine. Cette action est immédiate et irréversible.
        </>
      ),
      confirmLabel: 'Restaurer',
      danger: true,
      onConfirm: async () => {
        closeConfirm();
        try {
          const res = await fetch('/api/admin/experience', {
            method: 'DELETE',
            credentials: 'include',
          });
          if (res.ok) {
            const data = (await res.json()).data;
            setContent(data);
            flash(
              'success',
              'Contenu par défaut restauré',
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
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <AdminSidebar admin={admin} onLogout={handleLogout} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Expérience Client</h1>
              <p className="text-gray-600">Gérez les cartes « Témoignages clients »</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="inline-flex bg-white rounded-lg shadow p-1">
              {['fr', 'en'].map((l) => (
                <button
                  key={l}
                  id={`experience-lang-${l}`}
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
                id="experience-reset"
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Par défaut</span>
              </button>
              <button
                id="experience-save"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors disabled:opacity-60"
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
                className="bg-slate-50/90 rounded-2xl p-5 shadow-lg border border-blue-100/60 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-950">
                    Témoignage {i + 1}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveCard(i, -1)}
                      title="Monter"
                      className="p-1 text-gray-400 hover:text-blue-950"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveCard(i, 1)}
                      title="Descendre"
                      className="p-1 text-gray-400 hover:text-blue-950"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeCard(i)}
                      title="Supprimer"
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Photo Preview and Upload */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Photo du client / secteur</label>
                  <div className="relative mb-2 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video flex items-center justify-center">
                    {card.photo ? (
                      <img
                        src={card.photo}
                        alt={card.name || 'Aperçu'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center text-xs">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span>Aucune photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Chemin ou URL de l'image"
                      className={`${inputClass} text-xs`}
                      value={card.photo}
                      onChange={(e) => updateCard(i, 'photo', e.target.value)}
                    />
                    <label className="cursor-pointer inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700 whitespace-nowrap shadow-sm">
                      <Upload className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                      <span>Fichier</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(i, e.target.files?.[0])}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Nom du client</label>
                    <input
                      className={`${inputClass} font-semibold`}
                      placeholder="Michelina Mammone"
                      value={card.name}
                      onChange={(e) => updateCard(i, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Entreprise</label>
                    <input
                      className={`${inputClass}`}
                      placeholder="Dow Corning"
                      value={card.company}
                      onChange={(e) => updateCard(i, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <label className="text-xs font-medium text-gray-600 mb-1">Poste / Fonction</label>
                <input
                  className={`${inputClass} mb-3`}
                  placeholder="European Customs Coordinator"
                  value={card.position}
                  onChange={(e) => updateCard(i, 'position', e.target.value)}
                />

                <label className="text-xs font-medium text-gray-600 mb-1">Citation / Témoignage</label>
                <textarea
                  rows={3}
                  className={`${inputClass} mb-3 resize-none italic`}
                  placeholder="Marianne has an extensive knowledge..."
                  value={card.text}
                  onChange={(e) => updateCard(i, 'text', e.target.value)}
                />

                <label className="text-xs font-medium text-gray-600 mb-1">Résultats obtenus :</label>
                <div className="space-y-2 mb-3">
                  {(card.results || []).map((res, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <input
                        className={inputClass}
                        placeholder="Ex: Système de dédouanement centralisé"
                        value={res}
                        onChange={(e) => updateResult(i, j, e.target.value)}
                      />
                      <button
                        onClick={() => removeResult(i, j)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Supprimer ce résultat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addResult(i)}
                  className="mt-auto inline-flex items-center justify-center space-x-1 text-sm text-blue-950 hover:text-cyan-600 py-1.5 border border-dashed border-blue-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un résultat</span>
                </button>
              </motion.div>
            ))}

            <button
              id="experience-add-card"
              onClick={addCard}
              className="min-h-[260px] rounded-2xl border-2 border-dashed border-blue-200 text-blue-950 hover:border-cyan-400 hover:bg-white transition-all flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Ajouter un témoignage</span>
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

export default AdminExperience;
