export type TfileSystemToken = {
    requestToken : string,
    savedAt : string
}

export type Exchanges = "NSE" | "BSE" | "NFO" | "BFO" | "CDS" | "MCX";
export type TransactionType = "BUY" | "SELL";
export type Product = "NRML" | "MIS" | "CNC"; // Define the Product export type
export type OrderType = "MARKET" | "LIMIT" | "SL" | "SL-M"

export interface Order {
  symbol: string;
  quantity: number;
}