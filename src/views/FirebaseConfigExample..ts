import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();