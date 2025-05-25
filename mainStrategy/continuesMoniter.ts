import logger from "../assert/Log.ts";
import { Exchanges, Product } from "../dto/TGenericType.ts";
import { kc } from "../sessionGen.ts";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type TempConfig = {
  symbol: string;
  quantity: number;
  thresholdToSell?: number;
  isOrdered?: boolean;
};

export async function continuseMoniter(tempConfig: TempConfig[]) {
  const tasks = tempConfig
    .filter(stock => stock.isOrdered)
    .map(stock => monitorStock(stock));

  await Promise.all(tasks); // Runs all monitors in parallel
}

async function monitorStock(config: TempConfig) {
  while (true) {
    await start(config);         // Monitor this one stock
    await sleep(60_000);         // Re-check after 1 minute
  }
}

async function start(config: TempConfig) {
  try {
    const holdings = await kc.getHoldings(); // Returns PortfolioHolding[]
    const holding = holdings.find(h => h.tradingsymbol === config.symbol);

    if (!holding) {
      logger.log(`Holding not found for ${config.symbol}`);
      return;
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
    } else {
      logger.log(`🔍 ${config.symbol} PnL ₹${currentPnL} < ₹${threshold} — Not selling yet.`);
    }
  } catch (err) {
    console.error(`⚠️ Error monitoring ${config.symbol}:`, err);
  }
}
