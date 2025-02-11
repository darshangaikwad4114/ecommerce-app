import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';

const SearchAndFilter = ({ onSearch, onFilter, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

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

  return (
    <div className="mb-8 px-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full md:w-48 px-4 py-2 border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 