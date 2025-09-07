
import { useState, useEffect, useCallback } from 'react';
import { getHoldings } from './holdingsService';

export const useHoldings = () => {
  const [holdings, setHoldings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoldings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getHoldings();
      setHoldings(data);
    } catch (err) {
      setError('Failed to fetch holdings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  return { holdings, isLoading, error, setHoldings, refetchHoldings: fetchHoldings };
};
