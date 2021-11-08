import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "../styles/AppStyles";
import { ExpoLeaflet } from "expo-leaflet";
import BottomSheet from "../components/BottomSheet";
import { Provider } from "react-native-paper";
import BtnRouteDetails from "../components/BtnRouteDetails";
import {
  CpMarkerInfo,
  CurrentMarkerInfo,
  DestinationMarkerInfo,
  PgsMarkerInfo,
} from "../components/MapMarkerInfo";
import MapScreenManager from "../utils/ScreenManagers/MapScreenManager";

/**
 * Displays integrated map with routes from current location to carpark, as well as from carpark to final destination
 */
export default class MapsScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  #locationInfo = this.props.route.params.locationInfo;
  #cpLatLong = this.#cpInfo["lat_long"].split(",");
  #locationLatLong = this.#locationInfo.latLong.split(",");
  #currentLocationLatLong = this.#locationInfo.currentLatLong.split(",");
  #mapMarkersPgs = [];
  #pgsInfo = [];
  #pgsInfo2 = [];
  #manager = new MapScreenManager();

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      display: -3,
      details: false,
      pgs: false,
      whichRoute: -1,
      zoom: 13,
      showBtn: true,
    };
  }

  /**
   * Displays UI components of screen
   * Sets values of map compnents to be used in ExpoLeaflet
   *
   * @returns {View} The UI components
   */
  render() {
    console.log(this.#locationInfo);
    var mapMarkersPgs = [];
    this.#manager.pgsList().then((results) => {
      this.#pgsInfo = results.rows._array;
      this.#pgsInfo2 = results.rows._array;
      for (var i = 0; i < results.rows._array.length; i++) {
        const onePgs = results.rows.item(i);
        const onePgsLat = onePgs.latLong.split(",")[0];
        const onePgsLong = onePgs.latLong.split(",")[1];
        var mapMarkerPgs = {
          id: i + 1,
          position: {
            lat: onePgsLat,
            lng: onePgsLong,
          },
          icon: "⛽",
          size: [20, 20],
        };

        mapMarkersPgs.push(mapMarkerPgs);
        this.#mapMarkersPgs = mapMarkersPgs;
      }
    });
    const polylinePos = this.#manager.routeDecoder(
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
        icon: "🚗",
        size: [35, 35],
      },
      {
        id: "Location",
        position: {
          lat: parseFloat(this.#locationLatLong[0]),
          lng: parseFloat(this.#locationLatLong[1]),
        },
        icon: "🚩",
        size: [35, 35],
      },
    ];
    var mapShape = [
      {
        shapeType: "polyline",
        color: "darkblue",
        weight: 4,
        id: polylinePos["btnId"],
        positions: polylinePos["latLong"],
      },
    ];

    if (
      !this.#currentLocationLatLong.every(
        (val, index) => val === this.#locationLatLong[index]
      )
    ) {
      const rInfo = JSON.parse(this.#cpInfo.route_info_from_current);
      const polylinePosCurrent = this.#manager.routeDecoder(rInfo);

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
          id: polylinePosCurrent["btnId"],
          positions: polylinePosCurrent["latLong"],
        },
      ];
      if (rInfo.hasOwnProperty("phyroute")) {
        const phy = rInfo.phyroute;
        const polylinePosAlt = routeDecoder.routeDecoder(phy);
        mapShape = [
          ...mapShape,
          {
            shapeType: "polyline",
            color: "maroon",
            weight: 4,
            id: polylinePosAlt["btnId"],
            positions: polylinePosAlt["latLong"],
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
              id: polylinePosAlt["btnId"],
              positions: polylinePosAlt["latLong"],
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
          } else if (message.mapMarkerId == "Location") {
            displayLocationInfo();
          } else {
            displayPgsInfo(message.mapMarkerId);
          }
          this.setState({ isVisible: true, showBtn: false });
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
      this.setState({ display: -1 });
    };

    /**
     * When user clicks on destination mapmarker, displays destination's location information
     */
    const displayLocationInfo = () => {
      this.setState({ display: -2 });
    };
    /**
     * When user clicks on petrol station mapmarker, displays petrol station's location information
     */
    const displayPgsInfo = (id) => {
      console.log(id);
      this.setState({ display: id });
    };

    /**
     * When user clicks on "Details" button, displays each route's name
     */
    const displayRouteDetails = () => {
      this.setState({ details: true });
    };

    /**
     * When user clicks on "Petrol Stations" button, displays list of nearby petrol stations and their locations on the map
     */
    const displayPgs = () => {
      this.setState({ pgs: true });
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
            mapMarkers={
              this.state.pgs ? this.#mapMarkersPgs.concat(mapMarker) : mapMarker
            }
            mapCenterPosition={{
              lat: parseFloat(this.#cpLatLong[0]),
              lng: parseFloat(this.#cpLatLong[1]),
            }}
            zoom={this.state.zoom}
          />

          {this.state.isVisible ? (
            <BottomSheet
              bottomSheetHeight={Dimensions.get("window").height * 0.4}
              show={this.state.isVisible}
              onDismiss={() => {
                if (this.state.isVisible == false) {
                  this.setState({ isVisible: false, showBtn: false });
                } else {
                  this.setState({ isVisible: false, showBtn: true });
                }
              }}
              enableBackdropDismiss
            >
              {this.state.display == 0 ? (
                <CpMarkerInfo cpInfo={this.#cpInfo} />
              ) : this.state.display == -1 ? (
                <CurrentMarkerInfo locationInfo={this.#locationInfo} />
              ) : this.state.display == -2 ? (
                <DestinationMarkerInfo locationInfo={this.#locationInfo} />
              ) : (
                <PgsMarkerInfo
                  info={[
                    this.#pgsInfo2[this.state.display - 1],
                    this.#currentLocationLatLong,
                  ]}
                />
              )}
            </BottomSheet>
          ) : this.state.showBtn && !this.state.isVisible ? (
            <BtnRouteDetails
              onPressRoute={displayRouteDetails}
              onPressPgs={displayPgs}
            />
          ) : undefined}
          {this.state.details ? (
            <BottomSheet
              bottomSheetHeight={Dimensions.get("window").height * 0.4}
              show={this.state.details}
              onDismiss={() => this.setState({ details: false, showBtn: true })}
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
          {this.state.pgs ? (
            <BottomSheet
              bottomSheetHeight={Dimensions.get("window").height * 0.4}
              show={this.state.pgs}
              onDismiss={() => this.setState({ pgs: false, showBtn: true })}
              enableBackdropDismiss
            >
              <Text style={styles.txtMapLocationHeadings}>Petrol Stations</Text>
              <Text style={[styles.txtMapInfo, { fontWeight: "bold" }]}>
                {this.#mapMarkersPgs.length} petrol station(s) found near
                carpark
              </Text>
              <ScrollView>
                {this.#pgsInfo.map((onePgs, index) => (
                  <TouchableOpacity
                    key={this.#pgsInfo.indexOf(onePgs)}
                    onPress={() => {
                      this.setState({ isVisible: true, showBtn: false });
                      onMessage({
                        tag: "onMapMarkerClicked",
                        mapMarkerId: index + 1,
                      });
                    }}
                  >
                    <Text style={styles.txtMapInfo}>{onePgs.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </BottomSheet>
          ) : undefined}
        </View>
      </Provider>
    );
  }
}
