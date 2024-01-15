// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfNB8Xj9FlWCeLNi-DyBcZU9jfLuWXeXc",
    authDomain: "sunglass-hut-e7758.firebaseapp.com",
    projectId: "sunglass-hut-e7758",
    storageBucket: "sunglass-hut-e7758.appspot.com",
    messagingSenderId: "733552214772",
    appId: "1:733552214772:web:888d498dc70cb870f854a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app, firebaseConfig};