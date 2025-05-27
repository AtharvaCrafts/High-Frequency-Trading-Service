import { KiteConnect } from "kiteconnect";
import logger from "../assert/Log.ts";
import { Exchanges, Product } from "../dto/TGenericType.ts";
import { apiKey, tradeConfig } from "../tempConfig.ts";
import { MarketTime } from "./marketTimings/marketTimings.ts";
import { getPrice } from "./tools/closingCandle.ts";
import { preMoniter } from "./premoniterMarket.ts";
export const kc = new KiteConnect({ api_key: apiKey });


type TempConfig = {
  symbol: string;
  quantity: number;
  thresholdToSell?: number;
  isOrdered?: boolean;
};


export async function tickAllSymbols(configs: TempConfig[], access_token: string | undefined) {

  if(!access_token){
    logger.log(`no access token`);
    return
  };

  kc.setAccessToken(access_token);
  logger.log(access_token);

  while (MarketTime.isMarketOpen()) {
    logger.log(`⏱️ Ticking...`);

    // const prices = await Promise.all(
    //   configs.map(config => getPrice(config.symbol))
    // );
    if(configs.length == 0){
      logger.log(`no stocks filterd out - `)
      preMoniter(access_token)
    }
    for (const config of configs) {
      const holdings = await kc.getHoldings();
      const holding = holdings.find(h => h.tradingsymbol === config.symbol);

      if (!holding) {
        logger.log(`⚠️ Holding not found for ${config.symbol}`);
        continue;
      }

      const currentPnL = holding.pnl;
      const threshold = config.thresholdToSell ?? Infinity;

      if (currentPnL >= threshold) {
        logger.log(`✅ ${config.symbol} reached threshold PnL: ₹${currentPnL}. Selling...`);

        const sellOrder = await kc.placeOrder("regular", {
          exchange: holding.exchange as Exchanges,
          tradingsymbol: holding.tradingsymbol,
          transaction_type: "SELL",
          quantity: config.quantity,
          product: holding.product as Product,
          order_type: "MARKET",
        });

        logger.log(`🚀 SELL Order Placed for ${config.symbol}. Order ID: ${sellOrder.order_id}`);
        break; // Exit the loop after a successful sell
      } else {
        logger.log(`🔍 ${config.symbol} PnL ₹${currentPnL} < ₹${threshold} — Not selling yet.`);
      }
    }

    await new Promise(res => setTimeout(res, 60000));
    logger.log(`tick tok, tick tok`)
  }
}

// await tickAllSymbols(tradeConfig,'yTAytirTw4vDebX76NLg24SFxwExFOGP')