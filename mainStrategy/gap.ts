import logger from "../assert/Log.ts"
import { placeOrder } from "../placeOrder.ts";
import { kc } from "../sessionGen.ts";
import { gapThresholdPercentage } from "../tempConfig.ts";

const GAP_THRESHOLD_PERCENT = parseInt(gapThresholdPercentage.toString());
const BUY = "BUY";
const SELL = "SELL";

export function gapCalcPrct(openPrice: number, lastClosingPrice: any): number {
    const gap = openPrice - lastClosingPrice;
    const gapPercent = (gap / lastClosingPrice) * 100;
    logger.log(`🔍 Gap %: ${gapPercent.toFixed(2)}%`);
    return gapPercent;
}

export function placeOrderStat(gapPercent : number){
    let order;
    if (gapPercent >= GAP_THRESHOLD_PERCENT) {
        logger.log(`🚀 GAP-UP detected (> ${GAP_THRESHOLD_PERCENT}%) — Consider BUY`);
        order = placeOrder(BUY);
    } else if (gapPercent <= -GAP_THRESHOLD_PERCENT) {
        logger.log(`🔻 GAP-DOWN detected (< -${GAP_THRESHOLD_PERCENT}%) — Consider SELL`);
        order = placeOrder(SELL);
    }
    return order;
}  