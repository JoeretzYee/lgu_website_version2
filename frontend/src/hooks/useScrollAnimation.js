import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = "-100px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => setIsVisible(true), delay);
            return () => clearTimeout(timer);
          }
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay]);

  return [ref, isVisible];
}

/**
 * Custom hook for parallax scrolling effect.
 * Returns a ref and a transform value based on scroll position.
 */
export function useParallax(speed = 0.5, direction = "up") {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const viewportHeight = window.innerHeight;
      const elementCenter = elementTop - viewportHeight / 2;

      if (direction === "up") {
        setOffset((scrolled - elementCenter) * speed);
      } else if (direction === "down") {
        setOffset(-(scrolled - elementCenter) * speed);
      } else {
        setOffset((scrolled - elementCenter) * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return [ref, offset];
}

/**
 * Custom hook for mouse-follow parallax effect.
 * Returns ref and mouse position offsets.
 */
export function useMouseParallax(intensity = 0.02) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;
      setPosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return [ref, position];
}

export default useScrollAnimation;
