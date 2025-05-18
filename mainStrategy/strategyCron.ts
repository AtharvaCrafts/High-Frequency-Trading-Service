//for now this is one time script - later it will be deployed as a cron job

import logger from "../assert/Log.ts";
import { symbol } from "../tempConfig.ts";
import { getPrice, lastClosing } from "./closingCandle.ts";
import { gapCalcPrct, placeOrderStat } from "./gap.ts";

export async function strategyCron() {
    const date = new Date();
    const isMonday = date.getDay() === 1;
    const lastClosingPrice = await lastClosing(symbol, isMonday);
    const currentPrice = await getPrice(symbol);

    logger.log('calculating gap - start')
    const gap = await gapCalcPrct(currentPrice, lastClosingPrice);
    logger.log(`calculating gap - ${gap} - done`)

    logger.log(`Intiating strat for ${symbol} -  start`)
    const order = placeOrderStat(gap)
    logger.log(`Intiating strat for ${symbol} -  done`)
    return order
}



