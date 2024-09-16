import React from 'react';
import { useUIConfig } from '../config/uiConfig';

const CSSDocumentation = () => {
  const { config } = useUIConfig();
  const codeClass = `${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} p-4 rounded-md overflow-x-auto`;

  return (
    <div className={`${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h3 className="text-xl font-semibold mb-4">CSS Customization</h3>
      <p className="mb-4">Agentic UI uses Tailwind CSS for styling. You can customize the appearance by:</p>
      <ol className="list-decimal pl-6 space-y-4">
        <li>
          <strong>Modifying the tailwind.config.js file</strong>
          <p>Extend or override Tailwind's default theme:</p>
          <pre className={codeClass}>
            {`
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4A72FF',
        secondary: '#3C3C3C',
      },
      // Add more customizations here
    },
  },
  // ...
}
            `}
          </pre>
        </li>
        <li>
          <strong>Using Tailwind utility classes in your components</strong>
          <p>Leverage Tailwind's utility classes for rapid styling:</p>
          <pre className={codeClass}>
            {`
<div className="bg-primary text-white p-4 rounded-lg shadow-md hover:bg-opacity-90">
  <!-- Your content here -->
</div>
            `}
          </pre>
        </li>
        <li>
          <strong>Creating custom CSS classes</strong>
          <p>For more complex styles, create custom classes in a separate CSS file:</p>
          <pre className={codeClass}>
            {`
/* styles/custom.css */
.custom-button {
  @apply bg-primary text-white px-4 py-2 rounded-full transition-colors duration-300;
}

.custom-button:hover {
  @apply bg-opacity-90;
}
            `}
          </pre>
        </li>
      </ol>
      <p className="mt-4">Remember to import your custom CSS file in your main application file.</p>
    </div>
  );
};

export default CSSDocumentation;