import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/registration", label: "Registration" },
  { to: "/timeline", label: "Timeline" },
  { to: "/candidates", label: "Candidates" },
  { to: "/voting-methods", label: "Voting Methods" },
  { to: "/quiz", label: "Quiz" },
  { to: "/guide", label: "Guide" },
];

const baseLinkClass =
  "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
const activeClass = "bg-white/15 text-white";
const inactiveClass = "text-blue-200/80 hover:text-white hover:bg-white/10";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { quizState } = useAppContext();

  return (
    <nav 
      className="sticky top-0 z-50 bg-civic-blue/95 backdrop-blur-md shadow-sm border-b border-white/5" 
      aria-label="Main navigation"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink 
            to="/" 
            className="flex items-center gap-2.5 group"
            aria-label="VoteSaathi - Go to home page"
            title="VoteSaathi - Voter Information Platform"
          >
            <div 
              className="w-8 h-8 rounded-lg bg-civic-gold flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
              aria-hidden="true"
            >
              <svg 
                className="w-4.5 h-4.5 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
                aria-label="Checkmark icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:inline">
              Vote<span className="text-civic-gold-light">Saathi</span>
            </span>
          </NavLink>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
                aria-current={l.to === "/" ? "page" : undefined}
              >
                {l.label}
                {l.to === "/quiz" && !quizState.completed && (
                  <span 
                    className="absolute -top-0.5 -right-0.5 flex h-3 w-3"
                    aria-label="New quiz available"
                    role="status"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-civic-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-civic-gold" />
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <button
            id="nav-toggle"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-civic-gold focus:ring-offset-2 focus:ring-offset-civic-blue"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div 
          id="mobile-menu" 
          className="lg:hidden animate-slide-down bg-civic-blue border-t border-white/10"
          role="region"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block ${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
                aria-current={l.to === "/" ? "page" : undefined}
              >
                {l.label}
                {l.to === "/quiz" && !quizState.completed && (
                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-civic-gold" aria-label="New quiz available" />
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
