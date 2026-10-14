import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
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
  Clock,
  Users,
  CheckCircle,
  HelpCircle,
  Eye,
  X,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const emptyTraining = () => ({
  id: `training-${Date.now()}`,
  title: '',
  description: '',
  duration: '1 jour (7h)',
  targetAudience: '',
  prerequisites: 'Aucun prérequis spécifique',
  objectives: [''],
  details: '',
});

const AdminFormation = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [content, setContent] = useState({ fr: [], en: [] });
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

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

  const updateObjective = (cardIndex, objIndex, value) =>
    updateCards((cards) => {
      const objectives = [...(cards[cardIndex].objectives || [])];
      objectives[objIndex] = value;
      cards[cardIndex] = { ...cards[cardIndex], objectives };
      return cards;
    });

  const addObjective = (cardIndex) =>
    updateCards((cards) => {
      cards[cardIndex] = {
        ...cards[cardIndex],
        objectives: [...(cards[cardIndex].objectives || []), ''],
      };
      return cards;
    });

  const removeObjective = (cardIndex, objIndex) =>
    updateCards((cards) => {
      cards[cardIndex] = {
        ...cards[cardIndex],
        objectives: (cards[cardIndex].objectives || []).filter((_, i) => i !== objIndex),
      };
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
          `${data.data.fr.length} programme(s) FR et ${data.data.en.length} programme(s) EN sont maintenant à jour avec leurs fenêtres détaillées.`
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
      title: 'Restaurer les programmes par défaut',
      message: (
        <>
          Les <strong className="text-gray-900">{content.fr?.length || 0} programme(s) FR</strong> et{' '}
          <strong className="text-gray-900">{content.en?.length || 0} programme(s) EN</strong> actuels
          seront remplacés par le contenu d'origine (y compris le contenu détaillé des 4 fenêtres). Cette action est immédiate.
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
                <BookOpen className="w-6 h-6 text-cyan-600" />
                <h1 className="text-2xl font-bold text-gray-900">Programmes de Formation</h1>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Gérez les cartes de formation ainsi que le contenu complet des fenêtres modales qui s'ouvrent au clic sur « En savoir plus ».
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
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Par défaut</span>
              </button>
              <button
                id="formation-save"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors disabled:opacity-60 shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>

          {/* Cards editor */}
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50/90 rounded-2xl p-6 shadow-lg border border-blue-100/60 flex flex-col relative"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/60">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-blue-950 text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-950">
                      Programme {i + 1}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setPreviewCard(card)}
                      title="Prévisualiser la fenêtre modale"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-md transition-colors mr-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Aperçu fenêtre</span>
                    </button>
                    <button
                      onClick={() => moveCard(i, -1)}
                      title="Monter"
                      className="p-1 text-gray-400 hover:text-blue-950 rounded"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveCard(i, 1)}
                      title="Descendre"
                      className="p-1 text-gray-400 hover:text-blue-950 rounded"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeCard(i)}
                      title="Supprimer ce programme"
                      className="p-1 text-red-500 hover:text-red-700 rounded ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Card Fields */}
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Titre du programme *
                    </label>
                    <input
                      className={`${inputClass} font-bold text-base text-blue-950`}
                      placeholder="Ex: La douane"
                      value={card.title || ''}
                      onChange={(e) => updateCard(i, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Description courte (sur la carte) *
                    </label>
                    <textarea
                      rows={2}
                      className={`${inputClass} resize-none`}
                      placeholder="Résumé accrocheur affiché sur la carte..."
                      value={card.description || ''}
                      onChange={(e) => updateCard(i, 'description', e.target.value)}
                    />
                  </div>
                </div>

                {/* Modal Window Details Section */}
                <div className="bg-white rounded-xl p-4 border border-blue-200/60 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Contenu de la fenêtre « En savoir plus »
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-blue-950" />
                        <span>Durée</span>
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Ex: 1 à 2 jours (7h à 14h)"
                        value={card.duration || ''}
                        onChange={(e) => updateCard(i, 'duration', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-blue-950" />
                        <span>Public visé</span>
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Ex: Services ADV, logistique, achats..."
                        value={card.targetAudience || ''}
                        onChange={(e) => updateCard(i, 'targetAudience', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1 flex items-center space-x-1">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-950" />
                      <span>Prérequis</span>
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Ex: Aucun prérequis spécifique"
                      value={card.prerequisites || ''}
                      onChange={(e) => updateCard(i, 'prerequisites', e.target.value)}
                    />
                  </div>

                  {/* Objectives */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5 flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      <span>Objectifs pédagogiques :</span>
                    </label>
                    <div className="space-y-2 mb-2">
                      {(card.objectives || []).map((obj, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <input
                            className={inputClass}
                            placeholder="Ex: Maîtriser les étapes d'une déclaration..."
                            value={obj}
                            onChange={(e) => updateObjective(i, j, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => removeObjective(i, j)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Supprimer ce point"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addObjective(i)}
                      className="inline-flex items-center space-x-1 text-xs text-blue-950 hover:text-cyan-600 font-semibold py-1 px-2 border border-dashed border-blue-200 rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter un objectif</span>
                    </button>
                  </div>

                  {/* Detailed syllabus / modules */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Programme détaillé / Modules (texte de la fenêtre) :
                    </label>
                    <textarea
                      rows={8}
                      className={`${inputClass} font-mono text-xs leading-relaxed`}
                      placeholder={`Module 1 : Titre\n• Point 1\n• Point 2\n\nModule 2 : Titre\n• Point 1...`}
                      value={card.details || ''}
                      onChange={(e) => updateCard(i, 'details', e.target.value)}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Vous pouvez structurer votre texte avec des retours à la ligne et des puces (•). Ils s'afficheront proprement dans la fenêtre modale.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              id="formation-add-card"
              onClick={addCard}
              className="min-h-[260px] rounded-2xl border-2 border-dashed border-blue-200 text-blue-950 hover:border-cyan-400 hover:bg-white transition-all flex flex-col items-center justify-center space-y-2 group shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-cyan-50 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-blue-950 group-hover:text-cyan-600 transition-colors" />
              </div>
              <span className="text-sm font-semibold">Ajouter un programme de formation</span>
              <span className="text-xs text-gray-500">Ajoute une nouvelle carte et sa fenêtre détaillée</span>
            </button>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              className="fixed inset-0 bg-[#040E25]/70 backdrop-blur-sm"
              onClick={() => setPreviewCard(null)}
            />
            <motion.div
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 z-10 border border-blue-100 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              {/* Header Gradient Accent */}
              <div className="h-2 bg-gradient-to-r from-blue-950 via-cyan-500 to-blue-950 flex-shrink-0" />

              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                      Aperçu de la fenêtre visiteur
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {previewCard.title || 'Titre du programme'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setPreviewCard(null)}
                    className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {previewCard.description && (
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic border-l-4 border-cyan-400 pl-4 py-2 bg-slate-50 rounded-r-xl">
                    "{previewCard.description}"
                  </p>
                )}

                {/* Key specs - 2-row spacious layout */}
                <div className="space-y-2.5 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Durée */}
                    <div className="flex items-center space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                      <div className="w-9 h-9 rounded-lg bg-cyan-100/80 flex items-center justify-center flex-shrink-0 text-cyan-800">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Durée</span>
                        <span className="text-sm font-semibold text-gray-900 block">{previewCard.duration || 'Sur mesure'}</span>
                      </div>
                    </div>

                    {/* Prérequis */}
                    <div className="flex items-center space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                      <div className="w-9 h-9 rounded-lg bg-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-900">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Prérequis</span>
                        <span className="text-sm font-semibold text-gray-900 block">{previewCard.prerequisites || 'Aucun'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Public visé */}
                  <div className="flex items-start space-x-3 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100/80 flex items-center justify-center flex-shrink-0 text-indigo-900 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Public visé</span>
                      <span className="text-sm text-gray-800 leading-relaxed block mt-0.5">{previewCard.targetAudience || 'Tous services'}</span>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                {previewCard.objectives && previewCard.objectives.filter(Boolean).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyan-600" />
                      <span>Objectifs de la formation</span>
                    </h4>
                    <div className="space-y-2.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                      {previewCard.objectives.filter(Boolean).map((obj, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details / Syllabus */}
                {previewCard.details && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3 flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-cyan-600" />
                      <span>Programme détaillé</span>
                    </h4>
                    <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-gray-200/80 text-sm text-gray-800 leading-relaxed space-y-3 font-sans">
                      {previewCard.details.split('\n\n').map((block, idx) => {
                        const lines = block.split('\n');
                        const header = lines[0];
                        const items = lines.slice(1);
                        const isModule = header.trim().toLowerCase().startsWith('module');
                        return (
                          <div key={idx} className={isModule ? "p-3.5 bg-white rounded-xl border border-gray-200/60 shadow-sm" : ""}>
                            <p className={isModule ? "font-bold text-blue-950 text-sm mb-2" : "font-semibold text-gray-900 text-sm mb-1"}>
                              {header}
                            </p>
                            {items.length > 0 && (
                              <ul className="space-y-1.5 pl-1">
                                {items.map((line, lIdx) => (
                                  <li key={lIdx} className="text-xs sm:text-sm text-gray-700 flex items-start space-x-2">
                                    <span className="text-cyan-600 font-bold leading-tight select-none">•</span>
                                    <span className="leading-relaxed">{line.replace(/^[•\-\*]\s*/, '')}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 bg-slate-50 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewCard(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Fermer l'aperçu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={!!confirmState}
        {...(confirmState || {})}
        onCancel={closeConfirm}
      />
    </div>
  );
};

export default AdminFormation;
