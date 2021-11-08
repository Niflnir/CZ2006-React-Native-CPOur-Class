import * as Location from "expo-location";

export default class LocationServices {
  /**
   * Retrieves data on user's current location
   *
   * @returns {String}  Latitude and longitude values of user's current location
   */
  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    var latLong =
      location["coords"]["latitude"] + "," + location["coords"]["longitude"];
    return latLong;
  }

  /**
   * Asks user for permission to access location services
   *
   */
  async getLocationPermission() {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. You will only be able to access limited features of this app."
      );
    }
  }
}
