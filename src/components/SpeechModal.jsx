import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-md p-6 rounded-lg shadow-xl ${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
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
              <h2 className={`text-3xl font-bold mb-2 ${config.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {isListening ? 'Listening...' : 'Speak to begin'}
              </h2>
              <p className={`text-lg ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {recognizedText}
              </p>
            </div>
            <div className="h-20 mb-8">
              <svg width="100%" height="100%" viewBox="0 0 100 20">
                {voicePattern.map((value, index) => (
                  <motion.rect
                    key={index}
                    x={index * 2}
                    y={10 - value * 10}
                    width="1.5"
                    height={value * 20}
                    fill={config.theme === 'dark' ? '#4A72FF' : '#3B82F6'}
                    initial={{ height: 0 }}
                    animate={{ height: value * 20 }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </svg>
            </div>
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`w-full py-3 rounded-full text-white font-bold text-lg ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? 'Stop' : 'Start Listening'}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechModal;