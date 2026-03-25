import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "../hooks/useCounter";

export default function StatsCounter({
  end,
  label,
  prefix = "",
  suffix = "",
  icon,
  duration = 2000,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // once: false to trigger every time
  const [isActive, setIsActive] = useState(false);

  // Reset and restart counter when element comes into view
  useEffect(() => {
    if (isInView) {
      // Small delay before starting animation for better UX
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Reset when out of view so it can animate again
      setIsActive(false);
    }
  }, [isInView]);

  const { formatted } = useCounter(end, {
    duration,
    prefix,
    suffix,
    isActive: isActive,
    start: 0,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-300 mb-1">
        {formatted}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}

// Stats Section with multiple counters
export function StatsSection({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          // Add exit animation for when it leaves view
          exit={{ opacity: 0, y: 20 }}
        >
          <StatsCounter {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
