import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FileText, Briefcase, Award, GraduationCap, Mail, Globe, LogOut, Scale, Home } from 'lucide-react';

// Ordre des onglets du back office
const NAV_ITEMS = [
  { href: '/admin/home', label: "Page d'accueil", icon: Home },
  { href: '/admin/consulting', label: 'Consulting', icon: Briefcase },
  { href: '/admin/formation', label: 'Formation', icon: GraduationCap },
  { href: '/admin/experience', label: 'Expérience client', icon: Award },
  { href: '/admin/dashboard', label: 'Blog', icon: FileText },
  { href: '/admin/veille', label: 'Veille réglementaire', icon: Scale },
  { href: '/admin/contact', label: 'Formulaire de contact', icon: Mail },
];

const AdminSidebar = ({ admin, onLogout }) => {
  const router = useRouter();
  const initial = (admin?.name || admin?.username || 'A').charAt(0).toUpperCase();

  return (
    <aside
      id="admin-sidebar"
      className="w-full lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 z-40 flex flex-col bg-gradient-to-b from-[#040E25] via-[#0a1f3f] to-[#002B54] text-white shadow-2xl"
    >
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/10">
        <p className="text-2xl font-bold tracking-wide leading-tight">C.E.S</p>
        <p className="text-2xl font-bold tracking-wide leading-tight text-cyan-400">ADMIN</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            router.pathname === href ||
            (href === '/admin/home' && router.pathname === '/admin/testimonials') ||
            (href === '/admin/dashboard' && (router.pathname.startsWith('/admin/create-post') || router.pathname.startsWith('/admin/edit-post'))) ||
            (href !== '/admin/dashboard' && router.pathname.startsWith(href + '/'));

          return (
            <Link
              key={href}
              href={href}
              id={`admin-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'border border-cyan-400/80 bg-white/5 text-white shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                  : 'border border-transparent text-blue-100/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-white/10 space-y-4">
        <Link
          href="/"
          id="admin-nav-site"
          className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm text-blue-100/90 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span>Accéder au site</span>
        </Link>

        {admin && (
          <div className="flex items-center space-x-3 px-4">
            <div className="w-9 h-9 rounded-full bg-blue-700/60 flex items-center justify-center text-sm font-semibold">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{admin.name}</p>
              <p className="text-xs text-blue-100/60 truncate">{admin.email}</p>
            </div>
          </div>
        )}

        {onLogout && (
          <button
            id="admin-nav-logout"
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
