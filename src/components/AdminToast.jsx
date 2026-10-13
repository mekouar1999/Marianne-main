import React from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const VARIANTS = {
  success: { icon: CheckCircle2, iconClass: 'text-emerald-400', bar: 'from-emerald-400 to-cyan-400' },
  error: { icon: XCircle, iconClass: 'text-red-400', bar: 'from-red-500 to-orange-400' },
  info: { icon: Info, iconClass: 'text-cyan-400', bar: 'from-blue-500 to-cyan-400' },
};

const DURATION = 4000;

/**
 * Show an animated toast in the site's palette.
 * notify('success', 'Carte supprimée', 'La carte « Help line » a été retirée.')
 */
export const notify = (type = 'info', title, description) => {
  const { icon: Icon, iconClass, bar } = VARIANTS[type] || VARIANTS.info;

  return toast.custom(
    (t) => (
      <div
        className={`pointer-events-auto w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-gradient-to-r from-[#040E25] via-[#0a1f3f] to-[#002B54] text-white transition-all duration-300 ${
          t.visible ? 'animate-admin-toast-in' : 'animate-admin-toast-out'
        }`}
      >
        <div className="flex items-start gap-3 p-4">
          <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconClass}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{title}</p>
            {description && <p className="mt-0.5 text-xs text-blue-100/80 leading-relaxed">{description}</p>}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-0.5 text-blue-100/60 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="h-1 bg-white/10">
          <div
            className={`h-full bg-gradient-to-r ${bar}`}
            style={{ animation: `admin-toast-progress ${DURATION}ms linear forwards` }}
          />
        </div>

        <style jsx global>{`
          @keyframes admin-toast-in {
            from { opacity: 0; transform: translateX(110%) scale(0.95); }
            to { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes admin-toast-out {
            from { opacity: 1; transform: translateX(0) scale(1); }
            to { opacity: 0; transform: translateX(110%) scale(0.95); }
          }
          @keyframes admin-toast-progress {
            from { width: 100%; }
            to { width: 0%; }
          }
          .animate-admin-toast-in { animation: admin-toast-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          .animate-admin-toast-out { animation: admin-toast-out 0.3s ease-in forwards; }
        `}</style>
      </div>
    ),
    { duration: DURATION }
  );
};

export default notify;
