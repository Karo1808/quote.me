const ErrorBox = ({
  setIsButtonClicked,
}: {
  setIsButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsButtonClicked(true);
  };
  return (
    <div className="error-container">
      <p className="error-text">Something went wrong</p>
      <button onClick={handleClick} className="btn-error">
        Try again
      </button>
    </div>
  );
};

export default ErrorBox;
