import React, { useContext, useState, useCallback } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import SearchAndFilter from "../components/SearchAndFilter";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const handleSearch = useCallback((searchTerm) => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products]);

  const handleFilter = useCallback(({ category, sort }) => {
    let filtered = [...products];

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply sorting
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products]);

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          
          <SearchAndFilter 
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={categories}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No products found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
