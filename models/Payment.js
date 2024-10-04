const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentDate: {
    type: Date,
    defualt: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Cash", "Bank Transfer "],
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
