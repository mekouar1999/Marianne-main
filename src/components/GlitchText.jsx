import { useRef, useState, useCallback } from "react";

/**
 * GlitchText – On mount (or hover), scrambles through random characters
 * before resolving to the final text. Cyberpunk / agency-site aesthetic.
 *
 * Props:
 *  text       – the final string to reveal
 *  className  – classes applied to the span
 *  trigger    – "mount" | "hover" (default "mount")
 *  speed      – ms between scramble frames (default 35)
 *  iterations – how many scramble frames before locking each char (default 8)
 */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";

const GlitchText = ({
  text = "",
  className = "",
  trigger = "mount",
  speed = 35,
  iterations = 8,
}) => {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const frameRef = useRef(null);
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = text.length * iterations;

    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (frame >= idx * iterations) return char; // locked
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
      if (frame > totalFrames) {
        clearInterval(frameRef.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, iterations, speed]);

  // Run on mount
  const initialized = useRef(false);
  if (!initialized.current && trigger === "mount") {
    initialized.current = true;
    // defer to next tick so component is mounted
    if (typeof window !== "undefined") {
      setTimeout(scramble, 120);
    }
  }

  return (
    <span
      className={className}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {display || text}
    </span>
  );
};

export default GlitchText;
