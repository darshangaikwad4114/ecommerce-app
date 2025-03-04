import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-teal-400">E-Commerce Shop</h2>
            <p className="text-gray-400 mb-4">
              Quality products for everyday needs. Fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              {/* Using proper URLs for social links to fix accessibility issues */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Facebook page"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Twitter profile" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Instagram profile"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our GitHub repository"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-teal-400">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-teal-400">Newsletter</h2>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex">
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button 
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-r-lg transition-colors duration-300"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500">&copy; {currentYear} E-commerce Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
