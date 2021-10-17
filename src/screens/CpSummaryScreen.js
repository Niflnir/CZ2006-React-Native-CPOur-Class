// Displays detailed information about carpark

// TO DO: design and lot info for heavy vehicles and motorcycles
import React, { Component } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
<<<<<<< HEAD
  Platform,
=======
  ScrollView,
  View,
>>>>>>> 2e77d7ec02a2b53ca0c5abd6b97be5d4ac668b50
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
      this.#navigation.navigate("Budgeting", {
        cpInfo: this.#cpInfo,
      });
    };

    const favouritesHandler = () => {
      this.#navigation.navigate("Favourites", {
        cpInfo: this.#cpInfo,
      });
    };
    return (
      <View style={styles.container}>
        <Text style={styles.txtDestinationTitle}>Destination</Text>
        <Text style={styles.txtDestination} numberOfLines={1}>
          {this.#locationInfo.address == ""
            ? "Current location"
            : this.#locationInfo.address}
        </Text>
        <Text style={styles.txtDestinationTitle}>Carpark</Text>
        <Text style={styles.txtDestination} numberOfLines={1}>
          {this.#cpInfo.address}
        </Text>
        <ScrollView style={styles.svContainer}>
          <Text style={styles.txtCpSummaryHeadings}>
            Destination / Carpark Postal Code
          </Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#locationInfo.address == ""
              ? this.#locationInfo.currentPostalCode
              : this.#locationInfo.locationData.POSTAL}{" "}
            / {this.#cpInfo.postal}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Available lots (car)</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo["c_lots_available"] != null
              ? this.#cpInfo["c_lots_available"]
              : "No information available"}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Parking rate (car)</Text>

          {this.#cpInfo["c_parking_rates_current"] != 0 ? (
            <Text style={styles.txtCpSummaryInfo}>
              ${this.#cpInfo.c_parking_rates_current}
            </Text>
          ) : (
            <Text style={styles.txtCpSummaryInfo}>
              Free parking available now
            </Text>
          )}

          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Avalilable lots (heavy vehicle)
            </Text>
          ) : undefined}
          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryInfo}>
              {this.#cpInfo["y_lots_available"]}
            </Text>
          ) : undefined}

          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Parking rate (heavy vehicle)
            </Text>
          ) : undefined}
          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryInfo}>
              ${this.#cpInfo.h_parking_rates_general}
            </Text>
          ) : undefined}

          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Avalilable lots (motorcycle)
            </Text>
          ) : undefined}
          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryInfo}>
              {this.#cpInfo["y_lots_available"]}
            </Text>
          ) : undefined}

          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Parking rate (motorcycle)
            </Text>
          ) : undefined}
          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryInfo}>
              ${this.#cpInfo.y_parking_rates_general}
            </Text>
          ) : undefined}

          <Text style={styles.txtCpSummaryHeadings}>Car park type</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.car_park_type}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>
            Type of parking system
          </Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.type_of_parking_system}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Short term parking</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.short_term_parking}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Free parking</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.free_parking}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Night parking</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.night_parking}
          </Text>

          <Text style={styles.txtCpSummaryHeadings}>Grace period</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.grace_period} minutes
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.btnCpSummaryMaps}
          onPress={proceedToMapsHandler}
        >
          <Text style={styles.txtContinue}>Proceed to Google Maps</Text>
        </TouchableOpacity>
        <View style={styles.containerBtnCpSummary}>
          <TouchableOpacity style={styles.btnCpSummary} onPress={budgetHandler}>
            <Text style={styles.txtBtnCpSummary1}>Budgeting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCpSummary}
            onPress={favouritesHandler}
          >
            <Text style={styles.txtBtnCpSummary2}>Add to Favourites</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
