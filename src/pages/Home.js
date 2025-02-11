import React, { useContext, useState, useCallback, useMemo } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import SearchAndFilter from "../components/SearchAndFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const { products, loading, error, categories } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    sort: "default",
    priceRange: [0, 1000]
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handleFilter = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

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
            priceRange={filters.priceRange}
          />

          {currentProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No products found matching your criteria
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {currentProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
