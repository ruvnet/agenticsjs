import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUIConfig } from '../config/uiConfig';
import SDKDocumentation from './SDKDocumentation';
import TemplatesDocumentation from './TemplatesDocumentation';
import CSSDocumentation from './CSSDocumentation';
import ThemesDocumentation from './ThemesDocumentation';
import PluginsDocumentation from './PluginsDocumentation';

const DocumentationModal = ({ isOpen, onClose }) => {
  const { config } = useUIConfig();
  const [activeTab, setActiveTab] = React.useState('sdk');

  const bgColor = config.theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = config.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = config.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const tabs = [
    { id: 'sdk', label: 'SDK/API' },
    { id: 'templates', label: 'Templates' },
    { id: 'css', label: 'CSS' },
    { id: 'themes', label: 'Themes' },
    { id: 'plugins', label: 'Plugins' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[90vw] md:max-w-[80vw] max-h-[90vh] overflow-hidden flex flex-col ${bgColor} ${textColor} rounded-lg`}>
        <DialogHeader className={`flex-shrink-0 flex justify-between items-center p-4 border-b ${borderColor}`}>
          <DialogTitle className="text-2xl font-bold">Documentation</DialogTitle>
          <Button variant="ghost" onClick={onClose} className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex justify-center p-4 space-x-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : config.theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <ScrollArea className="flex-grow p-4">
            {activeTab === 'sdk' && <SDKDocumentation />}
            {activeTab === 'templates' && <TemplatesDocumentation />}
            {activeTab === 'css' && <CSSDocumentation />}
            {activeTab === 'themes' && <ThemesDocumentation />}
            {activeTab === 'plugins' && <PluginsDocumentation />}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;
