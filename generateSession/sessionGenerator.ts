import { kc } from "../sessionGen.ts";
import { apiSecret } from "../tempConfig.ts";

export async function generateSession(requestToken : string) {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
  } catch (err) {
    console.error("Error generating session :", err);
  }
} 