import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold text-slate-900">
            AI Study Assistant
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-slate-600 hover:text-blue-600">
            Home
          </a>

          <a href="#features" className="text-slate-600 hover:text-blue-600">
            Features
          </a>

          <a href="#about" className="text-slate-600 hover:text-blue-600">
            About
          </a>

          <a href="#faq" className="text-slate-600 hover:text-blue-600">
            FAQ
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-2xl md:hidden">☰</button>
      </div>
    </header>
  );
};

export default Navbar;
