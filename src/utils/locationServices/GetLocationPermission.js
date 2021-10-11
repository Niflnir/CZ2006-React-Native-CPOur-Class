// To get user's permission to access location services

import { Alert } from "react-native";
import * as Location from "expo-location";

const getLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Warning",
      "Permission to access location was denied. You will only be able to access limited features of this app."
    );
    return;
  }
  return status;
};

export default getLocationPermission;
