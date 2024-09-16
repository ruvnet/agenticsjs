import { createPlugin } from '../config/uiConfig';

const wordCountPlugin = createPlugin({
  id: 'wordCountPlugin',
  version: '1.0.0',
  setup: (config) => {
    // Add a new component to display word count
    const WordCountDisplay = ({ text }) => {
      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
      return (
        <div className="text-sm text-gray-500 mt-2">
          Word count: {wordCount}
        </div>
      );
    };

    // Modify the SearchResults component to include word count
    const originalSearchResults = config.components.SearchResults;
    config.components.SearchResults = (props) => {
      return (
        <div>
          {originalSearchResults(props)}
          {props.results && props.results.answer && (
            <WordCountDisplay text={props.results.answer} />
          )}
        </div>
      );
    };

    // Add a hook to log word count after each search
    config.hooks.afterSearch.push((results) => {
      if (results && results.answer) {
        const wordCount = results.answer.split(/\s+/).filter(word => word.length > 0).length;
        console.log(`Word count for this search result: ${wordCount}`);
      }
      return results;
    });

    return config;
  },
  cleanup: (config) => {
    // Remove the added component and restore the original SearchResults
    delete config.components.WordCountDisplay;
    config.components.SearchResults = config.components.SearchResults.__original;
    delete config.components.SearchResults.__original;

    // Remove the added hook
    config.hooks.afterSearch = config.hooks.afterSearch.filter(
      hook => hook.name !== 'wordCountLogger'
    );

    return config;
  }
});

export default wordCountPlugin;