// First screen that will appear after login/registration
// Displays a search bar that initially says "Search Here" in light gray
// When user clicks on search bar, navigates to SearchScreen
// When user finishes selecting address on SearchScreen, navigates back to CpSearchScreen
// Search bar now displays input address in black

// SHORT FORMS: SS - SearchScreen, CPSS - CpSearchScreen

// TO DO: add filter/sort options
// add loading icon
// clear exisiting results

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/AppStyles";
import createCpInfoTable from "../../utils/db/CreateCpInfoTable";
import setTable from "../../utils/db/SetTable";
import * as SQLite from "expo-sqlite";
import createSearchHistoryTable from "../../utils/db/CreateSearchHistoryTable";
import getLocationPermission from "../../utils/locationServices/GetLocationPermission";
import getLocation from "../../utils/locationServices/GetLocation";
import ModalPicker from "../../components/ModalPicker";

const db = SQLite.openDatabase("cp.db");

var info = { locationData: {}, latLong: {}, address: "" };
var rendered = false;
var status;
var loading = false;
var displaying = false;

const CpSearchScreen = ({ route, navigation }) => {
  useEffect(() => {
    getLocationPermission() // to get user's permission to access location services
      .then((data) => {
        status = data;
      })
      .catch((error) => console.log(error));
    createCpInfoTable();
    createSearchHistoryTable();

    // Address input by user in SS has to be sent back to CPSS as parameters.
    // But user might not have accessed SS yet (just opened app for example) so there might not be any parameters
    // So need to check if got parameters and if yes, store them
    if (route.params?.data && !rendered) {
      rendered = true;
      paramHandler();
    }
  }),
    [route.params?.data];

  // Sets search bar to display "Search Here" or input address
  const [defaultAddress, setDefaultAddress] = useState("Search Here");

  // Toggles between light gray and black font colour (txtStyles)
  const [txtStyle, setTxtStyle] = useState(false);

  // To set list so it displays carparks nearby
  const [list, setList] = useState([]);

  // Stores parameters if any and sets input address on search bar
  const paramHandler = async () => {
    displaying = true;
    loading = true;
    // If user selects current location on SS
    if (route.params.data["BUILDING"] == "Current location") {
      if (status !== "granted") {
        // check if permission granted
        Alert.alert(
          "Warning",
          "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
        );
        return;
      }
      getLocation().then((data) => {
        // to get actual location of user
        info["latLong"] =
          JSON.stringify(data["coords"]["latitude"]) +
          "," +
          JSON.stringify(data["coords"]["longitude"]);
      });
      console.log("Current location: ", info["latLong"]);

      info["address"] = "";
    } else {
      info["locationData"] = route.params.data;
      info["address"] = info["locationData"]["ADDRESS"];
      info["latLong"] =
        info["locationData"]["LATITUDE"] +
        "," +
        info["locationData"]["LONGITUDE"];
    }
    setTxtStyle(true); // change font to black
    setDefaultAddress(route.params.data["ADDRESS"]); // set address on search bar
    setTimeout(() => setTable(info["latLong"]), 3000); ///////////////////////////////////// figure out a better way
    setTimeout(() => flListHandler(), 12000); ///////////////////////////////////////////// figure out a better way
  };

  // to navigate to "SearchScreen" if user clicks on "Search Here"
  const onPressDestinationHandler = () => {
    navigation.navigate({
      name: "SearchSuggestions",
      params: {
        defaultValue: info["address"],
      },
    });
    rendered = false;
  };

  // to display list of nearby carparks
  const flListHandler = (result) => {
    console.log("getting list");
    db.transaction((tx) => {
      loading = false;
      tx.executeSql(
        "SELECT * FROM nearbyCpInfo ORDER BY c_lots_available DESC",
        [],
        (tx, results) => {
          if (results.rows["_array"].length == 0) {
            setList([
              {
                address: "No nearby car parks found",
                c_lots_available: "",
                total_distance: "",
              },
            ]);
          } else {
            setList(results.rows["_array"]);
          }
        }
      );
    });
  };

  // if user selects carpark result, redirected to CpSummaryScreen
  const selectItem = (item) => {
    navigation.navigate({
      name: "Summary",
      params: {
        cpInfo: item,
      },
    });
  };

  // to set styles for list items
  const renderListItems = ({ item }) => {
    if (item["address"] == "No nearby car parks found") {
      return (
        <Text style={styles.txtNoCarparks}>No nearby car parks found</Text>
      );
    }
    return (
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
      </TouchableOpacity>
    );
  };
  // To choose between the sorts/filters
  const [sortFilter, setSortFilter] = useState("Vacancy");
  const [isModalVisible, setisModalVisible] = useState(false);

  // change mode of visibility of the dropdown menu
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (option) => {
    setSortFilter(option);
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={onPressDestinationHandler}
        numberOfLines={1}
        style={txtStyle ? styles.txtSearch : styles.txtSearchDefault}
      >
        {defaultAddress}
      </Text>
      <TouchableOpacity
        onPress={() => changeModalVisibility(true)}
        style={styles.touchableOpacity}
      >
        <Text>{sortFilter}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="none"
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}
      >
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          setData={setData}
        ></ModalPicker>
      </Modal>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : displaying ? (
        <FlatList
          style={styles.containerFlatList}
          keyExtractor={(item, index) => index.toString()}
          data={list}
          renderItem={renderListItems}
        />
      ) : undefined}
    </View>
  );
};

export default CpSearchScreen;
