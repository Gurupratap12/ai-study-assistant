const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    // Authentication baad me add karenge
    clerkId: {
  type: String,
  required: true,
},

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);