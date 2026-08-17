import { useState } from "react";
import { useNehuCommand } from "../../hooks/useNehuCommand";

const NehuCommandTest = () => {
  const [command, setCommand] = useState("");
  const [listening, setListening] = useState(false);

  const { executeNehuCommand } = useNehuCommand();

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
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
      const text = event.results[0][0].transcript.toLowerCase().trim();

      console.log("Nehu heard:", text);

      setCommand(text);

      executeNehuCommand(text);
    };

    recognition.onerror = (event: any) => {
      console.log("Nehu error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Nehu: Stopped listening.");
    };

    recognition.start();
  };

  return (
    <div>
      <p>{command || "No command yet"}</p>

      <button type="button" onClick={startListening} disabled={listening}>
        {listening ? "🎙️ Listening..." : "🎤 Speak to Nehu"}
      </button>
    </div>
  );
};

export default NehuCommandTest;
