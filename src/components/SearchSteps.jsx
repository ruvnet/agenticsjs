import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 'define', text: 'Defining request' },
  { id: 'search', text: 'Searching' },
  { id: 'analyze', text: 'Analyzing results' },
  { id: 'generate', text: 'Generating response' },
];

const SearchSteps = ({ currentStep }) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className={`flex items-center space-x-2 ${
            index <= currentStep ? 'text-white' : 'text-gray-500'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className={`w-4 h-4 rounded-full ${
              index <= currentStep ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          />
          <span>{step.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SearchSteps;