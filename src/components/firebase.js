import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDpZB5vh9YhgOOOIxU4p-VI5zHKWx9PrDQ",
    authDomain: "unichat-9f63c.firebaseapp.com",
    projectId: "unichat-9f63c",
    storageBucket: "unichat-9f63c.appspot.com",
    messagingSenderId: "666061276614",
    appId: "1:666061276614:web:7105721d461e4ea4659ec7"
}).auth();