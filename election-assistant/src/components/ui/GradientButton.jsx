import PropTypes from 'prop-types';

export default function GradientButton({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'right',
}) {
  const variants = {
    blue: 'from-civic-blue-electric to-civic-blue shadow-civic-blue/40 hover:shadow-civic-blue/50',
    gold: 'from-civic-gold-light to-civic-gold shadow-civic-gold/40 hover:shadow-civic-gold/50 text-gray-900',
    purple: 'from-civic-purple-light to-civic-purple shadow-civic-purple/40 hover:shadow-civic-purple/50',
    rose: 'from-civic-rose-light to-civic-rose shadow-civic-rose/40 hover:shadow-civic-rose/50',
    coral: 'from-civic-coral-light to-civic-coral shadow-civic-coral/40 hover:shadow-civic-coral/50 text-gray-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-3xl',
  };

  const baseClasses = `
    relative overflow-hidden font-semibold
    bg-gradient-to-br transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl
    active:translate-y-0 active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    inline-flex items-center justify-center gap-2
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="w-5 h-5">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="w-5 h-5 group-hover:translate-x-1 transition-transform">{icon}</span>
        )}
      </span>
    </button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['blue', 'gold', 'purple', 'rose', 'coral']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};
