const express = require('express');
const app = express();
const PORT = Number(process.env.PORT || 3002);

app.use(express.json());

const orders = [{"id": 5001, "userId": 1, "productId": 101, "quantity": 1, "status": "PLACED"}, {"id": 5002, "userId": 2, "productId": 102, "quantity": 2, "status": "SHIPPED"}];

app.get('/health', (req, res) => {
  res.status(200).json({ service: 'order-service', status: 'UP' });
});

app.get('/orders', (req, res) => {
  res.status(200).json(orders);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Order Service listening on port ' + PORT);
});
