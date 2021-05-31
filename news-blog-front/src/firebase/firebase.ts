import firebase from "firebase";
import initializeApp from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyDfRe3T078Wf2INCVtd5puCN14JMcCD2qg",
    authDomain: "news-blog-5e51c.firebaseapp.com",
    projectId: "news-blog-5e51c",
    storageBucket: "news-blog-5e51c.appspot.com",
    messagingSenderId: "217891881068",
    appId: "1:217891881068:web:6f2b4c0e7dd3cdbd6a9849",
    measurementId: "G-T2LYW8VHLV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();