// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM_JZkrVrZcSRkRWd6beCguFPovhoSE0w",
  authDomain: "lab-7e60e.firebaseapp.com",
  projectId: "lab-7e60e",
  storageBucket: "lab-7e60e.appspot.com",
  messagingSenderId: "904034830803",
  appId: "1:904034830803:web:0ec5aad9fcef14bed94726"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export {db, firebaseConfig, app}



