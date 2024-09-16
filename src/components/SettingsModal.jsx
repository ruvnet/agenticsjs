import React from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, Layout, Type, Volume2, Waveform } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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

  const handleColorChange = (colorKey, value) => {
    updateUIConfig({ colors: { ...config.colors, [colorKey]: value } });
  };

  const handleFontFamilyChange = (value) => {
    updateUIConfig({ font: { ...config.font, family: value } });
  };

  const handleSpeechVisualizationChange = (value) => {
    updateUIConfig({ speechVisualization: value });
  };

  const bgColor = config.theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = config.theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = config.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] max-h-[80vh] overflow-y-auto ${bgColor} ${textColor} rounded-xl`}>
        <DialogHeader className={`flex justify-between items-center p-4 border-b ${borderColor}`}>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <Button variant="ghost" onClick={onClose} className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className={`grid w-full grid-cols-4 p-2 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
            <TabsTrigger value="general" className={`data-[state=active]:${config.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} data-[state=active]:${textColor}`}>General</TabsTrigger>
            <TabsTrigger value="appearance" className={`data-[state=active]:${config.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} data-[state=active]:${textColor}`}>Appearance</TabsTrigger>
            <TabsTrigger value="accessibility" className={`data-[state=active]:${config.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} data-[state=active]:${textColor}`}>Accessibility</TabsTrigger>
            <TabsTrigger value="colors" className={`data-[state=active]:${config.theme === 'dark' ? 'bg-gray-700' : 'bg-white'} data-[state=active]:${textColor}`}>Colors</TabsTrigger>
          </TabsList>
          <div className="p-4 space-y-6">
            <TabsContent value="general">
              <SettingsGroup
                icon={<Globe className="mr-2 h-4 w-4" />}
                title="Language"
                control={
                  <Select value={config.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className={`w-[130px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className={`${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${borderColor} ${textColor}`}>
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
                    <SelectTrigger className={`w-[130px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent className={`${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${borderColor} ${textColor}`}>
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
              <SettingsGroup
                icon={<Waveform className="mr-2 h-4 w-4" />}
                title="Speech Visualization"
                control={
                  <Select value={config.speechVisualization} onValueChange={handleSpeechVisualizationChange}>
                    <SelectTrigger className={`w-[130px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className={`${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${borderColor} ${textColor}`}>
                      <SelectItem value="waveform">Waveform</SelectItem>
                      <SelectItem value="blocks">Blocks</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <SelectTrigger className={`w-[130px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className={`${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${borderColor} ${textColor}`}>
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
                    <SelectTrigger className={`w-[130px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className={`${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${borderColor} ${textColor}`}>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
              <SettingsGroup
                icon={<Type className="mr-2 h-4 w-4" />}
                title="Font Family"
                control={
                  <Input
                    value={config.font.family}
                    onChange={(e) => handleFontFamilyChange(e.target.value)}
                    className={`w-[200px] ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${borderColor} ${textColor}`}
                  />
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
            <TabsContent value="colors">
              {Object.entries(config.colors).map(([key, value]) => (
                <SettingsGroup
                  key={key}
                  icon={<div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: value }}></div>}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  control={
                    <Input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-8 h-8 p-0 border-0"
                    />
                  }
                />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
