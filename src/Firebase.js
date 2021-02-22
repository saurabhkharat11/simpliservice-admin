import firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDRJDRG2j6RbjueIfZ9NT9WdqEM-C4OEDc",
    authDomain: "simpliservice-973d6.firebaseapp.com",
    projectId: "simpliservice-973d6",
    storageBucket: "simpliservice-973d6.appspot.com",
    messagingSenderId: "49511219196",
    appId: "1:49511219196:web:90856e1f42c3bd989a7c79",
    measurementId: "G-SVXDB68GRL"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;