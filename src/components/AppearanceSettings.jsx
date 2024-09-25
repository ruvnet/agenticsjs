import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SettingsGroup from './SettingsGroup';

const AppearanceSettings = ({ config, handleChange, inputClass, buttonClass }) => {
  return (
    <div className="space-y-4">
      <SettingsGroup
        icon={<Palette className="h-5 w-5 mr-2" />}
        title="Theme"
        control={
          <Switch
            checked={config.theme === 'dark'}
            onCheckedChange={(checked) => handleChange('theme', checked ? 'dark' : 'light')}
            className={buttonClass}
          />
        }
      />
      <SettingsGroup
        icon={<Sun className="h-5 w-5 mr-2" />}
        title="Accent Color"
        control={
          <Select
            value={config.accentColor}
            onValueChange={(value) => handleChange('accentColor', value)}
          >
            <SelectTrigger className={`w-[180px] ${inputClass}`}>
              <SelectValue placeholder="Select accent color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <SettingsGroup
        icon={<Moon className="h-5 w-5 mr-2" />}
        title="Font Size"
        control={
          <Select
            value={config.fontSize}
            onValueChange={(value) => handleChange('fontSize', value)}
          >
            <SelectTrigger className={`w-[180px] ${inputClass}`}>
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};

export default AppearanceSettings;
