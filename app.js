const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from ECS Fargate!',
    containerId: process.env.HOSTNAME || 'unknown',
    timestamp: new Date().toISOString(),
    version: 'v1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
