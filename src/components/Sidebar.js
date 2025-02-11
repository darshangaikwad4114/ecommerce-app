import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

// Sidebar component to display shopping cart details
const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-500 ease-in-out z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center transform hover:scale-110 transition-transform duration-300"
        >
          <IoMdArrowForward className="text-2xl hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* Display total amount */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          {/* Clear cart button */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 hover:bg-red-600 text-white w-12 h-12 flex justify-center items-center text-xl transform hover:scale-105 transition-all duration-300"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to="/"
          className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium hover:bg-gray-300 transition-colors duration-300"
        >
          View Cart
        </Link>
        <Link
          to="/"
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium hover:bg-gray-900 transform hover:-translate-y-1 transition-all duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
