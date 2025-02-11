import React, { useContext, useEffect, useState, useCallback } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";

const Header = () => {
  // State to track if the header is active (scrolled)
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setIsActive(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle cart toggle with error prevention
  const handleCartToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all duration-500`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/">
          <div className="w-[60px] transform hover:scale-110 transition-transform duration-300">
            <img src={Logo} alt="Company Logo" />
          </div>
        </Link>

        {/* Cart icon with item count */}
        <div
          onClick={handleCartToggle}
          className="cursor-pointer flex relative transform hover:scale-110 transition-transform duration-300"
          aria-label={`Cart with ${itemAmount} items`}
          role="button"
          tabIndex={0}
        >
          <BsBag className="text-4xl hover:text-gray-500 transition-colors duration-300" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center animate-pulse">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
