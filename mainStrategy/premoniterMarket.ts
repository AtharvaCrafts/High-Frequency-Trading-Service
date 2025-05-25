import { isMarketOpen, msUntilNextMarketOpen } from './marketTimings/marketTimings.ts';
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import logger from '../assert/Log.ts';
import { tradeConfig } from '../tempConfig.ts';
import { placeOrder } from '../placeOrder.ts';
import { strategyCron } from './strategyCron.ts';
import { continuseMoniter } from './continuesMoniter.ts';

register('ts-node/esm', pathToFileURL('./'));

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function preMoniter() {
    
    if (isMarketOpen()) { // asume at 9 am
        logger.log(`Markets are open here we fucking go!!!!`);
        const tempConfig = [];

        for (let i = 0; i < tradeConfig.length; i++) {
            const { symbol, quantity, stopLoss: sl, immediateOrderAtMarketOpen, thresholdToSell } = tradeConfig[i];

            if (immediateOrderAtMarketOpen) {
                logger.log(`immediate Order - start`);
                const order = placeOrder(symbol, "BUY", quantity, sl);

                if (order !== undefined) {
                    logger.log(`immediate Order for ${symbol} with quantity ${quantity} & stop loss of ${sl} has been placed on NSE`);
                    logger.log(`immediate Order - done`);
                    tradeConfig[i].isOrdered = true;
                    tempConfig.push({ symbol, quantity, thresholdToSell });
                } else {
                    tradeConfig[i].isOrdered = false;
                }

            } else {
                const startOrder = strategyCron(symbol, quantity, sl);

                if (startOrder !== undefined) {
                    tradeConfig[i].isOrdered = true;
                    tempConfig.push({ symbol, quantity, thresholdToSell });
                } else {
                    tradeConfig[i].isOrdered = false;
                }
            }
        }

        continuseMoniter(tempConfig);
    }
    else {
        const timeLeft = msUntilNextMarketOpen();
        logger.log(`Market closed. Waiting for ${timeLeft / 1000} seconds...`);
        await sleep(timeLeft); // wait until market opens
        return preMoniter(); // recheck recursively after wait
    }
}
// await preMoniter()