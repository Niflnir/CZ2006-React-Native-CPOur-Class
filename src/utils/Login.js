import * as firebase from "firebase";
export default class Login {
  #authenticated;
  FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
    authDomain: "otpauth-a7ce0.firebaseapp.com",
    projectId: "otpauth-a7ce0",
    storageBucket: "otpauth-a7ce0.appspot.com",
    messagingSenderId: "872099527391",
    appId: "1:872099527391:web:c9f35e7bef7d4b599c876a",
  };
  checkLoggedin() {
    try {
      if (this.FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(this.FIREBASE_CONFIG);
      }
    } catch (err) {
      // ignore app already initialized error on snack
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.#authenticated = true;
        console.log("Logged in");
      } else {
        this.#authenticated = false;
        console.log("Not logged in");
      }
    });
    console.log("there: ", this.#authenticated);
    return this.#authenticated;
  }
}
