import React from "react";
import { motion } from "framer-motion";

const Logo = ({
  className = "",
  width = "120",
  height = "40",
  showText = true,
  textClassName = "text-xl font-bold text-gray-900",
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
          className="h-8 w-auto max-w-[120px] sm:h-10 sm:max-w-[150px] object-contain"
        />
      </motion.div>

      {/* {showText && <span className={textClassName}>CES</span>} */}
    </div>
  );
};

export default Logo;
