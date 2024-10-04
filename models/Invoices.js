const mongoose = require("mongoose");
const User = require("../models/User");

const invoiceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, //Amount cannot be negative
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
