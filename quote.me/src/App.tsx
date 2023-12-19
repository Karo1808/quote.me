import { useEffect, useState } from "react";
import { FaRegCopy, FaVolumeHigh } from "react-icons/fa6";

const startingQuote =
  "Quotes are the concise beauty of profound wisdom, capturing the essence of human thought in a few words";

const API_URL = "https://api.quotable.io";

const COLORS = [
  "#ffc9c9",
  "#fcc2d7",
  "#eebefa",
  "#d0bfff",
  "#bac8ff",
  "#d0ebff",
  "#c5f6fa",
  "#c3fae8",
  "#d3f9d8",
  "#e9fac8",
  "#fff3bf",
  "#ffe8cc",
  "#e9ecef",
];

const generateColor = () => Math.floor(Math.random() * COLORS.length);

const App = () => {
  const [quote, setQuote] = useState(startingQuote);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const [color, setColor] = useState(COLORS[COLORS.length - 1]);

  useEffect(() => {
    const generateQuote = async () => {
      try {
        if (wasButtonClicked) {
          const request = await fetch(`${API_URL}/quotes/random`);
          const [newQuote] = await request.json();
          const newColorIndex = generateColor();
          setColor(COLORS[newColorIndex]);

          setQuote(newQuote.content);
          setWasButtonClicked(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error)
          throw new Error(`Failed to fetch quote, ${error.message}`);
      }
    };
    generateQuote();
  }, [wasButtonClicked]);

  const handleClick = () => {
    setWasButtonClicked(true);
  };

  const handleCopy = async () => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(quote);
      } catch (err) {
        console.error("Unable to copy text to clipboard", err);
      }
    };
    copyToClipboard();
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(quote);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="background" style={{ backgroundColor: color }}>
      <div className="main">
        <div className="container">
          <blockquote className="quote">&quot;{quote}&quot;</blockquote>
          <div>
            <button onClick={handleCopy} className="btn-link">
              <FaRegCopy />
            </button>
            <button onClick={handleSpeak} className="btn-link">
              <FaVolumeHigh />
            </button>
            <button onClick={handleClick} className="btn-quote">
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
