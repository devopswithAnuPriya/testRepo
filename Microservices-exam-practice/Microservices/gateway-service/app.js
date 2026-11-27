const express = require('express');
const app = express();
const PORT = Number(process.env.PORT || 3003);

const services = {
  users: process.env.USER_SERVICE_URL || 'http://localhost:3000',
  products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
  orders: process.env.ORDER_SERVICE_URL || 'http://localhost:3002'
};

app.get('/health', (req, res) => {
  res.status(200).json({ service: 'gateway-service', status: 'UP' });
});

app.get('/api/:resource', async (req, res) => {
  const target = services[req.params.resource];
  if (!target) {
    return res.status(404).json({
      error: 'Unknown resource',
      available: Object.keys(services)
    });
  }

  try {
    const upstream = await fetch(`${target}/${req.params.resource}`);
    const body = await upstream.json();
    return res.status(upstream.status).json(body);
  } catch (error) {
    return res.status(502).json({
      error: 'Bad Gateway',
      target,
      message: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Gateway Service listening on port ' + PORT);
});
