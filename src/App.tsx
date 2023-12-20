import { useState } from "react";
import useRandomQuote from "./hooks";
import ErrorBox from "./components/ErrorBox";
import TextToSpeechButton from "./components/TextToSpeechButton";
import CopyButton from "./components/CopyButton";
import NewQuoteButton from "./components/NewQuoteButton";

const App = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { quote, isError, color, setIsButtonClicked } = useRandomQuote();

  return (
    <div
      className="background"
      style={{ backgroundColor: `${isError ? "#ff6b6b" : color}` }}
    >
      <div className="main">
        <div className="container">
          {isError ? (
            <ErrorBox></ErrorBox>
          ) : (
            <>
              <blockquote style={{ color: color }} className="quote">
                &quot;{quote}&quot;
              </blockquote>
              <div className="btn-container">
                <CopyButton
                  quote={quote}
                  setIsCopied={setIsCopied}
                  color={color}
                />
                <NewQuoteButton
                  color={color}
                  setIsButtonClicked={setIsButtonClicked}
                />
                <TextToSpeechButton color={color} quote={quote} />
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
