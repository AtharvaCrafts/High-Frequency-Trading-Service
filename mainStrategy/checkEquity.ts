import a from "../assert/Assert.ts";
import logger from "../assert/Log.ts";
import { kc } from "../sessionGen.ts";

export async function checkEquity(symbol: string, quantity: number): Promise<boolean> {
  const holdings = await kc.getHoldings();

  a.assertDefined(holdings, 'no holdings');
  logger.log(`Checking if User holds the share before selling - start`);
  const tradingsymbol = holdings[0].tradingsymbol;
  const quantityBrought = holdings[0].quantity;
  logger.log(`Checking if User holds the share before selling - done`);
  if (tradingsymbol == symbol && quantityBrought >= quantity) {
    return true;
  } else {
    return false;
  }

}
