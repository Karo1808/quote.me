import { useState, useEffect } from "react";
import { API_URL, COLORS, STARTING_AUTHOR, STARTING_QUOTE } from "../constants";

const useRandomQuote = () => {
  const [quote, setQuote] = useState<string>(STARTING_QUOTE);
  const [author, setAuthor] = useState<string>(STARTING_AUTHOR);
  const [shouldFetchNewQuote, setShouldFetchNewQuote] =
    useState<boolean>(false);
  const [color, setColor] = useState<string>(COLORS[COLORS.length - 1]);
  const [isFetchError, setIsFetchError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        console.log(shouldFetchNewQuote);
        if (shouldFetchNewQuote) {
          const response = await fetch(`${API_URL}api/random`);

          if (!response.ok) throw new Error("Failed to fetch quote");

          const [quoteData] = await response.json();
          const currentColorIndex = COLORS.indexOf(color);
          const nextColorIndex =
            currentColorIndex + 1 === COLORS.length ? 0 : currentColorIndex + 1;

          setIsFetchError(false);
          setQuote(quoteData.q);
          setAuthor(quoteData.a);
          setColor(COLORS[nextColorIndex]);
          setShouldFetchNewQuote(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsFetchError(true);
          throw new Error(`Failed to fetch quote, ${error.message}`);
        }
      }
    };

    fetchRandomQuote();
  }, [shouldFetchNewQuote, color]);

  return {
    quote,
    author,
    isError: isFetchError,
    color,
    setIsButtonClicked: setShouldFetchNewQuote,
  };
};

export default useRandomQuote;
