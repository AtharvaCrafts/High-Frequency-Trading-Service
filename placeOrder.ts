import { KiteConnect } from "kiteconnect";
import { confirmationOfBalnce } from "./confirmationOfFunds.ts";
import { apiKey, symbol } from "./tempConfig.ts";
import { kc } from "./sessionGen.ts";
import { Exchanges, TransactionType, OrderType, Product } from "./dto/TGenericType.ts";
import logger from "./assert/Log.ts";




export async function placeOrder(type: "BUY" | "SELL") {

    const params = {
        exchange : 'NSE' as Exchanges,
        tradingsymbol : symbol,
        transaction_type : type,
        order_type : "MARKET" as OrderType,
        quantity: parseInt(process.env.QUANTITY || "1"), // Add quantity with a default value
        product: (process.env.PRODUCT as Product) || "MIS", // Add product with a default value
        stoploss : parseInt(process.env.STOPLOSS!)  || 0,
    }
    
    if(!confirmationOfBalnce(params.tradingsymbol, params.quantity)){
        console.log("Insufficient funds for the order.");
        return;
    }
    logger.log(`Placing ${type} order for ${params.quantity} shares of ${params.tradingsymbol} at market price.`);
    const order = await kc.placeOrder("regular", params);
    
    return order;
} 