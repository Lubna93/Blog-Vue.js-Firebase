import firebase from 'firebase/app';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDkho5vySJ1p2KKm0Na70OUwCgIMungcF8",
    authDomain: "test-3f607.firebaseapp.com",
    projectId: "test-3f607",
    storageBucket: "test-3f607.appspot.com",
    messagingSenderId: "419910439399",
    appId: "1:419910439399:web:b31094935a9e01269f2d42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();


