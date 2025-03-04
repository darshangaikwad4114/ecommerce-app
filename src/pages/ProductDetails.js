import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart, FaHeart, FaShare, FaCheckCircle, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import ImageGallery from "../components/ImageGallery";
import useScrollToTop from "../hooks/useScrollToTop";

const ProductDetails = () => {
  // Get product id from url
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products, loading } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Custom hook to scroll to top on page load
  useScrollToTop();

  // Find product based on id
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, products]);

  // Handle adding to cart with animation
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, amount: quantity });
      setAddedToCart(true);
      
      // Reset "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Toggle wishlist status
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  // Create a single image array to use with ImageGallery
  const getProductImages = () => {
    if (!product) return [];
    
    // For a real product, we might have multiple images
    // For this example, we'll create variations of the same image
    const mainImage = product.image;
    
    // Return just one image instead of duplicates
    return [mainImage];
  };

  // Filter related products (same category)
  const relatedProducts = products
    .filter(item => product && item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  // Show loading spinner while product is being fetched
  if (loading || !product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="large" message="Loading product details..." />
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-teal-500 transition-colors">Home</Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link to="/products" className="hover:text-teal-500 transition-colors">Products</Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link to={`/category/${product.category}`} className="hover:text-teal-500 transition-colors">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li aria-current="page" className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        <Link 
          to="/products" 
          className="inline-flex items-center text-teal-600 mb-8 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md px-2 py-1"
        >
          <IoMdArrowBack className="mr-1" />
          <span>Back to products</span>
        </Link>
        
        {/* Main product section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images - Left Column */}
            <div className="p-6 lg:p-10 bg-gray-50">
              <ImageGallery images={getProductImages()} />
            </div>
            
            {/* Product Info - Right Column */}
            <div className="p-6 lg:p-10 space-y-6">
              {/* Product category */}
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-500 rounded-full text-xs font-medium tracking-wide uppercase">
                {product.category}
              </div>
              
              {/* Product title */}
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className="text-gray-500 ml-2">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-lg text-red-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-md">Save 20%</span>
              </div>
              
              {/* Full description */}
              <div className="py-4 border-t border-b border-gray-200">
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              {/* Quantity selector */}
              <div className="flex space-x-4 items-center">
                <label htmlFor="quantity" className="font-medium text-gray-700">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 text-center border-none focus:outline-none focus:ring-0"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating?.count > 10 ? 'In stock' : 'Low stock'}
                </span>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                    addedToCart 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2" />
                      Add to cart
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-shrink-0 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <FaHeart className={`mr-2 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`} />
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                
                <button
                  className="flex-shrink-0 p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  aria-label="Share this product"
                >
                  <FaShare className="text-gray-500" />
                </button>
              </div>
              
              {/* Key benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaTruck className="text-teal-500" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaShieldAlt className="text-teal-500" />
                  <span>2 year warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaUndo className="text-teal-500" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">You may also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <RelatedProducts key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
