import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1,
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold, triggerOnce: once });
  const reducedMotion = useReducedMotion();

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : -40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: reducedMotion ? 0 : -40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: reducedMotion ? 0 : 40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
    rotateIn: {
      hidden: { opacity: 0, rotate: reducedMotion ? 0 : -5 },
      visible: { opacity: 1, rotate: 0 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={selectedAnimation}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{
        duration: reducedMotion ? 0.1 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger child wrapper
export function StaggerItem({
  children,
  className = "",
  animation = "fadeUp",
}) {
  const reducedMotion = useReducedMotion();

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: reducedMotion ? 0 : -30 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      className={className}
      variants={selectedAnimation}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
