import express from 'express';

const router = express.Router();

import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PORT = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


// // Workout coach AI route
router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
Given the following workout name, reply with just the (general if need be) formula to calculate the calories burned given reps, sets, and weights. Do not explain your answer, and just provide this formula with the variable names: "${message}"
`;

    const result = await chatModel.generateContent(prompt);
    const reply = result.response.text().trim();

    res.json({ reply }); // frontend will receive this  
} catch (err) {
    console.error("AI Error:", err);
    return res.json({ reply: "Error generating response." });
}
});


export default router;