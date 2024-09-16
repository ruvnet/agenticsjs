# Agentic UI Plugin System

## Overview

The Agentic UI Plugin System allows developers to extend and customize the functionality of the application without modifying the core codebase. This document provides guidelines for creating, implementing, and managing plugins.

## Plugin Interface

Plugins should adhere to the following interface:

```typescript
interface AgenticUIPlugin {
  id: string;
  version: string;
  setup: (config: AgenticUIConfig) => AgenticUIConfig;
}
```

## Creating a Plugin

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

## Registering and Applying Plugins

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

## Managing Plugins

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

## Best Practices

1. **Single Responsibility**: Keep plugins focused on a single task.
2. **Error Handling**: Implement proper error handling and null checks.
3. **Documentation**: Provide clear documentation for your plugin.
4. **Testing**: Thoroughly test your plugin with different configurations.
5. **Performance**: Optimize your plugin for performance.
6. **Compatibility**: Ensure your plugin is compatible with different versions of the core system.

## Example: Word Count Plugin

Here's an example of a word count plugin that adds the word count to search results:

```javascript
import { createPlugin } from '../config/uiConfig';

const wordCountPlugin = createPlugin(
  'wordCount',
  '1.0.0',
  (config) => {
    return {
      ...config,
      hooks: {
        ...config.hooks,
        afterSearch: [
          ...(config.hooks?.afterSearch || []),
          (results) => {
            if (results && results.answer) {
              const wordCount = results.answer.split(/\s+/).length;
              return {
                ...results,
                wordCount,
              };
            }
            return results;
          },
        ],
      },
    };
  }
);

export default wordCountPlugin;
```

To use this plugin:

1. Import it in your main application file:
   ```javascript
   import wordCountPlugin from './plugins/wordCountPlugin';
   ```

2. Register and apply the plugin:
   ```javascript
   import { registerPlugin, applyPlugin } from '../config/uiConfig';

   registerPlugin(wordCountPlugin);
   const updatedConfig = applyPlugin(config, wordCountPlugin);
   ```

3. Update your UI components to display the word count:
   ```jsx
   {results.wordCount && (
     <p>Word count: {results.wordCount}</p>
   )}
   ```

By following these guidelines and examples, you can create and integrate plugins that extend the functionality of the Agentic UI system while maintaining compatibility and performance.
