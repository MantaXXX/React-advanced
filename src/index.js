import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { AuthContextProvider } from './store/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// 將 Login/Logout component 邏輯包在最外層
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
