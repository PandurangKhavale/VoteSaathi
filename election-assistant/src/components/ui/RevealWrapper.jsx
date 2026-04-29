import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function RevealWrapper({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'reveal',
  stagger = false,
  staggerDelay = 80,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const animations = {
    reveal: 'opacity-0 translate-y-8 scale-95',
    'fade-in': 'opacity-0',
    'slide-up': 'opacity-0 translate-y-12',
    'slide-down': 'opacity-0 -translate-y-8',
    'slide-left': 'opacity-0 translate-x-12',
    'slide-right': 'opacity-0 -translate-x-12',
    'scale-in': 'opacity-0 scale-75',
    'blur-in': 'opacity-0 blur-sm',
    'rotate-in': 'opacity-0 rotate-6',
  };

  const visibleClass = 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0 rotate-0';

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  const baseClass = animations[animation] || animations.reveal;

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? visibleClass : baseClass
      } ${stagger && isVisible ? 'stagger-children revealed' : ''}`}
    >
      {children}
    </div>
  );
}

RevealWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  threshold: PropTypes.number,
  animation: PropTypes.oneOf([
    'reveal',
    'fade-in',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'scale-in',
    'blur-in',
    'rotate-in',
  ]),
  stagger: PropTypes.bool,
  staggerDelay: PropTypes.number,
};
