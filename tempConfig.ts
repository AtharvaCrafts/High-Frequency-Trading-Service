export const apiKey = process.env.ZERODHA_API_KEY ?? "undefined";
export const symbol = process.env.SYMBOL ?? "undefined";
export const gapThresholdPercentage = process.env.GAP_THRESHOLD_PERCENT ?? 2.0; // Default to 2% if not set

export const quantity = parseInt(process.env.QUANTITY ?? "1");
export const stopLoss = parseInt(process.env.STOPLOSS ?? "0");