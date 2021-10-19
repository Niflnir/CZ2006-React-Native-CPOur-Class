import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/AppStyles";
import * as SQLite from "expo-sqlite";
import { ButtonGroup, Chip } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import LocationServices from "../../utils/locationServices/LocationServices";
import NearbyCpInfoTable from "../../utils/db/NearbyCpInfoTable";
import SearchHistoryTable from "../../utils/db/SearchHistoryTable";
import CpInfoTable from "../../utils/db/CpInfoTable";
import SortFilter from "../../utils/SortFilter";
import GetData from "../../utils/api/GetData";
import FavouritesTable from "../../utils/db/FavouritesTable";
db = SQLite.openDatabase("cpour.db");

export default class MainSearchScreen extends Component {
  #info = {
    locationData: {},
    latLong: {},
    address: "",
    currentLatLong: "",
    currentPostalCode: "",
    postal: "",
  };
  #rendered = false;
  #status = {};
  #loading = false;
  #displaying = false;
  #navigation = this.props.navigation;
  #getLocationServices = new LocationServices();
  #searchHistoryTable = new SearchHistoryTable();
  #cpInfoTable = new CpInfoTable();
  #buttons = ["Vacancy", "Distance", "Parking Rate"];
  #sortOption = 0;
  #filterOption = [true, true, true, true, true];

  constructor(props) {
    super(props);
    this.state = {
      defaultAddress: "Search Here",
      txtStyle: false,
      list: [],
      sortOption: 0,
      outline: [true, true, true, true, true, true],
    };
  }

  componentDidMount() {
    this.#getLocationServices
      .getLocationPermission() // to get user's permission to access location services
      .then((data) => {
        this.#status = data;
      })
      .catch((error) => console.log("location error: ", error));

    this.#cpInfoTable.createCpInfoTable();
    this.#searchHistoryTable.createSearchHistoryTable();
    const fav = new FavouritesTable();
    fav.createFavouritesTable();
    // fav.print();
  }

  flListHandler() {
    const sortfilter = new SortFilter();
    const query = sortfilter.sortFilter(this.#sortOption, this.#filterOption);
    console.log("getting list");
    db.transaction((tx) => {
      this.#loading = false;
      tx.executeSql(query, [], (tx, results) => {
        if (results.rows["_array"].length == 0) {
          this.setState({
            list: [
              {
                address: "No nearby car parks found",
                c_lots_available: "",
                total_distance: "",
              },
            ],
          });
        } else {
          this.setState({ list: results.rows["_array"] });
        }
      });
    });
  }

  async paramHandler() {
    this.#displaying = true;
    this.#loading = true;
    // If user selects current location on SS
    if (this.#status !== "granted") {
      // check if permission granted
      Alert.alert(
        "Warning",
        "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
      );
      return;
    }
    await this.#getLocationServices.getLocation().then((data) => {
      // to get actual location of user
      this.#info.currentLatLong =
        JSON.stringify(data["coords"]["latitude"]) +
        "," +
        JSON.stringify(data["coords"]["longitude"]);

      const getData = new GetData();
      const TOKEN =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc5NjAsInVzZXJfaWQiOjc5NjAsImVtYWlsIjoiYXBwLmNwLm91ckBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MzQ2MTk1NzQsImV4cCI6MTYzNTA1MTU3NCwibmJmIjoxNjM0NjE5NTc0LCJqdGkiOiI1ZmRhYzU2MzkxY2NlYTYwNDgyY2QyMWExYzNkM2NiMiJ9.QKQ1j9ozayJYu_TViSO2d0yA_dKvyoyIvan0w6_eDeg";
      const URL =
        "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
        this.#info.currentLatLong +
        "&token=" +
        TOKEN;
      getData
        .getData(URL)
        .then((data) => {
          data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")
            ? (this.#info.currentPostalCode =
                data["GeocodeInfo"][0]["POSTALCODE"])
            : (this.#info.currentPostalCode = "Postal code unavailable");
        })
        .catch((err) => console.log(err, URL));
    });
    this.#info.postal = this.props.route.params.data["POSTAL"];

    if (this.props.route.params.data["BUILDING"] == "Current location") {
      this.#info.postal = "000000";
      this.#info.latLong = this.#info.currentLatLong;
      this.#info["locationData"]["ADDRESS"] = "Current location";
      this.#info["address"] = "";
    } else {
      this.#info["locationData"] = this.props.route.params.data;
      this.#info["address"] = this.#info["locationData"]["ADDRESS"];
      this.#info["latLong"] =
        this.#info["locationData"]["LATITUDE"] +
        "," +
        this.#info["locationData"]["LONGITUDE"];
    }
    this.setState({
      txtStyle: true,
      defaultAddress: this.#info["locationData"]["ADDRESS"],
    }); // change font to black, set address on search bar

    setTimeout(() => {
      const nearbyCpInfoTable = new NearbyCpInfoTable();
      nearbyCpInfoTable.setTable(
        this.#info["latLong"],
        this.#info.currentLatLong
      );
    }, 3000); ///////////////////////////////////// figure out a better way

    setTimeout(() => this.flListHandler(), 12000); ///////////////////////////////////////////// figure out a better way
  }

  componentDidUpdate() {
    if (this.props.route.params !== undefined && !this.#rendered) {
      this.#rendered = true;
      this.paramHandler();
    }
  }

  render() {
    // fav.createFavouritesTable();
    // setTimeout(() => fav.setFavouritesFromFb(), 1000);
    // // setTimeout(() => fav.print(), 5000);
    const onPressDestinationHandler = () => {
      this.#navigation.navigate("SearchSuggestions", {
        defaultValue: this.#info["address"],
      });
      this.#rendered = false;
    };

    const selectItem = (item) => {
      this.#navigation.navigate("Summary", {
        cpInfo: item,
        locationInfo: this.#info,
        status: this.#status,
      });
    };

    const renderListItems = ({ item }) => {
      if (item["address"] == "No nearby car parks found") {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.containerFlatListItems}
          >
            <Text style={styles.txtNoCarparks}>No nearby car parks found</Text>
          </TouchableOpacity>
        );
      }
      return (
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity
            style={{
              backgroundColor: "black",
              width: "2%",
              marginHorizontal: 10,
              height: "80%",
              alignSelf: "center",
            }}
          /> */}
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
    const onPress = (selectedIndex) => {
      this.setState({ sortOption: selectedIndex });
      this.#sortOption = selectedIndex;
      this.flListHandler();
    };

    const onPressChip = (title, index) => {
      var temp = [...this.state.outline];
      temp[index] = !this.state.outline[index];
      this.setState({ outline: temp });
      this.#filterOption = temp;
      this.flListHandler();
    };
    return (
      <View style={styles.container}>
        <Text
          onPress={onPressDestinationHandler}
          numberOfLines={1}
          style={
            this.state.txtStyle ? styles.txtSearch : styles.txtSearchDefault
          }
        >
          {this.state.defaultAddress}
        </Text>

        <ButtonGroup
          buttons={this.#buttons}
          onPress={onPress}
          selectedIndex={this.state.sortOption}
          style={styles.btnSort}
        />
        <View style={styles.containerFilters}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Chip
              title="Heavy Vehicles"
              type={this.state.outline[0] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              // buttonStyle={styles.btnFilters}
              onPress={() => onPressChip("Heavy Vehicles", 0)}
            />
            <Chip
              title="Motorcycles"
              type={this.state.outline[1] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              onPress={() => onPressChip("Motorcycles", 1)}
            />
            <Chip
              title="Free Parking"
              type={this.state.outline[2] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              onPress={() => onPressChip("Free Parking", 2)}
            />
            <Chip
              title="Night Parking"
              type={this.state.outline[3] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              onPress={() => onPressChip("Night Parking", 3)}
            />
            <Chip
              title="Electronic System"
              type={this.state.outline[4] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              onPress={() => onPressChip("Electronic System", 4)}
            />
            <Chip
              title="Coupon System"
              type={this.state.outline[5] ? "outline" : "solid"}
              containerStyle={styles.chipFilters}
              onPress={() => onPressChip("Coupon System", 5)}
            />
          </ScrollView>
        </View>

        <View style={styles.containerFl}>
          {this.#loading ? (
            <ActivityIndicator size="large" color="darkblue" />
          ) : this.#displaying ? (
            <FlatList
              style={styles.containerFlatList}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.list}
              renderItem={renderListItems}
            />
          ) : undefined}
        </View>
      </View>
    );
  }
}
