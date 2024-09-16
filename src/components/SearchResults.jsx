import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const updatedConfig = wordCountPlugin.setup(config);
    updateUIConfig(updatedConfig);
    return () => {
      const cleanedConfig = wordCountPlugin.cleanup(config);
      updateUIConfig(cleanedConfig);
    };
  }, []);

  useEffect(() => {
    if (isLatestQuery) {
      const stepTimer = setInterval(() => {
        setCurrentStep((prevStep) => {
          if (prevStep < 3) {
            return prevStep + 1;
          } else {
            clearInterval(stepTimer);
            return prevStep;
          }
        });
      }, 2000);
      return () => clearInterval(stepTimer);
    } else {
      setCurrentStep(3);
      setShowProSearch(true);
      setShowSources(true);
      setShowAnswer(true);
      setIsGeneratingComplete(true);
    }
  }, [isLatestQuery]);

  useEffect(() => {
    const showContent = (setter, ref) => {
      setTimeout(() => {
        setter(true);
        scrollToElement(ref.current, 500);
      }, 1000);
    };

    if (currentStep === 1) showContent(setShowProSearch, { current: document.getElementById('proSearch') });
    else if (currentStep === 2) showContent(setShowSources, { current: document.getElementById('sources') });
    else if (currentStep === 3) showContent(setShowAnswer, { current: document.getElementById('answer') });
  }, [currentStep]);

  const handleStreamingComplete = () => setIsGeneratingComplete(true);

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

  const ModifiedSearchResults = config.components.SearchResults || SearchResults;

  return (
    <ModifiedSearchResults
      query={query}
      results={results}
      isLatestQuery={isLatestQuery}
      showProSearch={showProSearch}
      showSources={showSources}
      showAnswer={showAnswer}
      isGeneratingComplete={isGeneratingComplete}
      handleStreamingComplete={handleStreamingComplete}
      animationProps={animationProps}
      textColor={textColor}
      borderColor={borderColor}
      buttonBgColor={buttonBgColor}
      buttonHoverColor={buttonHoverColor}
      isProSearchExpanded={isProSearchExpanded}
      setIsProSearchExpanded={setIsProSearchExpanded}
      isSourcesExpanded={isSourcesExpanded}
      setIsSourcesExpanded={setIsSourcesExpanded}
      onProSearchClick={onProSearchClick}
      onSourceClick={onSourceClick}
    >
      <SearchSteps currentStep={currentStep} isGeneratingComplete={isGeneratingComplete} />
      
      {showProSearch && results?.proSearch && (
        <motion.div
          id="proSearch"
          {...animationProps}
          className={`mt-4 p-4 rounded-lg ${borderColor} border`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-lg font-semibold ${textColor}`}>Pro Search</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProSearchExpanded(!isProSearchExpanded)}
              className={`${buttonBgColor} ${buttonHoverColor}`}
            >
              {isProSearchExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          {isProSearchExpanded && (
            <ul className="space-y-2">
              {results.proSearch.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    onClick={() => onProSearchClick(item)}
                    className={`${textColor} text-left`}
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}

      {showSources && results?.sources && (
        <motion.div
          id="sources"
          {...animationProps}
          className={`mt-4 p-4 rounded-lg ${borderColor} border`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-lg font-semibold ${textColor}`}>Sources</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
              className={`${buttonBgColor} ${buttonHoverColor}`}
            >
              {isSourcesExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          {isSourcesExpanded && (
            <ul className="space-y-2">
              {results.sources.map((source, index) => (
                <li key={index} className="flex items-center">
                  <Button
                    variant="link"
                    onClick={() => onSourceClick(source)}
                    className={`${textColor} text-left flex items-center`}
                  >
                    {source.title}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}

      {showAnswer && results?.answer && (
        <motion.div
          id="answer"
          {...animationProps}
          className={`mt-4 p-4 rounded-lg ${borderColor} border`}
        >
          <h3 className={`text-lg font-semibold ${textColor} mb-2`}>Answer</h3>
          <StreamingText text={results.answer} onComplete={handleStreamingComplete} />
        </motion.div>
      )}
    </ModifiedSearchResults>
  );
};

export default SearchResults;
