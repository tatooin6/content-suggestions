import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { isNumberedLine, formatToStrong } from "./utils/utils";
import "./App.css";

import Button from "./components/Button/Button";
import Card from "./components/Card/Card";


function App() {
  const [message, setMessage] = useState<React.ReactNode>("");
  const [isBackendWorking, setIsBackendWorking] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res: any) => res.text())
      .then((data: any) => {
        setMessage(data);
        setIsBackendWorking(true);
      })
      .catch(() => {
        setMessage("Sorry, we couldn't connect with the backend.");
        setIsBackendWorking(false);
      });
  }, []);

  const handleGenerateSuggestions = () => {
    if (prompt.trim()) {
      setLoading(true);

      fetch("http://localhost:4000/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.suggestions) {
            const formattedSuggestions = formatSuggestions(data.suggestions);
            setMessage(formattedSuggestions);
          } else {
            setMessage(data.error || "Something went wrong");
          }
        })
        .catch(() => {
          setMessage("Error: Unable to connect to backend");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessage("A prompt is required. Please enter any topic below.");
    }
  };

  const formatSuggestions = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim().length > 0);

    return (
      <ol>
        {lines.map((line, index) => {
          return isNumberedLine(line)
            ? <li key={index} dangerouslySetInnerHTML={{ __html: formatToStrong(line) }} />
            : <p key={index}>{line}</p>;
        })}
      </ol>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">JourBuddy</h1>
        <div className="status-icon">
          {isBackendWorking ? (
            <FaCheckCircle className="status-icon-working" />
          ) : (
            <FaTimesCircle className="status-icon-error" />
          )}
        </div>
      </header>


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
  );
}

export default App;