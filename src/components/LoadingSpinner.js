import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'teal', message = 'Loading' }) => {
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-12 w-12 border-3',
    large: 'h-16 w-16 border-4'
  };

  const colorClasses = {
    teal: 'border-t-teal-500 border-b-teal-500',
    blue: 'border-t-blue-500 border-b-blue-500',
    gray: 'border-t-gray-500 border-b-gray-500'
  };

  return (
    <div className="flex flex-col items-center justify-center" role="status">
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-hidden="true"
      />
      {message && (
        <p className="mt-4 text-gray-600 animate-pulse" aria-live="polite">
          {message}
        </p>
      )}
      <span className="sr-only">Loading content</span>
    </div>
  );
};

export default LoadingSpinner;