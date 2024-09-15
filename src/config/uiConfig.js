import { createContext, useContext } from 'react';

export const defaultConfig = {
  theme: 'dark',
  animations: {
    enabled: true,
    duration: 300,
  },
  language: 'en',
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
  showSettingsTab: true,
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