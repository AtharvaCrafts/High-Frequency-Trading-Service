import { NseIndia } from "stock-nse-india";

const nse = new NseIndia();

export async function lastClosing(symbol: string){
    // Get historical data for the given stock symbol and date range
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

   // Format date range just for yesterday
    const start = new Date(yesterday.setHours(9, 15, 0, 0)); // Market open
    const end = new Date(yesterday.setHours(15, 30, 0, 0));  // Market close
    const dateRange = {
        start,
        end
    }
    const historicalData = await nse.getEquityHistoricalData(symbol, dateRange);
    return historicalData[0].data
}