import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;

  // Format price as USD
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  return (
    <div className="border border-[#e4e4e4] h-full rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg group">
      {/* Product image and category */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <div className="h-[300px] flex items-center justify-center bg-gray-50 p-6">
            <img
              className="max-h-[240px] object-contain transition-transform duration-300 group-hover:scale-110"
              src={image}
              alt={title}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="absolute top-4 left-4">
          <span className="bg-teal-500 text-white text-sm font-medium px-2 py-1 rounded-md capitalize">
            {category}
          </span>
        </div>
      </div>
      
      {/* Product details and add to cart */}
      <div className="p-4 flex flex-col h-[150px]">
        <Link to={`/product/${id}`} className="flex-grow">
          <h2 className="font-medium mb-2 text-gray-800 hover:text-teal-600 transition-colors line-clamp-2" title={title}>
            {title}
          </h2>
        </Link>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-semibold text-teal-600">{formattedPrice}</span>
          <button 
            onClick={() => addToCart(product, id)} 
            className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-4 rounded-full transition-colors duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
