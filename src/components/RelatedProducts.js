import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext';

const RelatedProducts = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  // Quick add to cart handler
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCart({...product, amount: 1});
    
    // Create a subtle feedback animation on the button
    const btn = e.currentTarget;
    btn.classList.add('animate-pulse', 'bg-green-500');
    setTimeout(() => {
      btn.classList.remove('animate-pulse', 'bg-green-500');
    }, 700);
  };

  // Format price with currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(product.price);
  
  return (
    <article className="border border-gray-200 rounded-lg h-full mb-4 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
      {/* Sale badge if discounted */}
      {product.compareAtPrice && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          Sale
        </span>
      )}
      
      {/* Image container */}
      <Link 
        to={`/product/${product.id}`} 
        className="block w-full h-[200px] overflow-hidden"
        aria-label={product.title}
      >
        <div className="w-full h-full flex justify-center items-center p-4 bg-gray-50">
          <img
            className="max-h-[160px] max-w-[160px] object-contain transition-all duration-300 group-hover:scale-110"
            src={product.image}
            alt=""
            loading="lazy"
          />
        </div>
      </Link>
      
      {/* Product info */}
      <div className="px-4 pb-4 pt-3">
        <div className="flex justify-between items-start">
          <div className="text-xs text-gray-500 capitalize mb-1 bg-gray-100 px-2 py-1 rounded-full">{product.category}</div>
          
          {/* Show rating if available */}
          {product.rating && (
            <div className="flex items-center">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="text-xs ml-1 text-gray-600">{product.rating.rate}</span>
            </div>
          )}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-800 mb-1 truncate hover:text-teal-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-semibold text-teal-600">{formattedPrice}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={handleAddToCart}
          className="flex justify-center items-center bg-teal-500 text-white w-10 h-10 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          aria-label={`Add ${product.title} to cart`}
        >
          <BsPlus className="text-xl" />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="flex justify-center items-center bg-white text-gray-700 w-10 h-10 rounded-full hover:bg-gray-100 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label={`View ${product.title} details`}
        >
          <BsEyeFill />
        </Link>
      </div>
    </article>
  );
};

// Proper implementation of memo with comparison function
export default memo(RelatedProducts, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});
