const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const orders = [];

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/orders", (req, res) => {
    const correlationId = req.body.correlationId || uuidv4();

    const order = {
        id: uuidv4(),
        data: req.body,
        correlationId,
        status: "received"
    };

    orders.push(order);

    res.json({
        orderId: order.id,
        correlationId,
        status: "received"
    });
});

app.get("/orders/:id", (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    res.json(order || {});
});

app.listen(3001, () => {
    console.log("Order service running");
});