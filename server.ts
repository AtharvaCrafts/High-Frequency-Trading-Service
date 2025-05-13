import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle redirect from Zerodha
app.get('/trade/redirect', (req, res) => {
  const requestToken = req.query.request_token;
  console.log("✅ Received request_token:", requestToken);
  const data = { requestToken, savedAt: new Date().toISOString() };
  fs.writeFileSync(path.join(__dirname, 'token.json'), JSON.stringify(data, null, 2));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
