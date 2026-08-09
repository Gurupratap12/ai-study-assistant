const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");

// Get current user's progress
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

    if (!clerkId) {
      return res.status(400).json({
        message: "clerkId is required",
      });
    }

    let progress = await Progress.findOne({ clerkId });

    // Create progress if it doesn't exist
    if (!progress) {
      progress = await Progress.create({
        clerkId,
      });
    }

    res.json(progress);
  } catch (error) {
    console.error("Progress Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;