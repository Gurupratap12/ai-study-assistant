import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:bg-slate-800
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-2xl
            text-blue-600
            dark:bg-blue-900
            dark:text-blue-300
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
