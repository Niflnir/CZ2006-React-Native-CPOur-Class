import firebase from "firebase";
// FIREBASE databse configuration
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
try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}
// Check whether the user is signed in to the app
export const checkSignedIn = () => {
  var user = firebase.auth().currentUser.uid;
  var status;
  firebase
    .database()
    .ref(`signedInStatus/${user}`)
    .on("value", (snapshot) => {
      status = snapshot.val().signedIn;
    });
  return status;
};
// Sign out the user from the app
export const setSignedOut = () => {
  var user = firebase.auth().currentUser.uid;
  firebase.database().ref(`signedInStatus/${user}`).update({ signedIn: false });
};
// Sign in the user to the app
export const setSignedIn = () => {
  var user = firebase.auth().currentUser.uid;
  firebase.database().ref(`signedInStatus/${user}`).update({ signedIn: true });
};
// Add carpark to the favourites page
export const addToFavourites = (cpInfo, postal, locationInfo) => {
  var user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`Favourites/${user}/${cpInfo.car_park_no}/${postal}`)
    .update({ cpInfo: cpInfo, locationInfo: locationInfo });
};
//
export const initializeFavourites = () => {
  var user = firebase.auth().currentUser.uid;
  const temp = { initialized: true };
  firebase.database().ref(`Favourites/${user}`).update(temp);
};
// Remove carpark from favourties page
export const removeFromFavourites = (car_park_no, postal) => {
  var user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`Favourites/${user}/${car_park_no}/${postal}`)
    .remove();
};
// Check if carpark is favourited
export const checkIfFavourited = (car_park_no, postal) => {
  var user = firebase.auth().currentUser.uid;
  var status = false;
  firebase
    .database()
    .ref(`Favourites/${user}/`)
    .on("value", (snapshot) => {
      if (snapshot.val() != null && snapshot.val() != undefined) {
        if (snapshot.val().hasOwnProperty(car_park_no)) {
          if (snapshot.val()[car_park_no].hasOwnProperty(postal)) {
            status = true;
          }
        }
      }
    });
  return status;
};
// Get the list of favourted carparks
export const getFavourites = () => {
  var user = firebase.auth().currentUser.uid;
  var results;
  firebase
    .database()
    .ref(`Favourites/${user}/`)
    .on("value", (snapshot) => {
      results = snapshot.val();
    });
  return results;
};
// Gets token
export const getToken = () => {
  var token;
  firebase
    .database()
    .ref(`TOKEN/`)
    .on("value", (snapshot) => {
      token = snapshot.val();
      console.log("in: ", token);
    });
  console.log("out: ", token);
  return token;
};
