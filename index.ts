import { KiteConnect } from "kiteconnect";
import express from 'express';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TfileSystemToken } from "./dto/TGenericType";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const apiKey = "3amxn6tsg9806ord";
const apiSecret = "z4bv2d4omir9z9j9txh6rm9p9c0uqx01";
let requestTokenFetched = '';

const kc = new KiteConnect({ api_key: apiKey });
app.use(express.json()); // Needed to parse JSON body

app.post('/save-token', (req, res) => {
  const { requestToken } = req.body;
  console.log("📥 Received request token:", requestToken);
  requestTokenFetched = requestToken;
  // You can now exchange this token for access_token
  res.send('Token received on server!');
});

function fetchTokenFromFileSystem(){
    const filePath = path.join(__dirname, 'token.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const tokenData : TfileSystemToken = JSON.parse(raw);
    return tokenData;
}


async function init() {
  try {
    await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const tokenRequest = fetchTokenFromFileSystem();
    const response = await kc.generateSession(tokenRequest.requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

init();