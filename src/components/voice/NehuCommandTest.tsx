import { useEffect, useRef, useState } from "react";
import { useNehuCommand } from "../../hooks/useNehuCommand";

const NehuCommandTest = () => {
  const [command, setCommand] = useState("");
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("Nehu is ready");

  const { executeNehuCommand } = useNehuCommand();

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (shouldListenRef.current) {
      return;
    }

    shouldListenRef.current = true;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);
      setStatus("🎙️ Nehu is listening...");
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase().trim();

      setCommand(text);

      const wakeWord = "nehu";

      if (!text.includes(wakeWord)) {
        setStatus("❌ Wake word not detected");
        return;
      }

      const actualCommand = text.replace(wakeWord, "").trim();

      if (!actualCommand) {
        setStatus("✅ Nehu detected — waiting for command");
        return;
      }

      setStatus(`✅ Command: ${actualCommand}`);

      executeNehuCommand(actualCommand);
    };

    recognition.onerror = (event: any) => {
      console.log("Nehu error:", event.error);

      if (event.error === "not-allowed") {
        shouldListenRef.current = false;
        setListening(false);
        setStatus("❌ Microphone permission denied");
        return;
      }

      setStatus(`⚠️ Nehu error: ${event.error}`);
    };

    recognition.onend = () => {
      setListening(false);

      if (shouldListenRef.current) {
        setStatus("🔄 Nehu restarting...");

        setTimeout(() => {
          if (!shouldListenRef.current) return;

          try {
            recognition.start();
          } catch (error) {
            console.log("Nehu restart error:", error);
          }
        }, 500);
      }
    };
  };

  const stopListening = () => {
    shouldListenRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
    setStatus("Nehu stopped");
  };

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div>
      <p>
        <strong>Heard:</strong> {command || "No command yet"}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <button
        type="button"
        onClick={listening ? stopListening : startListening}
      >
        {listening ? "🛑 Stop Nehu" : "🎤 Start Nehu"}
      </button>
    </div>
  );
};

export default NehuCommandTest;
