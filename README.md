# Poridhi OpenTelemetry Microservices Example

This project demonstrates a microservices architecture with OpenTelemetry integration for tracing. It includes three services: Order Service, Payment Service, and Delivery Service, all of which are instrumented with OpenTelemetry and can be traced using Jaeger.

## Project Structure

- `order-service/`: Contains the Order Service code.
- `payment-service/`: Contains the Payment Service code.
- `delivery-service/`: Contains the Delivery Service code.
- `nginx/`: Contains the Nginx configuration.
- `frontend/`: Contains the frontend assets.
- `docker-compose.yml`: Docker Compose file to orchestrate the services and Jaeger.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/poridhi-opentelemetry.git
    cd poridhi-opentelemetry
    ```

2. Build and start the services using Docker Compose:
    ```sh
    docker-compose up --build
    ```

3. Access the application:
    - Open your web browser and go to `http://localhost`. You should see the frontend with links to the Order, Payment, and Delivery services.
    - Access Jaeger UI to see the traces at `http://localhost:16686`.

## Services

### Order Service

- **Port**: 3000
- **Endpoint**:
  - `/`: Returns "Order Service"
  - `/order`: Returns order processing details (if implemented)

### Payment Service

- **Port**: 3001
- **Endpoint**:
  - `/`: Returns "Payment Service"
  - `/payment`: Returns payment processing details (if implemented)

### Delivery Service

- **Port**: 3002
- **Endpoint**:
  - `/`: Returns "Delivery Service"
  - `/delivery`: Returns delivery processing details (if implemented)

## OpenTelemetry Integration

OpenTelemetry is used to collect and export traces to Jaeger. Each service initializes OpenTelemetry with the following setup in `otel.js`:

```javascript
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// Initialize OpenTelemetry
const provider = new NodeTracerProvider();
const exporter = new JaegerExporter({
  serviceName: process.env.SERVICE_NAME || 'unknown_service',
  host: process.env.OTEL_EXPORTER_JAEGER_AGENT_HOST || 'jaeger',
  port: parseInt(process.env.OTEL_EXPORTER_JAEGER_AGENT_PORT, 10) || 6831, // Parse port as integer
  protocol: 'udp' // Ensure protocol is set to 'udp'
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// Register instrumentations
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

console.log(`OpenTelemetry initialized for ${process.env.SERVICE_NAME || 'unknown_service'}`);


environment:
  - OTEL_EXPORTER_JAEGER_AGENT_HOST=jaeger
  - OTEL_EXPORTER_JAEGER_AGENT_PORT=6831
  - SERVICE_NAME=order-service # Change accordingly for each service
server {
    listen 80;
    server_name localhost;

    location / {
        root /app/frontend;
        try_files $uri /index.html;
    }

    location /order {
        proxy_pass http://order-service:3000/;
    }

    location /payment {
        proxy_pass http://payment-service:3001/;
    }

    location /delivery {
        proxy_pass http://delivery-service:3002/;
    }
}
cleaning up
docker-compose down

rebuild
docker-compose build --no-cache
docker-compose up --force-recreate

