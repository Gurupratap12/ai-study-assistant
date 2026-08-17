export const isSpeechRecognitionSupported = () => {
  return Boolean(
    window.SpeechRecognition ||
      window.webkitSpeechRecognition,
  );
};