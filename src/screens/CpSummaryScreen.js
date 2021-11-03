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
  ScrollView,
  View,
  StatusBar,
} from "react-native";
import styles from "../styles/AppStyles";
import * as Linking from "expo-linking";
import {
  addToFavourites,
  checkIfFavourited,
  removeFromFavourites,
} from "../utils/DbServices";
import { Icon } from "react-native-elements";
import FavouritesTable from "../utils/db/FavouritesTable";
import NearbyPgsTable from "../utils/db/NearbyPgsTable";

/**
 * Displays detailed carpark information summary and allows user access to favourites, budgeting, and journey planning features
 * @property {Object} cpInfo Carpark information received from MainSearchScreen
 * @property {Object} locationInfo Location information received from MainSearchScreen
 * @property {string} currentLatLong Latitude and longitude values of current location receieved from MainSearchScreen
 * @property {string} status Whether or not user has granted location permissios, received from MainSearchScreen
 */
export default class CpSummaryScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  #locationInfo = this.props.route.params.locationInfo;
  #currentLatLong = this.#locationInfo.currentLatLong;
  #status = this.props.route.params.status;
  #navigation = this.props.navigation;

  constructor(props) {
    super(props);
    this.state = {
      favourited: checkIfFavourited(
        this.#cpInfo.car_park_no,
        this.#locationInfo.postal
      ),
    };
  }

  componentDidMount() {
    const nearbyPgsTable = new NearbyPgsTable();
    // nearbyPgsTable.drop();
    nearbyPgsTable.createNearbyPgsTable(this.#cpInfo.lat_long);
  }

  /**
   * Displays UI components of screen
   */
  render() {
    var address;
    var postal;
    if (this.#locationInfo.address == "") {
      address = "Current location";
      postal = "000000";
    } else {
      address = this.#locationInfo.address;
      postal = this.#locationInfo.locationData.POSTAL;
    }

    /**
     * When user presses "Google Maps - Fastest" button, launches Google Maps application with turn-by-turn navigatoin from
     * user's current location to selected carpark
     *
     * If location permissions denied, displays error message
     */
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

    /**
     * When user presses "Google Maps - Cheapest" button, launches Google Maps application to displays toll-free routes amongst others from
     * user's current location to selected carpark
     *
     * If location permissions denied, displays error message
     */
    const proceedToMapsHandler2 = () => {
      if (this.#status != "granted") {
        Alert.alert(
          "Warning",
          "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
        );
        return;
      }
      const url =
        "http://maps.google.com/maps?saddr=" +
        this.#currentLatLong +
        "&daddr=" +
        this.#cpInfo.lat_long +
        "&dirflg=d,t";

      Linking.openURL(url);
    };

    /**
     * When user presses "Budgeting" button, directs user to BudgetingScreen
     */
    const budgetHandler = () => {
      this.#navigation.navigate("Budgeting", {
        cpInfo: this.#cpInfo,
      });
    };

    /**
     * When user presses "Favourites" button, adds carpark-destination pair to favourites list, or removes it from
     * favourites list if already there
     */
    const favouritesHandler = () => {
      const fav = new FavouritesTable();
      if (this.state.favourited) {
        removeFromFavourites(this.#cpInfo.car_park_no, postal);

        this.setState({ favourited: false });
      } else {
        addToFavourites(this.#cpInfo, postal, this.#locationInfo);
        this.setState({ favourited: true });
      }
      fav.createFavouritesTable();
    };

    /**
     * When user presses "Routes" button, directs user to MapsScreen
     */
    const mapHandler = () => {
      this.#navigation.navigate("Maps", {
        cpInfo: this.#cpInfo,
        locationInfo: this.#locationInfo,
      });
    };

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            backgroundColor: "#444444",
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <StatusBar backgroundColor="#444444" />

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
        </View>
        <ScrollView
          style={[styles.svContainer, { padding: 20, paddingTop: 0 }]}
        >
          <Text style={[styles.txtCpSummaryHeadings, { marginTop: 14 }]}>
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
              ${this.#cpInfo.c_parking_rates_current}/30 min
            </Text>
          ) : (
            <Text style={styles.txtCpSummaryInfo}>
              Free parking available now
            </Text>
          )}

          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Available lots (heavy vehicle)
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
            <Text style={styles.txtCpSummaryInfo}>$1.20/30 min</Text>
          ) : undefined}

          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtCpSummaryHeadings}>
              Available lots (motorcycle)
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
            <Text style={styles.txtCpSummaryInfo}>$0.65/slot (day)</Text>
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

          <Text style={styles.txtCpSummaryHeadings}>Carpark number</Text>
          <Text style={styles.txtCpSummaryInfo}>
            {this.#cpInfo.car_park_no}
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={[styles.btnCpSummary, { flex: 0 }]}
          onPress={() => proceedToMapsHandler()}
        >
          <Text style={styles.txtBtnCpSummary1}>Google Maps - Fastest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCpSummary, { flex: 0, marginTop: 10 }]}
          onPress={() => proceedToMapsHandler2()}
        >
          <Text style={styles.txtBtnCpSummary1}>Google Maps - Cheapest</Text>
        </TouchableOpacity>
        <View style={styles.containerBtnCpSummary}>
          <TouchableOpacity style={styles.btnCpSummary} onPress={budgetHandler}>
            <Text style={styles.txtBtnCpSummary1}>Budgeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCpSummary} onPress={mapHandler}>
            <Text style={styles.txtBtnCpSummary1}>Routes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCpSummary}
            onPress={favouritesHandler}
          >
            <Text style={styles.txtBtnCpSummary2}>Favourite</Text>
            {this.state.favourited ? (
              <Icon
                color="#d0312d"
                style={{ marginRight: 4 }}
                size={20}
                name="heart"
                type="font-awesome"
              />
            ) : (
              <Icon
                color="#d0312d"
                style={{ marginRight: 4 }}
                size={20}
                name="heart-o"
                type="font-awesome"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
