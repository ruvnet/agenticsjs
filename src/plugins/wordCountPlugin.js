import { createPlugin } from '../config/uiConfig';

const wordCountPlugin = createPlugin({
  id: 'wordCountPlugin',
  version: '1.0.0',
  setup: (config) => {
    const newConfig = { ...config };
    newConfig.hooks = newConfig.hooks || {};
    newConfig.hooks.afterSearch = newConfig.hooks.afterSearch || [];
    newConfig.hooks.afterSearch.push((results) => {
      if (results && results.answer) {
        const wordCount = results.answer.split(/\s+/).length;
        return {
          ...results,
          wordCount,
        };
      }
      return results;
    });
    return newConfig;
  },
  cleanup: () => {
    // Cleanup logic if needed
  },
});

export default wordCountPlugin;