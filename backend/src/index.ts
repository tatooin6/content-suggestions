import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const getContentSuggestions = (prompt: string) => {
  return [
    `${prompt} - Content suggestion 1`,
    `${prompt} - Content suggestion 2`,
    `${prompt} - Content suggestion 3`,
    `${prompt} - Content suggestion 4`,
    `${prompt} - Content suggestion 5`,
  ];
};

app.post("/suggestions", (req: Request, res: Response): void => {
  const { prompt } = req.body;

  // TODO: REview and Improve fallbacks
  if (!prompt || prompt.trim().length === 0)
    res.status(400).json({ error: "A prompt is required."});
    
  const suggestions = getContentSuggestions(prompt);

  res.json({suggestions});
});

app.get("/", (req, res) => {
  res.send("backend runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
