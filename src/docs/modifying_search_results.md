# Modifying Search Results Display and Integrating Concurrent Searches

This guide provides instructions on how to customize the sequential display of data in search results and implement concurrent searches in the Agentic UI.

## Modifying Sequential Display of Data

The search results in Agentic UI are displayed sequentially by default. To modify this behavior:

1. Locate the `SearchResults` component in `src/components/SearchResults.jsx`.

2. Modify the `useEffect` hook that controls the display of search steps:

```javascript
useEffect(() => {
  if (isLatestQuery) {
    const stepDuration = 1000; // Adjust this value to change the speed of sequential display
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
```

3. Adjust the `stepDuration` value to change the speed of the sequential display.

4. To change the order of display, modify the `steps` array.

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

2. Modify the `SearchResults` component to use the concurrent search:

```javascript
import { performConcurrentSearch } from '../api/searchApi';

const SearchResults = ({ query }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const concurrentResults = await performConcurrentSearch(query);
        setResults(concurrentResults);
      } catch (error) {
        // Handle error
      }
    };

    fetchResults();
  }, [query]);

  // Render results...
};
```

3. Update the rendering logic to display results as they become available:

```javascript
return (
  <div>
    {results?.mainSearch && <MainSearchResult data={results.mainSearch} />}
    {results?.proSearch && <ProSearchResult data={results.proSearch} />}
    {results?.sources && <SourcesResult data={results.sources} />}
  </div>
);
```

By implementing these changes, you can customize the sequential display of search results and integrate concurrent searches for improved performance.

Remember to adjust the API endpoints and response handling according to your specific backend implementation.