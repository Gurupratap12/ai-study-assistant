import { useEffect } from "react";

const useNehu = () => {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Nehu: Speech Recognition is not supported.");
      return;
    }

    console.log("Nehu: Speech Recognition is available.");
  }, []);
};

export { useNehu };