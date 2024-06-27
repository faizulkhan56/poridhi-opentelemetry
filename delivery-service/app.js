require('./otel'); // Import OpenTelemetry setup

const express = require('express');
const app = express();
const port = 3002;

// Define route for /delivery
app.get('/delivery', (req, res) => {
  res.send('Delivery Service Endpoint');
});

// Define default route
app.get('/', (req, res) => {
  res.send('Delivery Service');
});

app.listen(port, () => {
  console.log(`Delivery service listening at http://localhost:${port}`);
})