import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * TiltCard – Wraps children in a 3-D perspective tilt that follows the cursor.
 * On mouse-leave it springs back to flat. Apple-product-page style.
 *
 * Props:
 *  maxTilt    – max degrees of tilt (default 14)
 *  scale      – scale on hover (default 1.03)
 *  className  – classes applied to the outer wrapper
 *  children   – any React content
 */
const TiltCard = ({
  maxTilt = 14,
  scale = 1.03,
  className = "",
  children,
}) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0→1
    const py = (e.clientY - rect.top) / rect.height;  // 0→1
    setTilt({
      x: (py - 0.5) * -maxTilt * 2,   // pitch
      y: (px - 0.5) * maxTilt * 2,    // yaw
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 0.5,
      }}
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
    >
      {/* Spotlight glow layer */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(88,129,254,0.45) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default TiltCard;
