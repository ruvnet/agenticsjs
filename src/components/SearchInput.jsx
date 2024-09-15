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
      <Input
        type="text"
        placeholder="Ask follow up..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow mr-2 bg-[#3C3C3C] text-white border-none"
      />
      <Button type="submit" disabled={isSearching} className="bg-[#4A72FF] hover:bg-[#3A62EF]">
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
      <Button type="button" variant="ghost" className="ml-2">
        <Mic className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default SearchInput;