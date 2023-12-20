const NewQuoteButton = ({
  color,
  setIsButtonClicked,
  setIsHiddenText,
}: {
  color: string;
  setIsButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHiddenText: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsHiddenText(true);
    setTimeout(() => {
      setIsButtonClicked(true);
      setIsHiddenText(false);
    }, 800);
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
