import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchSteps from './SearchSteps';
import StreamingText from './StreamingText';
import { scrollToElement } from '../utils/scrollUtils';
import wordCountPlugin from '../plugins/wordCountPlugin';

const SearchResults = ({ query, results, onProSearchClick, onSourceClick, isLatestQuery }) => {
  const { config, updateUIConfig } = useUIConfig();
  const [isProSearchExpanded, setIsProSearchExpanded] = useState(true);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProSearch, setShowProSearch] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGeneratingComplete, setIsGeneratingComplete] = useState(false);

  const proSearchRef = useRef(null);
  const sourcesRef = useRef(null);
  const answerRef = useRef(null);

  useEffect(() => {
    // Apply the wordCountPlugin
    updateUIConfig(wordCountPlugin.setup(config));

    if (isLatestQuery) {
      const stepDuration = 2000;
      const initialDelay = 50;

      const timer = setTimeout(() => {
        setCurrentStep(1);

        const stepTimer = setInterval(() => {
          setCurrentStep((prevStep) => {
            if (prevStep < 3) {
              return prevStep + 1;
            } else {
              clearInterval(stepTimer);
              return prevStep;
            }
          });
        }, stepDuration);

        return () => clearInterval(stepTimer);
      }, initialDelay);

      return () => clearTimeout(timer);
    } else {
      setCurrentStep(3);
      setShowProSearch(true);
      setShowSources(true);
      setShowAnswer(true);
      setIsGeneratingComplete(true);
    }
  }, [isLatestQuery, config, updateUIConfig]);

  useEffect(() => {
    if (currentStep === 1) {
      setTimeout(() => {
        setShowProSearch(true);
        scrollToElement(proSearchRef.current, 500);
      }, 1000);
    } else if (currentStep === 2) {
      setTimeout(() => {
        setShowSources(true);
        scrollToElement(sourcesRef.current, 500);
      }, 1000);
    } else if (currentStep === 3) {
      setTimeout(() => {
        setShowAnswer(true);
        scrollToElement(answerRef.current, 500);
      }, 1000);
    }
  }, [currentStep]);

  const handleStreamingComplete = () => {
    setIsGeneratingComplete(true);
  };

  const animationProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: config.animations.enabled ? config.animations.duration / 1000 : 0 }
  };

  const textColor = config.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = config.theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const buttonBgColor = config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  const buttonHoverColor = config.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300';

  const WordCountDisplay = ({ count }) => (
    <div className={`mt-2 text-sm ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      Word count: {count}
    </div>
  );

  return (
    <div className={`space-y-4 ${textColor} mb-8`}>
      <h2 className="text-2xl font-bold mb-4">{query}</h2>
      {isLatestQuery && <SearchSteps currentStep={currentStep} isGeneratingComplete={isGeneratingComplete} />}

      <AnimatePresence>
        {showProSearch && results && (
          <motion.div {...animationProps} className={`border ${borderColor} rounded-lg p-4`} ref={proSearchRef}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">{config.components.proSearch.icon}</span> {config.components.proSearch.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProSearchExpanded(!isProSearchExpanded)}
                className={`${buttonBgColor} ${buttonHoverColor}`}
              >
                {isProSearchExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            {isProSearchExpanded && (
              <ul className="list-none pl-0">
                {results.proSearch.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Button
                      variant="link"
                      className={`${config.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} p-0 h-auto font-normal text-left break-words whitespace-normal`}
                      onClick={() => onProSearchClick(item)}
                    >
                      <span className="mr-2 inline-block">✓</span>
                      <span className="inline">{item}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSources && results && (
          <motion.div {...animationProps} className={`border ${borderColor} rounded-lg p-4`} ref={sourcesRef}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">{config.components.sources.icon}</span> {config.components.sources.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
                className={`${buttonBgColor} ${buttonHoverColor}`}
              >
                {isSourcesExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            {isSourcesExpanded && (
              <div className="grid grid-cols-1 gap-4">
                {results.sources.map((source, index) => (
                  <div
                    key={index}
                    className={`border ${borderColor} p-3 rounded text-left flex flex-col items-start h-auto w-full cursor-pointer ${buttonHoverColor} transition-colors`}
                    onClick={() => onSourceClick(source)}
                  >
                    <p className="font-medium w-full break-words mb-1">{source.title}</p>
                    <p className={`text-sm ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} flex items-center w-full`}>
                      <span className="break-all mr-1">{source.source}</span>
                      <ExternalLink className="flex-shrink-0 h-3 w-3 ml-1" />
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAnswer && results && (
          <motion.div {...animationProps} className={`border ${borderColor} rounded-lg p-4`} ref={answerRef}>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <span className="mr-2">{config.components.answer.icon}</span> {config.components.answer.title}
            </h3>
            {isLatestQuery ? (
              <StreamingText text={results.answer} onComplete={handleStreamingComplete} />
            ) : (
              <p>{results.answer}</p>
            )}
            {results.wordCount && <WordCountDisplay count={results.wordCount} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
