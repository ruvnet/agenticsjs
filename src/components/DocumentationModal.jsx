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

const DocumentationModal = ({ isOpen, onClose }) => {
  const { config } = useUIConfig();

  const tabContentClass = `p-4 rounded-md ${config.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[80vw] h-[80vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Documentation</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="sdk" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="sdk">SDK/API</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
          </TabsList>
          <TabsContent value="sdk" className={tabContentClass}>
            <h3 className="text-xl font-semibold mb-4">SDK/API Documentation</h3>
            <p className="mb-4">The Agentic UI SDK provides a set of functions to customize and extend the UI:</p>
            <pre className={`${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-md overflow-x-auto`}>
              {`
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
          <TabsContent value="templates" className={tabContentClass}>
            <h3 className="text-xl font-semibold mb-4">Templates</h3>
            <p>Agentic UI provides a set of customizable templates for common UI patterns:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Search Results Layout</li>
              <li>Settings Modal</li>
              <li>Documentation Modal</li>
              <li>Initial Screen</li>
            </ul>
          </TabsContent>
          <TabsContent value="css" className={tabContentClass}>
            <h3 className="text-xl font-semibold mb-4">CSS Customization</h3>
            <p>Agentic UI uses Tailwind CSS for styling. You can customize the appearance by:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Modifying the tailwind.config.js file</li>
              <li>Using Tailwind utility classes in your components</li>
              <li>Creating custom CSS classes in your project</li>
            </ol>
          </TabsContent>
          <TabsContent value="themes" className={tabContentClass}>
            <h3 className="text-xl font-semibold mb-4">Color Themes</h3>
            <p>Agentic UI supports light and dark themes out of the box. To create a custom theme:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Define your color palette in tailwind.config.js</li>
              <li>Create a new theme object in src/config/uiConfig.js</li>
              <li>Update the setTheme function to support your new theme</li>
            </ol>
          </TabsContent>
          <TabsContent value="plugins" className={tabContentClass}>
            <h3 className="text-xl font-semibold mb-4">Plugins</h3>
            <p>Extend Agentic UI functionality with plugins:</p>
            <pre className={`${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-md overflow-x-auto`}>
              {`
import { createPlugin, applyPlugin } from '../config/uiConfig';

const myPlugin = createPlugin('myPlugin', (config) => {
  // Modify config or add new features
  return {
    ...config,
    myNewFeature: true,
  };
});

// Apply the plugin
const updatedConfig = applyPlugin(config, myPlugin);
              `}
            </pre>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;
