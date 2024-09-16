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
  hooks: {
    afterSearch: [],
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

export const updateConfig = (config, updates) => {
  const newConfig = {
    ...config,
    ...updates,
    components: {
      ...config.components,
      ...updates.components,
    },
  };
  return newConfig;
};

// Plugin architecture
export const createPlugin = (id, version, setup) => {
  return {
    id,
    version,
    setup,
  };
};

export const applyPlugin = (config, plugin) => {
  return plugin.setup(config);
};

export const registerPlugin = (config, plugin) => {
  const updatedConfig = applyPlugin(config, plugin);
  return {
    ...updatedConfig,
    plugins: [...(updatedConfig.plugins || []), plugin.id],
  };
};

export const unregisterPlugin = (config, pluginId) => {
  return {
    ...config,
    plugins: (config.plugins || []).filter(id => id !== pluginId),
  };
};

export const listPlugins = (config) => {
  return config.plugins || [];
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

// Hook system
export const addHook = (config, hookName, callback) => {
  const hooks = config.hooks || {};
  const existingHooks = hooks[hookName] || [];
  return updateConfig(config, {
    hooks: {
      ...hooks,
      [hookName]: [...existingHooks, callback],
    },
  });
};

export const removeHook = (config, hookName, callback) => {
  const hooks = config.hooks || {};
  const existingHooks = hooks[hookName] || [];
  return updateConfig(config, {
    hooks: {
      ...hooks,
      [hookName]: existingHooks.filter(cb => cb !== callback),
    },
  });
};

export const applyHooks = async (config, hookName, ...args) => {
  const hooks = config.hooks || {};
  const relevantHooks = hooks[hookName] || [];
  const results = [];
  for (const hook of relevantHooks) {
    results.push(await hook(...args));
  }
  return results;
};
