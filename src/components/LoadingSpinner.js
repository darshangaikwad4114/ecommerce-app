import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[400px]">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-[3px] border-brand-light border-t-brand-primary"
        role="status"
        aria-label="Loading content"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-sm font-medium text-brand-dark/70 animate-pulse">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner; 