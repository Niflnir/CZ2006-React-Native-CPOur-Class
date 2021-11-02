import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import styles from "../styles/AppStyles";
import BtnRouteDetails from "./BtnRouteDetails";
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

const PgsMarkerInfo = ({ info }) => {
  const pgsInfo = info[0];
  const currentLatLong = info[1];
  const onPressPgsNav = (latLong) => {
    const url = Platform.select({
      ios: `maps:0,0?saddr=${currentLatLong}&daddr=${latLong}&directionsmode=driving`,
      android: `google.navigation:q=${latLong}&mode=d`,
    });
    Linking.openURL(url);
  };
  return (
    <View>
      <Text style={styles.txtMapLocationHeadings}>Petrol Station</Text>

      <Text style={styles.txtMapHeadings}>{pgsInfo.name}</Text>
      <Text style={styles.txtMapHeadings}>{pgsInfo.address}</Text>
      <Text style={styles.txtMapHeadings}>
        {pgsInfo.total_distance.toFixed(3)} km from carpark
      </Text>

      <TouchableOpacity
        style={[
          styles.btnBudgetingCalculateGrey,
          {
            borderRadius: 40,

            alignItems: "center",
            marginVertical: 20,
          },
        ]}
        onPress={() => onPressPgsNav(pgsInfo.latLong)}
      >
        <Text style={styles.txtBtnCpSummary1}>Start Navigation</Text>
        <Text style={styles.txtBtnCpSummary1}>(Google Maps)</Text>
      </TouchableOpacity>
    </View>
  );
};

export {
  CpMarkerInfo,
  CurrentMarkerInfo,
  DestinationMarkerInfo,
  PgsMarkerInfo,
};
