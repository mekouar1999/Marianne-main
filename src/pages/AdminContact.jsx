import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Trash2,
  LogOut,
  User,
  Clock,
  Phone,
  Building,
  CheckCircle,
  Eye,
  X,
  Search,
  Inbox,
  Filter,
  GraduationCap,
  Download,
  RefreshCw,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ConfirmModal from '../components/ConfirmModal';
import { notify } from '../components/AdminToast';

const STATUS_CONFIG = {
  new: { label: 'Nouveau', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  contacted: { label: 'Contacté', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  closed: { label: 'Traité', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
};

const AdminContact = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const askConfirm = (options) => setConfirmState(options);
  const closeConfirm = () => setConfirmState(null);
  const flash = (type, title, description) => notify(type, title, description);

  const fetchContacts = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch('/api/admin/contact', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setContacts(data.data || []);
        if (isManual) {
          flash('success', 'Actualisé', `${data.data?.length || 0} formulaires chargés`);
        }
      }
    } catch (e) {
      if (isManual) flash('error', 'Erreur', 'Impossible d\'actualiser les formulaires');
    } finally {
      if (isManual) setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetch('/api/admin/me', { credentials: 'include' });
        if (!me.ok) return router.push('/admin/login');
        setAdmin((await me.json()).admin);
        await fetchContacts(false);
      } catch (e) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedContact?._id === id) {
          setSelectedContact((prev) => ({ ...prev, status: newStatus }));
        }
        flash('success', 'Statut mis à jour', `Le message est marqué comme « ${STATUS_CONFIG[newStatus]?.label} »`);
      }
    } catch (e) {
      flash('error', 'Erreur', 'Impossible de mettre à jour le statut');
    }
  };

  const handleDelete = (contact) => {
    const name = `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || contact.name || contact.email;
    askConfirm({
      title: 'Supprimer ce message',
      message: (
        <>
          Voulez-vous vraiment supprimer le formulaire reçu de{' '}
          <strong className="text-gray-900">« {name} »</strong> ? Cette action est irréversible.
        </>
      ),
      confirmLabel: 'Supprimer',
      danger: true,
      onConfirm: async () => {
        closeConfirm();
        try {
          const res = await fetch(`/api/admin/contact?id=${contact._id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (res.ok) {
            setContacts((prev) => prev.filter((c) => c._id !== contact._id));
            if (selectedContact?._id === contact._id) setSelectedContact(null);
            flash('success', 'Formulaire supprimé', `Le message de « ${name} » a été supprimé.`);
          } else {
            flash('error', 'Erreur', 'Impossible de supprimer le formulaire');
          }
        } catch (e) {
          flash('error', 'Erreur', 'Impossible de contacter le serveur');
        }
      },
    });
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    if (typeof window !== 'undefined') localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  const exportToCSV = () => {
    if (!contacts.length) {
      flash('error', 'Aucune donnée', 'Il n\'y a aucun formulaire à exporter.');
      return;
    }

    const headers = [
      'Date',
      'Prénom',
      'Nom',
      'Société',
      'Email',
      'Téléphone',
      'Sujet',
      'Formation',
      'Langue',
      'Statut',
      'Message',
    ];

    const rows = contacts.map((c) => [
      new Date(c.createdAt).toLocaleString('fr-FR'),
      c.firstName || '',
      c.lastName || '',
      c.company || '',
      c.email || '',
      c.phone || '',
      c.subject || '',
      c.training || '',
      c.language || 'fr',
      STATUS_CONFIG[c.status || 'new']?.label || c.status,
      `"${(c.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' + // UTF-8 BOM for Excel
      [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `formulaires-contact-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    flash('success', 'Export réussi', 'Le fichier CSV a été téléchargé.');
  };

  const filteredContacts = contacts.filter((c) => {
    const matchStatus = statusFilter === 'all' || (c.status || 'new') === statusFilter;
    const query = search.toLowerCase();
    const fullName = `${c.firstName || ''} ${c.lastName || ''} ${c.name || ''}`.toLowerCase();
    const matchSearch =
      !query ||
      fullName.includes(query) ||
      (c.email || '').toLowerCase().includes(query) ||
      (c.company || '').toLowerCase().includes(query) ||
      (c.subject || '').toLowerCase().includes(query) ||
      (c.training || '').toLowerCase().includes(query) ||
      (c.message || '').toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => (c.status || 'new') === 'new').length,
    contacted: contacts.filter((c) => c.status === 'contacted').length,
    closed: contacts.filter((c) => c.status === 'closed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <AdminSidebar admin={admin} onLogout={handleLogout} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Formulaire de contact</h1>
              <p className="text-gray-600 text-sm mt-0.5">
                Consultez, filtrez et gérez tous les formulaires reçus depuis le site
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => fetchContacts(true)}
                disabled={refreshing}
                title="Actualiser la liste"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-cyan-600' : ''}`} />
                <span>Actualiser</span>
              </button>

              <button
                onClick={exportToCSV}
                title="Exporter vers Excel / CSV"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-950 rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-cyan-300" />
                <span>Exporter CSV</span>
              </button>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                <User className="w-4 h-4 text-gray-500" />
                <span>{admin?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs text-gray-600 hover:text-red-600 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="min-w-0">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Total reçus</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-950 flex items-center justify-center font-bold">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase">Nouveaux</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{stats.new}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase">En cours</p>
                <p className="text-2xl font-bold text-amber-700 mt-1">{stats.contacted}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase">Traités</p>
                <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.closed}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, société, formation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Filtrer:</span>
              <div className="inline-flex bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                {[
                  { key: 'all', label: 'Tous' },
                  { key: 'new', label: 'Nouveaux' },
                  { key: 'contacted', label: 'Contactés' },
                  { key: 'closed', label: 'Traités' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      statusFilter === key
                        ? 'bg-blue-950 text-white shadow-sm'
                        : 'text-gray-600 hover:text-blue-950'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-base font-semibold text-gray-700">Aucun formulaire trouvé</p>
                <p className="text-xs text-gray-500 mt-1">
                  Les messages envoyés depuis le formulaire de contact ou de formation apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Expéditeur</th>
                      <th className="px-6 py-4">Société</th>
                      <th className="px-6 py-4">Sujet / Demande</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Statut</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredContacts.map((contact) => {
                      const name =
                        `${contact.firstName || ''} ${contact.lastName || ''}`.trim() ||
                        contact.name ||
                        'Anonyme';
                      const st = STATUS_CONFIG[contact.status || 'new'] || STATUS_CONFIG.new;
                      return (
                        <tr
                          key={contact._id}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{name}</div>
                            <div className="text-xs text-gray-500">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium">
                            {contact.company || <span className="text-gray-400">—</span>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="capitalize text-gray-900 font-medium">
                                {contact.subject || 'Contact'}
                              </span>
                              {contact.training && (
                                <span className="inline-flex items-center text-xs text-blue-700 font-semibold mt-0.5">
                                  <GraduationCap className="w-3 h-3 mr-1 flex-shrink-0" />
                                  {contact.training}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={contact.status || 'new'}
                              onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border} focus:outline-none cursor-pointer`}
                            >
                              <option value="new">Nouveau</option>
                              <option value="contacted">Contacté</option>
                              <option value="closed">Traité</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setSelectedContact(contact)}
                                title="Voir les détails"
                                className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(contact)}
                                title="Supprimer"
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Message Details Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#040E25]/60 backdrop-blur-sm"
              onClick={() => setSelectedContact(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="h-1.5 bg-gradient-to-r from-blue-950 via-[#005596] to-cyan-400" />
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                <div className="flex items-start justify-between pr-8 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {`${selectedContact.firstName || ''} ${selectedContact.lastName || ''}`.trim() ||
                        selectedContact.name ||
                        'Détail du formulaire'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Reçu le{' '}
                      {new Date(selectedContact.createdAt).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      STATUS_CONFIG[selectedContact.status || 'new']?.bg
                    } ${STATUS_CONFIG[selectedContact.status || 'new']?.text} ${
                      STATUS_CONFIG[selectedContact.status || 'new']?.border
                    }`}
                  >
                    {STATUS_CONFIG[selectedContact.status || 'new']?.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="font-medium text-blue-600 hover:underline truncate"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                      <a href={`tel:${selectedContact.phone}`} className="font-medium hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Building className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                      <span>{selectedContact.company}</span>
                    </div>
                  )}
                  {selectedContact.subject && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                      <span className="capitalize">Sujet: {selectedContact.subject}</span>
                    </div>
                  )}
                  {selectedContact.training && (
                    <div className="col-span-2 flex items-center space-x-2 text-blue-800 bg-blue-50/70 p-2 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span><strong>Formation souhaitée :</strong> {selectedContact.training}</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Message</label>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-800 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {selectedContact.message || <span className="text-gray-400 italic">Aucun message rédigé.</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-600">Statut:</span>
                    <select
                      value={selectedContact.status || 'new'}
                      onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 bg-white"
                    >
                      <option value="new">Nouveau</option>
                      <option value="contacted">Contacté</option>
                      <option value="closed">Traité</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(selectedContact)}
                      className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium inline-flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(
                        selectedContact.training
                          ? `Votre demande de formation : ${selectedContact.training}`
                          : selectedContact.subject || 'Votre demande de contact'
                      )}`}
                      className="px-4 py-1.5 bg-blue-950 text-white rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors inline-flex items-center space-x-1.5 shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Répondre par email</span>
                    </a>
                  </div>
                </div>
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

export default AdminContact;
