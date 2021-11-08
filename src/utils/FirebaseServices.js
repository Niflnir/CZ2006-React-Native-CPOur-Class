import * as firebase from "firebase";

export default class FirebaseServices {
  /**
   * Retrieves OneMap API token from Firebase
   *
   * @returns {String} The OneMap API token
   */
  getToken() {
    var token;
    firebase
      .database()
      .ref(`TOKEN/`)
      .on("value", (snapshot) => {
        token = snapshot.val();
        // console.log("in: ", token);
      });
    // console.log("out: ", token);
    return token;
  }

  /**
   * Gets the list of destination-carpark pairs in the favourites list in Firebase
   *
   * @returns {Object} The list of destination-carpark pairs in the favourites list in Firebase
   */
  getFavourites() {
    var user = firebase.auth().currentUser.uid;
    var results;
    firebase
      .database()
      .ref(`Favourites/${user}/`)
      .on("value", (snapshot) => {
        results = snapshot.val();
      });
    return results;
  }

  /**
   * Checks whether or not the user is signed in to another device
   *
   * @returns {Promise} Whether or not the user is signed in to another device
   */
  async checkSignedIn() {
    var user = firebase.auth().currentUser.uid;
    const temp = { initialized: true };
    firebase.database().ref(`signedInStatus/`).update(temp);
    return new Promise(function (resolve, reject) {
      firebase
        .database()
        .ref(`signedInStatus/${user}`)
        .on("value", (snapshot) => {
          if (snapshot.val() == null || snapshot.val().signedIn == null) {
            resolve(false);
          } else {
            resolve(snapshot.val().signedIn);
          }
        });
    });
  }
}
