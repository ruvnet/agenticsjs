<a href="https://agenticjs.gptengineer.run/">
  <img src="https://raw.githubusercontent.com/ruvnet/agenticsjs/main/assets/home2.png?token=GHSAT0AAAAAACIVHP5X2PW7VBMOODBMEHBEZXILJVA" alt="AgenticJS Home">
</a>
<a href="https://agenticjs.gptengineer.run/">
  <img src="https://raw.githubusercontent.com/ruvnet/agenticsjs/main/assets/search.png?token=GHSAT0AAAAAACIVHP5XL6K4DR4RAHZOUZKSZXILKBA" alt="AgenticJS Home">
</a>

# AgenticsJS

AgenticsJS is a powerful and flexible JavaScript library designed to provide an intelligent and interactive search experience with real-time results, advanced visualization, and plugin capabilities. Built with Vite, React, and Tailwind CSS, AgenticsJS offers a seamless integration with modern web development workflows. It uses the same approach as Perplexity, the o1 for ChatGPT UI, and you.com style display of sequential queries and results.

## Demo
https://agenticjs.gptengineer.run

## Features

- **Real-time Search**: Get instant search results as you type.
- **Advanced Visualization**: Visualize search results with interactive charts and graphs.
- **Customizable**: Easily customize the look and feel to match your brand.
- **Modular Components**: Use only the components you need.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Plugin System**: Extend and customize functionality with plugins.

## Installation

To install AgenticsJS, you can use npm:

```sh
npm install agenticsjs
```

## Usage

Here's a basic example of how to use AgenticsJS in your project:

```javascript
import { App, SearchInput, SearchResults } from 'agenticsjs';

const MyApp = () => (
  <App>
    <SearchInput />
    <SearchResults />
  </App>
);

export default MyApp;
```

## Customization

AgenticsJS is highly customizable. You can override default styles and configurations to fit your needs. For example, to customize the theme:

```javascript
import { UIConfigProvider } from 'agenticsjs';

const customConfig = {
  theme: 'dark',
  searchBarPosition: 'top',
};

const MyApp = () => (
  <UIConfigProvider config={customConfig}>
    <App />
  </UIConfigProvider>
);

export default MyApp;
```

## API/SDK Overview

AgenticsJS provides a comprehensive API for developers to interact with the library. Below is an overview of the main components and their usage:

### App

The main component that wraps your application.

### SearchInput

A component for the search input field.

### SearchResults

A component to display search results.

### UIConfigProvider

A provider component to pass custom configurations to the library.

## Advanced Features

AgenticsJS also supports advanced features such as:

- **Pro Search**: Advanced search techniques for more accurate results.
- **Source Highlighting**: Highlight sources in the search results.
- **Error Handling**: Built-in error handling and reporting.

## Plugin System

AgenticsJS includes a powerful plugin system that allows you to extend and customize the functionality of the library. You can create, apply, and manage plugins to add new features or modify existing ones.

### Creating a Plugin

To create a plugin:

1. Define the plugin structure:

```javascript
import { createPlugin } from '../config/uiConfig';

const myPlugin = createPlugin(
  'myPluginId',
  '1.0.0',
  (config) => {
    // Modify config or add new features
    return {
      ...config,
      // Add your modifications here
    };
  }
);

export default myPlugin;
```

2. Ensure proper null checks when accessing config properties:

```javascript
(config) => {
  return {
    ...config,
    hooks: {
      ...config.hooks,
      afterSearch: [
        ...(config.hooks?.afterSearch || []),
        (results) => {
          // Your hook logic here
        },
      ],
    },
  };
}
```

### Registering and Applying Plugins

To use a plugin:

1. Import the plugin in your main application file:

```javascript
import myPlugin from './plugins/myPlugin';
```

2. Register the plugin:

```javascript
import { registerPlugin } from '../config/uiConfig';

registerPlugin(myPlugin);
```

3. Apply the plugin when updating the UI config:

```javascript
import { applyPlugin } from '../config/uiConfig';

const updatedConfig = applyPlugin(config, myPlugin);
```

### Managing Plugins

Use these functions to manage plugins:

- `registerPlugin(plugin)`: Register a new plugin
- `unregisterPlugin(pluginId)`: Unregister an existing plugin
- `listPlugins()`: List all registered plugins

Example:

```javascript
import { registerPlugin, unregisterPlugin, listPlugins } from '../config/uiConfig';

registerPlugin(myPlugin);
unregisterPlugin('myPluginId');
const plugins = listPlugins();
console.log(plugins);
```

### Best Practices

1. **Single Responsibility**: Keep plugins focused on a single task.
2. **Error Handling**: Implement proper error handling and null checks.
3. **Documentation**: Provide clear documentation for your plugin.
4. **Testing**: Thoroughly test your plugin with different configurations.
5. **Performance**: Optimize your plugin for performance.
6. **Compatibility**: Ensure your plugin is compatible with different versions of the core system.

For detailed implementation instructions and best practices, please refer to the [Plugin System Documentation](./src/docs/plugin_system.md).

## Running Demo Mode

To run AgenticsJS in demo mode, you can use the following command:

```sh
npm run demo
```

This will start a local server with a demo of AgenticsJS.

## Contributing

We welcome contributions from the community. Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License

AgenticsJS is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
