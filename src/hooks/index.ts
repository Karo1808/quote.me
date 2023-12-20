import { useState, useEffect } from "react";
import {
  API_URL,
  COLORS,
  MAX_QUOTE_LENGTH,
  MIN_QUOTE_LENGTH,
  STARTING_QUOTE,
} from "../constants";

const useRandomQuote = () => {
  const [quote, setQuote] = useState<string>(STARTING_QUOTE);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [color, setColor] = useState<string>(COLORS[COLORS.length - 1]);
  const [isError, setIsError] = useState<boolean>(false);

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

          setIsError(false);
          setQuote(newQuote.content);
          setColor(COLORS[newColorIndex]); // Add this line to update the color
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

  return { quote, isError, color, setIsButtonClicked };
};

export default useRandomQuote;
