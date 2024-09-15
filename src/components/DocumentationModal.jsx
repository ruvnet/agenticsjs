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

const DocumentationModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80vw] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Documentation</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="sdk">
          <TabsList>
            <TabsTrigger value="sdk">SDK/API</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="themes">Color Themes</TabsTrigger>
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
          </TabsList>
          <TabsContent value="sdk">
            <h3 className="text-lg font-semibold mb-2">SDK/API Documentation</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {`
// Example SDK usage
import { useUIConfig } from '../config/uiConfig';

const MyComponent = () => {
  const { config, updateUIConfig } = useUIConfig();

  // Access config values
  console.log(config.theme);

  // Update config
  updateUIConfig({ theme: 'dark' });

  // ...
}
              `}
            </pre>
          </TabsContent>
          <TabsContent value="templates">
            <h3 className="text-lg font-semibold mb-2">Templates</h3>
            <p>Documentation for available templates and how to use them.</p>
          </TabsContent>
          <TabsContent value="css">
            <h3 className="text-lg font-semibold mb-2">CSS Customization</h3>
            <p>Guide on how to customize CSS for components.</p>
          </TabsContent>
          <TabsContent value="themes">
            <h3 className="text-lg font-semibold mb-2">Color Themes</h3>
            <p>Available color themes and how to create custom themes.</p>
          </TabsContent>
          <TabsContent value="plugins">
            <h3 className="text-lg font-semibold mb-2">Plugins</h3>
            <p>Documentation on how to create and use plugins.</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;