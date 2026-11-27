const express = require('express');
const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

const users = [{"id": 1, "name": "Ananya", "email": "ananya@example.com"}, {"id": 2, "name": "Rahul", "email": "rahul@example.com"}];

app.get('/health', (req, res) => {
  res.status(200).json({ service: 'user-service', status: 'UP' });
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('User Service listening on port ' + PORT);
});
