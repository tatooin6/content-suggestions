import React from "react";
import { useState, useEffect } from "react";

import { checkBackendConnection } from "./services/api";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PromptForm from "./components/PromptForm";

function App() {
  const [message, setMessage] = useState<React.ReactNode>("");
  const [isBackendWorking, setIsBackendWorking] = useState(false);

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

  return (
    <div className="app-container">
      <Header isBackendWorking={isBackendWorking} />
      <PromptForm
        isBackendWorking={isBackendWorking}
        cardMessage={message}
        setMessage={setMessage}
      />
      <Footer />
    </div>
  );
}

export default App;
