// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "attendance-system-8796f.firebaseapp.com",

    projectId: "attendance-system-8796f",

    storageBucket: "attendance-system-8796f.firebasestorage.app",

    messagingSenderId: "652144461336",

    appId: "1:652144461336:web:79aa4049ed1a6d8ea3e56d",

    measurementId: "G-9M1CFTEK3K"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firebase Authentication

const auth = getAuth(app);


// Firestore Database

const db = getFirestore(app);


export { auth, db };
