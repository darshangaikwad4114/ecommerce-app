import React from 'react';

const ProductSkeleton = () => {
  return (
    <div 
      className="border border-gray-200 rounded-lg h-[350px] mb-4 relative overflow-hidden group transition"
      aria-hidden="true"
      role="presentation"
    >
      <div className="w-full h-[200px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer flex justify-center items-center">
        <div className="w-[200px] h-[160px] bg-gray-300 rounded"></div>
      </div>
      
      <div className="px-6 py-4">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded w-1/3"></div>
      </div>
      
      <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-full"></div>
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;