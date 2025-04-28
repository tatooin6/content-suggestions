import React, { useState } from "react";
import Button from "./Button/Button";
import Card from "./Card/Card";
import { generateSuggestions } from "../services/api";

interface InputCardFormProps {
  isBackendWorking: boolean;
  cardMessage: React.ReactNode;
  setMessage: (message: React.ReactNode) => void;
}

const PromptForm = ({
  isBackendWorking,
  cardMessage,
  setMessage,
}: InputCardFormProps) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (prompt.trim()) {
      setLoading(true);
      try {
        const suggestions = await generateSuggestions(prompt);
        const { title, ideas } = suggestions;
        const formattedSuggestions = (
          <div>
            <h4>{title}</h4>
            <ol>
              {ideas.map(
                (
                  idea: { strongText: string; normalText: string },
                  index: number,
                ) => (
                  <li key={index}>
                    <strong>{idea.strongText}:</strong>
                    {idea.normalText}
                  </li>
                ),
              )}
            </ol>
          </div>
        );
        setMessage(formattedSuggestions);
      } catch (error: unknown) {
        setMessage("An error occurred while fetching suggestions.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("A prompt is required. Please enter any topic below.");
    }
  };

  return (
    <div className="content">
      <div className="body">
        <div className="row">
          <Card message={cardMessage} />
        </div>
        <div className="row">
          <input
            className="input-element"
            type="text"
            placeholder="Enter a topic"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            action={handleGenerateSuggestions}
            label={loading ? "Generating" : "Generate"}
            isDisabled={loading || !isBackendWorking || prompt === ""}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptForm;
