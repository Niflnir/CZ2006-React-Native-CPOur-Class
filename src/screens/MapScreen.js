import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "../styles/AppStyles";
import { ExpoLeaflet } from "expo-leaflet";
import RouteDecoder from "../utils/RouteDecoder";
import BottomSheet from "../components/BottomSheet";
import { Provider, FAB } from "react-native-paper";
import BtnRouteDetails from "../components/BtnRouteDetails";
import {
  CpMarkerInfo,
  CurrentMarkerInfo,
  DestinationMarkerInfo,
} from "../components/MapMarkerInfo";
import WebView from "react-native-webview";

/**
 * Displays integrated map with routes from current location to carpark, as well as from carpark to final destination
 * @property {Object} cpInfo Carpark information received from CpSummaryScreen
 * @property {Object} locationInfo Location information receieved from CpSummaryScreen
 * @property {String[]} cpLatLong Separated latitude and longitude values of carpark
 * @property {String[]} locationLatLong Separated latitude and longitude values of user's final destination
 * @property {String[]} currentLocationLatLong Separated latitude and longitude values of user's current location
 */
export default class MapsScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  #locationInfo = this.props.route.params.locationInfo;
  #cpLatLong = this.#cpInfo.lat_long.split(",");
  #locationLatLong = this.#locationInfo.latLong.split(",");
  #currentLocationLatLong = this.#locationInfo.currentLatLong.split(",");

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      display: -1,
      details: false,
      amenities: false,
      expandDetails: false,
      whichRoute: -1,
      zoom: 13,
    };
  }

  /**
   * Displays UI components of screen
   * Sets values of map compnents to be used in ExpoLeaflet
   */
  render() {
    const routeDecoder = new RouteDecoder();
    const polylinePos = routeDecoder.routeDecoder(
      JSON.parse(this.#cpInfo.route_info)
    );
    const colors = ["purple", "pink", "black"];
    var mapMarker = [
      {
        id: "Carpark",
        position: {
          lat: parseFloat(this.#cpLatLong[0]),
          lng: parseFloat(this.#cpLatLong[1]),
        },
        icon: "📍",
        size: [35, 35],
      },
      {
        id: "Location",
        position: {
          lat: parseFloat(this.#locationLatLong[0]),
          lng: parseFloat(this.#locationLatLong[1]),
        },
        icon: "📍",
        size: [35, 35],
      },
    ];
    var mapShape = [
      {
        shapeType: "polyline",
        color: "darkblue",
        weight: 4,
        id: polylinePos[1],
        positions: polylinePos[0],
      },
    ];

    if (
      !this.#currentLocationLatLong.every(
        (val, index) => val === this.#locationLatLong[index]
      )
    ) {
      const rInfo = JSON.parse(this.#cpInfo.route_info_from_current);
      const polylinePosCurrent = routeDecoder.routeDecoder(rInfo);

      mapMarker = [
        ...mapMarker,
        {
          id: "Current Location",
          position: {
            lat: parseFloat(this.#currentLocationLatLong[0]),
            lng: parseFloat(this.#currentLocationLatLong[1]),
          },
          icon: "📍",
          size: [35, 35],
        },
      ];

      mapShape = [
        ...mapShape,
        {
          shapeType: "polyline",
          color: "darkgreen",
          weight: 4,
          id: polylinePosCurrent[1],
          positions: polylinePosCurrent[0],
        },
      ];
      if (rInfo.hasOwnProperty("phyroute")) {
        const phy = rInfo.phyroute;
        const polylinePosAlt = routeDecoder.routeDecoder(phy);
        mapShape = [
          ...mapShape,
          {
            shapeType: "polyline",
            color: "red",
            weight: 4,
            id: polylinePosAlt[1],
            positions: polylinePosAlt[0],
          },
        ];
      }
      if (rInfo.hasOwnProperty("alternativeroute")) {
        const alt = rInfo.alternativeroute;
        for (var i = 0; i < alt.length; i++) {
          const polylinePosAlt = routeDecoder.routeDecoder(alt[i]);
          mapShape = [
            ...mapShape,
            {
              shapeType: "polyline",
              color: colors[i],
              weight: 4,
              id: polylinePosAlt[1],
              positions: polylinePosAlt[0],
            },
          ];
        }
      }
    }

    /**
     * When user clicks on mapmarker, calls function to display corresponding location information
     * @param {*} message Message received when user interacts with ExpoLeaflet
     */
    const onMessage = (message) => {
      switch (message.tag) {
        case "onMapMarkerClicked":
          if (message.mapMarkerId == "Carpark") {
            displayCpInfo();
          } else if (message.mapMarkerId == "Current Location") {
            displayCurrentLocationInfo();
          } else {
            displayLocationInfo();
          }
          this.setState({ isVisible: true });
      }
    };

    /**
     * When user clicks on carpark mapmarker, displays carpark's location information
     */
    const displayCpInfo = () => {
      this.setState({ display: 0 });
    };

    /**
     * When user clicks on current location mapmarker, displays current location's location information
     */
    const displayCurrentLocationInfo = () => {
      this.setState({ display: 1 });
    };

    /**
     * When user clicks on destination mapmarker, displays destination's location information
     */
    const displayLocationInfo = () => {
      this.setState({ display: 2 });
    };

    /**
     * When user clicks on "Details" button, displays each route's name
     */
    const displayRouteDetails = () => {
      this.setState({ details: true });
      console.log("details");
    };

    const displayAmenities = () => {
      this.setState({ amenities: true });
      // fetch(
      //   "https://www.edgeprop.sg/analytic/amenities?c=" +
      //     this.#cpInfo.lat_long +
      //     "&d=500"
      // )
      //   .then((response) => response.text())
      //   .then((text) => console.log(text));

      console.log("amenities");
    };

    var titles = [];
    for (var i = 1; i < mapShape.length; i++) {
      titles = [...titles, { id: i, title: mapShape[i].id }];
    }

    return (
      <Provider>
        <View style={{ height: "100%", paddingTop: 30 }}>
          <ExpoLeaflet
            backgroundColor={"grey"}
            onMessage={onMessage}
            style={{ flex: 1 }}
            mapLayers={[
              {
                attribution:
                  '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
                baseLayerIsChecked: true,
                baseLayerName: "OpenStreetMap.Mapnik",
                url: "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png",
              },
            ]}
            mapShapes={
              this.state.whichRoute == -1
                ? mapShape
                : this.state.whichRoute == -2
                ? mapShape.splice(1)
                : [mapShape[this.state.whichRoute]]
            }
            mapMarkers={mapMarker}
            mapCenterPosition={{
              lat: parseFloat(this.#cpLatLong[0]),
              lng: parseFloat(this.#cpLatLong[1]),
            }}
            zoom={this.state.zoom}
          />

          {this.state.isVisible ? (
            <BottomSheet
              bottomSheetHeight={Dimensions.get("window").height * 0.3}
              show={this.state.isVisible}
              onDismiss={() => this.setState({ isVisible: false })}
              enableBackdropDismiss
            >
              {this.state.display == 0 ? (
                <CpMarkerInfo cpInfo={this.#cpInfo} />
              ) : this.state.display == 1 ? (
                <CurrentMarkerInfo locationInfo={this.#locationInfo} />
              ) : (
                <DestinationMarkerInfo locationInfo={this.#locationInfo} />
              )}
            </BottomSheet>
          ) : (
            <BtnRouteDetails
              onPressRoute={displayRouteDetails}
              onPressAmenities={displayAmenities}
            />
          )}
          {this.state.details ? (
            <BottomSheet
              bottomSheetHeight={
                this.state.expandDetails
                  ? Dimensions.get("window").height * 0.97
                  : Dimensions.get("window").height * 0.3
              }
              show={this.state.details}
              onDismiss={() => this.setState({ details: false })}
              enableBackdropDismiss
            >
              <ScrollView>
                {!this.#currentLocationLatLong.every(
                  (val, index) => val === this.#locationLatLong[index]
                ) ? (
                  <View>
                    <TouchableOpacity
                      style={styles.btnMapRoutes}
                      onPress={() => this.setState({ whichRoute: -2 })}
                    >
                      <Text style={styles.txtMapLocationHeadings}>
                        Current Location to Carpark
                      </Text>
                    </TouchableOpacity>
                    {titles.map((btnInfo) => (
                      <TouchableOpacity
                        key={btnInfo.id}
                        onPress={() => {
                          this.setState({ whichRoute: btnInfo.id });
                        }}
                      >
                        <Text style={styles.txtMapInfo}>{btnInfo.title}</Text>
                      </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                      onPress={() => this.setState({ whichRoute: -1 })}
                    >
                      <Text style={styles.txtMapInfo}>View all routes</Text>
                    </TouchableOpacity>
                  </View>
                ) : undefined}
                <TouchableOpacity
                  style={styles.btnMapRoutes}
                  onPress={() => this.setState({ whichRoute: 0 })}
                >
                  <Text style={styles.txtMapLocationHeadings}>
                    Carpark to Destination
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </BottomSheet>
          ) : undefined}
          {this.state.amenities ? (
            <BottomSheet
              bottomSheetHeight={Dimensions.get("window").height * 0.97}
              show={this.state.amenities}
              onDismiss={() => this.setState({ amenities: false })}
              enableBackdropDismiss
            >
              <WebView
                source={{
                  uri:
                    "https://www.edgeprop.sg/analytic/amenities?c=" +
                    this.#cpInfo.lat_long +
                    "&d=500",
                }}
              />
            </BottomSheet>
          ) : undefined}
        </View>
      </Provider>
    );
  }
}
