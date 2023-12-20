import { useEffect, useState } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import {
  API_URL,
  COLORS,
  MAX_QUOTE_LENGTH,
  MIN_QUOTE_LENGTH,
  STARTING_QUOTE,
} from "./constants";

const App = () => {
  const [quote, setQuote] = useState<string>(STARTING_QUOTE);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [color, setColor] = useState<string>(COLORS[COLORS.length - 1]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        if (isButtonClicked) {
          const request = await fetch(
            `${API_URL}/quotes/random?maxLength=${MAX_QUOTE_LENGTH}&minLength=${MIN_QUOTE_LENGTH}`
          );

          if (!request.ok) throw new Error("Failed to fetch quote");
          const [newQuote] = await request.json();
          const indexOfCurrentColor = COLORS.indexOf(color);
          const newColorIndex =
            indexOfCurrentColor + 1 === COLORS.length
              ? 0
              : indexOfCurrentColor + 1;
          setColor(COLORS[newColorIndex]);

          setIsError(false);
          setQuote(newQuote.content);
          setIsButtonClicked(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(true);
          throw new Error(`Failed to fetch quote, ${error.message}`);
        }
      }
    };
    fetchRandomQuote();
  }, [isButtonClicked, color]);

  const handleQuoteClick = () => {
    setIsButtonClicked(true);
  };

  const handleCopy = async () => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(quote);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error: unknown) {
        if (error instanceof Error)
          throw new Error(`Unable to copy text to clipboard, ${error.message}`);
      }
    };
    copyToClipboard();
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(quote);
    synth.speak(utterance);
  };

  const handleTryAgain = () => {
    setIsButtonClicked(true);
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: `${isError ? "#ff6b6b" : color}` }}
    >
      <div className="main">
        <div className="container">
          {isError ? (
            <div className="error-container">
              <p className="error-text">Something went wrong</p>
              <button onClick={handleTryAgain} className="btn-error">
                Try again
              </button>
            </div>
          ) : (
            <>
              <blockquote style={{ color: color }} className="quote">
                &quot;{quote}&quot;
              </blockquote>
              <div className="btn-container">
                <button onClick={handleCopy} className="btn-round">
                  <FaCopy color={color} />
                </button>
                <button
                  style={{ backgroundColor: color }}
                  onClick={handleQuoteClick}
                  className="btn-quote"
                >
                  New quote
                </button>
                <button onClick={handleSpeak} className="btn-round">
                  <FaVolumeHigh color={color} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <span
        style={{ color: color }}
        className={`copy-message ${isCopied ? "visible" : ""}`}
      >
        Successfully copied to clipboard
      </span>
    </div>
  );
};

export default App;
