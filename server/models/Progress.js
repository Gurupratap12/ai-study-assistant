const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    totalNotes: {
      type: Number,
      default: 0,
    },

    totalChats: {
      type: Number,
      default: 0,
    },

    quizzesTaken: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    studyStreak: {
      type: Number,
      default: 0,
    },

    totalStudyTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Progress", progressSchema);