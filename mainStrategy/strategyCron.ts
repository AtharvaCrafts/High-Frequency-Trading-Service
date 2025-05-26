//for now this is one time script - later it will be deployed as a cron job

import logger from "../assert/Log.ts";
import { getPrice, lastClosing } from "./tools/closingCandle.ts";
import { gapCalcPrct, placeOrderStat } from "./tools/gap.ts";

export async function strategyCron(symbol : string, quantity : number, sl : number, thresholdToSell : number) {
    const date = new Date();
    const isMonday = date.getDay() === 1;
    const lastClosingPrice = await lastClosing(symbol, isMonday);
    //holiday remaining
    const currentPrice = await getPrice(symbol);

    logger.log('calculating gap - start')
    const gap = await gapCalcPrct(currentPrice, lastClosingPrice);
    logger.log(`calculating gap - ${gap} - done`)

    logger.log(`Intiating strat for ${symbol} -  start`)
    const order = placeOrderStat(gap, symbol, quantity, sl, thresholdToSell)
    logger.log(`Intiating strat for ${symbol} -  done`)
    return order
}
//lastClosing is 14.73 and current is 15.18

// strategyCron("JPPOWER", 1, 2)


