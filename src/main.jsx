import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initAnalytics, track } from './lib/analytics';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

initAnalytics();

// Count resume downloads wherever the link appears (no-op unless analytics is enabled).
document.addEventListener('click', (e) => {
  const link = e.target.closest?.('a[download]');
  if (link) track('resume_download');
});
