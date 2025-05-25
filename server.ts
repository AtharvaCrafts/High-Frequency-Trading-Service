import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { init } from './sessionGen.js';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle redirect from Zerodha
app.get('/trade/redirect', async (req, res) => {
  const requestToken = req.query.request_token;
  console.log("✅ Received request_token:", requestToken);  
  try {
    await init(requestToken as string); // ✅ now valid
  } catch (err) {
    console.error("❌ Error during init:", err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

