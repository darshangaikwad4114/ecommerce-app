import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';

const RelatedProducts = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="border border-gray-200 rounded-lg h-[300px] mb-4 relative overflow-hidden group transition-transform duration-200 hover:-translate-y-1">
      {/* Image */}
      <div className="w-full h-[200px] flex justify-center items-center p-4 bg-white">
        <div className="w-[160px] h-[160px] flex justify-center items-center">
          <img
            className="max-h-[160px] max-w-[160px] object-contain transition-all duration-300 group-hover:scale-110"
            src={product.image}
            alt={product.title}
          />
        </div>
      </div>
      
      {/* Description */}
      <div className="px-4 pb-4 pt-2">
        <div className="text-sm text-gray-500 capitalize mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.title}</h3>
        </Link>
        <div className="font-semibold text-teal-600">${product.price.toFixed(2)}</div>
      </div>
      
      {/* Buttons */}
      <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={() => addToCart(product)}
          className="flex justify-center items-center bg-teal-500 text-white w-10 h-10 rounded-full hover:bg-teal-600 transition-colors"
          aria-label={`Add ${product.title} to cart`}
        >
          <BsPlus className="text-xl" />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="flex justify-center items-center bg-white text-gray-700 w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={`View ${product.title} details`}
        >
          <BsEyeFill />
        </Link>
      </div>
    </div>
  );
};

export default React.memo(RelatedProducts);
