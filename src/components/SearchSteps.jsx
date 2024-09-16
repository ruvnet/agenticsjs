import React from 'react';
import { motion } from 'framer-motion';
import { useUIConfig } from '../config/uiConfig';

const steps = [
  { id: 'define', text: 'Defining request' },
  { id: 'search', text: 'Searching' },
  { id: 'analyze', text: 'Analyzing results' },
  { id: 'generate', text: 'Generating response' },
];

const SearchSteps = ({ currentStep, isGeneratingComplete }) => {
  const { config } = useUIConfig();
  const isDarkMode = config.theme === 'dark';

  return (
    <div className="flex flex-col space-y-2 mb-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className={`flex items-center space-x-2 ${
            index <= currentStep 
              ? isDarkMode ? 'text-white' : 'text-gray-800'
              : isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index < currentStep || (index === 3 && isGeneratingComplete) 
                ? 'bg-accent' 
                : index === currentStep 
                  ? 'bg-accent' 
                  : isDarkMode ? 'bg-gray-500' : 'bg-gray-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {index < currentStep || (index === 3 && isGeneratingComplete) ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : index === currentStep ? (
              <motion.div
                className="w-3 h-3 border-t-2 border-r-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : null}
          </motion.div>
          <span>{step.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SearchSteps;
