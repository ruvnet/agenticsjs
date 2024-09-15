import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TopNavigation = ({ onClose }) => {
  return (
    <div className="sticky top-0 z-10 bg-[#1C1C1C] p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Agentic UI</h1>
      <Button variant="ghost" onClick={onClose}>
        <X className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default TopNavigation;