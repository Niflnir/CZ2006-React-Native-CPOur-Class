import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import Services from "../Services";
import * as firebase from "firebase";
import { Alert } from "react-native";
/**
 * Manages interaction between OTPScreen and control classes
 */
export default class OTPScreenManager {
  /**
   * Checks whether the user is already logged into another device
   *
   * @returns {boolean} Whether the user is already logged into another device
   */
  checkValidSignIn() {
    const services = new Services();
    var valid = false;
    services.checkSignedIn().then((data) => {
      if (!data) {
        valid = true;
        const nearbyCpInfoTable = new NearbyCpInfoTable();
        nearbyCpInfoTable.createNearbyCpInfoTable();
        this.initialiseFavourites();
        this.setSignedIn();
      } else {
        Alert.alert(
          "Error",
          "Existing account found under this phone number is currently logged into another device. Please logout and try again, or register an account under a different phone number."
        );
        firebase.auth().signOut();
      }
    });
    return valid;
  }

  /**
   * Sets the user's currently logged in status to true in Firebase
   */
  setSignedIn() {
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`signedInStatus/${user}`)
      .update({ signedIn: true });
  }

  /**
   * Initializes user's favourites list in Firebase
   */
  initialiseFavourites() {
    var user = firebase.auth().currentUser.uid;
    const temp = { initialized: true };
    firebase.database().ref(`Favourites/${user}`).update(temp);
  }
}
