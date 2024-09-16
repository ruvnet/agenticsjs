import React from 'react';
import { useUIConfig } from '../config/uiConfig';

const CodeBlock = ({ code }) => {
  const { config } = useUIConfig();
  const codeClass = `${config.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-4 rounded-md overflow-x-auto text-sm`;

  return (
    <pre className={codeClass}>
      <code>{code.trim()}</code>
    </pre>
  );
};

export default CodeBlock;