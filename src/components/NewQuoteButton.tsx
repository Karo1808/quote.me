const NewQuoteButton = ({
  color,
  setIsButtonClicked,
}: {
  color: string;
  setIsButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsButtonClicked(true);
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
