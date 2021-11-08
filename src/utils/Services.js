import * as Location from "expo-location";

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
   * Uses GetData.getData() to make API call and store carpark lot availability data
   * @returns {*} Data retrieved from API
   */
  async getLots() {
    console.log("getting lot availability");
    var today = new Date();
    var time = today.toString().split(" ")[4];
    var dateTime = today.toISOString().slice(0, 10) + "T" + time;

    const URL =
      "https://api.data.gov.sg/v1/transport/carpark-availability?date_time=" +
      dateTime;

    const getData = new GetData(URL);

    await getData
      .getData(URL)
      .then((data) => {
        this.#lotData = data;
      })
      .catch((err) => console.log(err, URL));

    return this.#lotData["items"][0]["carpark_data"];
  }

  /**
   * Retrieves relevant route information from user's current location to carpark as well as from carpark
   * to final destination and stores it in nearbyCpInfo tbale
   *
   * @param {string} fromLatLong Latitude and longitude values of carpark
   * @param {string} toLatLong Latitude and longitude values of destination
   * @param {string} key Carpark number of selected carpark
   * @param {string} currentLatLong Latitude and longitude values of user's current location
   */
  async getRoute(fromLatLong, toLatLong, key, currentLatLong) {
    const getData = new GetData();

    const TOKEN = getToken();
    if (currentLatLong == "no") {
      const URL0 =
        "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
        fromLatLong +
        "&end=" +
        toLatLong +
        "&routeType=drive&token=" +
        TOKEN;
      await getData
        .getData(URL0)
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
      await getData
        .getData(URL1)
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
      await getData
        .getData(URL2)
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
        await getData
          .getData(URL3)
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
   * @returns {Location.LocationObject} User's current location data
   */
  async getLocation() {
    let location = await Location.getCurrentPositionAsync({});
    var latLong =
      location["coords"]["latitude"] + "," + location["coords"]["longitude"];
    return latLong;
  }

  /**
   * Asks user for permission to access location services
   * @returns {Location.PermissionStatus.GRANTED} "Granted" if user has granted location permissions
   */
  async getLocationPermission() {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. You will only be able to access limited features of this app."
      );
      return;
    } else {
      return "granted";
    }
  }
}
