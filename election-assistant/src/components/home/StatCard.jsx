import { useReveal } from "../../hooks/useReveal";
import { AnimatedCounter } from "../ui";

/**
 * StatCard component for displaying animated statistics.
 */
export default function StatCard({ 
  value, 
  suffix = "", 
  label, 
  icon, 
  delay = 0, 
  gradient = "from-civic-blue to-civic-purple" 
}) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`group relative glass-strong rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500 cursor-default ${
        isVisible ? "animate-scale-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-civic-blue/20 to-civic-purple/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {icon}
        </div>

        <p className="text-4xl sm:text-5xl font-black">
          <AnimatedCounter end={value} suffix={suffix} className="text-gradient" />
        </p>

        <p className="text-sm text-text-secondary mt-2 uppercase tracking-wider font-medium">{label}</p>
      </div>
    </div>
  );
}
