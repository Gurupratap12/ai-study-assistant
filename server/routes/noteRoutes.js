const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

// Helper Function
const formatNote = (note) => ({
  id: note._id.toString(),
  title: note.title,
  content: note.content,
  category: note.category,
  pinned: note.pinned,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

// Create Note
router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(formatNote(note));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Notes
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

const notes = await Note.find({
  clerkId,
}).sort({
  createdAt: -1,
});

    res.json(notes.map(formatNote));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(formatNote(note));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(formatNote(note));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;