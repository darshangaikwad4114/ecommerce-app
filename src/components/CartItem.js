import React, { useContext, memo } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { id, title, image, price, amount } = item;
  
  // Format prices with Intl for proper currency display
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
  
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price * amount);

  return (
    <div className="flex gap-x-4 py-4 px-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500 hover:bg-gray-50 transition-colors duration-200">
      <div className="w-full flex items-center gap-x-4">
        {/* Product image with link */}
        <Link 
          to={`/product/${id}`}
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg overflow-hidden"
          aria-label={`View ${title} details`}
        >
          <div className="bg-gray-100 rounded-lg p-1">
            <img 
              className="w-[80px] h-[80px] object-contain transform hover:scale-110 transition-transform duration-300" 
              src={image} 
              alt=""
              loading="lazy"
              aria-hidden="true"
            />
          </div>
        </Link>

        <div className="w-full flex flex-col">
          <div className="flex flex-wrap justify-between mb-2 gap-y-1">
            {/* Product title */}
            <Link
              to={`/product/${id}`}
              className="text-sm md:text-base font-medium max-w-[240px] text-gray-800 hover:text-teal-600 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              {title}
            </Link>
            
            {/* Remove button */}
            <button
              onClick={() => {
                removeFromCart(id);
                // Announce to screen readers that the item was removed
                const announcement = document.getElementById('cart-announcement');
                if (announcement) {
                  announcement.textContent = `${title} removed from cart`;
                }
              }}
              className="text-xl cursor-pointer p-1 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Remove ${title} from cart`}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>

          <div className="flex flex-wrap gap-x-2 h-[36px] text-sm md:text-base items-center">
            {/* Price per item */}
            <div className="flex items-center text-gray-800">
              <span className="mr-1 text-xs text-gray-500">Price:</span> {formattedPrice}
            </div>
            
            {/* Quantity controls */}
            <div className="flex flex-1 max-w-[120px] items-center h-full border text-primary font-medium rounded-md overflow-hidden">
              <button
                onClick={() => decreaseAmount(id)}
                disabled={amount === 1}
                className={`flex-1 h-full flex justify-center items-center cursor-pointer ${amount === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition-colors duration-200 focus:outline-none focus:bg-gray-100`}
                aria-label="Decrease quantity"
              >
                <IoMdRemove />
              </button>
              <div 
                className="h-full flex justify-center items-center px-2" 
                aria-live="polite"
                role="status"
              >
                <span className="sr-only">Quantity: </span>{amount}
              </div>
              <button
                onClick={() => increaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                aria-label="Increase quantity"
              >
                <IoMdAdd />
              </button>
            </div>
            
            {/* Total price */}
            <div className="flex ml-auto items-center text-teal-600 font-medium">
              <span className="mr-1 text-xs text-gray-500">Total:</span> {formattedTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimize re-renders with proper memo implementation
export default memo(CartItem, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.amount === nextProps.item.amount
  );
});
