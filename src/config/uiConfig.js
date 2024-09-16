import { createContext, useContext } from 'react';

export const defaultConfig = {
  theme: 'dark',
  animations: { enabled: true, duration: 300 },
  language: 'en',
  fontSize: 'medium',
  accentColor: 'blue',
  searchBarPosition: 'bottom',
  components: {
    searchInput: { placeholder: 'Ask anything...', micEnabled: true },
    proSearch: { title: 'Pro Search', icon: '⚙️' },
    sources: { title: 'Sources', icon: '🔗' },
    answer: { title: 'Answer', icon: '📝' },
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
    weight: { regular: 400, medium: 500, bold: 700 },
  },
  speechVisualization: 'waveform',
  searchDelay: 2000,
  resultAnimationDuration: 500,
  maxResults: 10,
  autoSuggest: true,
  voiceSearch: true,
  hooks: {
    beforeSearch: [],
    afterSearch: [],
    onApplicationStart: [],
  },
};

export const UIConfigContext = createContext(defaultConfig);

export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  if (context === undefined) {
    throw new Error('useUIConfig must be used within a UIConfigProvider');
  }
  return context;
};

export const updateConfig = (config, updates) => ({
  ...config,
  ...updates,
  components: { ...config.components, ...updates.components },
  colors: { ...config.colors, ...updates.colors },
  font: { ...config.font, ...updates.font },
  hooks: { ...config.hooks, ...updates.hooks },
});

// Plugin System
export const createPlugin = (id, version, setup, cleanup = () => {}) => ({
  id,
  version,
  setup,
  cleanup,
});

export const applyPlugin = (config, plugin) => {
  const updatedConfig = plugin.setup(config);
  return {
    ...updatedConfig,
    plugins: [...updatedConfig.plugins, { id: plugin.id, version: plugin.version }],
  };
};

export const removePlugin = (config, pluginId) => {
  const plugin = config.plugins.find(p => p.id === pluginId);
  if (plugin && plugin.cleanup) {
    plugin.cleanup();
  }
  return {
    ...config,
    plugins: config.plugins.filter(p => p.id !== pluginId),
  };
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
export const addPlugin = (config, plugin) => applyPlugin(config, plugin);
export const removePluginById = (config, pluginId) => removePlugin(config, pluginId);
export const setColors = (config, colors) => updateConfig(config, { colors });
export const setFont = (config, font) => updateConfig(config, { font });
export const setSpeechVisualization = (config, visualization) => updateConfig(config, { speechVisualization: visualization });
export const setSearchDelay = (config, delay) => updateConfig(config, { searchDelay: delay });
export const setResultAnimationDuration = (config, duration) => updateConfig(config, { resultAnimationDuration: duration });
export const setMaxResults = (config, maxResults) => updateConfig(config, { maxResults });
export const setAutoSuggest = (config, autoSuggest) => updateConfig(config, { autoSuggest });
export const setVoiceSearch = (config, voiceSearch) => updateConfig(config, { voiceSearch });

// Hook system
export const addHook = (config, hookName, callback) => {
  if (!config.hooks[hookName]) {
    config.hooks[hookName] = [];
  }
  return updateConfig(config, {
    hooks: {
      ...config.hooks,
      [hookName]: [...config.hooks[hookName], callback],
    },
  });
};

export const removeHook = (config, hookName, callback) => {
  if (!config.hooks[hookName]) return config;
  return updateConfig(config, {
    hooks: {
      ...config.hooks,
      [hookName]: config.hooks[hookName].filter(cb => cb !== callback),
    },
  });
};

export const applyHooks = async (config, hookName, ...args) => {
  if (!config.hooks[hookName]) return args;
  const hooks = config.hooks[hookName];
  let result = args;
  for (const hook of hooks) {
    result = await hook(...result);
  }
  return result;
};

// Plugin management
export const listPlugins = (config) => config.plugins;

export const getPlugin = (config, pluginId) => config.plugins.find(p => p.id === pluginId);
