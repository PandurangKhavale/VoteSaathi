import PropTypes from 'prop-types';

export default function FloatingOrb({
  className = '',
  size = 'md',
  color = 'blue',
  position = 'top-left',
  blur = 120,
  opacity = 0.15,
  animate = true,
}) {
  const sizes = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const colors = {
    blue: 'bg-civic-blue-electric',
    purple: 'bg-civic-purple',
    gold: 'bg-civic-gold',
    rose: 'bg-civic-rose',
    cyan: 'bg-civic-blue-cyan',
  };

  const positions = {
    'top-left': '-top-32 -left-32',
    'top-right': '-top-32 -right-32',
    'bottom-left': '-bottom-32 -left-32',
    'bottom-right': '-bottom-32 -right-32',
    'top-center': '-top-32 left-1/2 -translate-x-1/2',
    'bottom-center': '-bottom-32 left-1/2 -translate-x-1/2',
  };

  const animations = animate ? 'animate-float-slow opacity-60 hw-accel' : 'opacity-40';

  return (
    <div
      className={`absolute ${sizes[size]} ${colors[color]} ${positions[position]} ${animations} rounded-full blur-[${blur}px] pointer-events-none ${className}`}
      style={{
        filter: `blur(${blur}px)`,
        opacity: opacity,
      }}
    />
  );
}

FloatingOrb.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['blue', 'purple', 'gold', 'rose', 'cyan']),
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center']),
  blur: PropTypes.number,
  opacity: PropTypes.number,
  animate: PropTypes.bool,
};
