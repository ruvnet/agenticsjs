import { createPlugin } from '../config/uiConfig';

const wordCountPlugin = createPlugin(
  'wordCount',
  '1.0.0',
  (config) => {
    const newConfig = {
      ...config,
      hooks: {
        ...config.hooks,
        afterSearch: [
          ...(config.hooks.afterSearch || []),
          (results) => {
            if (results && results.answer) {
              const wordCount = results.answer.split(/\s+/).length;
              return {
                ...results,
                wordCount,
              };
            }
            return results;
          },
        ],
      },
    };
    return newConfig;
  }
);

export default wordCountPlugin;