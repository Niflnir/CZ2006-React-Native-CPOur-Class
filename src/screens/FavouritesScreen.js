// Displays list of favourited carparks/locations

// TO DO: everything

import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../styles/AppStyles";
import * as SQLite from "expo-sqlite";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import LocationServices from "../utils/locationServices/LocationServices";
import GetData from "../utils/api/GetData";
import FavouritesTable from "../utils/db/FavouritesTable";
import { getToken } from "../utils/DbServices";
import NearbyCpInfoTable from "../utils/db/NearbyCpInfoTable";
import GetLots from "../utils/api/GetLots";
db = SQLite.openDatabase("cpour.db");

export default class FavouritesScreen extends Component {
  #navigation = this.props.navigation;
  #status = {};
  #getLocationServices = new LocationServices();
  #fav = new FavouritesTable();
  #info = {
    locationData: {},
    latLong: {},
    address: "",
    currentLatLong: "",
    currentPostalCode: "",
  };
  #lotData;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.initializeInfo();
  }
  async initializeInfo() {
    this.#fav.createFavouritesTable();
    const TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc5NjAsInVzZXJfaWQiOjc5NjAsImVtYWlsIjoiYXBwLmNwLm91ckBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MzQ2MTk1NzQsImV4cCI6MTYzNTA1MTU3NCwibmJmIjoxNjM0NjE5NTc0LCJqdGkiOiI1ZmRhYzU2MzkxY2NlYTYwNDgyY2QyMWExYzNkM2NiMiJ9.QKQ1j9ozayJYu_TViSO2d0yA_dKvyoyIvan0w6_eDeg";
    this.#getLocationServices
      .getLocationPermission() // to get user's permission to access location services
      .then((data) => {
        this.#status = data;
      })
      .catch((error) => console.log("location error: ", error));

    await this.#getLocationServices.getLocation().then((data) => {
      // to get actual location of user (latlong and postal code)
      this.#info.currentLatLong =
        JSON.stringify(data["coords"]["latitude"]) +
        "," +
        JSON.stringify(data["coords"]["longitude"]);

      const getData = new GetData();
      const URL =
        "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
        this.#info.currentLatLong +
        "&token=" +
        TOKEN;
      getData.getData(URL).then((data) => {
        data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")
          ? (this.#info.currentPostalCode =
              data["GeocodeInfo"][0]["POSTALCODE"])
          : (this.#info.currentPostalCode = "Postal code unavailable");
      });
    });

    setTimeout(() => this.flListHandler(), 5000);
  }

  flListHandler() {
    console.log("getting list");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favourites",
        [],
        (tx, results) => {
          if (results.rows["_array"].length == 0) {
            this.setState({
              list: [
                {
                  address: "No carparks in favourites list",
                  c_lots_available: "",
                  total_distance: "",
                },
              ],
            });
          } else {
            this.setState({ list: results.rows["_array"] });
          }
        },
        (tx, err) => console.log(err)
      );
    });
  }
  render() {
    const selectItem = (item) => {
      console.log(item);
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
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.containerFlatListItems}
            onPress={() => selectItem(item)}
          >
            <Text style={styles.txtListItemsBuilding}>{item["address"]}</Text>
            <Text style={styles.txtListItemsAddress}>
              Lot availability:{" "}
              {item["c_lots_available"] != null
                ? item["c_lots_available"]
                : "No information available"}
            </Text>
            <Text style={styles.txtListItemsAddress}>
              Distance: {item["total_distance"]} km
            </Text>
            {item["c_parking_rates_current"] != 0 ? (
              <Text style={styles.txtListItemsAddress}>
                Parking rate: ${item["c_parking_rates_current"]}
              </Text>
            ) : (
              <Text style={styles.txtListItemsAddress}>
                Free parking available now
              </Text>
            )}
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.txtFavHeading}>Favourites</Text>
        <View style={styles.containerFl}>
          <FlatList
            style={styles.containerFlatList}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.list}
            renderItem={renderListItems}
          />
        </View>
      </View>
    );
  }
}
