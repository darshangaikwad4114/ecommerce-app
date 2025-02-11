import React, { createContext, useState, useEffect } from "react";

// Create a context for products
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // State to store products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Function to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
