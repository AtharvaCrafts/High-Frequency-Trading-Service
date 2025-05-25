const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Webhook listener running on port 3000');
});
