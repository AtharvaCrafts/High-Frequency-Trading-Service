// write a function which returns historical data for a given stock symbol and date range
import { kc } from "../sessionGen";
const interval = '3minute'; // Default interval, can be changed as needed
export async function lastClosing(symbol: string) : Promise<number> {
    // Get historical data for the given stock symbol and date range
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

   // Format date range just for yesterday
    const from = new Date(yesterday.setHours(9, 15, 0, 0)); // Market open
    const to = new Date(yesterday.setHours(15, 30, 0, 0));  // Market close

    const historicalData = await kc.getHistoricalData(symbol, interval, from, to);
    return historicalData.close;
}