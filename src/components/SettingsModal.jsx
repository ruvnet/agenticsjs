import React from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, Layout, Type, Volume2 } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsGroup from './SettingsGroup';

const SettingsModal = ({ isOpen, onClose }) => {
  const { config, updateUIConfig } = useUIConfig();

  const handleThemeChange = () => {
    updateUIConfig({ theme: config.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleAnimationToggle = () => {
    updateUIConfig({ animations: { ...config.animations, enabled: !config.animations.enabled } });
  };

  const handleLanguageChange = (value) => {
    updateUIConfig({ language: value });
  };

  const handleFontSizeChange = (value) => {
    updateUIConfig({ fontSize: value });
  };

  const handleAccentColorChange = (value) => {
    updateUIConfig({ accentColor: value });
  };

  const handleSearchBarPositionChange = (value) => {
    updateUIConfig({ searchBarPosition: value });
  };

  const handleAnimationSpeedChange = (value) => {
    updateUIConfig({ animations: { ...config.animations, duration: value[0] } });
  };

  const handleVoiceAssistantToggle = () => {
    updateUIConfig({ voiceAssistant: !config.voiceAssistant });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-[#1C1C1C] text-white rounded-xl">
        <DialogHeader className="flex justify-between items-center p-4 border-b border-gray-700">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <Button variant="ghost" onClick={onClose} className="p-1 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-2 bg-[#2D2D2D] rounded-lg">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#3C3C3C] data-[state=active]:text-white">General</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-[#3C3C3C] data-[state=active]:text-white">Appearance</TabsTrigger>
            <TabsTrigger value="accessibility" className="data-[state=active]:bg-[#3C3C3C] data-[state=active]:text-white">Accessibility</TabsTrigger>
          </TabsList>
          <div className="p-4 space-y-6">
            <TabsContent value="general">
              <SettingsGroup
                icon={<Globe className="mr-2 h-4 w-4" />}
                title="Language"
                control={
                  <Select value={config.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[130px] bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
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
                  <Select value={config.searchBarPosition} onValueChange={handleSearchBarPositionChange}>
                    <SelectTrigger className="w-[130px] bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
              <SettingsGroup
                icon={<Volume2 className="mr-2 h-4 w-4" />}
                title="Voice Assistant"
                control={
                  <Switch
                    checked={config.voiceAssistant}
                    onCheckedChange={handleVoiceAssistantToggle}
                  />
                }
              />
            </TabsContent>
            <TabsContent value="appearance">
              <SettingsGroup
                icon={config.theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                title="Theme"
                control={
                  <Switch
                    checked={config.theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                  />
                }
              />
              <SettingsGroup
                icon={<Type className="mr-2 h-4 w-4" />}
                title="Font Size"
                control={
                  <Select value={config.fontSize} onValueChange={handleFontSizeChange}>
                    <SelectTrigger className="w-[130px] bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
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
                  <Select value={config.accentColor} onValueChange={handleAccentColorChange}>
                    <SelectTrigger className="w-[130px] bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
            </TabsContent>
            <TabsContent value="accessibility">
              <SettingsGroup
                icon={<Zap className="mr-2 h-4 w-4" />}
                title="Animations"
                control={
                  <Switch
                    checked={config.animations.enabled}
                    onCheckedChange={handleAnimationToggle}
                  />
                }
              />
              {config.animations.enabled && (
                <div className="space-y-2 mt-4">
                  <span className="text-sm">Animation Speed</span>
                  <Slider
                    value={[config.animations.duration]}
                    onValueChange={handleAnimationSpeedChange}
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
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
