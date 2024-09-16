# AgenticJS

AgenticJS is a powerful and flexible JavaScript library designed to provide an intelligent and interactive search experience with real-time results and advanced visualization. Built with Vite, React, and Tailwind CSS, AgenticJS offers a seamless integration with modern web development workflows. It uses the same approach as Perplexity, the o1 for ChatGPT UI, and you.com style display of sequential queries and results.

## Features

- **Real-time Search**: Get instant search results as you type.
- **Advanced Visualization**: Visualize search results with interactive charts and graphs.
- **Customizable**: Easily customize the look and feel to match your brand.
- **Modular Components**: Use only the components you need.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To install AgenticJS, you can use npm:

```sh
npm install agenticjs
```

## Usage

Here's a basic example of how to use AgenticJS in your project:

```javascript
import { App, SearchInput, SearchResults } from 'agenticjs';

const MyApp = () => (
  <App>
    <SearchInput />
    <SearchResults />
  </App>
);

export default MyApp;
```

## Customization

AgenticJS is highly customizable. You can override default styles and configurations to fit your needs. For example, to customize the theme:

```javascript
import { UIConfigProvider } from 'agenticjs';

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

AgenticJS provides a comprehensive API for developers to interact with the library. Below is an overview of the main components and their usage:

### App

The main component that wraps your application.

### SearchInput

A component for the search input field.

### SearchResults

A component to display search results.

### UIConfigProvider

A provider component to pass custom configurations to the library.

## Advanced Features

AgenticJS also supports advanced features such as:

- **Pro Search**: Advanced search techniques for more accurate results.
- **Source Highlighting**: Highlight sources in the search results.
- **Error Handling**: Built-in error handling and reporting.

For more detailed information, please refer to the [API Documentation](./src/docs/api_documentation.md).

## Running Demo Mode

To run AgenticJS in demo mode, you can use the following command:

```sh
npm run demo
```

This will start a local server with a demo of AgenticJS.

## Contributing

We welcome contributions from the community. Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License

AgenticJS is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
