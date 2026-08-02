const express = require("express");
const router = express.Router();

const QuizResult = require("../models/QuizResult");

// Create Quiz Result
router.post("/", async (req, res) => {
  try {
    const quiz = await QuizResult.create(req.body);

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Quiz Results
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

    const quizzes = await QuizResult.find({ clerkId });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get Single Quiz Result
router.get("/:id", async (req, res) => {
  try {
    const quiz = await QuizResult.findById(req.params.id);

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Quiz Result
router.put("/:id", async (req, res) => {
  try {
    const quiz = await QuizResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Quiz Result
router.delete("/:id", async (req, res) => {
  try {
    await QuizResult.findByIdAndDelete(req.params.id);

    res.json({
      message: "Quiz Result Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;