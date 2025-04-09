const checkBackendConnection = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.text();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Error: Unable to connect to backend");
      }
      throw new Error("An unknown error occurred.");
    }
  };
  
const generateSuggestions = async (prompt: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/suggestions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          });
      
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          const data = await response.json();
      
          if (data.suggestions) {
            return data.suggestions;
          } else {
            throw new Error(data.error || "Something went wrong");
          }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Error: Unable to connect to backend");
        }
        throw new Error("An unknown error occurred.");
    }
  };
  
  export { generateSuggestions, checkBackendConnection };