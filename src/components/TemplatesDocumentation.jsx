import React from 'react';
import { useUIConfig } from '../config/uiConfig';

const TemplatesDocumentation = () => {
  const { config } = useUIConfig();

  return (
    <div className={`${config.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h3 className="text-xl font-semibold mb-4">Templates</h3>
      <p className="mb-4">Agentic UI provides a set of customizable templates for common UI patterns:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Search Results Layout</strong>
          <p>A responsive layout for displaying search results with expandable sections for Pro Search and Sources.</p>
        </li>
        <li>
          <strong>Settings Modal</strong>
          <p>A customizable modal for user preferences, including theme selection, language settings, and UI customizations.</p>
        </li>
        <li>
          <strong>Documentation Modal</strong>
          <p>An organized modal for displaying documentation, with tabs for different sections like SDK, Templates, CSS, Themes, and Plugins.</p>
        </li>
        <li>
          <strong>Initial Screen</strong>
          <p>A welcoming start screen with a prominent search bar and example queries to guide users.</p>
        </li>
        <li>
          <strong>Top Navigation</strong>
          <p>A responsive navigation bar with customizable icons and actions.</p>
        </li>
      </ul>
      <p className="mt-4">These templates are designed to be easily customizable and extendable to fit your specific needs.</p>
    </div>
  );
};

export default TemplatesDocumentation;