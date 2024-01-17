import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppProvider } from './context';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
