import React, { createContext, useState, useEffect, useCallback } from "react";

// Create a context for products
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // State to store products
  const [products, setProducts] = useState([]);

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
