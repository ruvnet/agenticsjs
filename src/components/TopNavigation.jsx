import React from 'react';
import { X, Settings, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';
import GeometricIcon from './GeometricIcon';
import HamburgerMenu from './HamburgerMenu';

const TopNavigation = ({ onClose, onOpenSettings, onOpenDocumentation }) => {
  const { config } = useUIConfig();

  const iconClass = config.theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600';

  return (
    <div className={`sticky top-0 z-10 ${config.theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-4 flex justify-between items-center shadow-md`}>
      <div className="flex items-center space-x-2">
        <HamburgerMenu onOpenSettings={onOpenSettings} />
        <GeometricIcon size={24} />
        <h1 className={`text-xl font-bold ${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Agentics.js</h1>
      </div>
      <div className="flex items-center space-x-2">
        {config.showSettingsIcon && (
          <Button variant="ghost" onClick={onOpenSettings} className={iconClass}>
            <Settings className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" onClick={onOpenDocumentation} className={iconClass}>
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" onClick={onClose} className={iconClass}>
          <X className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
