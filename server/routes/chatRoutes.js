const express = require("express");
const router = express.Router();

const Chat = require("../models/Chat");

// Create New Chat
router.post("/", async (req, res) => {
  try {
    const chat = await Chat.create(req.body);

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Chats
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

    const chats = await Chat.find({
      clerkId,
    }).sort({
      updatedAt: -1,
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Chat
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Chat
router.put("/:id", async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Chat
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.json({
      message: "Chat Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;