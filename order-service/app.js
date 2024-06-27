require('./otel'); // Import OpenTelemetry setup

const express = require('express');
const app = express();
const port = 3000;

// Define route for /order
app.get('/order', (req, res) => {
  res.send('Order Service Endpoint');
});

// Define default route
app.get('/', (req, res) => {
  res.send('Order Service');
});

app.listen(port, () => {
  console.log(`Order service listening at http://localhost:${port}`);
});
