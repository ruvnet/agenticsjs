import React from 'react';
import { useUIConfig } from '../config/uiConfig';

const ThemesDocumentation = () => {
  const { config } = useUIConfig();
  const codeClass = `${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-md overflow-x-auto`;

  return (
    <div className={`${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h3 className="text-xl font-semibold mb-4">Color Themes</h3>
      <p className="mb-4">Agentic UI supports light and dark themes out of the box. To create a custom theme:</p>
      <ol className="list-decimal pl-6 space-y-4">
        <li>
          <strong>Define your color palette in tailwind.config.js</strong>
          <pre className={codeClass}>
            {`
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-theme': {
          primary: '#3B82F6',
          secondary: '#1F2937',
          background: '#F3F4F6',
          text: '#111827',
          // Add more color variables as needed
        },
      },
    },
  },
  // ...
}
            `}
          </pre>
        </li>
        <li>
          <strong>Create a new theme object in src/config/uiConfig.js</strong>
          <pre className={codeClass}>
            {`
export const customTheme = {
  name: 'custom',
  colors: {
    primary: 'custom-theme-primary',
    secondary: 'custom-theme-secondary',
    background: 'custom-theme-background',
    text: 'custom-theme-text',
    // Map your custom colors here
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme,
};
            `}
          </pre>
        </li>
        <li>
          <strong>Update the setTheme function to support your new theme</strong>
          <pre className={codeClass}>
            {`
export const setTheme = (config, themeName) => {
  const newTheme = themes[themeName] || themes.light;
  return updateConfig(config, { theme: newTheme });
};
            `}
          </pre>
        </li>
      </ol>
      <p className="mt-4">
        After setting up your custom theme, you can switch to it using the <code>setTheme</code> function:
        <code className="ml-2">updateUIConfig(setTheme(config, 'custom'));</code>
      </p>
    </div>
  );
};

export default ThemesDocumentation;