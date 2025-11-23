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
  const animationTimeoutRef = useRef<number | null>(null);

  const handleClick = () => {
    if (animationTimeoutRef.current === null) {
      setIsHiddenText(true);

      animationTimeoutRef.current = setTimeout(() => {
        setIsButtonClicked(true);
        setIsHiddenText(false);
        animationTimeoutRef.current = null;
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
