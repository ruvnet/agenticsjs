import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Zap, Palette, Type, Volume2, Key, Brain, Puzzle, Search, Eye, Bell } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import SettingsGroup from './SettingsGroup';
import PromptEngineeringTabs from './PromptEngineeringTabs';
import AppearanceSettings from './AppearanceSettings';
import AccessibilitySettings from './AccessibilitySettings';
import LLMSettings from './LLMSettings';
import PluginsTab from './PluginsTab';
import SearchSettings from './SearchSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';

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
      case "search": return "Search Settings";
      case "privacy": return "Privacy";
      case "notifications": return "Notifications";
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
          <TabsList className={`grid w-full grid-cols-3 p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <TabsTrigger value="general"><Globe className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="accessibility"><Volume2 className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="api"><Key className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="llm"><Brain className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="plugins"><Puzzle className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="search"><Search className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="privacy"><Eye className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-5 w-5" /></TabsTrigger>
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
            <TabsContent value="search">
              <SearchSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="privacy">
              <PrivacySettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings config={tempConfig} handleChange={handleChange} inputClass={inputClass} buttonClass={buttonClass} />
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

export default SettingsModal;
