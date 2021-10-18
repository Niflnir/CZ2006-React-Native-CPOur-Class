import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/AppStyles";
const CpMarkerInfo = (props) => {
  const cpInfo = props.cpInfo;
  return (
    <View>
      <Text style={styles.txtMapLocationHeadings}>Carpark</Text>

      <Text style={styles.txtMapHeadings}>Address: {cpInfo.address}</Text>
      <Text style={styles.txtMapHeadings}>Postal Code: {cpInfo.postal}</Text>
      <Text style={styles.txtMapHeadings}>
        Lots available (car): {cpInfo.c_lots_available}
      </Text>
      <Text style={styles.txtMapHeadings}>
        Parking rate: ${cpInfo.c_parking_rates_current}
      </Text>
    </View>
  );
};

const CurrentMarkerInfo = (props) => {
  const locationInfo = props.locationInfo;

  return (
    <View>
      <Text style={styles.txtMapLocationHeadings}>Current Location</Text>

      <Text style={styles.txtMapHeadings}>
        Postal Code: {locationInfo.currentPostalCode}
      </Text>
      <Text style={styles.txtMapHeadings}>
        Coordinates: {locationInfo.currentLatLong}
      </Text>
    </View>
  );
};

const DestinationMarkerInfo = (props) => {
  const locationInfo = props.locationInfo;

  return (
    <View>
      <Text style={styles.txtMapLocationHeadings}>Destination</Text>

      <Text style={styles.txtMapHeadings}>
        Address: {locationInfo.locationData.ADDRESS}
      </Text>
      <Text style={styles.txtMapHeadings}>
        Postal Code: {locationInfo.locationData.POSTAL}
      </Text>
    </View>
  );
};

export { CpMarkerInfo, CurrentMarkerInfo, DestinationMarkerInfo };
