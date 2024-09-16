import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';

const SpeechModal = ({ isOpen, onClose, onSpeechResult }) => {
  const { config } = useUIConfig();
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voicePattern, setVoicePattern] = useState([]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setVoicePattern(prevPattern => {
          const newPattern = [...prevPattern, Math.random()];
          return newPattern.slice(-50);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
    setRecognizedText('');
    simulateSpeechRecognition();
  };

  const stopListening = () => {
    setIsListening(false);
    onSpeechResult(recognizedText);
  };

  const simulateSpeechRecognition = () => {
    const phrases = [
      "Hello, how can I assist you today?",
      "What would you like to search for?",
      "I'm listening to your request.",
      "Please speak clearly for better results.",
    ];
    let currentPhrase = '';
    const interval = setInterval(() => {
      if (currentPhrase.length < phrases[0].length) {
        currentPhrase += phrases[0][currentPhrase.length];
        setRecognizedText(currentPhrase);
      } else {
        clearInterval(interval);
        setIsListening(false);
      }
    }, 100);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const renderVoiceVisualization = () => {
    if (config.speechVisualization === 'waveform') {
      return (
        <svg width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={`M 0,50 ${voicePattern.map((v, i) => `L ${i * 2},${50 - v * 40}`).join(' ')}`}
            fill="none"
            stroke={config.theme === 'dark' ? '#4A72FF' : '#3B82F6'}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      );
    } else {
      return (
        <svg width="100%" height="100" viewBox="0 0 100 24" preserveAspectRatio="none">
          {voicePattern.map((value, index) => (
            <motion.rect
              key={index}
              x={index * 2}
              y={12 - value * 10}
              width="1.5"
              height={value * 20}
              fill={config.theme === 'dark' ? '#4A72FF' : '#3B82F6'}
              initial={{ height: 0 }}
              animate={{ height: value * 20 }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </svg>
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} border-2 ${config.theme === 'dark' ? 'border-blue-500' : 'border-blue-300'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                <Settings className="h-6 w-6" />
              </Button>
            </div>
            <div className="text-center mb-8">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl font-bold mb-2 ${config.theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
              >
                {isListening ? 'Listening...' : 'Speak to begin'}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-lg ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {recognizedText}
              </motion.p>
            </div>
            <div className="h-24 mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isListening ? [1, 1.2, 1] : 1,
                    opacity: isListening ? [0.5, 1, 0.5] : 0.5
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-16 h-16 rounded-full ${isListening ? 'bg-blue-500' : 'bg-gray-400'}`}
                />
              </div>
              {renderVoiceVisualization()}
            </div>
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`w-full py-3 rounded-full text-white font-bold text-lg ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors duration-300 transform hover:scale-105`}
            >
              <Mic className="w-6 h-6 mr-2" />
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechModal;
