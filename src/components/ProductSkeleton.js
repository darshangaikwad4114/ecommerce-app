import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-200 h-[300px] mb-4 relative overflow-hidden group transition">
      {/* Image skeleton */}
      <div className="w-full h-[200px] bg-gray-200 flex justify-center items-center">
        <div className="w-[200px] h-[160px] bg-gray-300 rounded"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      
      {/* Action buttons skeleton */}
      <div className="absolute top-6 -right-11 p-2 flex flex-col gap-y-2 opacity-75">
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton; 