import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Reusable confirmation modal (replaces window.confirm).
 * Props: open, title, message, confirmLabel, cancelLabel, danger, onConfirm, onCancel
 */
const ConfirmModal = ({
  open,
  title = 'Confirmation',
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  danger = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
      if (e.key === 'Enter') onConfirm?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onConfirm, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#040E25]/60 backdrop-blur-sm" onClick={onCancel} />

          <motion.div
            id="confirm-modal"
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1.5 bg-gradient-to-r from-blue-950 to-cyan-400" />

            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pt-7">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                    danger ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-950'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="pr-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <div className="text-sm text-gray-600 leading-relaxed">{message}</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-7">
                <button
                  id="confirm-modal-cancel"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  id="confirm-modal-confirm"
                  onClick={onConfirm}
                  autoFocus
                  className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${
                    danger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-950 hover:bg-blue-900'
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
