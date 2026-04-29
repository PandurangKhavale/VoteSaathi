import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0
}) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const animate = useCallback(() => {
    const startTime = Date.now();
    const total = end - start;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(2, -10 * progress);

      const current = start + total * eased;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    updateCount();
  }, [end, start, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
            animate();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, animate, delay]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

AnimatedCounter.propTypes = {
  end: PropTypes.number.isRequired,
  start: PropTypes.number,
  duration: PropTypes.number,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  decimals: PropTypes.number,
  className: PropTypes.string,
  delay: PropTypes.number,
};
