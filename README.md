# EAI Capstone Project — Microservices Orchestration

##  Overview

This project demonstrates microservices orchestration using Node-RED.

The system simulates an order processing workflow including:

* Order creation
* Payment processing
* Inventory check
* Notification

##  Architecture

![Architecture](architecture.png)

The system is built using:

* Node-RED (orchestration engine)
* Docker (containerization)
* Microservices (order, payment, inventory, notification)
* RabbitMQ (message broker, optional)

##  Workflow

1. User sends order request
2. Node-RED orchestrates the flow:

   * Create Order
   * Send HTTP request to Payment Service
   * Check Payment status
   * If successful → Inventory → Notification → Success
   * If failed → Rollback → Failed

##  Error Handling

The system implements compensation logic:

* If payment fails → rollback is triggered
* Ensures system consistency

##  How to Run

```bash
docker compose up -d --build
```

Then open:

```
http://localhost:1880
```

##  Test Request

```bash
Invoke-RestMethod -Uri "http://localhost:1880/order" -Method POST -Body '{"product":"phone"}' -ContentType "application/json"
```

##  Technologies Used

* Node.js
* Node-RED
* Docker
* RabbitMQ

##  Notes

This project demonstrates orchestration-based architecture.
It can be extended to event-driven architecture using RabbitMQ.

##  AI Usage

This project was developed with assistance from AI for guidance and explanation.
