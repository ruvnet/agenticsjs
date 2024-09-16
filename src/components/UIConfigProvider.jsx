import React, { useState, useEffect } from 'react';
import { UIConfigContext, defaultConfig, updateConfig } from '../config/uiConfig';

const UIConfigProvider = ({ children, initialConfig = {} }) => {
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('uiConfig');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    return { ...defaultConfig, ...initialConfig };
  });

  useEffect(() => {
    localStorage.setItem('uiConfig', JSON.stringify(config));
  }, [config]);

  const updateUIConfig = (updates) => {
    setConfig((prevConfig) => {
      const newConfig = updateConfig(prevConfig, updates);
      localStorage.setItem('uiConfig', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  return (
    <UIConfigContext.Provider value={{ config, updateUIConfig }}>
      {children}
    </UIConfigContext.Provider>
  );
};

export default UIConfigProvider;
