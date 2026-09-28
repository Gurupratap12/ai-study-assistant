import { useEffect, useRef, useState } from 'react';
import { useNehuCommand } from '../../hooks/useNehuCommand';

type SpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const normalizeNehu = (text: string) => {
  const variants = ['nexa', 'nexaah', 'nexaa', 'nexah', 'next', 'nick', 'nekhla','nekka', 'nexus', 'nekfa', 'nika', 'necfa', 'neka', 'nekaah', 'nekah', 'nekkaah', 'nekkaa', 'nekahh', 'nekkaaah','nexifelge', 'nexo',];

  let normalizedText = text.toLowerCase().trim();

  for (const variant of variants) {
    if (normalizedText.includes(variant)) {
      normalizedText = normalizedText.replace(variant, 'nexa');
      break;
    }
  }

  return normalizedText;
};

const NehuCommandTest = () => {
  const [listening, setListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const shouldListenRef = useRef(false);
  const restartingRef = useRef(false);

  const stopListeningRef = useRef<() => void>(() => {});

  const { executeNehuCommand } = useNehuCommand(
    () => stopListeningRef.current()
  );

  const stopListening = () => {
    shouldListenRef.current = false;
    restartingRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
  };

  useEffect(() => {
    stopListeningRef.current = stopListening;
  });

  const startListening = () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (shouldListenRef.current) {
      return;
    }

    shouldListenRef.current = true;

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      restartingRef.current = false;
      setListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const rawText =
        event.results[event.results.length - 1][0].transcript;

      const text = normalizeNehu(rawText);

      console.log('Nexa heard:', text);

      const wakeWord = 'nexa';

      if (!text.includes(wakeWord)) {
        return;
      }

      const actualCommand = text.replace(wakeWord, '').trim();

      if (!actualCommand) {
        return;
      }

      executeNehuCommand(actualCommand);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log('Nexa error:', event.error);

      if (event.error === 'not-allowed') {
        shouldListenRef.current = false;
        restartingRef.current = false;
        setListening(false);
        return;
      }

      if (event.error === 'aborted') {
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
          console.log('Nexa restart error:', error);
          restartingRef.current = false;
        }
      }, 800);
    };

    recognition.start();
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nexa Command Panel */}
      <div
        className={`absolute bottom-full right-0 mb-3 w-64 rounded-2xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-200
          border-slate-200 bg-white
          dark:border-slate-700 dark:bg-slate-900
          ${
            showTooltip
              ? 'visible translate-y-0 opacity-100'
              : 'invisible translate-y-2 opacity-0'
          }`}
      >
        {/* Status */}
        <div className="mb-3 flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              listening
                ? 'animate-pulse bg-green-500'
                : 'bg-slate-400 dark:bg-slate-500'
            }`}
          />

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Nexa
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {listening ? 'Listening...' : 'Ready'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            Try saying:
          </p>

          <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            <p>• “Nexa, open my notes”</p>
            <p>• “Nexa, go back”</p>
            <p>• “Nexa, go home”</p>
            <p>• “Nexa, open my quiz”</p>
            <p>• “Nexa, stop listening”</p>
          </div>
        </div>
      </div>

      {/* Nexa Button */}
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
        aria-label={listening ? 'Stop Nexa' : 'Start Nexa'}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-all duration-300 ${
          listening
            ? 'border-green-400 bg-green-500 shadow-green-500/40'
            : 'border-slate-300 bg-white shadow-black/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40'
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