import React, { useState, useRef, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';

const SearchAndFilter = ({ onSearch, onFilter, categories, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const searchInputRef = useRef(null);
  
  // Focus search input on component mount for better UX
  useEffect(() => {
    if (!disabled && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [disabled]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilter({ category, sort: sortBy });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    onFilter({ category: selectedCategory, sort });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
    searchInputRef.current.focus();
  };

  return (
    <section className={`mb-8 px-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Using aria-label instead of aria-disabled which is not supported on section */}
      <h2 className="sr-only">
        {disabled ? 'Product filters (currently disabled)' : 'Product filters'}
      </h2>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <label htmlFor="search" className="sr-only">Search products</label>
          <input
            ref={searchInputRef}
            id="search"
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-base"
            aria-describedby="search-description"
            disabled={disabled}
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
          
          {/* Clear search button */}
          {searchTerm && (
            <button 
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <div id="search-description" className="sr-only">
            Search products by name or description
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative w-full sm:w-48">
            <label htmlFor="category" className="sr-only">Filter by category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-white text-base"
              disabled={disabled}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>

          {/* Sort Options */}
          <div className="relative w-full sm:w-48">
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-3 border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-white text-base"
              disabled={disabled}
              aria-label="Sort products"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true">
              ▼
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SearchAndFilter);