import FavouritesTable from "../db/FavouritesTable";
import * as firebase from "firebase";
import ApiServices from "../ApiServices";
import * as SQLite from "expo-sqlite";
import LocationServices from "../LocationServices";
import FirebaseServices from "../FirebaseServices";

db = SQLite.openDatabase("cpour.db");
/**
 * Manages interaction between FavouritesScreen and control classes
 */
class FavouritesScreenManager {
  /**
   * Removes exisiting destination-carpark pair from local favoutites table and user account in Firebase
   *
   * @param {String} car_park_no The carpark number of the selected carpark
   * @param {String} postal The postal code of the selected destination
   */
  removeFromFavourites(car_park_no, postal) {
    const fav = new FavouritesTable();
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Favourites/${user}/${car_park_no}/${postal}`)
      .remove();
    fav.createFavouritesTable();
  }

  /**
   * Initializes the favourites table and gets the user's current location
   *
   * @returns {Object} The details of the user's curret location
   */
  async initializeInfo() {
    const fav = new FavouritesTable();
    fav.createFavouritesTable();
    const apiServices = new ApiServices();
    const locationServices = new LocationServices();
    const fbServices = new FirebaseServices();
    var TOKEN = fbServices.getToken();
    TOKEN = fbServices.getToken();
    console.log(TOKEN);
    var info = {
      currentLatLong: "",
      currentPostalCode: "",
    };

    locationServices.getLocationPermission();

    await locationServices
      .getLocation()
      .then((data) => {
        info.currentLatLong = data;
        const URL =
          "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
          info.currentLatLong +
          "&token=" +
          TOKEN;
        apiServices.getData(URL).then((data) => {
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
   *
   * @returns {Promise} THe list of destination-carpark pairs in the user's favourites list
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
export default FavouritesScreenManager;
