import React from 'react';

const SettingsGroup = ({ icon, title, control }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </div>
      {control}
    </div>
  );
};

export default SettingsGroup;
