import React from 'react';
import { X, Settings, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';

const TopNavigation = ({ onClose, onOpenSettings, onOpenDocumentation }) => {
  const { config } = useUIConfig();

  return (
    <div className="sticky top-0 z-10 bg-[#1C1C1C] p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Agentic UI</h1>
      <div className="flex items-center space-x-2">
        {config.showSettingsIcon && (
          <Button variant="ghost" onClick={onOpenSettings}>
            <Settings className="h-5 w-5 text-white" />
          </Button>
        )}
        <Button variant="ghost" onClick={onOpenDocumentation}>
          <HelpCircle className="h-5 w-5 text-white" />
        </Button>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
