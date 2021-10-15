// Displays detailed information about carpark

// TO DO: design and lot info for heavy vehicles and motorcycles
import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import styles from "../styles/AppStyles";
import * as Linking from "expo-linking";

export default class CpSummaryScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  #locationInfo = this.props.route.params.locationInfo;
  #currentLatLong = this.#locationInfo.currentLatLong;
  #status = this.props.route.params.status;
  #navigation = this.props.navigation;

  render() {
    const proceedToMapsHandler = () => {
      if (this.#status != "granted") {
        Alert.alert(
          "Warning",
          "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
        );
        return;
      }
      const url = Platform.select({
        ios: `maps:0,0?saddr=${this.#currentLatLong}&daddr=${
          this.#cpInfo.lat_long
        }&directionsmode=driving`,
        android: `google.navigation:q=${this.#cpInfo.lat_long}&mode=d`,
      });
      Linking.openURL(url);
    };

    const seeMapsHandler = () => {
      console.log(this.#locationInfo);
      const url = Platform.select({
        ios: `maps:0,0?q=Carpark@${this.#cpInfo.lat_long}`,
        android: `geo:0,0?q=${this.#currentLatLong}(Carpark)`,
      });
      Linking.openURL(url);
    };

    const budgetHandler = () => {
      this.#navigation.navigate("Budgeting");
    };
    return (
      <View style={styles.container}>
        <View syle={styles.containerWhite}>
          <Text style={styles.txtCPSummary}>Car Park Summary</Text>
          <Text style={styles.txtListItemsAddress}>
            Address: {this.#cpInfo.address}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Available car lots:
            {this.#cpInfo["c_lots_available"] != null
              ? this.#cpInfo["c_lots_available"]
              : "No information available"}
          </Text>
          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtListItemsAddress}>
              Available heavy vehicle lots: {this.#cpInfo["h_lots_available"]}
            </Text>
          ) : undefined}
          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtListItemsAddress}>
              Available motorcycle lots: {this.#cpInfo["y_lots_available"]}
            </Text>
          ) : undefined}
          <Text style={styles.txtListItemsAddress}>
            Car park type: {this.#cpInfo.car_park_type}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Payment type: {this.#cpInfo.type_of_parking_system}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Short term parking: {this.#cpInfo.short_term_parking}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Free parking: {this.#cpInfo.free_parking}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Night parking: {this.#cpInfo.night_parking}
          </Text>
        </View>
        <Button onPress={proceedToMapsHandler} title="Proceed to Google Maps" />
        <Button onPress={seeMapsHandler} title="See on Google Maps" />
        <Button onPress={budgetHandler} title="Budgeting" />
      </View>
    );
  }
}
