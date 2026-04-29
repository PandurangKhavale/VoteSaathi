import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-12 h-12 rounded-full glass-strong flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-civic-blue/20 to-civic-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Sun icon (for dark theme) */}
      <svg
        className={`w-5 h-5 text-civic-gold absolute transition-all duration-500 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon (for light theme) */}
      <svg
        className={`w-5 h-5 text-slate-700 absolute transition-all duration-500 ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Orbiting dots animation */}
      <div className="absolute inset-0 rounded-full animate-spin-slow opacity-30">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-civic-gold" />
      </div>
    </button>
  );
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
};
