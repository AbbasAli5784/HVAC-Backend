const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/Inventory");

//Create a new inventory item
router.post("/", async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const newItem = new InventoryItem({ name, description, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get inventory items by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update inventory item
router.put("/:id", async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity, price },
      { new: true }
    );
    if (!updatedItem)
      return res.status(400).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete an inventory item by ID
router.delete("/:id", async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(400).json({ message: "item not found" });
    res.json({ message: "Item succesfully deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
