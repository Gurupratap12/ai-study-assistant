import { useEffect, useRef, useState } from "react";
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

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const restartingRef = useRef(false);

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

    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      restartingRef.current = false;
      setListening(true);
      setStatus("🎙️ Nehu is listening...");
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
        restartingRef.current = false;
        setListening(false);
        setStatus("❌ Microphone permission denied");
        return;
      }

      if (event.error === "aborted") {
        return;
      }

      setStatus(`⚠️ Error: ${event.error}`);
    };

    recognition.onend = () => {
      setListening(false);

      if (!shouldListenRef.current) {
        setStatus("Nehu stopped.");
        return;
      }

      if (restartingRef.current) {
        return;
      }

      restartingRef.current = true;
      setStatus("🔄 Nehu restarting...");

      setTimeout(() => {
        if (!shouldListenRef.current) {
          restartingRef.current = false;
          return;
        }

        try {
          recognition.start();
        } catch (error) {
          console.log("Restart failed:", error);
          restartingRef.current = false;
          setStatus("⚠️ Restart failed");
        }
      }, 800);
    };

    recognition.start();
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    restartingRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
    setStatus("Nehu stopped.");
  };

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      restartingRef.current = false;

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
