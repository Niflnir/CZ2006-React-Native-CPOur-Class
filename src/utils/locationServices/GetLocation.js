// To get current location info

import * as Location from "expo-location";

const getLocation = async () => {
  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export default getLocation;
