import React from 'react';
import { useUIConfig } from '../config/uiConfig';
import CodeBlock from './CodeBlock';

const SDKDocumentation = () => {
  const { config } = useUIConfig();

  const sdkExample = `
import { useUIConfig } from '../config/uiConfig';

const MyComponent = () => {
  const { config, updateUIConfig } = useUIConfig();

  // Access config values
  console.log(config.theme);

  // Update config
  updateUIConfig({ theme: 'dark' });

  // ...
}
  `;

  return (
    <div className={`${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h3 className="text-xl font-semibold mb-4">SDK/API Documentation</h3>
      <p className="mb-4">The Agentic UI SDK provides a set of functions to customize and extend the UI:</p>
      <CodeBlock code={sdkExample} />
      <h4 className="text-lg font-semibold mt-6 mb-2">Available Functions</h4>
      <ul className="list-disc pl-6 space-y-2">
        <li><code>setTheme(config, theme)</code>: Change the UI theme</li>
        <li><code>setAnimations(config, animations)</code>: Configure animations</li>
        <li><code>setLanguage(config, language)</code>: Set the UI language</li>
        <li><code>setFontSize(config, fontSize)</code>: Adjust the font size</li>
        <li><code>setAccentColor(config, accentColor)</code>: Change the accent color</li>
        <li><code>setSearchBarPosition(config, position)</code>: Set search bar position</li>
        <li><code>setComponentConfig(config, componentName, componentConfig)</code>: Configure specific components</li>
        <li><code>toggleSettingsIcon(config)</code>: Show/hide the settings icon</li>
        <li><code>addPlugin(config, plugin)</code>: Add a new plugin to the UI</li>
      </ul>
      <p className="mt-4">
        For more detailed information on each function, refer to the API reference in the official documentation.
      </p>
    </div>
  );
};

export default SDKDocumentation;