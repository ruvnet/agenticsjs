import React, { useState, useEffect } from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, Layout, Type, Volume2, Search, Clock, List, MessageSquare, Mic, Puzzle, Key, Brain, Sliders, Save, Play } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import SettingsGroup from './SettingsGroup';
import { toast } from "sonner";

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
    updateConfig('plugins', [...new Set([...(config.plugins || []), pluginName])]);
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
        updateConfig('plugins', [...new Set([...(config.plugins || []), newPluginName])]);
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

  const installedPlugins = [...new Set(config.plugins || [])];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Installed Plugins</h3>
      <ul className="space-y-2">
        {installedPlugins.map((plugin) => (
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

const SettingsModal = ({ isOpen, onClose }) => {
  const { config, updateUIConfig } = useUIConfig();
  const [jiraApiKey, setJiraApiKey] = useState('');
  const [openAiApiKey, setOpenAiApiKey] = useState('');
  const [tempConfig, setTempConfig] = useState(config);
  const [jiraTestResponse, setJiraTestResponse] = useState('');
  const [openAiTestResponse, setOpenAiTestResponse] = useState('');

  useEffect(() => {
    setJiraApiKey(localStorage.getItem('jiraApiKey') || '');
    setOpenAiApiKey(localStorage.getItem('openAiApiKey') || '');
    setTempConfig(config);
  }, [config, isOpen]);

  const handleChange = (key, value) => {
    setTempConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleApiKeyChange = (key, value) => {
    if (key === 'jiraApiKey') {
      setJiraApiKey(value);
    } else if (key === 'openAiApiKey') {
      setOpenAiApiKey(value);
    }
  };

  const handleSave = () => {
    updateUIConfig(tempConfig);
    localStorage.setItem('jiraApiKey', jiraApiKey);
    localStorage.setItem('openAiApiKey', openAiApiKey);
    toast.success("Settings saved successfully!");
    onClose();
  };

  const testJiraApi = async () => {
    try {
      const response = await fetch('https://your-jira-api-endpoint.com', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jiraApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setJiraTestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setJiraTestResponse(`Error: ${error.message}`);
    }
  };

  const testOpenAiApi = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${openAiApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setOpenAiTestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setOpenAiTestResponse(`Error: ${error.message}`);
    }
  };

  const bgColor = tempConfig?.theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = tempConfig?.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = tempConfig?.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[700px] max-h-[90vh] overflow-y-auto ${bgColor} ${textColor} rounded-xl`}>
        <DialogHeader className={`flex justify-between items-center p-4 border-b ${borderColor}`}>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <Button variant="ghost" onClick={onClose} className={`p-1 ${tempConfig?.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className={`grid w-full grid-cols-7 p-2 ${tempConfig?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <TabsTrigger value="general"><Globe className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="search"><Search className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="accessibility"><Volume2 className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="api"><Key className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="llm"><Brain className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="plugins"><Puzzle className="h-5 w-5" /></TabsTrigger>
          </TabsList>
          <div className="p-4 space-y-6">
            <TabsContent value="general">
              <GeneralSettings config={tempConfig} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSettings config={tempConfig} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="search">
              <SearchSettings config={tempConfig} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="accessibility">
              <AccessibilitySettings config={tempConfig} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="api">
              <ApiSettings
                jiraApiKey={jiraApiKey}
                openAiApiKey={openAiApiKey}
                handleApiKeyChange={handleApiKeyChange}
                testJiraApi={testJiraApi}
                testOpenAiApi={testOpenAiApi}
                jiraTestResponse={jiraTestResponse}
                openAiTestResponse={openAiTestResponse}
              />
            </TabsContent>
            <TabsContent value="llm">
              <LLMSettings config={tempConfig} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="plugins">
              <PluginsTab config={tempConfig} updateConfig={handleChange} />
            </TabsContent>
          </div>
        </Tabs>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
            <Save className="mr-2 h-4 w-4" /> Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
