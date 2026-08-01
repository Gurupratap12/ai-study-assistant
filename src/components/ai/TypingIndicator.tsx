const TypingIndicator = () => {
  return (
    <div className="flex">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;