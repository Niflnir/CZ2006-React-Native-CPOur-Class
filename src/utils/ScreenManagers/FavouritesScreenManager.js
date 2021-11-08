import FavouritesTable from "../db/FavouritesTable";
import firebase from "firebase";
import Services from "../Services";
import { getToken } from "../DbServices";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

db = SQLite.openDatabase("cpour.db");

export default class FavouritesScreenManager {
  removeFromFavourites(car_park_no, postal) {
    const fav = new FavouritesTable();
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Favourites/${user}/${car_park_no}/${postal}`)
      .remove();
    fav.createFavouritesTable();
  }

  async initializeInfo() {
    const fav = new FavouritesTable();
    fav.createFavouritesTable();
    const api = new Services();
    const TOKEN = getToken();
    var status;
    var info = {
      currentLatLong: "",
      currentPostalCode: "",
    };

    api
      .getLocationPermission()
      .then((data) => {
        status = data;
        if (status != "granted") {
          Alert.alert(
            "Warning",
            "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
          );
          return;
        }
      })
      .catch((error) => console.log("location error: ", error));

    await api
      .getLocation()
      .then((data) => {
        info.currentLatLong = data;
        const URL =
          "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
          info.currentLatLong +
          "&token=" +
          TOKEN;
        api.getData(URL).then((data) => {
          data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")
            ? (info.currentPostalCode = data["GeocodeInfo"][0]["POSTALCODE"])
            : (info.currentPostalCode = "Postal code unavailable");
        });
      })
      .catch((err) => console.log(URL, err));
    return info;
  }

  /**
   * Sets list to be displayed in flatlist
   */
  flListHandler() {
    console.log("getting list");
    var list;
    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM favourites",
          [],
          (tx, results) => {
            if (results.rows["_array"].length == 0) {
              list = [
                {
                  address: "No carparks in favourites list",
                  c_lots_available: "",
                  total_distance: "",
                },
              ];
            } else {
              list = results.rows["_array"];
            }
            resolve(list);
          },
          (tx, err) => console.log(err)
        );
      });
    });
  }
}
