import { useEffect } from 'react';

const useNehu = () => {
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log('Nexa:Speech Recognition is not supported.');
      return;
    }

    console.log('Nexa: Speech Recognition is available.');
  }, []);
};

export { useNehu };
