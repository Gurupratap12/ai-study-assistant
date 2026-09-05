const TypingIndicator = () => {
  return (
    <div className="flex">
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="flex gap-2">
          <span
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-slate-400
              dark:bg-slate-500
            "
          ></span>

          <span
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-slate-400
              dark:bg-slate-500
              [animation-delay:150ms]
            "
          ></span>

          <span
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-slate-400
              dark:bg-slate-500
              [animation-delay:300ms]
            "
          ></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
