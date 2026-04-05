import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// ADD THIS: Essential for React Toastify to look correct
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);