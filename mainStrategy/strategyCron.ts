//for now this is one time script - later it will be deployed as a cron job

import { kc } from "../sessionGen.ts";
import { symbol } from "../tempConfig.ts";
import logger from "../assert/Log.ts"
import { lastClosing } from "./closingCandle.ts";
import { gapCalcPrct, placeOrderStat } from "./gap.ts";
import a from "../assert/Assert.ts";

export async function strategyCron() {
    //get current price of the stock 

    const getStockQuote = await kc.getQuote(symbol);
    const openStockPrice = getStockQuote[symbol].last_price;
    a.assertNumber(openStockPrice, "Open stock price is not a number");

    logger.log(`Current opening price of ${symbol} is ${openStockPrice}`);

    const getClosingPrice = lastClosing(symbol)
    a.assertDefined(getClosingPrice, "Last closing price is not defined");

    logger.log(`Last closing price of ${symbol} is ${getClosingPrice}`);
    
    const gapPercent = gapCalcPrct(openStockPrice, await getClosingPrice);
    logger.log(`Gap percentage is ${gapPercent}`);

    const order = await placeOrderStat(gapPercent);
    a.assertDefined(order, "Order is not defined");

    return order;
}



