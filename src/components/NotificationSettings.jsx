import React from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import SettingsGroup from './SettingsGroup';

const NotificationSettings = ({ config, handleChange, inputClass, buttonClass }) => {
  return (
    <div className="space-y-4">
      <SettingsGroup
        icon={<Bell className="h-5 w-5 mr-2" />}
        title="Push Notifications"
        control={
          <Switch
            checked={config.pushNotifications}
            onCheckedChange={(checked) => handleChange('pushNotifications', checked)}
            className={buttonClass}
          />
        }
      />
      <SettingsGroup
        icon={<Mail className="h-5 w-5 mr-2" />}
        title="Email Notifications"
        control={
          <Switch
            checked={config.emailNotifications}
            onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
            className={buttonClass}
          />
        }
      />
      <SettingsGroup
        icon={<MessageSquare className="h-5 w-5 mr-2" />}
        title="In-App Notifications"
        control={
          <Switch
            checked={config.inAppNotifications}
            onCheckedChange={(checked) => handleChange('inAppNotifications', checked)}
            className={buttonClass}
          />
        }
      />
    </div>
  );
};

export default NotificationSettings;
