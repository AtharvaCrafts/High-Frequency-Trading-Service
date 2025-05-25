
import { confirmationOfBalnce } from "./confirmationOfFunds.ts";
import { kc } from "./sessionGen.ts";
import { Exchanges, OrderType, Product } from "./dto/TGenericType.ts";
import logger from "./assert/Log.ts";




export async function placeOrder(symbol : string ,type: "BUY" | "SELL", quantity : number, sl : number) {

    const params = {
        exchange : 'NSE' as Exchanges,
        tradingsymbol : symbol,
        transaction_type : type,
        order_type : "MARKET" as OrderType,
        quantity: quantity, // Add quantity with a default value
        product: (process.env.PRODUCT as Product) || "MIS", // Add product with a default value
        stoploss : sl,
    }
    
    if(!confirmationOfBalnce(params.tradingsymbol, params.quantity)){
        console.log("Insufficient funds for the order.");
        return;
    }
    logger.log(`Placing ${type} order for ${params.quantity} shares of ${params.tradingsymbol} at market price.`);
    const order = await kc.placeOrder("regular", params);
    
    return order;
} 