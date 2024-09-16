import React from 'react';
import { motion } from 'framer-motion';

const GeometricIcon = ({ size = 24, animate = true }) => {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut", repeat: animate ? Infinity : 0, repeatType: "reverse" }
    }
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { duration: 1, delay: 0.5, ease: "easeOut", repeat: animate ? Infinity : 0, repeatType: "reverse" }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      variants={iconVariants}
    >
      <motion.path
        d="M50 10L90 90H10L50 10Z"
        stroke="#4A72FF"
        strokeWidth="4"
        fill="none"
        variants={pathVariants}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        stroke="#4A72FF"
        strokeWidth="4"
        fill="none"
        variants={circleVariants}
      />
    </motion.svg>
  );
};

export default GeometricIcon;
