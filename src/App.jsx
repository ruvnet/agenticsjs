import React, { useState, useEffect, useRef } from 'react';
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
import wordCountPlugin from './plugins/wordCountPlugin';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { defineRequest } from './utils/openaiUtils';

const queryClient = new QueryClient();

const AppContent = () => {
  const { config, updateUIConfig } = useUIConfig();
  const [queries, setQueries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const contentRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  useEffect(() => {
    const checkFullscreen = () => {
      const isFullscreenMode = window.navigator.standalone;
      setIsFullscreen(isFullscreenMode);
      document.documentElement.style.setProperty('--safe-area-inset-top', isFullscreenMode ? '15px' : '0px');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', isFullscreenMode ? '5px' : '0px');
    };

    checkFullscreen();
    window.addEventListener('resize', checkFullscreen);

    return () => {
      window.removeEventListener('resize', checkFullscreen);
    };
  }, []);

  useEffect(() => {
    // Register the wordCountPlugin
    updateUIConfig(wordCountPlugin.setup(config));
  }, []);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (searchQuery) => {
    setIsSearching(true);
    setShowInitialScreen(false);
    
    try {
      console.log("Starting search process for query:", searchQuery);
      console.log("Initiating OpenAI request...");
      const result = await defineRequest(searchQuery);
      console.log("OpenAI request completed:", result);
      
      if (result.success) {
        const newQuery = {
          query: searchQuery,
          results: {
            answer: result.definition,
            relatedSearches: result.relatedSearches,
            numberOfSearches: result.numberOfSearches,
            sources: [
              { title: searchQuery + " - Comprehensive Guide", source: "example.com" },
              { title: "Latest Research on " + searchQuery, source: "research.org" }
            ]
          },
        };

        setQueries(prevQueries => [...prevQueries, newQuery]);
        setRawResponse(result.rawResponse);
      } else {
        console.error("Error in defineRequest:", result.message);
        toast.error(result.message || "An error occurred while defining the search request.");
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSearching(false);
      scrollToTop();
    }
  };

  const handleSourceClick = (source) => {
    toast.info(`Opening source: ${source.title}`);
    // Here you would typically open the source in a new tab or modal
  };

  const handleCloseSearch = () => {
    setShowInitialScreen(true);
    setQueries([]);
  };

  const renderSearchInput = () => (
    <div className="w-full px-4 py-2">
      <SearchInput onSearch={handleSearch} isSearching={isSearching} />
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <Helmet>
        <title>Agentic UI - Intelligent Search Interface</title>
        <meta name="description" content="Experience the future of search with Agentic UI's intelligent and interactive interface." />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4A72FF" />
      </Helmet>
      {showInitialScreen ? (
        <InitialScreen onSearch={handleSearch} scrollToTop={scrollToTop} onOpenSettings={() => setIsSettingsOpen(true)} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <TopNavigation
            onClose={handleCloseSearch}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenDocumentation={() => setIsDocumentationOpen(true)}
          />
          {config.searchBarPosition === 'top' && renderSearchInput()}
          <div ref={contentRef} className="flex-grow overflow-y-auto p-4">
            {queries.map((queryItem, index) => (
              <SearchResults
                key={index}
                query={queryItem.query}
                results={queryItem.results}
                onSourceClick={handleSourceClick}
                isLatestQuery={index === queries.length - 1}
                rawResponse={rawResponse}
              />
            ))}
          </div>
          {config.searchBarPosition === 'bottom' && (
            <div className="sticky bottom-0 bg-inherit">
              {renderSearchInput()}
            </div>
          )}
        </div>
      )}
      <Button
        variant="ghost"
        onClick={() => setIsSettingsOpen(true)}
        className={`fixed top-4 right-4 p-2 ${config.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
      >
        <Settings className="h-6 w-6" />
      </Button>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <DocumentationModal isOpen={isDocumentationOpen} onClose={() => setIsDocumentationOpen(false)} />
      <style>
        {`
          :root {
            --safe-area-inset-top: 0px;
            --safe-area-inset-bottom: 0px;
          }
          .fullscreen-mode .sticky-top {
            padding-top: calc(var(--safe-area-inset-top) + env(safe-area-inset-top));
          }
          .fullscreen-mode .sticky-bottom {
            padding-bottom: calc(var(--safe-area-inset-bottom) + env(safe-area-inset-bottom));
          }
        `}
      </style>
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
