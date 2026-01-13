import React from 'react'
import ReactDOM from 'react-dom' // Note: NOT 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Application entry point for React 17.
 * Mounts the App component to the root DOM element with error handling.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : '';
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace;">
      <h1>Error Mounting React App</h1>
      <p><strong>Message:</strong> ${errorMessage}</p>
      ${errorStack ? `<pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${errorStack}</pre>` : ''}
    </div>
  `;
}
