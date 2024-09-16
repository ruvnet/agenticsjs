import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Radio } from 'lucide-react';
import SearchInput from './SearchInput';
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';

const GeometricIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M50 10L90 90H10L50 10Z"
      stroke="currentColor"
      strokeWidth="4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
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
      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
    />
  </svg>
);

const InitialScreen = ({ onSearch }) => {
  const { config } = useUIConfig();
  const exampleQueries = [
    { icon: '🍌', text: 'How to preserve bananas?' },
    { icon: '🌟', text: 'How many stars are visible from Earth?' },
    { icon: '🏊', text: 'Improve pool techniques' },
    { icon: '🐄', text: 'Impact of cows on the environment' },
    { icon: '🏌️', text: 'How to perfect your golf swing' },
    { icon: '🌮', text: 'Best taco recipes' },
  ];

  const bgColor = config.theme === 'dark' ? config.colors?.background?.dark || '#1C1C1C' : config.colors?.background?.light || '#FFFFFF';
  const textColor = config.theme === 'dark' ? config.colors?.text?.dark || '#FFFFFF' : config.colors?.text?.light || '#000000';
  const buttonBgColor = config.theme === 'dark' ? config.colors?.primary?.dark || '#3C3C3C' : config.colors?.primary?.light || '#F0F0F0';
  const buttonHoverColor = config.theme === 'dark' ? config.colors?.accent?.dark || '#4A4A4A' : config.colors?.accent?.light || '#D0D0D0';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4`} style={{ backgroundColor: bgColor, color: textColor }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-4"
      >
        <GeometricIcon />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="text-center mb-8"
      >
        <h1 className={`text-4xl font-bold mb-2`}>Agentic UI</h1>
        <p className={`text-xl ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Where knowledge begins</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="w-full max-w-md mb-8"
      >
        <SearchInput onSearch={onSearch} isSearching={false} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="grid grid-cols-2 gap-4 w-full max-w-md"
      >
        {exampleQueries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            className={`text-left p-3 rounded-lg flex items-center space-x-2 transition-colors`}
            style={{ backgroundColor: buttonBgColor, color: textColor }}
            onClick={() => onSearch(query.text)}
          >
            <span>{query.icon}</span>
            <span className={`text-sm truncate`}>{query.text}</span>
          </Button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.4 }}
        className="mt-8 flex space-x-8"
      >
        <div className={`flex items-center ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <Search className="w-5 h-5 mr-2" />
          <span>Search</span>
        </div>
        <div className={`flex items-center ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <Zap className="w-5 h-5 mr-2" />
          <span>Ask</span>
        </div>
        <div className={`flex items-center ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <Radio className="w-5 h-5 mr-2" />
          <span>Discover</span>
        </div>
      </motion.div>
    </div>
  );
};

export default InitialScreen;
