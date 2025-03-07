import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize, FiX } from 'react-icons/fi';

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define navigation functions with useCallback to avoid the circular dependency
  const handlePrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      // Reset transition lock after animation time
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [images.length, isTransitioning]);

  const handleNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      // Reset transition lock after animation time
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [images.length, isTransitioning]);

  // Handle keyboard controls
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
    } else if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  }, [handlePrevious, handleNext]);

  // Add and remove event listeners
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      // Lock body scroll while fullscreen
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, handleKeyDown]);

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  if (!images || images.length === 0) {
    return <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">No images available</div>;
  }

  return (
    <>
      {/* Main image display */}
      <div className="relative overflow-hidden rounded-lg bg-white border">
        <img
          key={`main-${selectedIndex}`}
          src={images[selectedIndex]}
          alt=""
          className={`w-full h-[400px] object-contain transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
        />
        
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
          aria-label="Toggle fullscreen"
        >
          <FiMaximize />
        </button>
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md"
              aria-label="Previous image"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md"
              aria-label="Next image"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === selectedIndex ? 'border-teal-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            >
              <img 
                src={image} 
                alt="" 
                className="w-full h-full object-cover" 
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Fullscreen modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div 
            className="absolute inset-0 bg-black opacity-90" 
            onClick={toggleFullscreen}
            aria-hidden="true"
          />
          
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/30 transition-colors z-10"
            aria-label="Close fullscreen view"
          >
            <FiX size={24} />
          </button>
          
          <div className="relative z-10 w-full max-w-4xl">
            <img
              key={`fullscreen-${selectedIndex}`}
              src={images[selectedIndex]}
              alt=""
              className={`w-full h-auto max-h-[80vh] object-contain transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
            />
            
            {/* Fullscreen navigation */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button 
                  onClick={handlePrevious}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={30} />
                </button>
                
                <button 
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next image"
                >
                  <FiChevronRight size={30} />
                </button>
              </div>
            )}
          </div>
          
          {/* Fullscreen thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 z-10">
              <div className="flex justify-center space-x-2 px-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={`fullscreen-thumb-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedIndex ? 'border-white shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === selectedIndex ? 'true' : 'false'}
                  >
                    <img 
                      src={image} 
                      alt="" 
                      className="w-full h-full object-cover"
                      loading="lazy" 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
