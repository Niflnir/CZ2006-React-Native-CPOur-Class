import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Portal } from "react-native-paper";
import styles from "../styles/AppStyles";
const BtnRouteDetails = ({ onPressRoute, onPressPgs }) => {
  return (
    <Portal>
      <View style={styles.containerMapBtns}>
        <TouchableOpacity
          style={styles.btnMapRouteDetails}
          onPress={onPressRoute}
        >
          <Text style={styles.txtMapRouteDetails}>Route details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnMapRouteDetails}
          onPress={onPressPgs}
        >
          <Text style={styles.txtMapRouteDetails}>Petrol Stations</Text>
        </TouchableOpacity>
      </View>
    </Portal>
  );
};

export default BtnRouteDetails;
