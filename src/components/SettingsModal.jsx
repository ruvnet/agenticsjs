import React from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, Layout, Type, Volume2, Search, Clock, List, MessageSquare, Mic, Settings } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsGroup from './SettingsGroup';

const SettingsModal = ({ isOpen, onClose }) => {
  const { config, updateUIConfig } = useUIConfig();

  const handleChange = (key, value) => {
    updateUIConfig({ [key]: value });
  };

  const bgColor = config?.theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = config?.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = config?.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] max-h-[80vh] overflow-y-auto ${bgColor} ${textColor} rounded-xl`}>
        <DialogHeader className={`flex justify-between items-center p-4 border-b ${borderColor}`}>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <Button variant="ghost" onClick={onClose} className={`p-1 ${config?.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className={`grid w-full grid-cols-5 p-2 ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
          </TabsList>
          <div className="p-4 space-y-6">
            <TabsContent value="general">
              <GeneralSettings config={config} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSettings config={config} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="search">
              <SearchSettings config={config} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="accessibility">
              <AccessibilitySettings config={config} handleChange={handleChange} />
            </TabsContent>
            <TabsContent value="plugins">
              <PluginsSettings config={config} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const GeneralSettings = ({ config, handleChange }) => (
  <>
    <SettingsGroup
      icon={<Globe className="mr-2 h-4 w-4" />}
      title="Language"
      control={
        <Select value={config?.language} onValueChange={(value) => handleChange('language', value)}>
          <SelectTrigger className={`w-[130px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
      }
    />
    <SettingsGroup
      icon={<Layout className="mr-2 h-4 w-4" />}
      title="Search Bar Position"
      control={
        <Select value={config?.searchBarPosition} onValueChange={(value) => handleChange('searchBarPosition', value)}>
          <SelectTrigger className={`w-[130px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      }
    />
  </>
);

const AppearanceSettings = ({ config, handleChange }) => (
  <>
    <SettingsGroup
      icon={config?.theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
      title="Theme"
      control={
        <Switch
          checked={config?.theme === 'dark'}
          onCheckedChange={(checked) => handleChange('theme', checked ? 'dark' : 'light')}
        />
      }
    />
    <SettingsGroup
      icon={<Type className="mr-2 h-4 w-4" />}
      title="Font Size"
      control={
        <Select value={config?.fontSize} onValueChange={(value) => handleChange('fontSize', value)}>
          <SelectTrigger className={`w-[130px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
          <SelectTrigger className={`w-[130px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
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

const SearchSettings = ({ config, handleChange }) => (
  <>
    <SettingsGroup
      icon={<Clock className="mr-2 h-4 w-4" />}
      title="Search Delay (ms)"
      control={
        <Input
          type="number"
          value={config?.searchDelay}
          onChange={(e) => handleChange('searchDelay', parseInt(e.target.value))}
          className={`w-[100px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        />
      }
    />
    <SettingsGroup
      icon={<Zap className="mr-2 h-4 w-4" />}
      title="Result Animation Duration (ms)"
      control={
        <Input
          type="number"
          value={config?.resultAnimationDuration}
          onChange={(e) => handleChange('resultAnimationDuration', parseInt(e.target.value))}
          className={`w-[100px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        />
      }
    />
    <SettingsGroup
      icon={<List className="mr-2 h-4 w-4" />}
      title="Max Results"
      control={
        <Input
          type="number"
          value={config?.maxResults}
          onChange={(e) => handleChange('maxResults', parseInt(e.target.value))}
          className={`w-[100px] ${config?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        />
      }
    />
    <SettingsGroup
      icon={<MessageSquare className="mr-2 h-4 w-4" />}
      title="Auto Suggest"
      control={
        <Switch
          checked={config?.autoSuggest}
          onCheckedChange={(checked) => handleChange('autoSuggest', checked)}
        />
      }
    />
    <SettingsGroup
      icon={<Mic className="mr-2 h-4 w-4" />}
      title="Voice Search"
      control={
        <Switch
          checked={config?.voiceSearch}
          onCheckedChange={(checked) => handleChange('voiceSearch', checked)}
        />
      }
    />
  </>
);

const AccessibilitySettings = ({ config, handleChange }) => (
  <>
    <SettingsGroup
      icon={<Zap className="mr-2 h-4 w-4" />}
      title="Animations"
      control={
        <Switch
          checked={config?.animations?.enabled}
          onCheckedChange={(checked) => handleChange('animations', { ...config.animations, enabled: checked })}
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

const PluginsSettings = ({ config }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Installed Plugins</h3>
    {config.plugins && config.plugins.length > 0 ? (
      <ul className="list-disc pl-5">
        {config.plugins.map((plugin, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{plugin}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No plugins installed.</p>
    )}
    <div className="mt-4">
      <h4 className="text-md font-semibold mb-2">Add New Plugin</h4>
      <p className="text-sm mb-2">To add a new plugin, use the following steps:</p>
      <ol className="list-decimal pl-5 text-sm">
        <li>Create a new plugin file in the <code>src/plugins</code> directory</li>
        <li>Import the plugin in your main application file</li>
        <li>Register the plugin using the <code>registerPlugin</code> function</li>
        <li>Apply the plugin using the <code>applyPlugin</code> function</li>
      </ol>
    </div>
  </div>
);

export default SettingsModal;
