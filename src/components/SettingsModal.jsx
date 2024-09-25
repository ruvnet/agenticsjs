import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Zap, Palette, Type, Volume2, Key, Brain, Puzzle } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import SettingsGroup from './SettingsGroup';
import PromptEngineeringTabs from './PromptEngineeringTabs';

const SettingsModal = ({ isOpen, onClose }) => {
  const { config, updateUIConfig } = useUIConfig();
  const [tempConfig, setTempConfig] = useState(config);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    setTempConfig(config);
  }, [config, isOpen]);

  const handleChange = (key, value) => {
    setTempConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateUIConfig(tempConfig);
    localStorage.setItem('llmModel', tempConfig.llmModel);
    localStorage.setItem('llmTemperature', tempConfig.llmTemperature);
    localStorage.setItem('maxTokens', tempConfig.maxTokens);
    localStorage.setItem('systemPrompt', tempConfig.systemPrompt);
    localStorage.setItem('guidancePrompt', tempConfig.guidancePrompt);
    toast.success("Settings saved successfully!");
    onClose();
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case "general": return "General Settings";
      case "appearance": return "Appearance";
      case "accessibility": return "Accessibility";
      case "api": return "API Settings";
      case "llm": return "LLM Settings";
      case "plugins": return "Plugins";
      default: return "Settings";
    }
  };

  const isDarkMode = tempConfig?.theme === 'dark';
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const inputClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const buttonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[700px] max-h-[90vh] overflow-y-auto ${bgColor} ${textColor} rounded-xl`}>
        <DialogHeader className={`flex justify-between items-center p-4 border-b ${borderColor}`}>
          <DialogTitle className="text-2xl font-bold">{getTabTitle(activeTab)}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full" onValueChange={handleTabChange}>
          <TabsList className={`grid w-full grid-cols-6 p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <TabsTrigger value="general"><Globe className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="accessibility"><Volume2 className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="api"><Key className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="llm"><Brain className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="plugins"><Puzzle className="h-5 w-5" /></TabsTrigger>
          </TabsList>
          <div className="p-4 space-y-6">
            <TabsContent value="general">
              <GeneralSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="accessibility">
              <AccessibilitySettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="api">
              <ApiSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="llm">
              <LLMSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="plugins">
              <PluginsTab config={tempConfig} updateConfig={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
          </div>
        </Tabs>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className={`${buttonClass} bg-accent hover:bg-accent/90`}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AppearanceSettings = ({ config, handleChange, inputClass, buttonClass }) => (
  <>
    <SettingsGroup
      icon={<Type className="mr-2 h-4 w-4" />}
      title="Font Size"
      control={
        <Select value={config?.fontSize} onValueChange={(value) => handleChange('fontSize', value)}>
          <SelectTrigger className={`w-[130px] ${inputClass}`}>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      }
    />
    <SettingsGroup
      icon={<Palette className="mr-2 h-4 w-4" />}
      title="Accent Color"
      control={
        <Select value={config?.accentColor} onValueChange={(value) => handleChange('accentColor', value)}>
          <SelectTrigger className={`w-[130px] ${inputClass}`}>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  </>
);

const AccessibilitySettings = ({ config, handleChange, inputClass, buttonClass }) => (
  <>
    <SettingsGroup
      icon={<Zap className="mr-2 h-4 w-4" />}
      title="Animations"
      control={
        <Switch
          checked={config?.animations?.enabled}
          onCheckedChange={(checked) => handleChange('animations', { ...config.animations, enabled: checked })}
          className={buttonClass}
        />
      }
    />
    {config?.animations?.enabled && (
      <div className="space-y-2 mt-4">
        <span className="text-sm">Animation Speed</span>
        <Slider
          value={[config?.animations?.duration]}
          onValueChange={(value) => handleChange('animations', { ...config.animations, duration: value[0] })}
          max={1000}
          step={50}
          className="w-full"
        />
        <div className="flex justify-between text-xs">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    )}
  </>
);

const LLMSettings = ({ config, handleChange, inputClass, buttonClass }) => (
  <div className="space-y-6">
    <SettingsGroup
      icon={<Brain className="mr-2 h-4 w-4" />}
      title="LLM Model"
      control={
        <Select value={config?.llmModel} onValueChange={(value) => handleChange('llmModel', value)}>
          <SelectTrigger className={`w-[200px] ${inputClass}`}>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4-turbo-preview">GPT-4 Turbo Preview</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="claude-v1">Claude v1</SelectItem>
            <SelectItem value="palm-2">PaLM 2</SelectItem>
            <SelectItem value="llama-2">LLaMA 2</SelectItem>
          </SelectContent>
        </Select>
      }
    />
    <SettingsGroup
      icon={<Zap className="mr-2 h-4 w-4" />}
      title="Temperature"
      control={
        <div className="w-full">
          <Slider
            value={[config?.llmTemperature || 0.7]}
            onValueChange={(value) => handleChange('llmTemperature', value[0])}
            max={1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>0 (Deterministic)</span>
            <span>1 (Creative)</span>
          </div>
        </div>
      }
    />
    <SettingsGroup
      icon={<Zap className="mr-2 h-4 w-4" />}
      title="Max Tokens"
      control={
        <Input
          type="number"
          value={config?.maxTokens || 2048}
          onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
          className={`w-[100px] ${inputClass}`}
        />
      }
    />
    <PromptEngineeringTabs config={config} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
  </div>
);

const PluginsTab = ({ config, updateConfig, inputClass, buttonClass }) => {
  const [newPluginName, setNewPluginName] = useState('');
  const [newPluginCode, setNewPluginCode] = useState('');

  const handleInstallPlugin = (pluginName) => {
    updateConfig('plugins', [...new Set([...(config.plugins || []), pluginName])]);
  };

  const handleRemovePlugin = (pluginName) => {
    updateConfig('plugins', (config.plugins || []).filter(p => p !== pluginName));
  };

  const handleCreatePlugin = () => {
    if (newPluginName && newPluginCode) {
      updateConfig('plugins', [...new Set([...(config.plugins || []), newPluginName])]);
      setNewPluginName('');
      setNewPluginCode('');
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
            <Button variant="destructive" size="sm" onClick={() => handleRemovePlugin(plugin)} className={buttonClass}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6">Available Plugins</h3>
      <ul className="space-y-2">
        {availablePlugins.filter(plugin => !installedPlugins.includes(plugin)).map((plugin) => (
          <li key={plugin} className="flex justify-between items-center">
            <span>{plugin}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleInstallPlugin(plugin)}
              className={`${buttonClass} bg-green-500 hover:bg-green-600 text-white`}
            >
              Install
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
          className={inputClass}
        />
        <textarea
          className={`w-full h-32 p-2 border rounded ${inputClass}`}
          placeholder="Plugin Code (JavaScript function that takes 'config' as parameter and returns modified config)"
          value={newPluginCode}
          onChange={(e) => setNewPluginCode(e.target.value)}
        />
        <Button onClick={handleCreatePlugin} className={buttonClass}>Create Plugin</Button>
      </div>
    </div>
  );
};

export default SettingsModal;
