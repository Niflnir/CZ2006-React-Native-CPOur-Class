import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
} from "react-native";
import styles from "../../styles/AppStyles";
import { ButtonGroup, Chip } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import MainSearchScreenManager from "../../utils/ScreenManagers/MainSearchScreenManager";

/**
 * Application screen that prompts user to input destination and displays nearby carparks
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
  #manager = new MainSearchScreenManager();
  #buttons = ["Vacancy", "Distance", "Parking Rate"];
  #sortOption = 0;
  #filterOption = [true, true, true, true, true, true];

  constructor(props) {
    super(props);
    this.state = {
      defaultAddress: "Search Here",
      txtStyle: false,
      list: [],
    };
  }

  async componentDidMount() {
    this.#status = this.#manager.didMount();
  }

  async componentDidUpdate() {
    if (this.props.route.params !== undefined && !this.#rendered) {
      this.#displaying = true;
      this.#loading = true;
      this.#rendered = true;
      await this.#manager
        .paramHandler(this.#status, this.props.route.params.data)
        .then((data) => {
          this.#info = data;
        })
        .catch((err) => console.log(err));
      this.setState({
        txtStyle: true,
        defaultAddress: this.#info["locationData"]["ADDRESS"],
      });
      setTimeout(() => {
        console.log("getting list");
        this.#loading = false;
        this.#manager
          .flListHandler(this.#sortOption, this.#filterOption)
          .then((data) => this.setState({ list: data }));
      }, 11000);
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
      this.#manager
        .flListHandler(this.#sortOption, this.#filterOption)
        .then((data) => this.setState({ list: data }));
    };

    /**
     * Sets value of filterOption when user selects specific filter criteria and calls flListHandler() to reload carpark list
     * @param {number} index Index of filter button selected by user
     */
    const onPressChip = (index) => {
      var temp = [...this.#filterOption];
      temp[index] = !this.#filterOption[index];
      this.#filterOption = temp;
      this.#manager
        .flListHandler(this.#sortOption, this.#filterOption)
        .then((data) => this.setState({ list: data }));
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
                onPress={() => onPressChip(0)}
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
                onPress={() => onPressChip(1)}
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
                onPress={() => onPressChip(2)}
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
                onPress={() => onPressChip(3)}
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
                onPress={() => onPressChip(4)}
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
                onPress={() => onPressChip(5)}
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
