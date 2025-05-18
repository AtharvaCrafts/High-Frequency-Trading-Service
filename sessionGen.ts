import { KiteConnect } from "kiteconnect";
import express from 'express';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TfileSystemToken } from "./dto/TGenericType.ts";
import { apiKey, apiSecret } from "./tempConfig.ts";
import { strategyCron } from "./mainStrategy/strategyCron.ts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// node --loader ts-node/esm server.ts

export const kc = new KiteConnect({ api_key: apiKey });
app.use(express.json()); // Needed to parse JSON body

export function fetchTokenFromFileSystem(){
    const filePath = path.join(__dirname, 'token.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const tokenData : TfileSystemToken = JSON.parse(raw);
    return tokenData;
}


export async function init(requestToken : string) {
  try {
    await generateSession(requestToken);
  } catch (err) {
    console.error(err);
  }
}

async function generateSession(requestToken : string) {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    const equity = await kc.getProfile();
    console.log(equity);
    const order = await strategyCron()

    // return order;
  } catch (err) {
    console.error("Error generating session :", err);
  }
} 