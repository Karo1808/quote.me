import { useRef } from "react";

const NewQuoteButton = ({
  color,
  setIsButtonClicked,
  setIsHiddenText,
}: {
  color: string;
  setIsButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHiddenText: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const timeoutRef = useRef<number | null>(null);

  const handleClick = () => {
    // Animation trigger functionality
    if (timeoutRef.current === null) {
      setIsHiddenText(true);

      timeoutRef.current = setTimeout(() => {
        setIsButtonClicked(true);
        setIsHiddenText(false);
        timeoutRef.current = null;
      }, 800);
    }
  };
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={handleClick}
      className="btn-quote"
    >
      New quote
    </button>
  );
};

export default NewQuoteButton;
