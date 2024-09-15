import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SearchResults = ({ results, query }) => {
  const [isProSearchExpanded, setIsProSearchExpanded] = useState(true);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{query}</h2>
      
      <div className="bg-[#2D2D2D] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <span className="mr-2">⚙️</span> Pro Search
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsProSearchExpanded(!isProSearchExpanded)}
          >
            {isProSearchExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isProSearchExpanded && (
          <ul className="list-none pl-6">
            {results.proSearch.map((item, index) => (
              <li key={index} className="mb-2 flex items-start">
                <span className="mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-[#2D2D2D] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <span className="mr-2">🔗</span> Sources
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
          >
            {isSourcesExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {isSourcesExpanded && (
          <div className="grid grid-cols-2 gap-4">
            {results.sources.map((source, index) => (
              <div key={index} className="bg-[#3C3C3C] p-3 rounded">
                <p className="font-medium">{source.title}</p>
                <p className="text-sm text-gray-400">{source.source}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#2D2D2D] rounded-lg p-4">
        <h3 className="text-lg font-semibold flex items-center mb-2">
          <span className="mr-2">📝</span> Answer
        </h3>
        <p>{results.answer}</p>
      </div>
    </div>
  );
};

export default SearchResults;