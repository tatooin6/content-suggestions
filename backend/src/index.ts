import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middlewares
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));

// Initialize AI model
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// API routes
app.post("/suggestions", handleSuggestions);
app.get("/", handleRoot);

// Start the server
startServer();

/**
 * Receives and handles the frontend request for suggestions from the frontend.
 */
async function handleSuggestions(req: Request, res: Response): Promise<void> {
  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return sendErrorResponse(res, 400, "A prompt is required.");
  }

  try {
    const suggestions = await getContentSuggestions(prompt);
    res.json({ suggestions });
  } catch (err) {
    console.error("Error fetching content suggestions:", err);
    sendErrorResponse(res, 500, "Failed to generate content suggestions.");
  }
}

/**
 * Generates content suggestions using the Google Gemini AI model (for now).
 */
async function getContentSuggestions(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an assistant helping journalists brainstorm article topics. 
        Generate 3 to 5 creative and relevant content ideas for the topic: "${prompt}". 
        Try to vary the style and purpose (e.g., long-form article, social media post, quick news piece, evergreen content). 
        Each idea should be a single line with a short explanation in parentheses about why it could work well.`,
    });

    return response.text || "No suggestions generated.";
  } catch (err) {
    throw new Error("Error fetching content suggestions from the AI model");
  }
}

/**
 * It receives a request from the frontend to verify that the server is running.
 * It responds with a placeholder for the user. This shouldn't work this way 
 * since the end user would be seeing a direct response from the server...but 
 * this is a PoC, so that's why this liberty is taken this way.
 */
function handleRoot(req: Request, res: Response): void {
  res.send("Welcome! Tell me what topic you would like to have ideas about?");
}

/**
 * Sends a standardized error response.
 */
function sendErrorResponse(res: Response, statusCode: number, message: string): void {
  res.status(statusCode).json({ error: message });
}

/**
 * Starts the server on the specified port.
 */
function startServer(): void {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}