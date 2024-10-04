const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Invoice = require("../models/Invoices");

//Create a new payment
router.post("/", async (req, res) => {
  try {
    const { invoiceId, amount, paymentMethod } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    //Check if invoice exists
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    const payment = new Payment({
      invoice: invoiceId,
      amount: amount,
      paymentMethod: paymentMethod,
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().populate("invoice");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get payment by Id
router.get("/:id", async (req, res) => {
  try {
    const paymentID = await Payment.findById(req.params.id).populate("invoice");
    if (!paymentID) {
      return res.status(404).json({ message: "Payment not found!" });
    }
    res.status(200).json(paymentID);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update Payment by id
router.put("/:id", async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { amount, paymentMethod },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete payment by ID
router.delete("/:id", async (req, res) => {
  const payment = await Payment.findByIdAndDelete(req.params.id);
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  res.status(200).json({ message: "Payment deleted!" });
});

module.exports = router;
