import { createContext, useContext } from 'react';

export const defaultConfig = {
  theme: 'dark',
  animations: {
    enabled: true,
    duration: 300,
  },
  language: 'en',
  fontSize: 'medium',
  accentColor: 'blue',
  searchBarPosition: 'bottom',
  components: {
    searchInput: {
      placeholder: 'Ask anything...',
      micEnabled: true,
    },
    proSearch: {
      title: 'Pro Search',
      icon: '⚙️',
    },
    sources: {
      title: 'Sources',
      icon: '🔗',
    },
    answer: {
      title: 'Answer',
      icon: '📝',
    },
  },
  showSettingsIcon: true,
  plugins: [],
  colors: {
    primary: '#4A72FF',
    secondary: '#3C3C3C',
    background: '#1C1C1C',
    text: '#FFFFFF',
  },
  font: {
    family: 'Inter, sans-serif',
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  speechVisualization: 'waveform', // New option: 'waveform' or 'blocks'
};

export const UIConfigContext = createContext(defaultConfig);

export const useUIConfig = () => useContext(UIConfigContext);

export const updateConfig = (config, updates) => {
  return {
    ...config,
    ...updates,
    components: {
      ...config.components,
      ...updates.components,
    },
    colors: {
      ...config.colors,
      ...updates.colors,
    },
    font: {
      ...config.font,
      ...updates.font,
    },
  };
};

// Plugin architecture
export const createPlugin = (name, setup) => {
  return {
    name,
    setup,
  };
};

export const applyPlugin = (config, plugin) => {
  return plugin.setup(config);
};

// SDK functions
export const setTheme = (config, theme) => updateConfig(config, { theme });
export const setAnimations = (config, animations) => updateConfig(config, { animations });
export const setLanguage = (config, language) => updateConfig(config, { language });
export const setFontSize = (config, fontSize) => updateConfig(config, { fontSize });
export const setAccentColor = (config, accentColor) => updateConfig(config, { accentColor });
export const setSearchBarPosition = (config, searchBarPosition) => updateConfig(config, { searchBarPosition });
export const setComponentConfig = (config, componentName, componentConfig) =>
  updateConfig(config, { components: { [componentName]: componentConfig } });
export const toggleSettingsIcon = (config) => updateConfig(config, { showSettingsIcon: !config.showSettingsIcon });
export const addPlugin = (config, plugin) => updateConfig(config, { plugins: [...config.plugins, plugin] });
export const setColors = (config, colors) => updateConfig(config, { colors });
export const setFont = (config, font) => updateConfig(config, { font });
export const setSpeechVisualization = (config, visualization) => updateConfig(config, { speechVisualization: visualization });
