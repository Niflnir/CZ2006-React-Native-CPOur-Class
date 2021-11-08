import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../styles/AppStyles";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import FavouritesScreenManager from "../utils/ScreenManagers/FavouritesScreenManager";

/**
 * Displays list of destination-carpark pairs in user's favourites list
 * @property {string} status Whether or not user has granted location permissions
 * @property {API} api Object of API class
 * @property {FavouritesTable} fav Object of FavouritesTable class
 * @property {boolean} grey Whether or not current item in favourites list should be displayed with grey background
 * @property {Object} info Current location data
 * @property {string} info.currentLatLong Latitude and longitude of current location
 * @property {string} info.currentPostalCode Postal code of current location
 * @property {boolean} loading Whether or not the favourites list is loading
 */
export default class FavouritesScreen extends Component {
  #navigation = this.props.navigation;
  #status = "";
  #grey = false;
  #info = {
    currentLatLong: "",
    currentPostalCode: "",
  };
  #loading = true;
  #manager = new FavouritesScreenManager();
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener("focus", () => {
      this.#loading = true;
      this.#info = this.#manager.initializeInfo();
      setTimeout(
        () =>
          this.#manager
            .flListHandler()
            .then((data) => this.setState({ list: data })),
        2000
      );
      this.#loading = false;
    });
  }

  /**
   * Displays UI components of screen
   */
  render() {
    /**
     * When user selects specific destination-carpark pair from favourites list, directs user to corresponding CpSummaryScreen
     * @param {Object} item Data of destination-carpark pair selected by user
     */
    const selectItem = (item) => {
      var postal;
      var latLong;
      if (item.destination_address == "") {
        latLong = this.#info.currentLatLong;
        postal = "000000";
      } else {
        latLong = item.destination_latlong;
        postal = item.destination_postal;
      }
      var locationInfo = {
        address: item.destination_address,
        currentLatLong: this.#info.currentLatLong,
        latLong: latLong,
        postal: postal,
        locationData: { POSTAL: (postal = item.destination_postal) },
        currentPostalCode: this.#info.currentPostalCode,
      };
      this.#navigation.navigate("Summary", {
        cpInfo: item,
        locationInfo: locationInfo,
        status: this.#status,
      });
    };

    /**
     * When user selects "Remove" button, removes destination-carpark pair from local storage and user database
     * @param {Object} item Data of destination-carpark pair to be deleted
     */
    const deleteItem = (item) => {
      var postal;
      if (item.destination_address == "Current location") {
        postal = "000000";
      } else {
        postal = item.destination_postal;
      }
      this.#manager.removeFromFavourites(item.car_park_no, postal);
      this.#loading = true;
      this.initializeInfo();
    };

    /**
     * Sets styling and data of each item to be displayed in flatlist
     * @param {*} item Data of destination-carpark pair to be styled and displayed
     * @returns {*} Styled data
     */
    const renderListItems = ({ item }) => {
      if (item["address"] == "No carparks in favourites list") {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.containerFlatListItems}
          >
            <Text style={styles.txtNoCarparks}>
              No carparks in favourites list
            </Text>
          </TouchableOpacity>
        );
      }
      var bgc = "white";
      if (this.#grey) {
        bgc = "#e5e5e5";
      }
      this.#grey = !this.#grey;
      return (
        <View
          style={{
            paddingBottom: 10,
            backgroundColor: bgc,
          }}
        >
          <TouchableOpacity
            style={[styles.containerFlatListItems, { flex: 1 }]}
            onPress={() => selectItem(item)}
          >
            <Text style={[styles.txtDestinationTitle, { color: "black" }]}>
              Destination
            </Text>
            <Text style={styles.txtDestination} numberOfLines={1}>
              {item.destination_address == ""
                ? "Current location"
                : item.destination_address}
            </Text>
            <Text style={[styles.txtDestinationTitle, { color: "black" }]}>
              Carpark
            </Text>
            <Text style={styles.txtDestination} numberOfLines={1}>
              {item.address}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
              <Text style={styles.txtListItemsAddress}>
                {item["c_lots_available"] != null
                  ? "Lots available: " + item["c_lots_available"]
                  : "No lot info"}
              </Text>
              <Text style={styles.txtListItemsAddress}>
                Distance: {item["total_distance"] * 1000} m
              </Text>

              <Text style={styles.txtListItemsAddress}>
                Parking fee: ${item["c_parking_rates_current"].toFixed(2)}/30
                min
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#444444",
                borderRadius: 30,
                padding: 10,
                marginHorizontal: 10,
                marginTop: 30,
                flexDirection: "row",
              }}
              onPress={() => deleteItem(item)}
            >
              <Text
                style={{
                  color: "white",
                  marginHorizontal: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                Remove
              </Text>
              <Icon
                name="trash"
                type="font-awesome"
                size={17}
                color="#d3d3d3"
                style={{ marginTop: 3 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "#444444",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.txtFavHeading}>Favourites</Text>
          <Icon
            color="#d0312d"
            style={{ paddingBottom: 5 }}
            size={30}
            name="heart"
            type="font-awesome"
          />
        </View>
        <View style={styles.containerFl}>
          {this.#loading ? (
            <ActivityIndicator size="large" color="#444444" />
          ) : (
            <FlatList
              style={styles.containerFlatList}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.list}
              renderItem={renderListItems}
            />
          )}
        </View>
      </View>
    );
  }
}
