import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
      <DialogContent className={`sm:max-w-[90vw] md:max-w-[80vw] h-[90vh] overflow-hidden flex flex-col ${config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">Documentation</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="sdk" className="flex-grow flex flex-col overflow-hidden">
          <TabsList className="flex flex-wrap justify-start gap-2 mb-4 px-2 py-1 bg-transparent">
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
          <div className="flex-grow overflow-y-auto px-4">
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
