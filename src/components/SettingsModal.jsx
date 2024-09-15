import React from 'react';
import { X, Moon, Sun, Globe, Zap, Palette, ToggleLeft, ToggleRight } from 'lucide-react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              {config.theme === 'dark' ? <Moon className="mr-2" /> : <Sun className="mr-2" />}
              Theme
            </span>
            <Switch
              checked={config.theme === 'dark'}
              onCheckedChange={handleThemeChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Zap className="mr-2" />
              Animations
            </span>
            <Switch
              checked={config.animations.enabled}
              onCheckedChange={handleAnimationToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Globe className="mr-2" />
              Language
            </span>
            <Select value={config.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[120px]">
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
            <span>Font Size</span>
            <Select value={config.fontSize} onValueChange={handleFontSizeChange}>
              <SelectTrigger className="w-[120px]">
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
              <Palette className="mr-2" />
              Accent Color
            </span>
            <Select value={config.accentColor} onValueChange={handleAccentColorChange}>
              <SelectTrigger className="w-[120px]">
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
          <div className="flex items-center justify-between">
            <span>Search Bar Position</span>
            <Select value={config.searchBarPosition} onValueChange={handleSearchBarPositionChange}>
              <SelectTrigger className="w-[120px]">
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
              {config.showSettingsIcon ? <ToggleRight className="mr-2" /> : <ToggleLeft className="mr-2" />}
              Show Settings Icon
            </span>
            <Switch
              checked={config.showSettingsIcon}
              onCheckedChange={handleShowSettingsIconToggle}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
