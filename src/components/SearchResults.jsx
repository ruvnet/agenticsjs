import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Bug } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchSteps from './SearchSteps';
import StreamingText from './StreamingText';
import { scrollToElement } from '../utils/scrollUtils';

const SearchResults = ({ query, results, onSourceClick, isLatestQuery, rawResponse }) => {
  const { config } = useUIConfig();
  const [isProSearchExpanded, setIsProSearchExpanded] = useState(true);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProSearch, setShowProSearch] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGeneratingComplete, setIsGeneratingComplete] = useState(false);
  const [processedResults, setProcessedResults] = useState(results);
  const [showRawResponse, setShowRawResponse] = useState(false);

  const proSearchRef = useRef(null);
  const sourcesRef = useRef(null);
  const answerRef = useRef(null);

  useEffect(() => {
    console.log("SearchResults received new results:", results);
    console.log("Raw response:", rawResponse);
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
  }, [isLatestQuery, results, rawResponse]);

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

  useEffect(() => {
    const processResults = async () => {
      if (results && config.hooks && config.hooks.afterSearch) {
        let processedData = { ...results };
        for (const hook of config.hooks.afterSearch) {
          if (typeof hook === 'function') {
            try {
              processedData = await hook(processedData);
            } catch (error) {
              console.error('Error in afterSearch hook:', error);
            }
          }
        }
        setProcessedResults(processedData);
      } else {
        setProcessedResults(results);
      }
    };

    processResults();
  }, [results, config.hooks]);

  const handleStreamingComplete = () => {
    setIsGeneratingComplete(true);
  };

  const toggleRawResponse = () => {
    setShowRawResponse(!showRawResponse);
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
  const rawResponseBgColor = config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const rawResponseTextColor = config.theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`space-y-4 ${textColor} mb-8`}>
      <h2 className="text-2xl font-bold mb-4">{query}</h2>
      {isLatestQuery && <SearchSteps currentStep={currentStep} isGeneratingComplete={isGeneratingComplete} />}

      <AnimatePresence>
        {showProSearch && (
          <motion.div {...animationProps} className={`border ${borderColor} rounded-lg p-4`} ref={proSearchRef}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2">{config.components.proSearch.icon}</span> {config.components.proSearch.title}
              </h3>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRawResponse}
                  className={`${buttonBgColor} ${buttonHoverColor} mr-2`}
                >
                  <Bug className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProSearchExpanded(!isProSearchExpanded)}
                  className={`${buttonBgColor} ${buttonHoverColor}`}
                >
                  {isProSearchExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            {isProSearchExpanded && (
              <div className="mt-4 space-y-4">
                {showRawResponse && (
                  <div className={`p-4 ${rawResponseBgColor} rounded-lg`}>
                    <h4 className={`text-sm font-semibold mb-2 ${rawResponseTextColor}`}>Raw API Response:</h4>
                    <pre className={`text-xs overflow-x-auto whitespace-pre-wrap ${rawResponseTextColor}`}>
                      {rawResponse || 'No raw response available'}
                    </pre>
                  </div>
                )}
                {processedResults && processedResults.relatedSearches && (
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${rawResponseTextColor}`}>Related Searches:</h4>
                    <ul className="list-disc pl-5">
                      {processedResults.relatedSearches.map((search, index) => (
                        <li key={index} className={rawResponseTextColor}>{search}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {processedResults && processedResults.numberOfSearches !== undefined && (
                  <div className={rawResponseTextColor}>
                    <strong>Number of Searches:</strong> {processedResults.numberOfSearches}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSources && processedResults && processedResults.sources && (
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
                {processedResults.sources.map((source, index) => (
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
        {showAnswer && processedResults && processedResults.answer && (
          <motion.div {...animationProps} className={`border ${borderColor} rounded-lg p-4`} ref={answerRef}>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <span className="mr-2">{config.components.answer.icon}</span> {config.components.answer.title}
            </h3>
            {isLatestQuery ? (
              <StreamingText text={processedResults.answer} onComplete={handleStreamingComplete} />
            ) : (
              <p>{processedResults.answer}</p>
            )}
            {processedResults.wordCount && (
              <p className="mt-2 text-sm text-gray-500">Word count: {processedResults.wordCount}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
