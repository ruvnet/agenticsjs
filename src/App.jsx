import { useState, useEffect, useRef } from 'react';
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
import { Helmet } from 'react-helmet';

const queryClient = new QueryClient();

const AppContent = () => {
  const { config } = useUIConfig();
  const [queries, setQueries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const contentRef = useRef(null);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (searchQuery) => {
    setIsSearching(true);
    setShowInitialScreen(false);

    const newQuery = {
      query: searchQuery,
      results: null,
    };

    setQueries(prevQueries => [...prevQueries, newQuery]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setQueries(prevQueries => {
        const updatedQueries = [...prevQueries];
        const lastQueryIndex = updatedQueries.length - 1;
        updatedQueries[lastQueryIndex].results = {
          answer: "Here's a simulated answer to your query about " + searchQuery,
          proSearch: [
            "Search for " + searchQuery + " using advanced techniques",
            "Analyze " + searchQuery + " in various contexts"
          ],
          sources: [
            { title: searchQuery + " - Comprehensive Guide", source: "example.com" },
            { title: "Latest Research on " + searchQuery, source: "research.org" }
          ]
        };
        return updatedQueries;
      });
    } catch (error) {
      toast.error("An error occurred while fetching results. Please try again.");
    } finally {
      setIsSearching(false);
      scrollToTop();
    }
  };

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
    setQueries([]);
  };

  return (
    <div className={`min-h-screen flex flex-col ${config?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <Helmet>
        <title>Agentic UI - Intelligent Search Interface</title>
        <meta name="description" content="Experience the future of search with Agentic UI's intelligent and interactive interface." />
      </Helmet>
      {showInitialScreen ? (
        <InitialScreen onSearch={handleSearch} scrollToTop={scrollToTop} />
      ) : (
        <>
          <TopNavigation
            onClose={handleCloseSearch}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenDocumentation={() => setIsDocumentationOpen(true)}
          />
          <div ref={contentRef} className="flex-grow overflow-y-auto p-4 pb-24">
            {queries.map((queryItem, index) => (
              <SearchResults
                key={index}
                query={queryItem.query}
                results={queryItem.results}
                onProSearchClick={handleProSearchClick}
                onSourceClick={handleSourceClick}
                isLatestQuery={index === queries.length - 1}
              />
            ))}
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
