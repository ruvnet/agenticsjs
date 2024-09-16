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
    const updatedConfig = wordCountPlugin.setup(config);
    updateUIConfig(updatedConfig);

    return () => {
      // Cleanup the plugin when the component unmounts
      const cleanedConfig = wordCountPlugin.cleanup(config);
      updateUIConfig(cleanedConfig);
    };
  }, []);

  useEffect(() => {
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
  }, [isLatestQuery]);

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

  // Use the modified SearchResults component from the plugin
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
      proSearchRef={proSearchRef}
      sourcesRef={sourcesRef}
      answerRef={answerRef}
      currentStep={currentStep}
    />
  );
};

export default SearchResults;
