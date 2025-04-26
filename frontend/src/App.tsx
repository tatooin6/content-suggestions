import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { isNumberedLine, formatToStrong } from "./utils/utils";
import { checkBackendConnection, generateSuggestions } from "./services/api";
import "./App.css";

import Button from "./components/Button/Button";
import Card from "./components/Card/Card";

function App() {
  const [message, setMessage] = useState<React.ReactNode>("");
  const [isBackendWorking, setIsBackendWorking] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBackendConnection()
      .then((data) => {
        setMessage(data);
        setIsBackendWorking(true);
      })
      .catch(() => {
        setMessage("Sorry, we couldn't connect with the backend.");
        setIsBackendWorking(false);
      });
  }, []);

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
        if (error instanceof Error) {
          throw new Error(
            error.message ||
              "Error: Unable to generate suggestions from backend.",
          );
        }
        setMessage("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("A prompt is required. Please enter any topic below.");
    }
  };

  return (
    <div className="app-container">
      <header className="column-container">
        <div className="logo">
          <img src="jb.svg" alt="logo" />
          <h1 className="title">JourBuddy</h1>
        </div>
        <div className="content">
          <div className="body">
            <div className="row">
              <Card message={message} />
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
        <div className="status-icon">
          {isBackendWorking ? (
            <FaCheckCircle className="status-icon-working" />
          ) : (
            <FaTimesCircle className="status-icon-error" />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
