import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIConfig } from '../config/uiConfig';

const PluginsTab = ({ config, updateConfig }) => {
  const { registerPlugin, unregisterPlugin, listPlugins } = useUIConfig();
  const [newPluginName, setNewPluginName] = useState('');
  const [newPluginCode, setNewPluginCode] = useState('');

  const handleInstallPlugin = (pluginName) => {
    // Simulated plugin installation
    const newPlugin = {
      id: pluginName,
      version: '1.0.0',
      setup: (config) => {
        console.log(`Setting up ${pluginName}`);
        return config;
      }
    };
    registerPlugin(newPlugin);
    updateConfig('plugins', [...(config.plugins || []), pluginName]);
  };

  const handleRemovePlugin = (pluginName) => {
    unregisterPlugin(pluginName);
    updateConfig('plugins', (config.plugins || []).filter(p => p !== pluginName));
  };

  const handleCreatePlugin = () => {
    if (newPluginName && newPluginCode) {
      try {
        const pluginFunction = new Function('config', newPluginCode);
        const newPlugin = {
          id: newPluginName,
          version: '1.0.0',
          setup: pluginFunction
        };
        registerPlugin(newPlugin);
        updateConfig('plugins', [...(config.plugins || []), newPluginName]);
        setNewPluginName('');
        setNewPluginCode('');
      } catch (error) {
        console.error('Error creating plugin:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  const availablePlugins = [
    'WordCount',
    'SentimentAnalysis',
    'LanguageDetection',
    'TextSummarization',
    'KeywordExtraction'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Installed Plugins</h3>
      <ul className="space-y-2">
        {config.plugins && config.plugins.map((plugin) => (
          <li key={plugin} className="flex justify-between items-center">
            <span>{plugin}</span>
            <Button variant="destructive" size="sm" onClick={() => handleRemovePlugin(plugin)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6">Available Plugins</h3>
      <ul className="space-y-2">
        {availablePlugins.map((plugin) => (
          <li key={plugin} className="flex justify-between items-center">
            <span>{plugin}</span>
            <Button variant="outline" size="sm" onClick={() => handleInstallPlugin(plugin)}>
              <Plus className="h-4 w-4 mr-2" /> Install
            </Button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6">Create Custom Plugin</h3>
      <div className="space-y-2">
        <Input
          placeholder="Plugin Name"
          value={newPluginName}
          onChange={(e) => setNewPluginName(e.target.value)}
        />
        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder="Plugin Code (JavaScript function that takes 'config' as parameter and returns modified config)"
          value={newPluginCode}
          onChange={(e) => setNewPluginCode(e.target.value)}
        />
        <Button onClick={handleCreatePlugin}>Create Plugin</Button>
      </div>
    </div>
  );
};

export default PluginsTab;