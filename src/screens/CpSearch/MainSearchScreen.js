import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Image,
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
import { Icon } from "react-native-elements";
import PgsTable from "../../utils/db/PgsTable";
db = SQLite.openDatabase("cpour.db");

/**
 * Application screen that prompts user to input destination and displays nearby carparks
 *
 *
 */
export default class MainSearchScreen extends Component {
  #info = {
    locationData: {},
    latLong: "",
    address: "",
    currentLatLong: "",
    currentPostalCode: "",
    postal: "",
  };
  #rendered = false;
  #status = "";
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
    };
  }

  componentDidMount() {
    const pgsTable = new PgsTable();
    pgsTable.createPgsTable();
    // pgsTable.drop();

    this.#getLocationServices
      .getLocationPermission()
      .then((data) => {
        this.#status = data;
      })
      .catch((error) => console.log("location error: ", error));

    this.#cpInfoTable.createCpInfoTable();
    this.#searchHistoryTable.createSearchHistoryTable();
    const fav = new FavouritesTable();
    fav.createFavouritesTable();
  }

  /**
   * Sets list to be displayed in flatlist
   */
  flListHandler() {
    const sortfilter = new SortFilter();
    var sortQuery = "c_lots_available DESC";
    if (this.#sortOption == 1) {
      sortQuery = "total_distance ASC";
    } else if (this.#sortOption == 2) {
      sortQuery = "c_parking_rates_current ASC";
    }
    const query = sortfilter.sortFilter(sortQuery, this.#filterOption);
    console.log("getting list");
    db.transaction((tx) => {
      this.#loading = false;
      tx.executeSql(query, [], (tx, results) => {
        this.setState({ list: results.rows["_array"] });
      });
    });
  }

  /**
   * Stores relevant location information in respective variables
   */
  async paramHandler() {
    this.#displaying = true;
    this.#loading = true;
    if (this.#status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
      );
      return;
    }
    await this.#getLocationServices.getLocation().then((data) => {
      this.#info.currentLatLong =
        JSON.stringify(data["coords"]["latitude"]) +
        "," +
        JSON.stringify(data["coords"]["longitude"]);

      const getData = new GetData();
      const TOKEN =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc5NjAsInVzZXJfaWQiOjc5NjAsImVtYWlsIjoiYXBwLmNwLm91ckBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MzU3MzcxMjksImV4cCI6MTYzNjE2OTEyOSwibmJmIjoxNjM1NzM3MTI5LCJqdGkiOiJhZmRlYWY3NGFkMzQ0N2UyZWYxMDYyMDM3ZDMxNWVkOCJ9.6qBuGpDCg4T_MEHqR1SQqKIQnWCXfEbVLq6YCt2_LB0";
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
    });

    setTimeout(() => {
      const nearbyCpInfoTable = new NearbyCpInfoTable();
      nearbyCpInfoTable.setTable(
        this.#info["latLong"],
        this.#info.currentLatLong
      );
    }, 3000);

    setTimeout(() => this.flListHandler(), 11000);
  }

  componentDidUpdate() {
    if (this.props.route.params !== undefined && !this.#rendered) {
      this.#rendered = true;
      this.paramHandler();
    }
  }

  /**
   * Displays UI components of screen
   */
  render() {
    /**
     * Navigates to SearchScreen when user presses search bar
     */
    const onPressDestinationHandler = () => {
      this.#navigation.navigate("SearchSuggestions", {
        defaultValue: this.#info["address"],
      });
      this.#rendered = false;
    };

    /**
     * Navigates to CpSummaryScreen when user selects carpark from list
     * @param {Object} item Data of carpark that has been selected by user
     */
    const selectItem = (item) => {
      this.#navigation.navigate("Summary", {
        cpInfo: item,
        locationInfo: this.#info,
        status: this.#status,
      });
    };

    /**
     * Sets styling and data of each item to be displayed in flatlist and returns styled data
     * @param {*} item Data of individual carparks to be displayed in flatlist
     * @returns {Object} Styled UI component
     */
    const renderListItems = ({ item }) => {
      var sortColor;
      if (this.#sortOption == 0) {
        if (item.c_lots_available > 80) {
          sortColor = "#006344";
        } else if (item.c_lots_available > 30) {
          sortColor = "#D8A800";
        } else {
          sortColor = "#BD3B1B";
        }
      } else if (this.#sortOption == 1) {
        if (item.total_distance < 0.25) {
          sortColor = "#006344";
        } else if (item.total_distance < 0.6) {
          sortColor = "#D8A800";
        } else {
          sortColor = "#BD3B1B";
        }
      } else {
        if (item.c_parking_rates_current == 0) {
          sortColor = "#006344";
        } else if (item.c_parking_rates_current == 0.6) {
          sortColor = "#D8A800";
        } else {
          sortColor = "#BD3B1B";
        }
      }
      return (
        <View
          style={{
            borderTopColor: "#444444",
            borderTopWidth: 0.5,
          }}
        >
          <TouchableOpacity
            style={[
              styles.containerFlatListItems,
              {
                borderLeftColor: sortColor,
                borderLeftWidth: 15,
              },
            ]}
            onPress={() => selectItem(item)}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 8 }}>
                <Text style={styles.txtListItemsBuilding}>
                  {item["address"]}
                </Text>
                {this.#sortOption == 0 ? (
                  <View>
                    <Text>{item["total_distance"] * 1000} m</Text>
                    <Text>
                      ${item["c_parking_rates_current"].toFixed(2)}/30 min
                    </Text>
                  </View>
                ) : this.#sortOption == 1 ? (
                  <View>
                    <Text>
                      {item["c_lots_available"] != null
                        ? item["c_lots_available"] + " car lot(s) free"
                        : "No info"}
                    </Text>
                    <Text>
                      ${item["c_parking_rates_current"].toFixed(2)}/30 min
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>
                      {item["c_lots_available"] != null
                        ? item["c_lots_available"] + " car lot(s) free"
                        : "No info"}
                    </Text>
                    <Text>{item["total_distance"] * 1000} m</Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 3,
                  alignSelf: "center",
                }}
              >
                {this.#sortOption == 0 ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 17,
                    }}
                  >
                    {item["c_lots_available"] != null
                      ? item["c_lots_available"]
                      : "-"}{" "}
                  </Text>
                ) : this.#sortOption == 1 ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    {item["total_distance"] * 1000} m
                  </Text>
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                    }}
                  >
                    ${item["c_parking_rates_current"].toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    /**
     * Sets value of sortOption when user selects specific sort criteria and calls flListHandler() to reload carpark list
     * @param {number} selectedIndex Index of sort button selected
     */
    const onPress = (selectedIndex) => {
      this.#sortOption = selectedIndex;
      this.flListHandler();
    };

    /**
     * Sets value of filterOption when user selects specific filter criteria and calls flListHandler() to reload carpark list
     * @param {string} title Title of filter button selected by user
     * @param {number} index Index of filter button selected by user
     */
    const onPressChip = (title, index) => {
      var temp = [...this.#filterOption];
      temp[index] = !this.#filterOption[index];
      this.#filterOption = temp;
      this.flListHandler();
    };

    /**
     * Opens side bar menu (Profile page) when user clicks three-line menu button on top left
     */
    const openMenu = () => {
      this.#navigation.openDrawer();
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <StatusBar backgroundColor="#444444" />
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
          <Icon
            containerStyle={{ paddingHorizontal: 15, marginTop: 24 }}
            color="white"
            size={36}
            name="bars"
            type="font-awesome"
            onPress={openMenu}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ButtonGroup
            buttons={this.#buttons}
            onPress={onPress}
            selectedIndex={this.#sortOption}
            selectedButtonStyle={styles.btnSortSelect}
            selectedTextStyle={styles.txtSortSelect}
            textStyle={styles.txtSortDisabled}
          />
          <View style={styles.containerFilters}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Chip
                title="Heavy Vehicles"
                type={this.#filterOption[0] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[0]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[0]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Heavy Vehicles", 0)}
              />
              <Chip
                title="Motorcycles"
                type={this.#filterOption[1] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[1]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[1]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Motorcycles", 1)}
              />
              <Chip
                title="Free Parking"
                type={this.#filterOption[2] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[2]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[2]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Free Parking", 2)}
              />
              <Chip
                title="Night Parking"
                type={this.#filterOption[3] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[3]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[3]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Night Parking", 3)}
              />
              <Chip
                title="Electronic System"
                type={this.#filterOption[4] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[4]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[4]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Electronic System", 4)}
              />
              <Chip
                title="Coupon System"
                type={this.#filterOption[5] ? "outline" : "solid"}
                containerStyle={styles.chipFiltersContainer}
                titleStyle={
                  this.#filterOption[5]
                    ? styles.txtFilters
                    : styles.txtFiltersDisabled
                }
                buttonStyle={
                  this.#filterOption[5]
                    ? styles.chipFilters
                    : styles.chipFiltersDisabled
                }
                onPress={() => onPressChip("Coupon System", 5)}
              />
            </ScrollView>
          </View>

          {this.#loading ? (
            <View style={styles.containerFl}>
              <ActivityIndicator size="large" color="#444444" />
            </View>
          ) : this.#displaying ? (
            <View style={styles.containerFl}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.txtNoCarparks,
                    {
                      paddingLeft: 20,
                      flex: 8,
                    },
                  ]}
                >
                  {this.state.list.length} nearby carparks found
                </Text>
                {this.state.list.length == 0 ? undefined : this.#sortOption ==
                  0 ? (
                  <Text
                    style={[
                      styles.txtNoCarparks,
                      {
                        flex: 3,
                        alignSelf: "center",
                        textAlign: "center",
                        marginRight: 20,
                      },
                    ]}
                  >
                    Car lots free
                  </Text>
                ) : this.#sortOption == 1 ? (
                  <Text
                    style={[
                      styles.txtNoCarparks,
                      {
                        flex: 3,
                        alignSelf: "center",
                        textAlign: "center",
                        marginRight: 20,
                      },
                    ]}
                  >
                    Distance
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.txtNoCarparks,
                      {
                        flex: 3,
                        alignSelf: "center",
                        textAlign: "center",
                        marginRight: 20,
                      },
                    ]}
                  >
                    Fee/30 min
                  </Text>
                )}
              </View>
              <FlatList
                style={styles.containerFlatList}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.list}
                renderItem={renderListItems}
              />
            </View>
          ) : (
            <View style={styles.containerFl}>
              <Image
                style={[styles.logo, { alignSelf: "center", top: "-5%" }]}
                source={require("../../assets/images/carparkourlogo.png")}
              ></Image>
            </View>
          )}
        </View>
      </View>
    );
  }
}
