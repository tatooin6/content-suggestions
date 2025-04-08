import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Button from "./components/Button/Button";
import "./App.css";

function App() {
  const [message, setMessage] = useState("local message");
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
            setMessage(data.suggestions);
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
      setMessage("A prompt is required.");
    }
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
          <div className="card">
            <p className="card-text">{message}</p>
          </div>
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
            label="Generate"
            isDisabled={loading || !isBackendWorking}
          />
        </div>
      </div>
    </div>
  );
}

export default App;