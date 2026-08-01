import type { ReactNode } from "react";

interface ProgressCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

const ProgressCard = ({ title, value, icon, color }: ProgressCardProps) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
