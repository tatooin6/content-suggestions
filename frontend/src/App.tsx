import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("local message");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res: any) => res.text())
      .then((data: any) => setMessage(data));
  }, []);
  return (
    <>
      <h1>Frontend</h1>
      <p>frontend running</p>
      <p>{message}</p>
    </>
  );
}

export default App;
