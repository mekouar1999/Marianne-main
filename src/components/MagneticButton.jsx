import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticButton – The button gently pulls towards the cursor when hovered,
 * snapping back on mouse-leave. Classic "new-web" interaction.
 *
 * Props:
 *  strength   – how many pixels to pull (default 24)
 *  className  – classes for the button
 *  children   – button content
 *  onClick    – click handler
 *  type       – button type (default "button")
 *  disabled   – disabled state
 */
const MagneticButton = ({
  strength = 24,
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.5,
      y: (e.clientY - cy) * 0.5,
    });
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{
        x: pos.x,
        y: pos.y,
        scale: hovered ? 1.08 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
        mass: 0.4,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
