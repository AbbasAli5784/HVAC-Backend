//Acquiring mongoose for schema creation
const mongoose = require("mongoose");

//Creating a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically add the current date
  },
});

//Exporting model for use in backend code
module.exports = mongoose.model("User", userSchema);
