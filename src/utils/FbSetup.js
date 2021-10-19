import * as firebase from "firebase";
import Auth from "firebase/auth";
import Database from "firebase/database";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
  authDomain: "otpauth-a7ce0.firebaseapp.com",
  databaseURL:
    "https://otpauth-a7ce0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "otpauth-a7ce0",
  storageBucket: "otpauth-a7ce0.appspot.com",
  messagingSenderId: "872099527391",
  appId: "1:872099527391:web:c9f35e7bef7d4b599c876a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export { firebase, Database, Auth };
