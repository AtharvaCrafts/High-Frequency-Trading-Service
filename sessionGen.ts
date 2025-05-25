import { KiteConnect } from "kiteconnect";
import express from 'express';
import { apiKey } from "./tempConfig.ts";

import { generateSession } from "./generateSession/sessionGenerator.ts";
import { preMoniter } from "./mainStrategy/premoniterMarket.ts";

const app = express();
// node --loader ts-node/esm server.ts

export const kc = new KiteConnect({ api_key: apiKey });
app.use(express.json()); // Needed to parse JSON body

export async function init(requestToken : string) {
  try {
    await generateSession(requestToken);
    console.log(await kc.getProfile());
    preMoniter()
  } catch (err) {
    console.error(err);
  }
}