import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Radio } from 'lucide-react';
import SearchInput from './SearchInput';

const InitialScreen = ({ onSearch }) => {
  const exampleQueries = [
    { icon: '🍌', text: 'How to preserve bananas?' },
    { icon: '🌟', text: 'How many stars are visible from Earth?' },
    { icon: '🏊', text: 'Improve pool techniques' },
    { icon: '🐄', text: 'Impact of cows on the environment' },
    { icon: '🏌️', text: 'How to perfect your golf swing' },
    { icon: '🌮', text: 'Best taco recipes' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1C1C1C]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-white">Agentic UI</h1>
        <p className="text-xl text-gray-400">Where knowledge begins</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mb-8"
      >
        <SearchInput onSearch={onSearch} isSearching={false} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 gap-4 w-full max-w-md"
      >
        {exampleQueries.map((query, index) => (
          <motion.button
            key={index}
            className="bg-[#2D2D2D] text-left p-3 rounded-lg flex items-center space-x-2 hover:bg-[#3C3C3C] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSearch(query.text)}
          >
            <span>{query.icon}</span>
            <span className="text-sm text-gray-300 truncate">{query.text}</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 flex space-x-8"
      >
        <div className="flex items-center text-gray-400">
          <Search className="w-5 h-5 mr-2" />
          <span>Search</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Zap className="w-5 h-5 mr-2" />
          <span>Ask</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Radio className="w-5 h-5 mr-2" />
          <span>Discover</span>
        </div>
      </motion.div>
    </div>
  );
};

export default InitialScreen;