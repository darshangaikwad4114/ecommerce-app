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
    <div className="transform transition-all duration-300 hover:-translate-y-2 bg-white rounded-xl overflow-hidden hover:shadow-xl border border-gray-100">
      <div className="h-[300px] relative overflow-hidden group">
        <div className="w-full h-full flex justify-center items-center bg-neutral-light">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              loading="lazy"
              className="max-h-[160px] transform transition-transform duration-500 group-hover:scale-110 object-contain"
              src={image}
              alt={title}
              width="160"
              height="160"
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
            aria-label={`Add ${title} to cart`}
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-brand-primary hover:bg-brand-dark transition-all duration-300 rounded-full">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-brand-dark shadow-lg hover:shadow-xl hover:bg-brand-light transform hover:scale-110 transition-all duration-300 rounded-full"
            aria-label={`View details of ${title}`}
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="text-xs uppercase tracking-wider text-brand-primary mb-2 font-semibold">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="text-lg font-bold mb-3 hover:text-brand-primary transition-colors duration-300 line-clamp-1">{title}</h2>
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-secondary">$ {price.toFixed(2)}</h2>
          <span className="text-xs font-medium px-2 py-1 bg-brand-light text-brand-primary rounded-full">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
