import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import InitialScreen from './components/InitialScreen';
import TopNavigation from './components/TopNavigation';
import SettingsModal from './components/SettingsModal';
import DocumentationModal from './components/DocumentationModal';
import UIConfigProvider from './components/UIConfigProvider';
import { useUIConfig } from './config/uiConfig';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const queryClient = new QueryClient();

const AppContent = () => {
  const { config } = useUIConfig();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setResults(null);
    setShowInitialScreen(false);

    // Simulate multi-step search process
    setTimeout(() => {
      setResults({
        answer: "Here's a simulated answer to your query about " + searchQuery,
        proSearch: [
          "Search for " + searchQuery + " using advanced techniques",
          "Analyze " + searchQuery + " in various contexts"
        ],
        sources: [
          { title: searchQuery + " - Comprehensive Guide", source: "example.com" },
          { title: "Latest Research on " + searchQuery, source: "research.org" }
        ]
      });
      setIsSearching(false);
    }, 4000); // 4 seconds for the entire process
  };

  useEffect(() => {
    if (results) {
      // Scroll to the top of the results container
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [results]);

  const handleProSearchClick = (item) => {
    toast.info(`Searching for: ${item}`);
    handleSearch(item);
  };

  const handleSourceClick = (source) => {
    toast.info(`Opening source: ${source.title}`);
    // Here you would typically open the source in a new tab or modal
  };

  const handleCloseSearch = () => {
    setShowInitialScreen(true);
    setResults(null);
    setQuery('');
  };

  return (
    <div className={`min-h-screen flex flex-col ${config?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {!showInitialScreen && (
        <TopNavigation
          onClose={handleCloseSearch}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenDocumentation={() => setIsDocumentationOpen(true)}
        />
      )}
      {showInitialScreen ? (
        <InitialScreen onSearch={handleSearch} />
      ) : (
        <>
          <div id="results-container" className="flex-grow overflow-y-auto p-4 pb-24">
            <h1 className="text-2xl font-bold mb-4">{query || config?.components?.searchInput?.placeholder}</h1>
            {results && (
              <SearchResults
                results={results}
                query={query}
                onProSearchClick={handleProSearchClick}
                onSourceClick={handleSourceClick}
              />
            )}
          </div>
          <div className={`fixed ${config?.searchBarPosition === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 p-4 ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <SearchInput onSearch={handleSearch} isSearching={isSearching} />
          </div>
        </>
      )}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <DocumentationModal isOpen={isDocumentationOpen} onClose={() => setIsDocumentationOpen(false)} />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UIConfigProvider>
        <AppContent />
        <Toaster />
      </UIConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
