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
