// To get current location info

import * as Location from "expo-location";
import { Alert } from "react-native";

export default class LocationServices {
  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    return location;
  }

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
