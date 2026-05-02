import { useReveal } from "../../hooks/useReveal";

/**
 * StepCard component for displaying process steps.
 */
export default function StepCard({ number, title, desc, delay, gradient }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`relative ${isVisible ? "animate-reveal" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="glass-strong rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
          {number}
        </div>
        <h4 className="text-xl font-bold text-text-primary mb-2">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
