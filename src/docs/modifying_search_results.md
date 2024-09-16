# Modifying Search Results Display and Integrating Concurrent Searches

This guide provides instructions on how to customize the sequential display of data in search results and implement concurrent searches in the Agentic UI.

## Modifying Sequential Display of Data

To modify the sequential display of search results:

1. Update the `SearchResults` component in `src/components/SearchResults.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const SearchResults = ({ query, results, isLatestQuery }) => {
  const [showProSearch, setShowProSearch] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isLatestQuery) {
      const stepDuration = 1000; // Adjust this value to change the speed
      const steps = ['proSearch', 'sources', 'answer'];
      
      steps.forEach((step, index) => {
        setTimeout(() => {
          switch(step) {
            case 'proSearch':
              setShowProSearch(true);
              break;
            case 'sources':
              setShowSources(true);
              break;
            case 'answer':
              setShowAnswer(true);
              break;
          }
        }, stepDuration * (index + 1));
      });
    } else {
      setShowProSearch(true);
      setShowSources(true);
      setShowAnswer(true);
    }
  }, [isLatestQuery]);

  // Render components using AnimatePresence for smooth transitions
  return (
    <div>
      <AnimatePresence>
        {showProSearch && results?.proSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ProSearchResult data={results.proSearch} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Similar AnimatePresence blocks for sources and answer */}
    </div>
  );
};

export default SearchResults;
```

2. Adjust the `stepDuration` value to change the speed of the sequential display.
3. Modify the `steps` array to change the order of display.

## Integrating Concurrent Searches

To implement concurrent searches:

1. Update the search function in your API client (e.g., `src/api/searchApi.js`):

```javascript
import axios from 'axios';

export const performConcurrentSearch = async (query) => {
  const endpoints = [
    '/api/search',
    '/api/pro-search',
    '/api/sources'
  ];

  try {
    const results = await Promise.all(endpoints.map(endpoint => 
      axios.get(endpoint, { params: { query } })
    ));

    return {
      mainSearch: results[0].data,
      proSearch: results[1].data,
      sources: results[2].data
    };
  } catch (error) {
    console.error('Error performing concurrent search:', error);
    throw error;
  }
};
```

2. Modify the parent component that uses `SearchResults` to use the concurrent search:

```javascript
import React, { useState, useEffect } from 'react';
import { performConcurrentSearch } from '../api/searchApi';
import SearchResults from './SearchResults';

const SearchContainer = ({ query }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const concurrentResults = await performConcurrentSearch(query);
        setResults(concurrentResults);
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <SearchResults query={query} results={results} isLatestQuery={true} />
      )}
    </div>
  );
};

export default SearchContainer;
```

By implementing these changes, you can customize the sequential display of search results and integrate concurrent searches for improved performance. Remember to adjust the API endpoints and response handling according to your specific backend implementation.
