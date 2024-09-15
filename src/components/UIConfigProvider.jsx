import React, { useState } from 'react';
import { UIConfigContext, defaultConfig, updateConfig } from '../config/uiConfig';

const UIConfigProvider = ({ children, initialConfig = {} }) => {
  const [config, setConfig] = useState({ ...defaultConfig, ...initialConfig });

  const updateUIConfig = (updates) => {
    setConfig((prevConfig) => updateConfig(prevConfig, updates));
  };

  return (
    <UIConfigContext.Provider value={{ config, updateUIConfig }}>
      {children}
    </UIConfigContext.Provider>
  );
};

export default UIConfigProvider;