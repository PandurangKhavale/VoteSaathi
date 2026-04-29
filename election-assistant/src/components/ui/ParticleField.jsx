import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function ParticleField({
  count = 50,
  size = { min: 1, max: 3 },
  speed = { min: 0.2, max: 0.5 },
  opacity = { min: 0.2, max: 0.5 },
  color = 'rgba(255, 255, 255,',
  className = '',
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const createParticle = useCallback((width, height) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * (Math.random() * (speed.max - speed.min) + speed.min),
    vy: (Math.random() - 0.5) * (Math.random() * (speed.max - speed.min) + speed.min),
    size: Math.random() * (size.max - size.min) + size.min,
    opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
    alpha: Math.random() * Math.PI * 2,
  }), [size, speed, opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Twinkle effect
        particle.alpha += 0.02;
        const currentOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.alpha));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, size, speed, opacity, color, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

ParticleField.propTypes = {
  count: PropTypes.number,
  size: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  speed: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  opacity: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  color: PropTypes.string,
  className: PropTypes.string,
};
