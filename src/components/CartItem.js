import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

// CartItem component to display individual cart items
const CartItem = ({ item }) => {
  // Extract functions from CartContext
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);

  // Destructure item properties for easier access
  const { id, title, image, price, amount } = item;

  // Calculate the total price for the item
  const totalPrice = (price * amount).toFixed(2);

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500 transform transition-transform duration-300 hover:bg-gray-50">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Product image with link to product page */}
        <Link to={`/product/${id}`}>
          <img 
            className="max-w-[80px] transform hover:scale-110 transition-transform duration-300" 
            src={image} 
            alt={title} 
          />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            {/* Product title with link to product page */}
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline transition-all duration-300"
            >
              {title}
            </Link>
            {/* Remove item from cart */}
            <button
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition-colors duration-300" />
            </button>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* Quantity controls */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <button
                onClick={() => decreaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              >
                <IoMdRemove />
              </button>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <button
                onClick={() => increaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              >
                <IoMdAdd />
              </button>
            </div>
            {/* Display item price */}
            <div className="flex flex-1 items-center justify-around">
              ${price}
            </div>
            {/* Display total price for the item */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">
              ${totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
