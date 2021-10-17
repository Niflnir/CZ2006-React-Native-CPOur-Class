// Allows user to input destination and displays suggestions
// User can click on suggested item and will be redirected back to CpSearchScreen

// TO DO: add clear button so don't need to backspace all the way if want to clear input address

import React, { Component, createRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/AppStyles";
import * as SQLite from "expo-sqlite";
import NearbyCpInfoTable from "../../utils/db/NearbyCpInfoTable";
import GetData from "../../utils/api/GetData";
import SearchHistoryTable from "../../utils/db/SearchHistoryTable";
db = SQLite.openDatabase("cp.db");

export default class SearchScreen extends Component {
  #navigation = this.props.navigation;
  #locationList = { data: [], latLong: { To: "", From: "" } };
  #searchHistory;
  #rendered = false;
  #defaultAddress = this.props.route.params.defaultValue;
  #nearbyCpInfoTable = new NearbyCpInfoTable();
  #textInputRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      address: "",
    };
  }

  componentDidMount() {
    if (this.#textInputRef.current) {
      setTimeout(() => this.#textInputRef.current.focus(), 500);
    }
    if (!this.#rendered) {
      this.#rendered = true;
      db.transaction((tx) => {
        // to display search history + current location option when no input
        tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
          this.#searchHistory = results.rows["_array"];
          this.#locationList["data"] = this.#searchHistory;
          this.setState({ list: this.#searchHistory });
        });
      });
    }
  }

  render() {
    // updates value of address every time user inputs or deletes a character
    const addressHandler = (address) => {
      this.setState({ address: address });
      if (address == "") {
        db.transaction((tx) => {
          tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
            this.#searchHistory = results.rows["_array"];
            // console.log(searchHistory);
            this.#locationList["data"] = this.#searchHistory;
            this.setState({ list: this.#searchHistory });
          });
        });
      } else {
        addressSubmitHandler(address);
      }
    };

    // to retrieve address information from API using GetData()
    const addressSubmitHandler = async (address) => {
      const URL =
        "https://developers.onemap.sg/commonapi/search?searchVal=" +
        address +
        "&getAddrDetails=Y&returnGeom=Y&pageNum=1";
      const getData = new GetData();
      var resultPromise = getData
        .getData(URL) // to store promise returned by GetData
        .then((data) => {
          if (data["found"] == 0) {
            // if no results
            this.setState({ list: [] });
          } else {
            this.#locationList["data"] = data["results"];
            this.#locationList["latLong"] =
              data["results"][0]["LATITUDE"] +
              "," +
              data["results"][0]["LONGITUDE"];
            this.#locationList["latLong"]["error"] = "";
            this.setState({ list: this.#locationList["data"] });
          }
        })
        .catch((error) => {
          this.#locationList["latLong"]["error"] = error;
          this.#locationList["latLong"] = "";
          this.#locationList["data"] = [];
        });

      await resultPromise;
      return;
    };

    // when user selects a specific address result from the suggestions list
    // app redirects user back to CpSearchScreen and sends the address info as parameters
    const selectItem = (item) => {
      this.#nearbyCpInfoTable.recreateNearbyCpInfoTable();
      if (
        item["BUILDING"] != "Current location" &&
        item["ADDRESS"] != "Current location"
      ) {
        const searchHistoryTable = new SearchHistoryTable();
        searchHistoryTable.setSearchHistoryTable(item);
      }
      setTimeout(
        () =>
          this.#navigation.navigate("CpSearch", {
            data: item,
          }),
        300
      );
    };

    // if no building name, display address as heading
    const listHeading = (item) => {
      return item["BUILDING"] != "NIL" ? item["BUILDING"] : item["ROAD_NAME"];
    };

    return (
      <View keyboardShouldPersistTap="always" style={styles.containerWhite}>
        <TextInput
          ref={this.#textInputRef}
          style={styles.txtinpSearchBorder}
          autoFocus={true}
          placeholder="Search Here"
          defaultValue={this.#defaultAddress}
          onChangeText={addressHandler}
        />

        <ScrollView keyboardShouldPersistTaps="always">
          {this.state.list.map((item) => (
            <TouchableOpacity
              key={this.#locationList["data"].findIndex(
                (obj) => obj["ADDRESS"] == item["ADDRESS"]
              )}
              style={styles.containerListItems}
              onPress={() => selectItem(item)}
            >
              <Text style={styles.txtListItemsBuilding}>
                {listHeading(item)}
              </Text>
              <Text style={styles.txtListItemsAddress}>{item["ADDRESS"]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
