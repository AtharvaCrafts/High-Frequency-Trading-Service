import { KiteConnect } from "kiteconnect";
import { apiKey } from "./tempConfig.ts";
const kc = new KiteConnect({ api_key: apiKey });

export async function confirmationOfBalnce(stock : string, quantity : number) {
    // This function will check if the funds are available in the account
    // and return a boolean value.
    // You can use the KiteConnect API to check the funds.
    // For example:
    const funds = await kc.getMargins();
    const availableFunds = Number(funds.equity!.net) ;
    // get the price of the stock 
    const price = await kc.getQuote(stock);
    const requiredFunds = Number(price) * quantity;
    if (availableFunds >= requiredFunds) {
        console.log("Funds are available for the order.");
        return true;
    } else {
        console.log("Insufficient funds for the order.");
        return false;
    }
}