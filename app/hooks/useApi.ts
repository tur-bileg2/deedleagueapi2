import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions {
  retries?: number;
  retryDelay?: number;
  initialFetch?: boolean;
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const { retries = 0, retryDelay = 1000, initialFetch = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(initialFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchWithRetry = useCallback(async (retriesLeft: number): Promise<T> => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      if (retriesLeft <= 0) {
        throw err;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      // Retry with one less retry
      return fetchWithRetry(retriesLeft - 1);
    }
  }, [url, retryDelay]);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchWithRetry(retries);
      setData(result);
    } catch (err) {
      console.error('API request failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchWithRetry, retries]);

  useEffect(() => {
    if (initialFetch) {
      refetch();
    }
  }, [initialFetch, refetch]);

  return { data, loading, error, refetch };
}
