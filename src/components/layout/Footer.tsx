const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row">
        
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            📚 AI Study Assistant
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your Personal AI Learning Companion
          </p>
        </div>

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} AI Study Assistant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;