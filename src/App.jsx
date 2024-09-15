import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setResults(null);

    // Simulate multi-step search process
    setTimeout(() => {
      setResults({
        answer: "Here's a simulated answer to your query about multi-step perplexity style UI elements with animated steps and streaming text output.",
        proSearch: [
          "Search for multi-step perplexity style UI elements built with React and Framer Motion",
          "Compile details of benefits and drawbacks for each animation approach found"
        ],
        sources: [
          { title: "Framer Motion Animation Techniques", source: "framer.com" },
          { title: "React Animation Libraries Comparison", source: "reactjs.org" }
        ]
      });
      setIsSearching(false);
    }, 4000); // 4 seconds for the entire process
  };

  const handleProSearchClick = (item) => {
    toast.info(`Searching for: ${item}`);
    handleSearch(item);
  };

  const handleSourceClick = (source) => {
    toast.info(`Opening source: ${source.title}`);
    // Here you would typically open the source in a new tab or modal
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#1C1C1C] text-white flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 pb-24">
          <h1 className="text-2xl font-bold mb-4">{query || "Ask anything..."}</h1>
          {results && (
            <SearchResults
              results={results}
              query={query}
              onProSearchClick={handleProSearchClick}
              onSourceClick={handleSourceClick}
            />
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#2D2D2D]">
          <SearchInput onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
