import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FileText,
  Briefcase,
  Award,
  GraduationCap,
  Mail,
  Globe,
  LogOut,
  Scale,
  Home,
  Menu,
  X,
} from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = (admin?.name || admin?.username || 'A').charAt(0).toUpperCase();

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const isItemActive = (href) =>
    router.pathname === href ||
    (href === '/admin/home' && router.pathname === '/admin/testimonials') ||
    (href === '/admin/dashboard' &&
      (router.pathname.startsWith('/admin/create-post') ||
        router.pathname.startsWith('/admin/edit-post'))) ||
    (href !== '/admin/dashboard' && router.pathname.startsWith(href + '/'));

  const activeItem = NAV_ITEMS.find((item) => isItemActive(item.href));

  const renderNavContent = (onItemClick) => (
    <>
      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isItemActive(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onItemClick}
              id={`admin-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'border border-cyan-400/80 bg-white/10 text-white shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                  : 'border border-transparent text-blue-100/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          onClick={onItemClick}
          id="admin-nav-site"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-blue-100/90 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5 flex-shrink-0" />
          <span>Accéder au site</span>
        </Link>

        {admin && (
          <div className="flex items-center space-x-3 px-4 py-1">
            <div className="w-9 h-9 rounded-full bg-blue-700/60 flex items-center justify-center text-sm font-semibold flex-shrink-0">
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
            onClick={() => {
              if (onItemClick) onItemClick();
              onLogout();
            }}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Déconnexion</span>
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#040E25] via-[#0a1f3f] to-[#002B54] text-white shadow-md">
        <div className="flex items-center space-x-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="p-2 -ml-1 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-baseline space-x-1.5 truncate">
            <span className="text-lg font-bold tracking-wide">C.E.S</span>
            <span className="text-lg font-bold tracking-wide text-cyan-400">ADMIN</span>
            {activeItem && (
              <span className="text-xs text-blue-200/80 font-medium truncate pl-1.5 border-l border-white/20">
                {activeItem.label}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {admin && (
            <div className="w-8 h-8 rounded-full bg-blue-700/70 border border-cyan-400/40 flex items-center justify-center text-xs font-semibold">
              {initial}
            </div>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Déconnexion"
              className="p-2 rounded-xl text-red-300 hover:text-red-200 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[82vw] h-full flex flex-col bg-gradient-to-b from-[#040E25] via-[#0a1f3f] to-[#002B54] text-white shadow-2xl z-10">
            <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold tracking-wide leading-tight">C.E.S</p>
                <p className="text-xl font-bold tracking-wide leading-tight text-cyan-400">ADMIN</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderNavContent(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside
        id="admin-sidebar"
        className="hidden lg:flex lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 z-40 flex-col bg-gradient-to-b from-[#040E25] via-[#0a1f3f] to-[#002B54] text-white shadow-2xl"
      >
        <div className="px-6 py-7 border-b border-white/10">
          <p className="text-2xl font-bold tracking-wide leading-tight">C.E.S</p>
          <p className="text-2xl font-bold tracking-wide leading-tight text-cyan-400">ADMIN</p>
        </div>
        {renderNavContent()}
      </aside>
    </>
  );
};

export default AdminSidebar;
