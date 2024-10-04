// Acquiring required packages and storing them in variable names for easy access
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//Used to load in environment variables from .env file
dotenv.config();

//Creating an instance of the express app, object will be used to define routes,middleware,etc.
const app = express();

//Enables cors for all incoming requests, crucial since frontend request will be coming from a different port
app.use(cors());

//Handle and parse json request coming in from the frontend
app.use(express.json());

//Parse url encoded payloads
app.use(express.urlencoded({ extended: true }));

//Establishing a connection to mongoDB database using URI from atlas
mongoose
  .connect(process.env.MONGODB_URI)
  //Function to handle success/failure of the connection
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => console.log(error));

//Defining endpoints for server to listen too
app.use("/api/users", require("./routes/users"));
console.log("Loading Users route...");
app.use("/api/inventory", require("./routes/inventory"));
console.log("Loading inventory route...");
app.use("/api/invoices", require("./routes/invoices"));
console.log("Loading Invoices route...");
app.use("/api/payment", require("./routes/payment"));
console.log("Loading Payment route...");

//Refrencing port from .env file, if nothing is present we use port 5000
const PORT = process.env.PORT || 5000;

//Establishing port connection
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
