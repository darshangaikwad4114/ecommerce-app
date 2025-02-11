import React, { useContext, useState, useCallback } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import SearchAndFilter from "../components/SearchAndFilter";
import ProductSkeleton from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useProductFilter } from "../hooks/useProductFilter";

const ITEMS_PER_PAGE = 8;
const SKELETON_COUNT = 8;

const Home = () => {
  const { products, loading, error, categories } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    sort: "default"
  });

  // Debounce search term to prevent excessive filtering
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Use custom hook for filtering products
  const filteredProducts = useProductFilter(products, filters, debouncedSearch);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleFilter = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  if (loading) {
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
              disabled={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {[...Array(SKELETON_COUNT)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

          {currentProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <div className="text-xl mb-4">No products found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({ category: "all", sort: "default" });
                }}
                className="text-teal-500 hover:text-teal-600 transition-colors duration-300"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${(product.id % ITEMS_PER_PAGE) * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <Product product={product} />
                  </div>
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
