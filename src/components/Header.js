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
        isActive 
          ? "bg-white/90 backdrop-blur-lg py-2 sm:py-3 shadow-md border-b border-gray-100" 
          : "bg-transparent py-3 sm:py-4"
      } fixed w-full z-10 px-4 sm:px-6 lg:px-8 transition-all duration-500`}
    >
      <div className="container mx-auto flex items-center justify-between h-full max-w-[1200px]">
        <Link to="/">
          <div className="w-[50px] sm:w-[60px] md:w-[70px] transform hover:scale-105 transition-all duration-300">
            <img src={Logo} alt="Company Logo" />
          </div>
        </Link>

        {/* Cart icon with item count */}
        <div
          onClick={handleCartToggle}
          className="cursor-pointer flex relative transform hover:scale-105 transition-all duration-300 hover:text-brand-primary p-1.5 sm:p-2"
          aria-label={`Cart with ${itemAmount} items`}
          role="button"
          tabIndex={0}
        >
          <BsBag className="text-xl sm:text-2xl transition-colors duration-300 text-brand-dark" />
          <div className="bg-brand-secondary absolute -right-1 -bottom-1 text-[9px] sm:text-[10px] w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white rounded-full flex justify-center items-center font-bold shadow-lg">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
