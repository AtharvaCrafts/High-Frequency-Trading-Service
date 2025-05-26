import logger from "../assert/Log.ts";
import { kc } from "../sessionGen.ts";
import { apiSecret } from "../tempConfig.ts";

export async function generateSession(requestToken : string){
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    logger.log(`access token - ${response.access_token}`)
    return response.access_token
  } catch (err) {
    console.error("Error generating session :", err);
  }
} 