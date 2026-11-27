const express = require('express');
const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());

const products = [{"id": 101, "name": "Keyboard", "price": 799}, {"id": 102, "name": "Mouse", "price": 399}];

app.get('/health', (req, res) => {
  res.status(200).json({ service: 'product-service', status: 'UP' });
});

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Product Service listening on port ' + PORT);
});
