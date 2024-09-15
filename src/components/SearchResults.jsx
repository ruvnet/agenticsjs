import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const SearchResults = ({ results, query, onProSearchClick, onSourceClick }) => {
  const [isProSearchExpanded, setIsProSearchExpanded] = useState(true);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  const animationProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3 }
  };

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
        <AnimatePresence>
          {isProSearchExpanded && (
            <motion.div {...animationProps}>
              <ul className="list-none pl-6">
                {results.proSearch.map((item, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <Button
                      variant="link"
                      className="text-[#4A72FF] p-0 h-auto font-normal"
                      onClick={() => onProSearchClick(item)}
                    >
                      <span className="mr-2">✓</span>
                      <span>{item}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
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
        <AnimatePresence>
          {isSourcesExpanded && (
            <motion.div {...animationProps}>
              <div className="grid grid-cols-2 gap-4">
                {results.sources.map((source, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-[#3C3C3C] p-3 rounded text-left flex flex-col items-start h-auto"
                    onClick={() => onSourceClick(source)}
                  >
                    <p className="font-medium">{source.title}</p>
                    <p className="text-sm text-gray-400 flex items-center">
                      {source.source}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </p>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
