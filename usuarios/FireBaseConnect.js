import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDsy_TW5QY3krlhECwb0giw8OF7Mo7qzvE",
    authDomain: "aulasenac-a9f98.firebaseapp.com",
    databaseURL: "https://aulasenac-a9f98-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aulasenac-a9f98",
    storageBucket: "aulasenac-a9f98.appspot.com",
    messagingSenderId: "348708341234",
    appId: "1:348708341234:web:8f4216319e3d1eb12dd76b",
    measurementId: "G-SG86QP50BF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase