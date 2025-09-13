import React, { useCallback } from 'react';
import { useHoldings } from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/services/useHoldings.ts';
import { useWebSocket } from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/services/useWebSocket.ts';

const HomePage = () => {
  const { holdings, isLoading, error, setHoldings } = useHoldings();

  const handleWebSocketMessage = useCallback((message: any) => {
    if (message.type === 'order_update') {
      // For simplicity, we'll just refetch the holdings.
      // In a real app, you might want to update the state directly.
      const fetchHoldings = async () => {
        const response = await fetch('/api/holdings');
        const data = await response.json();
        setHoldings(data);
      };
      fetchHoldings();
    }
  }, [setHoldings]);

  useWebSocket(handleWebSocketMessage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">My Holdings</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Average Price</th>
            <th>Last Price</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding: any) => (
            <tr key={holding.tradingsymbol}>
              <td>{holding.tradingsymbol}</td>
              <td>{holding.quantity}</td>
              <td>{holding.average_price}</td>
              <td>{holding.last_price}</td>
              <td>{holding.pnl.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;