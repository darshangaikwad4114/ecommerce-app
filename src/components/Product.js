import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";

// Product component to display individual product details
const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // Destructure product properties for easier access
  const { id, image, category, title, price } = product;

  // Handle add to cart with error prevention
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      addToCart(product, id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="transform transition-all duration-300 hover:-translate-y-2">
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group">
        <div className="w-full h-full flex justify-center items-center">
          {/* Product image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              loading="lazy"
              className="max-h-[160px] transform transition-transform duration-700 group-hover:scale-110"
              src={image}
              alt={title}
              width="160"
              height="160"
            />
          </div>
        </div>
        {/* Action buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="transform hover:scale-110 transition-transform duration-300"
            aria-label={`Add ${title} to cart`}
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 hover:bg-teal-600 transition-colors duration-300">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl hover:bg-gray-100 transform hover:scale-110 transition-all duration-300"
            aria-label={`View details of ${title}`}
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* Product category, title & price */}
      <div className="transform transition-all duration-300">
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1 hover:text-teal-500 transition-colors duration-300">{title}</h2>
        </Link>
        <h2 className="font-semibold">$ {price}</h2> {/* Corrected class name */}
      </div>
    </div>
  );
};

export default Product;
