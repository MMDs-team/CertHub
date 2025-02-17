import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css';
import { UserProvider } from './context/UserContext';
import { TemplateProvider } from './context/TemplateContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TemplateProvider>
        <App />
      </TemplateProvider>
    </UserProvider>
  </React.StrictMode>
);