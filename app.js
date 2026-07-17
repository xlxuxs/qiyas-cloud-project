const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from ECS Fargate !',
    containerId: process.env.HOSTNAME || 'unknown',
    timestamp: new Date().toISOString(),
    version: 'v1.1.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle SIGTERM gracefully (for ECS)
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle SIGINT
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
