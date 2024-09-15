import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchSteps from './SearchSteps';
import StreamingText from './StreamingText';
import { scrollToElement } from '../utils/scrollUtils';

const SearchResults = ({ results, query, onProSearchClick, onSourceClick }) => {
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
    const stepDuration = 2000; // 2 seconds per step
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < 3) {
          return prevStep + 1;
        } else {
          clearInterval(timer);
          return prevStep;
        }
      });
    }, stepDuration);

    return () => clearInterval(timer);
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
    transition: { duration: 0.3 }
  };

  return (
    <div className="space-y-4">
      <SearchSteps currentStep={currentStep} isGeneratingComplete={isGeneratingComplete} />

      <AnimatePresence>
        {showProSearch && (
          <motion.div {...animationProps} className="bg-[#2D2D2D] rounded-lg p-4" ref={proSearchRef}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">⚙️</span> Pro Search
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProSearchExpanded(!isProSearchExpanded)}
                className="text-gray-400 hover:text-white"
              >
                {isProSearchExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            {isProSearchExpanded && (
              <ul className="list-none pl-6">
                {results.proSearch.map((item, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <Button
                      variant="link"
                      className="text-[#4A72FF] p-0 h-auto font-normal text-left"
                      onClick={() => onProSearchClick(item)}
                    >
                      <span className="mr-2">✓</span>
                      <span>{item}</span>
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
          <motion.div {...animationProps} className="bg-[#2D2D2D] rounded-lg p-4" ref={sourcesRef}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">🔗</span> Sources
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
                className="text-gray-400 hover:text-white"
              >
                {isSourcesExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            {isSourcesExpanded && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.sources.map((source, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-[#3C3C3C] p-3 rounded text-left flex flex-col items-start h-auto"
                    onClick={() => onSourceClick(source)}
                  >
                    <p className="font-medium">{source.title}</p>
                    <p className="text-sm text-gray-400 flex items-center">
                      {source.source}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </p>
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAnswer && (
          <motion.div {...animationProps} className="bg-[#2D2D2D] rounded-lg p-4" ref={answerRef}>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <span className="mr-2">📝</span> Answer
            </h3>
            <StreamingText text={results.answer} onComplete={handleStreamingComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
