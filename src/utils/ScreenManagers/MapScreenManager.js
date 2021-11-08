import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages main logic behind MapScreen
 */
export default class MapScreenManager {
  /**
   * Obtains list of petrol stations in Singapore from pgs table
   *
   * @returns {Object} The list of petrol stations in Singapore
   */
  pgsList() {
    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pgs",
          [],
          (tx, results) => {
            resolve(results);
          },
          (tx, err) => {
            reject(err);
          }
        );
      });
    });
  }

  /**
   * Decodes route_geometry of carparks
   *
   * @param {Object} route_info
   * @returns {Object} Latitude and longitude values of route, and route name
   */
  routeDecoder(route_info) {
    var polyUtil = require("polyline-encoded");
    var encoded = route_info.route_geometry;
    var latLong = [];

    if (encoded !== undefined || encoded !== "" || encoded != null) {
      var latlngs = polyUtil.decode(encoded, {
        precision: 5,
      });
      for (var i = 0; i < latlngs.length; i++) {
        var oneLatLong = { lat: 0, lng: 0 };
        if (latlngs[i] != []) {
          oneLatLong.lat = latlngs[i][0];
          oneLatLong.lng = latlngs[i][1];
          latLong.push(oneLatLong);
        }
      }
      var btnId = "Default route";
      if (route_info.hasOwnProperty("subtitle")) {
        btnId = route_info.subtitle;
      }
      return { atLong: latLong, btnId: btnId };
    }
  }
}
