import { FaCopy } from "react-icons/fa6";

const CopyButton = ({
  quote,
  setIsCopied,
  color,
}: {
  quote: string;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
}) => {
  const handleCopy = async () => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(quote);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error: unknown) {
        if (error instanceof Error)
          throw new Error(`Unable to copy text to clipboard, ${error.message}`);
      }
    };
    copyToClipboard();
  };
  return (
    <button onClick={handleCopy} className="btn-round">
      <FaCopy color={color} />
    </button>
  );
};

export default CopyButton;
