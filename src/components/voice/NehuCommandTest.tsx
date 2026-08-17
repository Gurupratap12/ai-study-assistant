import { useState } from "react";
import { useNehuCommand } from "../../hooks/useNehuCommand";
const normalizeNehu = (text: string) => {
  const variants = ["nehu", "new", "neu", "nehue", "nehoo", "nehuu"];

  let normalizedText = text.toLowerCase().trim();

  for (const variant of variants) {
    if (normalizedText.includes(variant)) {
      normalizedText = normalizedText.replace(variant, "nehu");
      break;
    }
  }

  return normalizedText;
};
const NehuCommandTest = () => {
  const [command, setCommand] = useState("");
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("Nehu is ready");

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
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setStatus("🎙️ Listening...");
    };

    recognition.onresult = (event: any) => {
      const rawText = event.results[0][0].transcript;

      const text = normalizeNehu(rawText);

      setCommand(text);

      const wakeWord = "nehu";

      if (!text.includes(wakeWord)) {
        setStatus("❌ Wake word not detected");
        return;
      }

      const actualCommand = text.replace(wakeWord, "").trim();

      if (!actualCommand) {
        setStatus("✅ Wake word detected — waiting for command");
        return;
      }

      setStatus(`✅ Nehu active — Command: ${actualCommand}`);

      executeNehuCommand(actualCommand);
    };

    recognition.onerror = (event: any) => {
      setListening(false);
      setStatus(`❌ Error: ${event.error}`);
    };

    recognition.onend = () => {
      setListening(false);
      setStatus("Nehu stopped listening.");
    };

    recognition.start();
  };

  return (
    <div>
      <p>
        <strong>Heard:</strong> {command || "No command yet"}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <button type="button" onClick={startListening} disabled={listening}>
        {listening ? "🎙️ Listening..." : "🎤 Speak to Nehu"}
      </button>
    </div>
  );
};

export default NehuCommandTest;
