import type { ReactNode } from "react";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({
  title,
  description,
  icon,
}: FeatureCardProps) => {
  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-white/40
      bg-white/60
      p-6
      backdrop-blur-xl
      shadow-md
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >

      <div className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-linear-to-br
        from-blue-500
        to-purple-500
        text-2xl
        text-white
      ">
        {icon}
      </div>


      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>


      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>


    </div>
  );
};

export default FeatureCard;