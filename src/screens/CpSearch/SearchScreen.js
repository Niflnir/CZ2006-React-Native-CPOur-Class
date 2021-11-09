import React, { Component, createRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import styles from "../../styles/AppStyles";
import { Icon } from "react-native-elements";
import SearchScreenManager from "../../utils/ScreenManagers/SearchScreenManager";

/**
 * Screen that allows user to input destination (or select current location)
 * Displays recently searched destinations as well as autocomplete suggestions for user to select
 *
 */
export default class SearchScreen extends Component {
  #navigation = this.props.navigation;
  #locationList = [];
  #searchHistory = [];
  #rendered = false;
  #defaultAddress = this.props.route.params.defaultValue;
  #textInputRef = createRef();
  #manager = new SearchScreenManager();

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      address: "",
      sHistory: true,
    };
  }

  componentDidMount() {
    if (this.#textInputRef.current) {
      setTimeout(() => this.#textInputRef.current.focus(), 500);
    }
    if (!this.#rendered) {
      this.#rendered = true;
      this.#manager.getSearchHistory().then((results) => {
        this.#searchHistory = results.rows["_array"];
        this.#locationList = this.#searchHistory;
        this.setState({ list: this.#searchHistory, sHistory: true });
      });
    }
  }

  /**
   * Displays UI components of screen
   *
   * @returns {View} The UI components
   */
  render() {
    /**
     * Opens side bar menu (Profile page) when user clicks three-line menu button on top left
     *
     */
    const openMenu = () => {
      this.#navigation.openDrawer();
    };

    /**
     * Updates value of address every time user inputs or deletes a character
     * Displays list of recently searched destinations if no user input or calls addressSubmitHandler if there is input
     *
     * @param {string} address Characters input by user into textInput search bar
     */
    const addressHandler = (address) => {
      this.setState({ address: address });
      if (address == "") {
        this.setState({ sHistory: true });
        db.transaction((tx) => {
          tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
            this.#searchHistory = results.rows["_array"];
            this.#locationList = this.#searchHistory;
            this.setState({ list: this.#searchHistory });
          });
        });
      } else {
        this.#manager
          .addressSubmitHandler(address)
          .then((data) => {
            this.setState({ sHistory: false });

            if (data["found"] == 0) {
              this.setState({ list: [] });
            } else {
              this.#locationList = data["results"];

              this.setState({ list: this.#locationList });
            }
          })
          .catch((error) => {
            this.#locationList = [];
          });
      }
    };

    /**
     * When user selects a specific address result from the suggestions list, redirects user back to CpSearchScreen and sends the address info as parameters
     * @param {Object} item Single autocomplete suggestion's data
     */
    const selectItem = (item) => {
      this.#manager.tableHandler(false, item);
      console.log("SearchScreen.selectItem: ", item);
      setTimeout(
        () =>
          this.#navigation.navigate("CpSearch", {
            data: item,
          }),
        300
      );
    };

    /**
     * When user selects "Current location" button, redirects user back to CpSearchScreen and sends "Current location" as parameters
     */
    const sendCurrentLocation = () => {
      this.#manager.tableHandler(true);
      this.#navigation.navigate("CpSearch", {
        data: { BUILDING: "Current location" },
      });
    };

    /**
     * If address information does not contain building name, returns road name
     * @param {Object} item Data of individual carpark
     * @returns {String} Building or road name
     */
    const listHeading = (item) => {
      return item["BUILDING"] != "NIL" ? item["BUILDING"] : item["ROAD_NAME"];
    };
    return (
      <View
        keyboardShouldPersistTap="always"
        style={{ backgroundColor: "white", flex: 1 }}
      >
        <StatusBar backgroundColor="#444444" />
        <View style={styles.container}>
          <TextInput
            ref={this.#textInputRef}
            style={styles.txtinpSearchBorder}
            autoFocus={true}
            placeholder="Search Here"
            defaultValue={this.#defaultAddress}
            onChangeText={addressHandler}
          />
          <Icon
            containerStyle={{ paddingHorizontal: 15, marginTop: 24 }}
            color="white"
            size={36}
            name="bars"
            type="font-awesome"
            onPress={openMenu}
          />
        </View>
        <Text
          style={{
            alignSelf: "center",
            padding: 20,
            fontSize: 17,
            fontWeight: "bold",
          }}
          onPress={sendCurrentLocation}
        >
          Current location
        </Text>

        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{
            borderTopColor: "lightgrey",
            borderTopWidth: 1,
            backgroundColor: "white",
          }}
        >
          {this.state.list.map((item) => (
            <TouchableOpacity
              key={this.#locationList.findIndex(
                (obj) => obj["ADDRESS"] == item["ADDRESS"]
              )}
              style={styles.containerListItems}
              onPress={() => selectItem(item)}
            >
              {this.state.sHistory ? (
                <Icon
                  name="history"
                  type="font-awesome"
                  color="grey"
                  containerStyle={{
                    flexDirection: "row",
                    paddingRight: 20,
                    paddingLeft: 15,
                    paddingTop: 3,
                  }}
                />
              ) : undefined}
              <View style={{ flex: 1 }}>
                <Text style={styles.txtListItemsBuilding}>
                  {listHeading(item)}
                </Text>
                <Text style={styles.txtListItemsAddress}>
                  {item["ADDRESS"]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
