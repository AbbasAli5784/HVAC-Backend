const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoices");
const User = require("../models/User");

//Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const invoiceId = await Invoice.findById(req.params.id);
    if (!invoiceId)
      return res.status(404).json({ message: "Invoice not found" });
    res.json(invoiceId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Retrieve all invoices for customer by name
router.get("/customer/:name", async (req, res) => {
  try {
    //Find user by name
    const user = await User.findOne({ name: req.params.name });

    // If no user is found return an error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Find invoices using user object id
    const invoices = await Invoice.find({ customer: user._id });
    console.log("Invoice Object", invoices);

    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create an invoice
router.post("/", async (req, res) => {
  try {
    const { customer, amount, date } = req.body;
    const user = await User.findById(customer);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const invoice = new Invoice({
      customer: user._id,
      amount,
      date: date || Date.now(),
    });

    const savedInvoice = await invoice.save();

    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update an invoice
router.put("/:id", async (req, res) => {
  try {
    const { customer, amount, date } = req.body;

    // Check if a valid customer (User) ObjectId is provided
    if (customer) {
      const user = await User.findById(customer); // Correctly reference 'customer'
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    // Update the invoice with the provided fields
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { customer, amount, date },
      { new: true } // Return the updated document
    );

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete invoice by id
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice succesfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
