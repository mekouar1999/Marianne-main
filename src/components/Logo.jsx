import React from "react";
import { motion } from "framer-motion";

const Logo = ({
  className = "",
  width = "120",
  height = "40",
  showText = true,
  textClassName = "text-xl font-bold text-gray-900",
  invert = false,
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex-shrink-0"
      >
        <img
          src="/Nouveau logo CES.png"
          alt="Customs Engineering Solutions"
          className={`h-14 w-auto max-w-[180px] sm:h-16 sm:max-w-[220px] object-contain ${invert ? 'brightness-0 invert' : ''}`}
        />
      </motion.div>

      {/* {showText && <span className={textClassName}>CES</span>} */}
    </div>
  );
};

export default Logo;
