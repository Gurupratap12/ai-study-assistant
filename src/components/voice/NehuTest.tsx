import { useRef, useState } from "react";

const NehuTest = () => {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log("Nehu: Listening...");
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      console.log("Nehu heard:", text);
    };

    recognition.onerror = (event: any) => {
      console.log("Nehu error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Nehu: Stopped listening.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={listening}
    >
      {listening ? "🎙️ Listening..." : "🎤 Test Nehu"}
    </button>
  );
};

export default NehuTest;