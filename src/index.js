import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase-config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <FirebaseAppProvider firebaseConfig={firebaseConfig}>
   <Suspense fallback={<p>Loading...</p>}>
   <App />
   </Suspense>
   </FirebaseAppProvider>
  </React.StrictMode>
);

reportWebVitals();
