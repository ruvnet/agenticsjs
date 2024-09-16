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
        <DialogHeader className="flex-shrink-0 flex justify-between items-center p-4 border-b">
          <DialogTitle className="text-2xl font-bold">Documentation</DialogTitle>
          <Button variant="ghost" onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="sdk" className="flex-grow flex flex-col overflow-hidden">
          <TabsList className="flex flex-wrap justify-start gap-2 p-4 bg-transparent border-b">
            {['SDK/API', 'Templates', 'CSS', 'Themes', 'Plugins'].map((tab) => (
              <TabsTrigger
                key={tab.toLowerCase()}
                value={tab.toLowerCase()}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
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
