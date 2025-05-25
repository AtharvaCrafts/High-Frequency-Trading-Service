import logger from "../assert/Log.ts"
import { placeOrder } from "../placeOrder.ts";
import { gapThresholdPercentage, quantity, symbol } from "../tempConfig.ts";
import { checkEquity } from "./checkEquity.ts";

const GAP_THRESHOLD_PERCENT = parseInt(gapThresholdPercentage.toString());
const BUY = "BUY";
const SELL = "SELL";

export function gapCalcPrct(openPrice: number, lastClosingPrice: any): number {
    const gap = openPrice - lastClosingPrice;
    const gapPercent = (gap / lastClosingPrice) * 100;
    logger.log(`🔍 Gap %: ${gapPercent.toFixed(2)}%`);
    return gapPercent;
}

export async function placeOrderStat(gapPercent : number, symbol : string, quantity : number, sl : number) : Promise< number | undefined> {
    let order;
    if (gapPercent >= GAP_THRESHOLD_PERCENT) {
        logger.log(`🚀 GAP-UP detected (> ${GAP_THRESHOLD_PERCENT}%) — Consider BUY`);
        placeOrder(symbol, BUY, quantity, sl);
    } else if (gapPercent <= -GAP_THRESHOLD_PERCENT) {
        logger.log(`🔻 GAP-DOWN detected (< -${GAP_THRESHOLD_PERCENT}%) — Consider SELL`);
        if(await checkEquity(symbol, quantity)) placeOrder(symbol, SELL, quantity, sl);
    } else {
        //do nothing 
        order = undefined;
    }
    return order;
}  
