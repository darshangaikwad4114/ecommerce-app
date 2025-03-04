import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if only one page exists
  if (totalPages <= 1) return null;

  // Create an accessible page array with ellipsis for many pages
  const getVisiblePages = () => {
    // Always show first and last page
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // For many pages, show current and adjacent pages with ellipsis
    const pages = [];
    if (currentPage <= 3) {
      // Near start
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near end
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Middle
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination" className="my-8">
      <ul className="flex flex-wrap justify-center items-center gap-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 py-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Previous page"
          >
            <HiChevronLeft className="mr-1" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </li>
        
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-2" aria-hidden="true">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg border ${
                  currentPage === page 
                    ? 'bg-teal-500 text-white border-teal-500 font-medium' 
                    : 'bg-white hover:bg-gray-100'
                } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 py-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <HiChevronRight className="ml-1" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Pagination);