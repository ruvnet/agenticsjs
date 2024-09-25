import React, { useState, useEffect } from 'react';
import { UIConfigContext, defaultConfig, updateConfig, registerPlugin } from '../config/uiConfig';
import wordCountPlugin from '../plugins/wordCountPlugin';

const UIConfigProvider = ({ children, initialConfig = {} }) => {
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('uiConfig');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    return { 
      ...defaultConfig, 
      ...initialConfig,
      llmModel: 'gpt-3.5-turbo',
      llmTemperature: 0.7,
      searchEngine: 'google',
      resultsPerPage: '20',
      saveSearchHistory: true,
      safeSearchLevel: 1,
      doNotTrack: false,
      pushNotifications: true,
      emailNotifications: false,
      inAppNotifications: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('uiConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    // Register the wordCountPlugin
    const updatedConfig = registerPlugin(config, wordCountPlugin);
    setConfig(updatedConfig);
  }, []);

  const updateUIConfig = (updates) => {
    setConfig((prevConfig) => {
      const newConfig = updateConfig(prevConfig, updates);
      localStorage.setItem('uiConfig', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  return (
    <UIConfigContext.Provider value={{ config, updateUIConfig }}>
      <div className={`font-${config.fontSize} accent-${config.accentColor}`}>
        {children}
      </div>
    </UIConfigContext.Provider>
  );
};

export default UIConfigProvider;
