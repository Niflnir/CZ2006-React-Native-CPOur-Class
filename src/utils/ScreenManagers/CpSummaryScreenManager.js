import NearbyPgsTable from "../db/NearbyPgsTable";
import firebase from "firebase";
import FavouritesTable from "../db/FavouritesTable";
import { Linking } from "react-native";
import Services from "../Services";

export default class CpSummaryScreenManager {
  tableHandler(latLong) {
    const nearbyPgsTable = new NearbyPgsTable();
    nearbyPgsTable.createNearbyPgsTable(latLong);
  }
  // Add carpark to the favourites page
  addToFavourites(cpInfo, postal, locationInfo) {
    const fav = new FavouritesTable();
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Favourites/${user}/${cpInfo.car_park_no}/${postal}`)
      .update({ cpInfo: cpInfo, locationInfo: locationInfo });
    fav.createFavouritesTable();
  }
  // Remove carpark from favourties page
  removeFromFavourites(car_park_no, postal) {
    const fav = new FavouritesTable();
    var user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Favourites/${user}/${car_park_no}/${postal}`)
      .remove();
    fav.createFavouritesTable();
  }
  // Check if carpark is favourited
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
