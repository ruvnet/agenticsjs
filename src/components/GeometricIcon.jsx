import React from 'react';
import { motion } from 'framer-motion';

const GeometricIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M50 10L90 90H10L50 10Z"
      stroke="currentColor"
      strokeWidth="4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
    />
  </svg>
);

export default GeometricIcon;