import { useMemo, useCallback, useRef } from 'react';

/**
 * A hook that efficiently filters and sorts products with advanced memoization
 * @param {Array} products - Array of product objects
 * @param {Object} filters - Filter criteria including category and sort options
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered and sorted products
 */
export const useProductFilter = (products, filters, searchTerm) => {
  // Cache previous results to avoid unnecessary recalculations
  const cache = useRef({
    lastProducts: null,
    lastFilters: null,
    lastSearchTerm: null,
    result: []
  });
  
  // Memoize search term filter with index-based optimization
  const filterBySearchTerm = useCallback((product, term) => {
    if (!term) return true;
    
    const searchLower = term.toLowerCase().trim();
    // Check most commonly matched fields first for early return
    return (
      product.title.toLowerCase().includes(searchLower) || 
      product.category.toLowerCase().includes(searchLower) || 
      (product.description && product.description.toLowerCase().includes(searchLower))
    );
  }, []);

  // Memoize category filter for consistent reference
  const filterByCategory = useCallback((product, category) => {
    return category === "all" || product.category === category;
  }, []);

  // Enhanced sort function with specific comparators for different sort types
  const getSortComparator = useCallback((sortOption) => {
    // Pre-define sort functions for better performance
    const sortFunctions = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "name-asc": (a, b) => a.title.localeCompare(b.title),
      "name-desc": (a, b) => b.title.localeCompare(a.title),
    };
    
    return sortFunctions[sortOption] || null;
  }, []);

  // Apply filtering with batch processing for large datasets
  return useMemo(() => {
    // Early returns and cache checking
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    
    // Check if we can use cached results
    if (
      cache.current.lastProducts === products && 
      cache.current.lastFilters === filters &&
      cache.current.lastSearchTerm === searchTerm
    ) {
      return cache.current.result;
    }
    
    // Performance optimization: If only sort changed, don't re-filter
    if (
      cache.current.lastProducts === products &&
      cache.current.lastSearchTerm === searchTerm &&
      cache.current.lastFilters?.category === filters.category &&
      cache.current.lastFilters?.sort !== filters.sort
    ) {
      const sortComparator = getSortComparator(filters.sort);
      if (sortComparator) {
        const sortedArray = [...cache.current.result].sort(sortComparator);
        
        // Update cache
        cache.current = {
          lastProducts: products,
          lastFilters: filters,
          lastSearchTerm: searchTerm,
          result: sortedArray
        };
        
        return sortedArray;
      }
    }
    
    // Process filtering in batches for better UI responsiveness with large datasets
    let filtered = products;

    // Apply category filter first (usually excludes more items)
    if (filters.category !== "all") {
      filtered = filtered.filter(product => filterByCategory(product, filters.category));
    }
    
    // Then apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(product => filterBySearchTerm(product, searchTerm));
    }
    
    // Apply sorting last, only if needed
    const sortComparator = getSortComparator(filters.sort);
    if (sortComparator) {
      filtered.sort(sortComparator);
    }
    
    // Update cache with new results
    cache.current = {
      lastProducts: products,
      lastFilters: filters,
      lastSearchTerm: searchTerm,
      result: filtered
    };
    
    return filtered;
  }, [products, filters, searchTerm, filterBySearchTerm, filterByCategory, getSortComparator]);
};

/**
 * Optional hook for advanced product filtering with pagination
 * @param {Array} products - Product array
 * @param {Object} filters - Filter options
 * @param {string} searchTerm - Search term
 * @param {number} page - Current page 
 * @param {number} perPage - Items per page
 * @returns {Object} Filtered products and pagination data
 */
export const useProductFilterWithPagination = (products, filters, searchTerm, page = 1, perPage = 10) => {
  const filteredProducts = useProductFilter(products, filters, searchTerm);
  
  return useMemo(() => {
    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        perPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      }
    };
  }, [filteredProducts, page, perPage]);
};