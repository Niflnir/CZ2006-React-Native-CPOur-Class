import * as Location from "expo-location";
import { Alert } from "react-native";

/**
 * Manages location permissions
 */
export default class LocationServices {
  /**
   * Retrieves data on user's current location
   * @returns {Location.LocationObject} User's current location data
   */
  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    var latLong =
      location["coords"]["latitude"] + "," + location["coords"]["longitude"];
    return latLong;
  }

  /**
   * Asks user for permission to access location services
   * @returns {Location.PermissionStatus.GRANTED} "Granted" if user has granted location permissions
   */
  async getLocationPermission() {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. You will only be able to access limited features of this app."
      );
      return;
    } else {
      return "granted";
    }
  }
}
