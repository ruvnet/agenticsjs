import React from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, ToggleLeft, ToggleRight, Layout, Type, Volume2 } from 'lucide-react';
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
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleShowSettingsIconToggle = () => {
    updateUIConfig({ showSettingsIcon: !config.showSettingsIcon });
  };

  const handleAnimationSpeedChange = (value) => {
    updateUIConfig({ animations: { ...config.animations, duration: value[0] } });
  };

  const handleVoiceAssistantToggle = () => {
    updateUIConfig({ voiceAssistant: !config.voiceAssistant });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] max-h-[80vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Language
              </span>
              <Select value={config.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[130px]">
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
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Layout className="mr-2 h-4 w-4" />
                Search Bar Position
              </span>
              <Select value={config.searchBarPosition} onValueChange={handleSearchBarPositionChange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {config.showSettingsIcon ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
                Show Settings Icon
              </span>
              <Switch
                checked={config.showSettingsIcon}
                onCheckedChange={handleShowSettingsIconToggle}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Volume2 className="mr-2 h-4 w-4" />
                Voice Assistant
              </span>
              <Switch
                checked={config.voiceAssistant}
                onCheckedChange={handleVoiceAssistantToggle}
              />
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {config.theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                Theme
              </span>
              <Switch
                checked={config.theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Type className="mr-2 h-4 w-4" />
                Font Size
              </span>
              <Select value={config.fontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Accent Color
              </span>
              <Select value={config.accentColor} onValueChange={handleAccentColorChange}>
                <SelectTrigger className="w-[130px]">
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
            </div>
          </TabsContent>
          <TabsContent value="accessibility" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Animations
              </span>
              <Switch
                checked={config.animations.enabled}
                onCheckedChange={handleAnimationToggle}
              />
            </div>
            {config.animations.enabled && (
              <div className="space-y-2">
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
