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
      border-white/40
      bg-white/70
      p-6
      shadow-lg
      backdrop-blur-xl
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>
        </div>


        <div className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-blue-100
          text-2xl
        ">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;