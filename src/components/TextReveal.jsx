import { motion } from "framer-motion";

/**
 * TextReveal - Splits text into words, each word's chars animate in with a
 * clip-path slide-up reveal. Classic high-end agency effect.
 *
 * Props:
 *  text       – string to reveal
 *  className  – classes for the outer span
 *  delay      – stagger start delay (default 0)
 *  once       – only animate once on viewport enter (default true)
 *  as         – element tag: "h1" | "h2" | "p" | "span" (default "span")
 */
const TextReveal = ({
  text = "",
  className = "",
  delay = 0,
  once = true,
  as: Tag = "span",
}) => {
  const words = text.split(" ");

  // key={text} ensures the component remounts and re-animates when the text changes (e.g. language switch)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const charVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      key={text}
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={{ perspective: "800px" }}
    >
      {words.map((word, wIdx) => (
        <motion.span
          key={wIdx}
          variants={wordVariants}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.2em] mb-[-0.2em]"
          style={{ verticalAlign: "top" }}
        >
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              variants={charVariants}
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
