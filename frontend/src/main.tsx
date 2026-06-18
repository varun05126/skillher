import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Global error listeners
window.addEventListener('error', (e) => {
  console.error('GLOBAL ERROR', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('UNHANDLED PROMISE', e.reason);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);