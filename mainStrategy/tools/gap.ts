import logger from "../../assert/Log.ts"
import { placeOrder } from "../../placeOrder.ts";
import { checkEquity } from "./checkEquity.ts";
const BUY = "BUY";
const SELL = "SELL";

export function gapCalcPrct(openPrice: number, lastClosingPrice: any): number {
    const gap = openPrice - lastClosingPrice;
    const gapPercent = (gap / lastClosingPrice) * 100;
    logger.log(`🔍 Gap %: ${gapPercent.toFixed(2)}%`);
    return gapPercent;
}

export async function placeOrderStat(gapPercent : number, symbol : string, quantity : number, sl : number, thresholdToSell : number) : Promise< number | undefined> {
    let order;
    if (gapPercent >= thresholdToSell) {
        logger.log(`🚀 GAP-UP detected (> ${thresholdToSell}%) — Consider BUY`);
        placeOrder(symbol, BUY, quantity, sl);
    } else if (gapPercent <= -thresholdToSell) {
        logger.log(`🔻 GAP-DOWN detected (< -${thresholdToSell}%) — Consider SELL`);
        if(await checkEquity(symbol, quantity)) placeOrder(symbol, SELL, quantity, sl);
    } else {
        //do nothing 
        order = undefined;
    }
    return order;
}  
