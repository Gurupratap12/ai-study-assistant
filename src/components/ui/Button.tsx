import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}
    
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl",

    secondary: "border border-slate-300 text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
