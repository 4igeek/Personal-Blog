import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/css/index.css';
import App from './App';
import ContextProvider from './lib/Context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
        <App />
      </GoogleOAuthProvider>
    </ContextProvider>
  </React.StrictMode>
);
