import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { init, kc } from './sessionGen.js';
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handle redirect from Zerodha
app.get('/trade/redirect', async (req, res) => {
  const requestToken = req.query.request_token;
  console.log("✅ Received request_token:", requestToken);  
  try {
    await init(requestToken as string); // ✅ now valid
    res.redirect('/');
  } catch (err) {
    console.error("❌ Error during init:", err);
    res.status(500).send('Error during authentication');
  }
});

app.get('/api/holdings', async (req, res) => {
    if (!kc) {
        return res.status(401).json({ error: 'Please login first' });
    }
    try {
        const holdings = await kc.getHoldings();
        res.json(holdings);
    } catch (error) {
        console.error('Error fetching holdings:', error);
        res.status(500).json({ error: 'Error fetching holdings' });
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export const broadcast = (data: any) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

