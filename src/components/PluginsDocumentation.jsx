import React from 'react';
import { useUIConfig } from '../config/uiConfig';

const PluginsDocumentation = () => {
  const { config } = useUIConfig();
  const codeClass = `${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-md overflow-x-auto`;

  return (
    <div className={`${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h3 className="text-xl font-semibold mb-4">Plugins</h3>
      <p className="mb-4">Extend Agentic UI functionality with plugins:</p>
      <ol className="list-decimal pl-6 space-y-4">
        <li>
          <strong>Create a plugin</strong>
          <pre className={codeClass}>
            {`
import { createPlugin } from '../config/uiConfig';

const myPlugin = createPlugin('myPlugin', (config) => {
  // Modify config or add new features
  return {
    ...config,
    myNewFeature: true,
  };
});
            `}
          </pre>
        </li>
        <li>
          <strong>Apply the plugin</strong>
          <pre className={codeClass}>
            {`
import { applyPlugin } from '../config/uiConfig';

const updatedConfig = applyPlugin(config, myPlugin);
            `}
          </pre>
        </li>
        <li>
          <strong>Register the plugin</strong>
          <pre className={codeClass}>
            {`
import { registerPlugin } from '../config/uiConfig';

registerPlugin(myPlugin);
            `}
          </pre>
        </li>
        <li>
          <strong>Unregister the plugin</strong>
          <pre className={codeClass}>
            {`
import { unregisterPlugin } from '../config/uiConfig';

unregisterPlugin('myPlugin');
            `}
          </pre>
        </li>
        <li>
          <strong>List all plugins</strong>
          <pre className={codeClass}>
            {`
import { listPlugins } from '../config/uiConfig';

const plugins = listPlugins();
console.log(plugins);
            `}
          </pre>
        </li>
        <li>
          <strong>Use the plugin in your components</strong>
          <pre className={codeClass}>
            {`
const MyComponent = () => {
  const { config } = useUIConfig();

  if (config.myNewFeature) {
    // Use the new feature provided by the plugin
  }

  // ...
};
            `}
          </pre>
        </li>
      </ol>
      <h4 className="text-lg font-semibold mt-6 mb-2">Plugin Best Practices</h4>
      <ul className="list-disc pl-6 space-y-2">
        <li>Keep plugins focused on a single responsibility</li>
        <li>Document your plugin's functionality and any new config options it introduces</li>
        <li>Provide default values for any new config options to ensure backwards compatibility</li>
        <li>Use TypeScript for type safety when developing plugins</li>
        <li>Test your plugins thoroughly to ensure they don't conflict with existing functionality</li>
        <li>Implement error handling within your plugin to prevent it from crashing the core system</li>
        <li>Monitor the performance impact of your plugin and optimize it as needed</li>
        <li>Ensure your plugin does not introduce security vulnerabilities</li>
      </ul>
    </div>
  );
};

export default PluginsDocumentation;
