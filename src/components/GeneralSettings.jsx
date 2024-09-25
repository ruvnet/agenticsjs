import React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SettingsGroup from './SettingsGroup';

const GeneralSettings = ({ config, handleChange, inputClass, buttonClass }) => {
  return (
    <div className="space-y-4">
      <SettingsGroup
        icon={<Globe className="h-5 w-5 mr-2" />}
        title="Language"
        control={
          <Select
            value={config.language}
            onValueChange={(value) => handleChange('language', value)}
          >
            <SelectTrigger className={`w-[180px] ${inputClass}`}>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <SettingsGroup
        icon={config.theme === 'dark' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
        title="Theme"
        control={
          <Switch
            checked={config.theme === 'dark'}
            onCheckedChange={(checked) => handleChange('theme', checked ? 'dark' : 'light')}
            className={buttonClass}
          />
        }
      />
    </div>
  );
};

export default GeneralSettings;
