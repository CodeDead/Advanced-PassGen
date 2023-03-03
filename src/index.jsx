import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainContextProvider from './contexts/MainContextProvider';
import PasswordContextProvider from './contexts/PasswordContextProvider';
import VaultContextProvider from './contexts/VaultContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainContextProvider>
      <PasswordContextProvider>
        <VaultContextProvider>
          <App />
        </VaultContextProvider>
      </PasswordContextProvider>
    </MainContextProvider>
  </React.StrictMode>,
);
