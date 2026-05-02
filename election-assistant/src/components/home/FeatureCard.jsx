import { useReveal } from "../../hooks/useReveal";

const GRADIENTS = {
  blue: "from-civic-blue to-civic-blue-electric",
  amber: "from-civic-gold to-civic-gold-dark",
  emerald: "from-emerald-600 to-emerald-400",
  violet: "from-civic-purple to-civic-purple-light",
  rose: "from-civic-rose to-civic-rose-light",
  sky: "from-civic-blue-cyan to-civic-blue",
};

/**
 * FeatureCard component with flip animation.
 */
export default function FeatureCard({ icon, title, desc, color, delay, learnMore }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`flip-card h-full ${isVisible ? "animate-reveal" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flip-card-inner relative h-full">
        {/* Front */}
        <div className="flip-card-front h-full glass-strong rounded-2xl p-6 cursor-default group hover:border-white/20 transition-colors backface-hidden">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${GRADIENTS[color]} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-gradient transition-all">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-civic-blue-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Hover to learn more</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back h-full glass-strong rounded-2xl p-6 flex flex-col justify-center items-center text-center backface-hidden border border-white/10">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${GRADIENTS[color]} opacity-20 absolute -z-1 blur-2xl`} />
          <h4 className="font-bold text-text-primary mb-4">{title}</h4>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">{learnMore}</p>
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${GRADIENTS[color]}`} />
        </div>
      </div>
    </div>
  );
}
