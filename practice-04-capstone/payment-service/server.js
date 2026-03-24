const express = require("express");

const app = express();
app.use(express.json());

const FAIL_MODE = process.env.PAYMENT_FAIL_MODE || "never";

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/payment/authorize", (req, res) => {

    if (FAIL_MODE === "always") {
        return res.status(400).json({
            status: "rejected",
            correlationId: req.body.correlationId
        });
    }

    res.json({
        status: "authorized",
        transactionId: "tx-" + Date.now(),
        correlationId: req.body.correlationId
    });
});

app.post("/payment/refund", (req, res) => {
    res.json({
        status: "refunded",
        correlationId: req.body.correlationId
    });
});

app.listen(3002, () => {
    console.log("Payment service running");
});