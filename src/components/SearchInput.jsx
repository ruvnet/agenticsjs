import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

const SearchInput = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex-grow mr-2">
        <Input
          type="text"
          placeholder="Ask follow up..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#3C3C3C] text-white border-none rounded-full pl-4 pr-12 py-3"
        />
        <Button
          type="submit"
          disabled={isSearching}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#4A72FF] hover:bg-[#3A62EF] rounded-full w-10 h-10 flex items-center justify-center"
        >
          {isSearching ? (
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </Button>
      </div>
      <Button type="button" variant="ghost" className="bg-[#3C3C3C] rounded-full w-10 h-10 flex items-center justify-center">
        <Mic className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchInput;
