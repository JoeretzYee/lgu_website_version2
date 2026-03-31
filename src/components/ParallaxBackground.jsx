import { motion } from "framer-motion";
import { useParallax } from "../hooks/useScrollAnimation";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ParallaxBackground({
  children,
  backgroundImage,
  speed = 0.3,
  overlay = true,
  overlayColor = "from-primary-950/80 to-primary-900/60",
  className = "",
  height = "min-h-[60vh]",
  direction = "up",
}) {
  const [ref, offset] = useParallax(speed, direction);
  const reducedMotion = useReducedMotion();
  const yOffset = reducedMotion ? 0 : offset;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      {/* Parallax Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -top-20 -bottom-20"
          style={{ y: yOffset }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
