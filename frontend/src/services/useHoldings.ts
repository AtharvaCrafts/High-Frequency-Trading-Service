
import { useState, useEffect, useCallback } from 'react';
import { getHoldings } from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/services/holdingsService.ts';

export const useHoldings = () => {
  const [holdings, setHoldings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoldings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getHoldings();
      setHoldings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  return { holdings, isLoading, error, setHoldings, refetchHoldings: fetchHoldings };
};
