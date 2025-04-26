import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';  // Assicurati che sia importato dopo index.css
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register(); 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);


