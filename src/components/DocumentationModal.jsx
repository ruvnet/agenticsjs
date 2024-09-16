import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUIConfig } from '../config/uiConfig';
import SDKDocumentation from './SDKDocumentation';
import TemplatesDocumentation from './TemplatesDocumentation';
import CSSDocumentation from './CSSDocumentation';
import ThemesDocumentation from './ThemesDocumentation';
import PluginsDocumentation from './PluginsDocumentation';

const DocumentationModal = ({ isOpen, onClose }) => {
  const { config } = useUIConfig();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[90vw] md:max-w-[80vw] max-h-[90vh] overflow-hidden flex flex-col ${config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg`}>
        <DialogHeader className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700">
          <DialogTitle className="text-2xl font-bold">Documentation</DialogTitle>
          <Button variant="ghost" onClick={onClose} className="p-1 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="sdk" className="flex-grow flex flex-col overflow-hidden">
          <div className="flex justify-center p-4">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-700 p-1">
              {['SDK/API', 'Templates', 'CSS', 'Themes', 'Plugins'].map((tab) => (
                <TabsTrigger
                  key={tab.toLowerCase()}
                  value={tab.toLowerCase()}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <TabsContent value="sdk"><SDKDocumentation /></TabsContent>
            <TabsContent value="templates"><TemplatesDocumentation /></TabsContent>
            <TabsContent value="css"><CSSDocumentation /></TabsContent>
            <TabsContent value="themes"><ThemesDocumentation /></TabsContent>
            <TabsContent value="plugins"><PluginsDocumentation /></TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;
