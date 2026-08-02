const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");

// Create Progress
router.post("/", async (req, res) => {
  try {
    const progress = await Progress.create(req.body);

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Progress
router.get("/", async (req, res) => {
  try {
    const progress = await Progress.find();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Progress
router.get("/:id", async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Progress
router.put("/:id", async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Progress
router.delete("/:id", async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);

    res.json({
      message: "Progress Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;