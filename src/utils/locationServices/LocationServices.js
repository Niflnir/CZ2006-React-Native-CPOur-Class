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
    return location;
  }

  /**
   * Asks user for permission to access location services
   * @returns {string} "Granted" if user has granted location permissions
   */
  async getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. You will only be able to access limited features of this app."
      );
      return;
    }
    return status;
  }
}
