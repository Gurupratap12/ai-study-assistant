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
  const [listening, setListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const restartingRef = useRef(false);

  // Stop function reference
  const stopListeningRef = useRef<() => void>(() => {});

  const { executeNehuCommand } = useNehuCommand(() =>
    stopListeningRef.current(),
  );

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
    };

    recognition.onresult = (event: any) => {
      const rawText = event.results[event.results.length - 1][0].transcript;

      const text = normalizeNehu(rawText);

      console.log("Nehu heard:", text);

      const wakeWord = "nehu";

      if (!text.includes(wakeWord)) {
        return;
      }

      const actualCommand = text.replace(wakeWord, "").trim();

      if (!actualCommand) {
        return;
      }

      executeNehuCommand(actualCommand);
    };

    recognition.onerror = (event: any) => {
      console.log("Nehu error:", event.error);

      if (event.error === "not-allowed") {
        shouldListenRef.current = false;
        restartingRef.current = false;
        setListening(false);
        return;
      }

      if (event.error === "aborted") {
        return;
      }
    };

    recognition.onend = () => {
      setListening(false);

      if (!shouldListenRef.current) {
        return;
      }

      if (restartingRef.current) {
        return;
      }

      restartingRef.current = true;

      setTimeout(() => {
        if (!shouldListenRef.current) {
          restartingRef.current = false;
          return;
        }

        try {
          recognition.start();
        } catch (error) {
          console.log("Nehu restart error:", error);
          restartingRef.current = false;
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
  };

  // Make stopListening available to the hook
  stopListeningRef.current = stopListening;

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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg transition-all duration-200 ${
          showTooltip
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        {listening ? "Nehu is listening" : "Nehu"}
      </div>

      {/* Nehu Button */}
      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => {
          setTimeout(() => {
            setShowTooltip(false);
          }, 1200);
        }}
        aria-label={listening ? "Stop Nehu" : "Start Nehu"}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-all duration-300 ${
          listening
            ? "border-green-400 bg-green-500 shadow-green-500/40"
            : "border-gray-300 bg-white shadow-black/10"
        }`}
      >
        {listening && (
          <span className="absolute inset-0 animate-ping rounded-full bg-green-400/30" />
        )}

        <span className="relative text-2xl">🎙️</span>
      </button>
    </div>
  );
};

export default NehuCommandTest;
