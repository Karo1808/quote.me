const ErrorBox = () => {
  const handleClick = () => {
    window.location.reload();
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
