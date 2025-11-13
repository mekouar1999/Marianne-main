// frontend/src/components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600'
  };

  return (
    <motion.div
      className={`inline-block ${sizeClasses[size]} border-2 ${colorClasses[color]} border-r-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Full page loading component
export const PageLoader = ({ message = 'Chargement...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

// Inline loading component
export const InlineLoader = ({ message = 'Chargement...', size = 'sm' }) => {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} />
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

// Button loading state
export const ButtonLoader = ({ loading, children, ...props }) => {
  return (
    <button {...props} disabled={loading}>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="sm" color="white" />
          <span>Chargement...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingSpinner;
