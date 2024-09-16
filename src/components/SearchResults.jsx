import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchSteps from './SearchSteps';
import StreamingText from './StreamingText';
import { scrollToElement } from '../utils/scrollUtils';

const SearchResults = ({ results, query, onProSearchClick, onSourceClick }) => {
  const { config } = useUIConfig();
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
  }, []);

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

  const bgColor = config.theme === 'dark' ? 'bg-[#1C1C1C]' : 'bg-white';
  const textColor = config.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const sectionBgColor = config.theme === 'dark' ? 'bg-[#2D2D2D]' : 'bg-gray-100';
  const buttonBgColor = config.theme === 'dark' ? 'bg-[#3C3C3C]' : 'bg-white';
  const buttonHoverColor = config.theme === 'dark' ? 'hover:bg-[#4A4A4A]' : 'hover:bg-gray-200';

  return (
    <div className={`space-y-4 ${bgColor} ${textColor}`}>
      <SearchSteps currentStep={currentStep} isGeneratingComplete={isGeneratingComplete} />

      <AnimatePresence>
        {showProSearch && (
          <motion.div {...animationProps} className={`${sectionBgColor} rounded-lg p-4`} ref={proSearchRef}>
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
                      className={`${config.theme === 'dark' ? 'text-[#4A72FF]' : 'text-blue-600'} p-0 h-auto font-normal text-left break-words whitespace-normal`}
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
        {showSources && (
          <motion.div {...animationProps} className={`${sectionBgColor} rounded-lg p-4`} ref={sourcesRef}>
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
                    className={`${buttonBgColor} p-3 rounded text-left flex flex-col items-start h-auto w-full cursor-pointer ${buttonHoverColor} transition-colors`}
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
        {showAnswer && (
          <motion.div {...animationProps} className={`${sectionBgColor} rounded-lg p-4`} ref={answerRef}>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <span className="mr-2">{config.components.answer.icon}</span> {config.components.answer.title}
            </h3>
            <StreamingText text={results.answer} onComplete={handleStreamingComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
