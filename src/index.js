import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Modified this line
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCGd8ysoTMMouKUUKjqsZ0R4EIX307xZiE",
    authDomain: "course-reviews-nz.firebaseapp.com",
    projectId: "course-reviews-nz",
    storageBucket: "course-reviews-nz.appspot.com",
    messagingSenderId: "352582236185",
    appId: "1:352582236185:web:88ccaa6750d8a19584d288"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export the database and auth instances
export { db, auth };


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
