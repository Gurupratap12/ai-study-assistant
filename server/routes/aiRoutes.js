const express = require("express");
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const MODEL = "openai/gpt-4o-mini";

// ==================== CHAT ====================

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      message: "Message is required",
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Chat Error:", data);

      return res.status(503).json({
        message: "OpenRouter is currently unavailable.",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response received.";

    return res.json({
      reply,
      provider: "openrouter",
    });
  } catch (error) {
    console.error("OpenRouter Chat Error:", error);

    return res.status(503).json({
      message: "OpenRouter is currently unavailable.",
    });
  }
});

// ==================== QUIZ ====================

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
Do not wrap in code blocks.
Return JSON only.
`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Quiz Error:", data);

      return res.status(503).json({
        message: "OpenRouter is currently unavailable.",
      });
    }

    const text =
      data.choices?.[0]?.message?.content || "";

    const quizData = JSON.parse(text);

    return res.json({
      questions: quizData.questions,
      provider: "openrouter",
    });
  } catch (error) {
    console.error("OpenRouter Quiz Error:", error);

    return res.status(503).json({
      message: "OpenRouter is currently unavailable.",
    });
  }
});

module.exports = router;