export const apiKey = process.env.ZERODHA_API_KEY ?? '';
export const symbol = process.env.SYMBOL ?? "JPPOWER";
export const gapThresholdPercentage = process.env.GAP_THRESHOLD_PERCENT ?? 1.0; // Default to 2% if not set
export const apiSecret = '';
export const quantity = parseInt(process.env.QUANTITY ?? "1");
export const stopLoss = parseInt(process.env.STOPLOSS ?? "0");

//consant value - 
export const MARKET_OPEN_HOUR = 9;
export const MARKET_OPEN_MINUTE = 15;
export const MARKET_CLOSE_HOUR = 15;
export const MARKET_CLOSE_MINUTE = 30;
export let tradeConfig = [
    {
        symbol : "JPPOWER",
        quantity : 1,
        stopLoss : 1,
        immediateOrderAtMarketOpen : false,
        isOrdered : true,
        thresholdToSell : 2
    },
    {
        symbol : "JPPOWER",
        quantity : 1,
        stopLoss : 1,
        immediateOrderAtMarketOpen : false,
        isOrdered : false,
        thresholdToSell : 2
    },
    {
        symbol : "JPPOWER",
        quantity : 1,
        stopLoss : 1,
        immediateOrderAtMarketOpen : false,
        isOrdered : false,
        thresholdToSell : 2
    },
    {
        symbol : "JPPOWER",
        quantity : 1,
        stopLoss : 1,
        immediateOrderAtMarketOpen : false,
        isOrdered : false,
        thresholdToSell : 2
    },

]