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
  BookOpen,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const emptyTraining = () => ({
  id: `training-${Date.now()}`,
  title: '',
  description: '',
});

const AdminFormation = () => {
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

        const res = await fetch('/api/admin/formation', { credentials: 'include' });
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

  const updateCards = (updater) =>
    setContent((prev) => ({ ...prev, [lang]: updater([...(prev[lang] || [])]) }));

  const updateCard = (index, field, value) =>
    updateCards((cards) => {
      cards[index] = { ...cards[index], [field]: value };
      return cards;
    });

  const addCard = () => updateCards((cards) => [...cards, emptyTraining()]);

  const removeCard = (index) => {
    const card = content[lang][index];
    const name = card?.title?.trim();
    askConfirm({
      title: 'Supprimer ce programme',
      message: (
        <>
          Voulez-vous vraiment supprimer le programme{' '}
          {name ? (
            <strong className="text-gray-900">« {name} »</strong>
          ) : (
            <>
              le <strong className="text-gray-900">programme {index + 1}</strong>
            </>
          )}{' '}
          de la version <strong className="text-gray-900">{lang.toUpperCase()}</strong> ? Pensez à
          cliquer sur « Enregistrer » pour appliquer la suppression sur le site.
        </>
      ),
      confirmLabel: 'Supprimer',
      danger: true,
      onConfirm: () => {
        updateCards((cards) => cards.filter((_, i) => i !== index));
        flash(
          'success',
          name ? `Programme « ${name} » supprimé` : `Programme ${index + 1} supprimé`,
          `Version ${lang.toUpperCase()} — cliquez sur « Enregistrer » pour publier ce changement.`
        );
        closeConfirm();
      },
    });
  };

  const moveCard = (index, dir) =>
    updateCards((cards) => {
      const target = index + dir;
      if (target < 0 || target >= cards.length) return cards;
      [cards[index], cards[target]] = [cards[target], cards[index]];
      return cards;
    });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/formation', {
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
          `${data.data.fr.length} programme(s) FR et ${data.data.en.length} programme(s) EN sont maintenant en ligne sur la page Formation.`
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
      title: 'Restaurer les programmes par défaut',
      message: (
        <>
          Les <strong className="text-gray-900">{content.fr?.length || 0} programme(s) FR</strong> et{' '}
          <strong className="text-gray-900">{content.en?.length || 0} programme(s) EN</strong> actuels
          seront remplacés par le contenu d'origine. Cette action est immédiate et irréversible.
        </>
      ),
      confirmLabel: 'Restaurer',
      danger: true,
      onConfirm: async () => {
        closeConfirm();
        try {
          const res = await fetch('/api/admin/formation', {
            method: 'DELETE',
            credentials: 'include',
          });
          if (res.ok) {
            const data = (await res.json()).data;
            setContent(data);
            flash(
              'success',
              'Contenu par défaut restauré',
              `${data.fr.length} programme(s) FR et ${data.en.length} programme(s) EN d'origine sont de nouveau en ligne.`
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

  const cards = content[lang] || [];
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
              <h1 className="text-2xl font-bold text-gray-900">Programmes de Formation</h1>
              <p className="text-gray-600">Rédigez et modifiez le contenu des 4 programmes (La douane, La classification douanière, Les incoterms, Les droits d’accise)</p>
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
                  id={`formation-lang-${l}`}
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
                id="formation-reset"
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Par défaut</span>
              </button>
              <button
                id="formation-save"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>

          {/* Cards editor */}
          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50/90 rounded-2xl p-6 shadow-lg border border-blue-100/60 flex flex-col relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-950">
                      Programme {i + 1}
                    </span>
                  </div>
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

                <label className="text-xs font-medium text-gray-600 mb-1">Titre de la formation</label>
                <input
                  className={`${inputClass} mb-4 font-semibold text-base`}
                  placeholder="Ex: La douane"
                  value={card.title}
                  onChange={(e) => updateCard(i, 'title', e.target.value)}
                />

                <label className="text-xs font-medium text-gray-600 mb-1">Description du programme</label>
                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Détails du programme..."
                  value={card.description}
                  onChange={(e) => updateCard(i, 'description', e.target.value)}
                />
              </motion.div>
            ))}

            <button
              id="formation-add-card"
              onClick={addCard}
              className="min-h-[200px] rounded-2xl border-2 border-dashed border-blue-200 text-blue-950 hover:border-cyan-400 hover:bg-white transition-all flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Ajouter un programme de formation</span>
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

export default AdminFormation;
