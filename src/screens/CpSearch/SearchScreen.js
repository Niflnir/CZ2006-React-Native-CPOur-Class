// Allows user to input destination and displays suggestions
// User can click on suggested item and will be redirected back to CpSearchScreen

// TO DO: add clear button so don't need to backspace all the way if want to clear input address

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/AppStyles";
import GetData from "../../utils/db/GetData";
import dropNearbyCpTable from "../../utils/db/DropNearbyCpTable";
import createNearbyCpTable from "../../utils/db/CreateNearbyCpTable";
import setSearchHistory from "../../utils/db/SetSearchHistory";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cp.db");

var locationList = { data: [], latLong: { To: "", From: "" } };
var searchHistory;
var rendered = false;

const SearchScreen = ({ route, navigation }) => {
  useEffect(() => {
    if (!rendered) {
      rendered = true;
      db.transaction((tx) => {
        // to display search history + current location option when no input
        tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
          searchHistory = results.rows["_array"];
          locationList["data"] = searchHistory;
          setList(searchHistory);
        });
      });
    }
  }, []);
  const [list, setList] = useState([]);
  // defaultValue sent from CpSearchScreen can be "" or an earlier input address
  const defaultAddress = route.params.defaultValue;

  // to get address as it is being entered into search bar
  const [address, setAddress] = useState();

  // updates value of address every time user inputs or deletes a character
  const addressHandler = (address) => {
    setAddress(address);
    if (address == "") {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
          searchHistory = results.rows["_array"];
          // console.log(searchHistory);
          locationList["data"] = searchHistory;
          setList(searchHistory);
        });
      });
    } else {
      addressSubmitHandler(address);
    }
  };

  // to retrieve address information from API using GetData()
  const addressSubmitHandler = async (address) => {
    dropNearbyCpTable();
    setTimeout(() => createNearbyCpTable(), 500);
    const URL =
      "https://developers.onemap.sg/commonapi/search?searchVal=" +
      address +
      "&getAddrDetails=Y&returnGeom=Y&pageNum=1";
    var resultPromise = GetData(URL) // to store promise returned by GetData
      .then((data) => {
        if (data["found"] == 0) {
          // if no results
          setList([]);
        } else {
          locationList["data"] = data["results"];
          locationList["latLong"] =
            data["results"][0]["LATITUDE"] +
            "," +
            data["results"][0]["LONGITUDE"];
          locationList["latLong"]["error"] = "";
          setList(locationList["data"]);
        }
      })
      .catch((error) => {
        locationList["latLong"]["error"] = error;
        locationList["latLong"] = "";
        locationList["data"] = [];
      });

    await resultPromise;
    return;
  };

  // when user selects a specific address result from the suggestions list
  // app redirects user back to CpSearchScreen and sends the address info as parameters
  const selectItem = (item) => {
    setSearchHistory(item);

    navigation.navigate({
      name: "CpSearch",
      params: {
        data: item,
      },
    });
  };

  // if no building name, display address as heading
  const listHeading = (item) => {
    return item["BUILDING"] != "NIL" ? item["BUILDING"] : item["ROAD_NAME"];
  };

  // to autofocus cursor
  const textInputRef = React.useRef();
  useEffect(() => {
    if (textInputRef.current) {
      setTimeout(() => textInputRef.current.focus(), 200);
    }
  }, []);

  return (
    <View keyboardShouldPersistTap="always" style={styles.containerWhite}>
      <TextInput
        ref={textInputRef}
        style={styles.txtinpSearchBorder}
        autoFocus={true}
        placeholder="Search Here"
        defaultValue={defaultAddress}
        onChangeText={addressHandler}
      />

      <ScrollView keyboardShouldPersistTaps="always">
        {list.map((item) => (
          <TouchableOpacity
            key={locationList["data"].findIndex(
              (obj) => obj["ADDRESS"] == item["ADDRESS"]
            )}
            style={styles.containerListItems}
            onPress={() => selectItem(item)}
          >
            <Text style={styles.txtListItemsBuilding}>{listHeading(item)}</Text>
            <Text style={styles.txtListItemsAddress}>{item["ADDRESS"]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default SearchScreen;
