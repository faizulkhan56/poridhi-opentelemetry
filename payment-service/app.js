require('./otel'); // Import OpenTelemetry setup

const express = require('express');
const app = express();
const port = 3001;

// Define route for /payment
app.get('/payment', (req, res) => {
  res.send('Payment Service Endpoint');
});

// Define default route
app.get('/', (req, res) => {
  res.send('Payment Service');
});

app.listen(port, () => {
  console.log(`Payment service listening at http://localhost:${port}`);
});