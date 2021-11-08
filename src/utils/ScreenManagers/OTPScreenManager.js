import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import {
  checkSignedIn,
  initializeFavourites,
  setSignedIn,
} from "../DbServices";
import * as firebase from "firebase";
import { Alert } from "react-native";

export default class OTPScreenManager {
  checkValidSignIn() {
    var valid = false;
    checkSignedIn().then((data) => {
      if (!data) {
        valid = true;
        const nearbyCpInfoTable = new NearbyCpInfoTable();
        nearbyCpInfoTable.createNearbyCpInfoTable();
        initializeFavourites();
        setSignedIn();
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
}
