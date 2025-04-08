import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!, });

const getContentSuggestions = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an assistant helping journalists brainstorm article topics. 
        Generate 3 to 5 creative and relevant content ideas for the topic: "${prompt}". 
        Try to vary the style and purpose (e.g., long-form article, social media post, quick news piece, evergreen content). 
        Each idea should be a single line with a short explanation in parentheses about why it could work well.`,
    });
    // TODO: add fallback for response text.
    const suggestions = response.text;
    return suggestions;
  } catch (err) {
    console.error("Error fetching content suggestions:", err);
    return "An error occurred while requesting content suggestions to ai.";
  }
};

app.post("/suggestions", async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;

  // TODO: Review and Improve fallbacks
  if (!prompt || prompt.trim().length === 0)
    res.status(400).json({ error: "A prompt is required."});
    
  const suggestions = await getContentSuggestions(prompt);
  res.json({suggestions});
});

app.get("/", (req, res) => {
  res.send("Welcome! Tell me what topic you would like to have ideas about? ");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
