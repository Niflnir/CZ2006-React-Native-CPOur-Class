import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

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

export const setSignedOut = () => {
  var user = firebase.auth().currentUser.uid;
  firebase.database().ref(`signedInStatus/${user}`).update({ signedIn: false });
};

export const setSignedIn = () => {
  var user = firebase.auth().currentUser.uid;
  firebase.database().ref(`signedInStatus/${user}`).update({ signedIn: true });
};

export const addToFavourites = (cpInfo, postal, locationInfo) => {
  var user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`Favourites/${user}/${cpInfo.car_park_no}/${postal}`)
    .update({ cpInfo: cpInfo, locationInfo: locationInfo });
};
export const initializeFavourites = () => {
  var user = firebase.auth().currentUser.uid;
  const temp = { initialized: true };
  firebase.database().ref(`Favourites/${user}`).update(temp);
};

export const removeFromFavourites = (car_park_no, postal) => {
  var user = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`Favourites/${user}/${car_park_no}/${postal}`)
    .remove();
};
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
