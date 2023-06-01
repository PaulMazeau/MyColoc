// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5zQ__Vs4Zjj4Pn4BxbcW57RPfrSUGsic",
  authDomain: "hestiadev-813bc.firebaseapp.com",
  projectId: "hestiadev-813bc",
  storageBucket: "hestiadev-813bc.appspot.com",
  messagingSenderId: "69579247938",
  appId: "1:69579247938:web:36aee7ef0bb396784438db",
  measurementId: "G-326257C7HZ"
};

// Initialize Firebase
export const FB_APP = initializeApp(firebaseConfig);
export const FB_AUTH = getAuth(FB_APP);
export const FB_DB = getFirestore(FB_APP);
export const FB_STORE = getStorage(FB_APP);