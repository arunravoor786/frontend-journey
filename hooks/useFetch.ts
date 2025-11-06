import { useState, useEffect } from 'react';
import type { UseFetchResult } from '../types';

/**
 * Custom hook for fetching data from an API with TypeScript support
 * @param url - The API endpoint URL to fetch from
 * @returns Object containing data, error, and loading states
 */
export const useFetch = <T>(url: string): UseFetchResult<T> => {
  // State declarations with proper TypeScript types
  const [data, setData] = useState<T | null>(null);           // Generic type T for flexible data
  const [error, setError] = useState<string | null>(null);    // Error message as string
  const [loading, setLoading] = useState<boolean>(true);      // Loading state for UI feedback

  useEffect(() => {
    // Create abort controller for request cancellation
    const abortController = new AbortController();
    
    // Async function to fetch data (cleaner than promise chains)
    const fetchData = async (): Promise<void> => {
      try {
        // Set initial states
        setLoading(true);           // Show loading indicator
        setError(null);             // Clear previous errors
        
        // Simulate your original 3-second delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Make HTTP request with abort signal for cancellation
        const response = await fetch(url, {
          signal: abortController.signal  // Allow request cancellation
        });
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response with proper typing
        const result: T = await response.json();
        
        // Update state with fetched data
        setData(result);
        
        console.log('✅ Data fetched successfully:', result);
        
      } catch (err) {
        // Handle different types of errors
        if (err instanceof Error) {
          // Check if error is due to request cancellation
          if (err.name === 'AbortError') {
            console.log('🔄 Request was cancelled');
            return; // Don't set error state for cancelled requests
          }
          setError(err.message);
          console.error('❌ Fetch error:', err.message);
        } else {
          // Handle unexpected error types
          setError('An unexpected error occurred');
          console.error('❌ Unknown error:', err);
        }
      } finally {
        // Always hide loading indicator
        setLoading(false);
      }
    };

    // Start the fetch operation
    fetchData();
    
    // Cleanup function - runs when component unmounts or URL changes
    return () => {
      abortController.abort(); // Cancel ongoing request
      console.log('🧹 Cleanup: Request cancelled for URL:', url);
    };
    
  }, [url]); // Dependency array - re-run effect when URL changes

  // Return object instead of array for better destructuring
  return { data, error, loading };
};

export default useFetch;
