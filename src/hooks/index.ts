import { useState, useEffect } from "react";
import { API_URL, COLORS, STARTING_AUTHOR, STARTING_QUOTE } from "../constants";

const useRandomQuote = () => {
  const [quote, setQuote] = useState<string>(STARTING_QUOTE);
  const [author, setAuthor] = useState<string>(STARTING_AUTHOR);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [color, setColor] = useState<string>(COLORS[COLORS.length - 1]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        console.log(isButtonClicked);
        if (isButtonClicked) {
          const request = await fetch(`${API_URL}api/random`);

          if (!request.ok) throw new Error("Failed to fetch quote");

          const [newQuote] = await request.json();
          const indexOfCurrentColor = COLORS.indexOf(color);
          const newColorIndex =
            indexOfCurrentColor + 1 === COLORS.length
              ? 0
              : indexOfCurrentColor + 1;

          setIsError(false);
          setQuote(newQuote.q);
          setAuthor(newQuote.a);
          setColor(COLORS[newColorIndex]);
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

  return { quote, author, isError, color, setIsButtonClicked };
};

export default useRandomQuote;
