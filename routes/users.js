const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newUser = new User({ name, email, phone, address });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ err: error.message });
  }
});

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: error.message });
  }
});

//Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); //Fetch user by Id
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//Update a user by Id

router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true } // return the updated user
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//Delete a user by Id

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User succesfully deleted" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
