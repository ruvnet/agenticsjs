import React from 'react';
import { Shield, Trash2, Download } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SettingsGroup from './SettingsGroup';

const PrivacySettings = ({ config, handleChange, inputClass, buttonClass }) => {
  const handleDeleteData = () => {
    // Implement data deletion logic
    console.log('Deleting user data...');
  };

  const handleExportData = () => {
    // Implement data export logic
    console.log('Exporting user data...');
  };

  return (
    <div className="space-y-4">
      <SettingsGroup
        icon={<Shield className="h-5 w-5 mr-2" />}
        title="Do Not Track"
        control={
          <Switch
            checked={config.doNotTrack}
            onCheckedChange={(checked) => handleChange('doNotTrack', checked)}
            className={buttonClass}
          />
        }
      />
      <SettingsGroup
        icon={<Trash2 className="h-5 w-5 mr-2" />}
        title="Delete All Data"
        control={
          <Button onClick={handleDeleteData} className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}>
            Delete
          </Button>
        }
      />
      <SettingsGroup
        icon={<Download className="h-5 w-5 mr-2" />}
        title="Export Data"
        control={
          <Button onClick={handleExportData} className={buttonClass}>
            Export
          </Button>
        }
      />
    </div>
  );
};

export default PrivacySettings;
