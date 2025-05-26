import { KiteConnect } from "kiteconnect";
import express from 'express';
import { apiKey, tradeConfig } from "./tempConfig.ts";

import { generateSession } from "./generateSession/sessionGenerator.ts";
import { preMoniter } from "./mainStrategy/premoniterMarket.ts";
import { tickAllSymbols } from "./mainStrategy/continuesMoniter.ts";

const app = express();
// node --loader ts-node/esm server.ts

export const kc = new KiteConnect({ api_key: apiKey });
app.use(express.json()); // Needed to parse JSON body

export async function init(requestToken : string) {
  try {
    const access_token = await generateSession(requestToken);
    console.log(await kc.getProfile());
    preMoniter(access_token)
  } catch (err) {
    console.error(err);
  }
}