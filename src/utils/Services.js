import * as Location from "expo-location";
import { Alert } from "react-native";
import firebase from "firebase";
/**
 * Contains functions used across classes
 */
export default class Services {
  /**
   * Makes API calls
   * @param {string} url Url to be used to make API calls
   * @returns {Object} Data retreived from API
   */
  async getData(url) {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("Cannot fetch data " + response.status);
    }
    const data = await response.json();
    return data;
  }

  #lotData;
  /**
   * Uses getData() to make API call and store carpark lot availability data
   * @returns {Object} Data retrieved from API
   */
  async getLots() {
    console.log("getting lot availability");
    var today = new Date();
    var time = today.toString().split(" ")[4];
    var dateTime = today.toISOString().slice(0, 10) + "T" + time;

    const URL =
      "https://api.data.gov.sg/v1/transport/carpark-availability?date_time=" +
      dateTime;

    await this.getData(URL)
      .then((data) => {
        this.#lotData = data;
      })
      .catch((err) => console.log(err, URL));

    return this.#lotData["items"][0]["carpark_data"];
  }

  /**
   * Retrieves relevant route information from user's current location to carpark as well as from carpark
   * to final destination and stores it in nearbyCpInfo table
   * Or, eetrieves relevant route information from carpark to petrol station and stores it in nearbyPgs table
   *
   * @param {string} fromLatLong Latitude and longitude values of start location
   * @param {string} toLatLong Latitude and longitude values of destination
   * @param {string} key Carpark number of selected carpark or petrol station postal code
   * @param {string} currentLatLong Latitude and longitude values of user's current location
   */
  async getRoute(fromLatLong, toLatLong, key, currentLatLong) {
    const TOKEN = this.getToken();
    if (currentLatLong == "no") {
      const URL0 =
        "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
        fromLatLong +
        "&end=" +
        toLatLong +
        "&routeType=drive&token=" +
        TOKEN;
      await this.getData(URL0)
        .then((data) => {
          db.transaction((tx) => {
            tx.executeSql(
              "UPDATE nearbyPgs SET route_info=? WHERE postal=?",
              [JSON.stringify(data), key],
              () => {},
              (tx, error) => {
                console.log("Route error pgs 1: ", error);
              }
            );

            tx.executeSql(
              // to store distance of carpark from destination in database
              "UPDATE nearbyPgs SET total_distance=? WHERE postal=?",
              [data["route_summary"]["total_distance"] / 1000, key],
              () => {},
              (tx, error) => {
                console.log("Route error pgs 2: ", error);
              }
            );

            tx.executeSql(
              // to store travel time from carpark to destination in database
              "UPDATE nearbyPgs SET total_time=? WHERE postal=?",
              [data["route_summary"]["total_time"] / 60, key],
              () => {},
              (tx, error) => {
                console.log("Route error pgs 3: ", error);
              }
            );
          });
        })
        .catch((err) => console.log("Route API error: ", key, err, URL0));
    } else {
      const URL1 =
        "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
        fromLatLong +
        "&end=" +
        toLatLong +
        "&routeType=walk&token=" +
        TOKEN;
      const URL2 =
        "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
        fromLatLong +
        "&token=" +
        TOKEN;
      const URL3 =
        "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
        currentLatLong +
        "&end=" +
        toLatLong +
        "&routeType=drive&token=" +
        TOKEN;
      await this.getData(URL1)
        .then((data) => {
          db.transaction((tx) => {
            tx.executeSql(
              "UPDATE nearbyCpInfo SET route_info=? WHERE car_park_no=?",
              [JSON.stringify(data), key],
              () => {},
              (tx, error) => {
                console.log("Route error 1: ", error);
              }
            );

            tx.executeSql(
              // to store distance of carpark from destination in database
              "UPDATE nearbyCpInfo SET total_distance=? WHERE car_park_no=?",
              [data["route_summary"]["total_distance"] / 1000, key],
              () => {},
              (tx, error) => {
                console.log("Route error 2: ", error);
              }
            );

            tx.executeSql(
              // to store travel time from carpark to destination in database
              "UPDATE nearbyCpInfo SET total_time=? WHERE car_park_no=?",
              [data["route_summary"]["total_time"] / 60, key],
              () => {},
              (tx, error) => {
                console.log("Route error 3: ", error);
              }
            );
          });
        })
        .catch((err) => console.log(err, URL1));
      var postal = "Postal code unavailable";
      await this.getData(URL2)
        .then((data) => {
          if (data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")) {
            postal = data["GeocodeInfo"][0]["POSTALCODE"];
          }
        })
        .catch((err) => console.log(err, URL1));
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE nearbyCpInfo SET postal=? WHERE car_park_no=?",
          [postal, key],
          () => {},
          (tx, error) => {
            console.log("Route error 4: ", error);
          }
        );
      });
      if (currentLatLong != fromLatLong) {
        await this.getData(URL3)
          .then((data) => {
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE nearbyCpInfo SET route_info_from_current=? WHERE car_park_no=?",
                [JSON.stringify(data), key],
                () => {},
                (tx, error) => {
                  console.log("Route error 5: ", error);
                }
              );
            });
          })
          .catch((err) => console.log("Route API error cp: ", key, err, URL1));
      }
    }
  }

  /**
   * Retrieves data on user's current location
   *
   * @returns {String}  Latitude and longitude values of user's current location
   */
  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    var latLong =
      location["coords"]["latitude"] + "," + location["coords"]["longitude"];
    return latLong;
  }

  /**
   * Asks user for permission to access location services
   *
   */
  async getLocationPermission() {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. You will only be able to access limited features of this app."
      );
    }
  }

  /**
   * Retrieves OneMap API token from Firebase
   *
   * @returns {String} The OneMap API token
   */
  getToken() {
    var token;
    firebase
      .database()
      .ref(`TOKEN/`)
      .on("value", (snapshot) => {
        token = snapshot.val();
        // console.log("in: ", token);
      });
    // console.log("out: ", token);
    return token;
  }

  /**
   * Sets value of parking rates for carparks in selected table
   * @param {number} index 1 for favourites table, 0 for nearbyCpInfo table
   */
  getCarParkingRate(queries) {
    const centralArea = [
      "ACB",
      "BBB",
      "BRB1",
      "CY",
      "DUXM",
      "HLM",
      "KAB",
      "KAM",
      "PRM",
      "SLS",
      "SR1",
      "SR2",
      "TPM",
      "UCS",
      "WCB",
    ];
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours * 100 + minutes;
    var cParkingRateGeneral;
    var cParkingRateRN;

    console.log("getting parking rates");

    db.transaction((tx) => {
      tx.executeSql(queries[0], [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const cpInfo = results.rows._array[i];
          cParkingRateRN = 0.6;
          cParkingRateGeneral = {
            MonSat7To5: 0.6,
            Other: 0.6,
            free_parking: cpInfo["free_parking"],
          };

          if (this.freeParking(day, time, cpInfo["free_parking"])) {
            cParkingRateRN = 0;
          }
          if (centralArea.includes(cpInfo["car_park_no"])) {
            cParkingRateGeneral["MonSat7To5"] = 1.2;
            cParkingRateGeneral["Other"] = 0.6;
            cParkingRateRN = this.centralParkingRate(
              day,
              hours,
              cParkingRateRN
            );
          }

          tx.executeSql(queries[1], [
            JSON.stringify(cParkingRateGeneral),
            cpInfo["car_park_no"],
          ]);
          tx.executeSql(queries[2], [cParkingRateRN, cpInfo["car_park_no"]]);
        }
      });
    });
  }
  /**
   * Checks if peak central parking rates are applicable at the carpark
   *
   * @param {number} day The current day
   * @param {number} hours The hours portion of the current time
   * @param {number} cParkingRateRN The current parking rate at the carpark
   * @returns
   */
  centralParkingRate(day, hours, cParkingRateRN) {
    if (hours >= 7 && hours <= 17 && day > 0 && cParkingRateRN != 0) {
      return 1.2;
    }
    return cParkingRateRN;
  }

  /**
   * Checks if free parking is applicable at the carpark
   *
   * @param {number} day The current day
   * @param {number} time The hours portion of the current time
   * @param {String} cpFreeParking The details of free parking at the carpark
   * @returns
   */
  freeParking(day, time, cpFreeParking) {
    return (
      ((day == 0 || day == 5) &&
        time <= 2230 &&
        cpFreeParking == "SUN & PH FR 7AM-10.30PM" &&
        time >= 700) ||
      (cpFreeParking == "SUN & PH FR 1PM-10.30PM" && time >= 1300)
    );
  }

  /**
   * Updates nearbyCpInfo table with parking rates for non-car vehicels
   *
   * @param {String[]} queries The queries to be made to the database
   */
  notCar(queries) {
    db.transaction((tx) => {
      tx.executeSql(queries[0], [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const cpInfo = results.rows._array[i];
          if (cpInfo["y_lots_available"] != null) {
            tx.executeSql(queries[1], [0.65, cpInfo["car_park_no"]]);
          }
          if (cpInfo["y_lots_available"] != null) {
            tx.executeSql(queries[2], [1.2, cpInfo["car_park_no"]]);
          }
        }
      });
    });
  }

  /**
   * Sets value of grace period for carparks in selected table
   * @param {number} index 1 for favourites table, 0 for nearbyCpInfo table
   */
  getGracePeriod(index) {
    var query;
    index == 0
      ? (query = "SELECT * FROM nearbyCpInfo")
      : (query = "SELECT * FROM favourites");
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM nearbyCpInfo", [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const cpInfo = results.rows._array[i];
          var grace_period;
          const exceptions = ["HG55", "HG97", "HG47"];
          if (
            cpInfo["type_of_parking_system"] == "ELECTRONIC PARKING" &&
            !exceptions.includes(cpInfo["car_park_no"])
          ) {
            grace_period = 10;
          } else {
            grace_period = 0;
          }
          tx.executeSql(
            "UPDATE nearbyCpInfo SET grace_period=? WHERE car_park_no=?",
            [grace_period, cpInfo["car_park_no"]]
          );
        }
      });
    });
  }

  /**
   * Gets the list of destination-carpark pairs in the favourites list in Firebase
   *
   * @returns {Object} The list of destination-carpark pairs in the favourites list in Firebase
   */
  getFavourites() {
    var user = firebase.auth().currentUser.uid;
    var results;
    firebase
      .database()
      .ref(`Favourites/${user}/`)
      .on("value", (snapshot) => {
        results = snapshot.val();
      });
    return results;
  }

  /**
   * Sets lot availability data for every carpark in table
   * @param {number} index 1 for favourites table, 0 for nearbyCpInfo table
   * @param {string} car_park_no Carpark number
   * @param {*} cpLots Lot availability info
   * @param {string} destination_address Address of user's final destination
   */
  setLots(index, car_park_no, cpLots, destination_address) {
    var table = "nearbyCpInfo";
    var addon = "";

    if (index == 1) {
      table = "favourites";
      addon = " AND destination_address=?";
    }
    var queries = [
      "UPDATE " + table + " SET c_lots_available=? WHERE car_park_no=?" + addon,
      "UPDATE " + table + " SET y_lots_available=? WHERE car_park_no=?" + addon,
      "UPDATE " + table + " SET h_lots_available=? WHERE car_park_no=?" + addon,
    ];

    var typeC = cpLots.filter((d) => d.lot_type == "C")[0];
    db.transaction((tx) => {
      var params = [typeC["lots_available"], car_park_no];
      if (index == 1) {
        params = [typeC["lots_available"], car_park_no, destination_address];
      }
      tx.executeSql(
        queries[0],
        params,
        () => {},
        () => {
          console.log("set lots error");
        }
      );

      if (cpLots.length > 1) {
        var typeY = cpLots.filter((d) => d.lot_type == "Y")[0];
        var typeH = cpLots.filter((d) => d.lot_type == "H")[0];
        console.log("Y: ", typeY, car_park_no);

        if (typeY != {} && typeY != undefined) {
          var params = [typeY["lots_available"], car_park_no];
          if (index == 1) {
            params = [
              typeY["lots_available"],
              car_park_no,
              destination_address,
            ];
          }
          tx.executeSql(
            queries[1],
            params,
            () => {},
            () => {
              console.log("set lots error");
            }
          );
        }
        if (typeH != {} && typeH != undefined) {
          var params = [typeH["lots_available"], car_park_no];
          if (index == 1) {
            params = [
              typeH["lots_available"],
              car_park_no,
              destination_address,
            ];
          }
          tx.executeSql(
            queries[2],
            params,
            () => {},
            () => {
              console.log("set lots error");
            }
          );
        }
      }
    });
  }

  /**
   * Gets distance between two points
   * @param {string} toLatLong Latitude and longitude values of end point
   * @param {string} fromLatLong Latitude and longitude values of start point
   * @returns {number} Distance between start and end points in km
   */
  getDistance(toLatLong, fromLatLong) {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    var toLatLongSep = toLatLong.split(",");
    var lat1 = parseFloat(toLatLongSep[0]);
    var long1 = parseFloat(toLatLongSep[1]);

    var fromLatLongSep = fromLatLong.split(",");
    var lat2 = parseFloat(fromLatLongSep[0]);
    var long2 = parseFloat(fromLatLongSep[1]);
    // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLong = deg2rad(long2 - long1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  /**
   * Checks whether or not the user is signed in to another device
   *
   * @returns {Promise} Whether or not the user is signed in to another device
   */
  async checkSignedIn() {
    var user = firebase.auth().currentUser.uid;
    return new Promise(function (resolve, reject) {
      firebase
        .database()
        .ref(`signedInStatus/${user}`)
        .on("value", (snapshot) => {
          resolve(snapshot.val().signedIn);
        });
    });
  }

  /**
   * Drops all existing tables in local database
   */
  dropAllTables() {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE cpInfo",
        [],
        () => {},
        () => {}
      );
      tx.executeSql(
        "DROP TABLE favourites",
        [],
        () => {},
        () => {}
      );
      tx.executeSql(
        "DROP TABLE nearbyCpTable",
        [],
        () => {},
        () => {}
      );
      tx.executeSql(
        "DROP TABLE nearbyPgs",
        [],
        () => {},
        () => {}
      );
      tx.executeSql(
        "DROP TABLE pgs",
        [],
        () => {},
        () => {}
      );
      tx.executeSql(
        "DROP TABLE searchHistory",
        [],
        () => {},
        () => {}
      );
    });
  }
}
