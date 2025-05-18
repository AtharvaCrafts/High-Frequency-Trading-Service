export const apiKey = process.env.ZERODHA_API_KEY ?? 'ev7o6c03k1fdwrjk';
export const symbol = process.env.SYMBOL ?? "JPPOWER";
export const gapThresholdPercentage = process.env.GAP_THRESHOLD_PERCENT ?? 2.0; // Default to 2% if not set
export const apiSecret = 'gmin9zgivnbrflom8qocimzdn34dais9';
export const quantity = parseInt(process.env.QUANTITY ?? "1");
export const stopLoss = parseInt(process.env.STOPLOSS ?? "0");