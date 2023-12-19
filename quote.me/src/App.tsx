import { useEffect, useState } from "react";

const startingQuote =
  "Quotes are the concise beauty of profound wisdom, capturing the essence of human thought in a few words";

const API_URL = "https://api.quotable.io";

const App = () => {
  const [quote, setQuote] = useState(startingQuote);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);

  useEffect(() => {
    const generateQuote = async () => {
      try {
        if (wasButtonClicked) {
          const request = await fetch(`${API_URL}/quotes/random`);
          const [newQuote] = await request.json();
          console.log(newQuote);
          setQuote(newQuote.content);
          setWasButtonClicked(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error)
          throw new Error(`Failed to fetch quote, ${error.message}`);
      }
    };
    generateQuote();
  });

  const handleClick = () => {
    setWasButtonClicked(true);
  };

  return (
    <div className="main">
      <div className="container">
        <blockquote className="quote">&quot;{quote}&quot;</blockquote>
        <button onClick={handleClick} className="btn">
          Find me a quote
        </button>
      </div>
    </div>
  );
};

export default App;
