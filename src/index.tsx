import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // si quieres usar estilos globales, o puedes omitir

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
