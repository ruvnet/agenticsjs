import React from 'react';
import { useUIConfig } from '../config/uiConfig';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const SettingsTab = () => {
  const { config, updateUIConfig } = useUIConfig();

  const handleThemeChange = () => {
    updateUIConfig({ theme: config.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleAnimationToggle = () => {
    updateUIConfig({ animations: { ...config.animations, enabled: !config.animations.enabled } });
  };

  const handleLanguageChange = (e) => {
    updateUIConfig({ language: e.target.value });
  };

  return (
    <div className="bg-background text-foreground p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Theme</span>
          <Button onClick={handleThemeChange}>
            {config.theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>Animations</span>
          <Switch
            checked={config.animations.enabled}
            onCheckedChange={handleAnimationToggle}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Language</span>
          <Input
            value={config.language}
            onChange={handleLanguageChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;