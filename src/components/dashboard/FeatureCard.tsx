import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

const FeatureCard = ({
  title,
  description,
  icon,
  onClick,
}: FeatureCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        cursor-pointer
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-md
        transition
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl

        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:bg-slate-800
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-500
          text-2xl
          text-white
        "
      >
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
