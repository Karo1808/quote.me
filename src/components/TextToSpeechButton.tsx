import { FaVolumeHigh } from "react-icons/fa6";

const TextToSpeechButton = ({
  color,
  quote,
}: {
  color: string;
  quote: string;
}) => {
  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };
  return (
    <button onClick={handleSpeak} className="btn-round">
      <FaVolumeHigh color={color} />
    </button>
  );
};

export default TextToSpeechButton;
