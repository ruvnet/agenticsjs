import { useState } from 'react';
import { useUIConfig } from '../config/uiConfig';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import SpeechModal from './SpeechModal';
import { toast } from "sonner";

const SearchInput = ({ onSearch, isSearching }) => {
  const { config } = useUIConfig();
  const [query, setQuery] = useState('');
  const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSpeechResult = (result) => {
    setQuery(result);
    setIsSpeechModalOpen(false);
    onSearch(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow mr-2">
          <Input
            type="text"
            placeholder={config.components.searchInput.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full ${config.theme === 'dark' ? 'bg-[#3C3C3C] text-white' : 'bg-white text-black'} border-none rounded-full pl-10 pr-12 py-3 text-base`}
            style={{ fontSize: '16px' }}
          />
          <Button
            type="button"
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent p-1 ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            disabled={isSearching}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent/90 rounded-full w-10 h-10 flex items-center justify-center`}
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
        {config.components.searchInput.micEnabled && (
          <Button
            type="button"
            onClick={() => setIsSpeechModalOpen(true)}
            className={`${config.theme === 'dark' ? 'bg-[#3C3C3C] hover:bg-[#4A4A4A]' : 'bg-gray-200 hover:bg-gray-300'} rounded-full w-10 h-10 flex items-center justify-center`}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </form>
      <SpeechModal
        isOpen={isSpeechModalOpen}
        onClose={() => setIsSpeechModalOpen(false)}
        onSpeechResult={handleSpeechResult}
      />
    </>
  );
};

export default SearchInput;
