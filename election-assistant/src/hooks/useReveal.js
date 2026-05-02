import { useEffect, useRef, useState } from "react";

/**
 * Hook to reveal elements when they enter the viewport.
 * @param {Object} options - IntersectionObserver options.
 * @returns {[Object, boolean]} - Ref to attach to element and visibility state.
 */
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      options
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
}
