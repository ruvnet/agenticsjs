import React from 'react';

const SettingsGroup = ({ icon, title, control }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center">
        {icon}
        {title}
      </span>
      {control}
    </div>
  );
};

export default SettingsGroup;