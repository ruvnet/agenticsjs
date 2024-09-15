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
    // Simulate search process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults({
      answer: "Here's a simulated answer to your query about multi-step perplexity style UI elements.",
      proSearch: [
        "Search for multi-step perplexity style UI elements built with npm or JavaScript",
        "Compile details of benefits and drawbacks for each option found"
      ],
      sources: [
        { title: "Pros and Cons of ReactJS & R...", source: "binmile" },
        { title: "React JS Pros and Cons - Pag...", source: "pagepro" }
      ]
    });
    setIsSearching(false);
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
