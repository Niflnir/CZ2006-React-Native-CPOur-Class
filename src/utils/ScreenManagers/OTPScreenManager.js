import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import Services from "../Services";
import * as firebase from "firebase";
import { Alert } from "react-native";

export default class OTPScreenManager {
  checkValidSignIn() {
    const services = new Services();
    var valid = false;
    services.checkSignedIn().then((data) => {
      if (!data) {
        valid = true;
        const nearbyCpInfoTable = new NearbyCpInfoTable();
        nearbyCpInfoTable.createNearbyCpInfoTable();
        this.initializeFavourites();
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
  setSignedIn() {
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`signedInStatus/${user}`)
      .update({ signedIn: true });
  }

  initializeFavourites() {
    var user = firebase.auth().currentUser.uid;
    const temp = { initialized: true };
    firebase.database().ref(`Favourites/${user}`).update(temp);
  }
}
