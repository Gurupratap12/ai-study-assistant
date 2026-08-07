const express = require("express");
const router = express.Router();

const Groq = require("groq-sdk");
const { GoogleGenAI } = require("@google/genai");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      message: "Message is required",
    });
  }

  // 1️⃣ Groq - Primary
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "No response received.";

    return res.json({
      reply,
      provider: "groq",
    });
  } catch (error) {
    console.error("Groq Error:", error);
  }

  // 2️⃣ Gemini - Fallback
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-flash-latest",
      contents: message,
    });

    return res.json({
      reply: response.text || "No response received.",
      provider: "gemini",
    });
  } catch (error) {
    console.error("Gemini Error:", error);
  }

  return res.status(503).json({
    message: "All AI providers are currently unavailable.",
  });
});
router.post("/quiz", async (req, res) => {
  const { topic, difficulty, count } = req.body;

  if (!topic || !difficulty || !count) {
    return res.status(400).json({
      message: "Topic, difficulty and count are required",
    });
  }

  const prompt = `
Create a ${difficulty} quiz on "${topic}".

Generate exactly ${count} multiple-choice questions.

Return ONLY valid JSON.

Format:

{
  "questions": [
    {
      "id": "1",
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

Do not add markdown.
Do not wrap in \`\`\`.
Return JSON only.
`;

  // 1️⃣ Groq - Primary
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      response.choices?.[0]?.message?.content || "";

    const data = JSON.parse(text);

    return res.json({
      questions: data.questions,
      provider: "groq",
    });
  } catch (error) {
    console.error("Groq Quiz Error:", error);
  }

  // 2️⃣ Gemini - Fallback
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text = response.text || "";

    const data = JSON.parse(text);

    return res.json({
      questions: data.questions,
      provider: "gemini",
    });
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
  }

  return res.status(503).json({
    message: "All AI providers are currently unavailable",
  });
});

module.exports = router;