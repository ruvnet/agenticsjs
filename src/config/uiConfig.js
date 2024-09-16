import { createContext, useContext } from 'react';

export const defaultConfig = {
  theme: 'dark',
  animations: {
    enabled: true,
    duration: 300,
  },
  language: 'en',
  fontSize: 'medium',
  accentColor: 'gray',
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
    primary: {
      dark: '#3C3C3C',
      light: '#F0F0F0',
    },
    secondary: {
      dark: '#2D2D2D',
      light: '#E0E0E0',
    },
    background: {
      dark: '#1C1C1C',
      light: '#FFFFFF',
    },
    text: {
      dark: '#FFFFFF',
      light: '#000000',
    },
    accent: {
      dark: '#4A4A4A',
      light: '#D0D0D0',
    },
  },
  font: {
    family: 'Inter, sans-serif',
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
};

export const UIConfigContext = createContext(defaultConfig);

export const useUIConfig = () => useContext(UIConfigContext);

export const updateConfig = (config, updates) => {
  const newConfig = {
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

  localStorage.setItem('uiConfig', JSON.stringify(newConfig));
  return newConfig;
};

export const createPlugin = (name, setup) => ({ name, setup });
export const applyPlugin = (config, plugin) => plugin.setup(config);

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
