import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Radio, Settings } from 'lucide-react';
import SearchInput from './SearchInput';
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';
import GeometricIcon from './GeometricIcon';

const InitialScreen = ({ onSearch, scrollToTop, onOpenSettings }) => {
  const { config } = useUIConfig();
  const isDarkMode = config.theme === 'dark';

  const backgroundColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const buttonBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const buttonHoverColor = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  const exampleQueries = [
    { icon: '🍌', text: 'How to preserve bananas?' },
    { icon: '🌟', text: 'How many stars are visible from Earth?' },
    { icon: '🏊', text: 'Improve pool techniques' },
    { icon: '🐄', text: 'Impact of cows on the environment' },
    { icon: '🏌️', text: 'How to perfect your golf swing' },
    { icon: '🌮', text: 'Best taco recipes' },
  ];

  const handleExampleClick = (query) => {
    scrollToTop();
    onSearch(query);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${backgroundColor}`}>
      <Button
        variant="ghost"
        onClick={onOpenSettings}
        className={`absolute top-4 right-4 p-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
      >
        <Settings className="h-6 w-6" />
      </Button>
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4 flex justify-center"
        >
          <GeometricIcon size={100} animate={true} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${textColor}`}>Agentics.js</h1>
          <p className={`text-xl ${secondaryTextColor}`}>Agentic Interfaces Made Easy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="w-full mb-8"
        >
          <SearchInput onSearch={onSearch} isSearching={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="grid grid-cols-2 gap-4 w-full"
        >
          {exampleQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${buttonBgColor} text-left p-3 rounded-lg flex items-center space-x-2 ${buttonHoverColor} transition-colors`}
              onClick={() => handleExampleClick(query.text)}
            >
              <span>{query.icon}</span>
              <span className={`text-sm ${secondaryTextColor} truncate`}>{query.text}</span>
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          className="mt-8 flex justify-center space-x-8"
        >
          <div className={`flex items-center ${secondaryTextColor}`}>
            <Search className="w-5 h-5 mr-2" />
            <span>Search</span>
          </div>
          <div className={`flex items-center ${secondaryTextColor}`}>
            <Zap className="w-5 h-5 mr-2" />
            <span>Ask</span>
          </div>
          <div className={`flex items-center ${secondaryTextColor}`}>
            <Radio className="w-5 h-5 mr-2" />
            <span>Discover</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InitialScreen;
