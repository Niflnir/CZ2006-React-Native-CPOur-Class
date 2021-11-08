import NearbyPgsTable from "../db/NearbyPgsTable";
import firebase from "firebase";
import FavouritesTable from "../db/FavouritesTable";
import { Linking } from "react-native";
import Services from "../Services";
/**
 * Manages interaction between CpSummaryScreen and control classes
 */
export default class CpSummaryScreenManager {
  /**
   * Creates nearbyPgsTable and populates with petrol stations near selected carpark
   *
   * @param {String} latLong The latitude and longitude values of the selected carpark
   */
  tableHandler(latLong) {
    const nearbyPgsTable = new NearbyPgsTable();
    nearbyPgsTable.createNearbyPgsTable(latLong);
  }

  /**
   * Adds selected destination-carpark pair to local favourites table and user account in Firebase
   *
   * @param {Object} cpInfo The details of the selected carpark
   * @param {String} postal The postal code of the selected destination
   * @param {Object} locationInfo The details of the selected destination
   */
  addToFavourites(cpInfo, postal, locationInfo) {
    const fav = new FavouritesTable();
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Favourites/${user}/${cpInfo.car_park_no}/${postal}`)
      .update({ cpInfo: cpInfo, locationInfo: locationInfo });
    fav.createFavouritesTable();
  }

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
   * Checks whether or not the selected destination-carpark pair is already in the favourites list
   *
   * @param {String} car_park_no The carpark number of the selected carpark
   * @param {String} postal The postal code of the selected destination
   * @returns {boolean} Whether or not the selected destination-carpark pair is already in the favourites list
   */
  checkIfFavourited(car_park_no, postal) {
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
  }
  /**
   * When user presses "Google Maps - Fastest" button, launches Google Maps application with turn-by-turn navigatoin from
   * user's current location to selected carpark
   *
   * If location permissions denied, displays error message
   *
   * @param {String} currentLatLong The latitude and longitude values of the user's current location
   * @param {String} cpLatLong The latitude and longitude values of the selected carpark
   */
  proceedToMapsHandler(currentLatLong, cpLatLong) {
    const services = new Services();
    services.getLocationPermission();
    const url = Platform.select({
      ios: `maps:0,0?saddr=${currentLatLong}&daddr=${cpLatLong}&directionsmode=driving`,
      android: `google.navigation:q=${cpLatLong}&mode=d`,
    });
    Linking.openURL(url);
  }

  /**
   * When user presses "Google Maps - Cheapest" button, launches Google Maps application to displays toll-free routes amongst others from
   * user's current location to selected carpark
   *
   * If location permissions denied, displays error message
   *
   * @param {String} currentLatLong The latitude and longitude values of the user's current location
   * @param {String} cpLatLong The latitude and longitude values of the selected carpark
   */
  proceedToMapsHandler2(currentLatLong, cpLatLong) {
    const services = new Services();
    services.getLocationPermission();
    const url =
      "http://maps.google.com/maps?saddr=" +
      currentLatLong +
      "&daddr=" +
      cpLatLong +
      "&dirflg=d,t";

    Linking.openURL(url);
  }
}
