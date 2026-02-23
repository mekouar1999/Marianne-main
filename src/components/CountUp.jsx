import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * CountUp – Animates a number from 0 to `end` when it enters the viewport.
 *
 * Props:
 *  end       – target number
 *  suffix    – string appended after number (e.g. "+", "%", "K")
 *  duration  – animation duration in ms (default 1800)
 *  className – classes for the span
 */
const CountUp = ({ end = 0, suffix = "", duration = 1800, className = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
