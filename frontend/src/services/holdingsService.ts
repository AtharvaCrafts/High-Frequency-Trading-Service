export const getHoldings = async () => {
  const response = await fetch('/api/holdings');
  if (response.status === 401) {
    throw new Error('Please login first');
  }
  if (!response.ok) {
    throw new Error('Failed to fetch holdings');
  }
  return response.json();
};