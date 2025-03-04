import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value until a specified delay has passed
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} [immediate=false] - Whether to update immediately on first change
 * @returns {any} The debounced value
 */
export const useDebounce = (value, delay = 300, immediate = false) => {
  const [debouncedValue, setDebouncedValue] = useState(immediate ? value : undefined);
  
  useEffect(() => {
    // Update immediately for the first change if immediate flag is set
    if (immediate && debouncedValue === undefined) {
      setDebouncedValue(value);
      return;
    }
    
    // Set up the timeout
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up on unmount or value/delay change
    return () => clearTimeout(timer);
  }, [value, delay, debouncedValue, immediate]);

  return debouncedValue;
};

/**
 * A hook that provides a debounced callback function
 * @param {Function} callback - The callback function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} The debounced callback function
 */
export const useDebouncedCallback = (callback, delay = 300) => {
  const [timeoutId, setTimeoutId] = useState(null);
  
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const id = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeoutId(id);
  };
};