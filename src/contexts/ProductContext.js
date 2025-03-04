import React, { createContext, useState, useEffect, useCallback } from "react";

export const ProductContext = createContext();

// Status constants to track data fetching state
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const ProductProvider = ({ children }) => {
  // Move cache duration into state to fix dependency issue
  const [cacheSettings] = useState({
    duration: 5 * 60 * 1000 // 5 minutes
  });
  
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Memoized fetch function with cacheSettings.duration as dependency
  const fetchProducts = useCallback(async (forceRefresh = false) => {
    // Check cached data first
    const cachedData = localStorage.getItem('cachedProducts');
    const cachedTime = localStorage.getItem('cachedProductsTime');
    
    const isCacheValid = cachedData && cachedTime && 
      (Date.now() - Number(cachedTime)) < cacheSettings.duration;
    
    if (isCacheValid && !forceRefresh) {
      try {
        const data = JSON.parse(cachedData);
        setProducts(data);
        
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setStatus(STATUS.SUCCESS);
        return;
      } catch (err) {
        // If cache parsing fails, continue with API fetch
        console.error("Cache parse error:", err);
      }
    }
    
    // Fetch from API
    try {
      setStatus(STATUS.LOADING);
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Save to cache
      localStorage.setItem('cachedProducts', JSON.stringify(data));
      localStorage.setItem('cachedProductsTime', Date.now().toString());
      
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      setCategories(uniqueCategories);
      
      setStatus(STATUS.SUCCESS);
      setError(null);
    } catch (err) {
      setStatus(STATUS.ERROR);
      setError(err.message);
    }
  }, [cacheSettings.duration]); // Add cacheSettings.duration as dependency
  
  // Force refresh function exposed to consumers
  const refreshProducts = () => fetchProducts(true);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Derived loading and error states for backward compatibility
  const loading = status === STATUS.LOADING;
  
  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      categories, 
      status,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
