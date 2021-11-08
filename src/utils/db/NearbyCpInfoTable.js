import * as SQLite from "expo-sqlite";
import ApiServices from "../ApiServices";
import DatabaseServices from "../DatabaseServices.js";
import ParkingRatesServices from "../ParkingRatesServices";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages nearbyCpInfo table in local database to store information of carparks near user's input destination
 */
export default class NearbyCpInfoTable {
  /**
   * Creates new nearbyCpInfo table if not already existing
   */
  createNearbyCpInfoTable() {
    console.log("creating nearbyCpTable");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
          "car_park_no character varying(10) PRIMARY KEY," +
          "address character varying(80)," +
          "postal character varying," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "grace_period integer," +
          "lat_long character varying(50)," +
          "total_time integer," +
          "total_distance integer," +
          "c_lots_available integer," +
          "c_parking_rates_current double_precision," +
          "c_parking_rates_general character varying," +
          "h_lots_available integer," +
          "h_parking_rates_general double precision," +
          "y_lots_available integer," +
          "y_parking_rates_general double precision," +
          "route_info character varying," +
          "route_info_from_current character varying);"
      );
    });
  }

  /**
   * Iterates through cpInfo table to find carparks in vicinity of users input destination and stores route info in nearbyCpInfo table
   * @param {string} toLatLong Latitude and longitude values of destination
   * @param {string} currentLatLong Latitude and longitude values of user's current location
   */
  async setTable(toLatLong, currentLatLong) {
    console.log("getting");
    const apiServices = new ApiServices();
    const rateServices = new ParkingRatesServices();
    const dbServices = new DatabaseServices();
    const lotData = await apiServices.getLots();
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cpInfo;", [], async (tx, results) => {
        // to iterate through every carpark in database, find distance from destination, and store nearby carparks
        const distanceHandler = (low, high) => {
          for (var i = low; i < high; i++) {
            var oneCP = results.rows.item(i);
            var distance = dbServices.getDistance(toLatLong, oneCP.lat_long);

            if (distance < 0.6) {
              // estimate of nearby carpark (note: distance is not proper route, only straight line)
              const car_park_no = oneCP.car_park_no;
              const address = oneCP.address;
              const car_park_type = oneCP.car_park_type;
              const type_of_parking_system = oneCP.type_of_parking_system;
              const short_term_parking = oneCP.short_term_parking;
              const free_parking = oneCP.free_parking;
              const night_parking = oneCP.night_parking;
              const lat_long = oneCP.lat_long;

              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO nearbyCpInfo (car_park_no, address, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, lat_long)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                  [
                    car_park_no,
                    address,
                    car_park_type,
                    type_of_parking_system,
                    short_term_parking,
                    free_parking,
                    night_parking,
                    lat_long,
                  ],
                  (tx, results) => {
                    // console.log(results);
                  }
                );
                // to store distance, time, and other route info
                const dbServices = new DatabaseServices();
                dbServices.getRoute(
                  lat_long,
                  toLatLong,
                  car_park_no,
                  currentLatLong
                );
                const cpLots = lotData.filter(
                  (d) => d.carpark_number == car_park_no
                );
                if (cpLots.length != 0) {
                  dbServices.setLots(0, car_park_no, cpLots[0]["carpark_info"]);
                }
              });
            }
            if (i == 2161) {
              const table = "nearbyCpInfo";
              var queries1 = [
                "SELECT * FROM " + table,
                "UPDATE " +
                  table +
                  " SET c_parking_rates_general = ? WHERE car_park_no = ?",
                "UPDATE " +
                  table +
                  " SET c_parking_rates_current = ? WHERE car_park_no = ?",
              ];
              var queries2 = [
                "SELECT * FROM " + table,
                "UPDATE " +
                  table +
                  " SET y_parking_rates_general = ? WHERE car_park_no = ?",
                "UPDATE " +
                  table +
                  " SET h_parking_rates_general = ? WHERE car_park_no = ?",
              ];
              rateServices.getCarParkingRate(queries1);
              rateServices.notCar(queries2);
              dbServices.getGracePeriod(0);
              console.log("done getting");
            }
          }
        };
        distanceHandler(0, 1000);
        setTimeout(() => {
          distanceHandler(1000, 2162);
        }, 500);
      });
    });
  }

  /**
   * Recreates nearbyCpInfo table whenever new destination is searched
   */
  recreateNearbyCpInfoTable() {
    db.transaction((tx) => {
      console.log("recreating nearbyCpInfoTable");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
          "car_park_no character varying(10) PRIMARY KEY," +
          "address character varying(80)," +
          "postal character varying," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "grace_period integer," +
          "lat_long character varying(50)," +
          "total_time integer," +
          "total_distance integer," +
          "c_lots_available integer," +
          "c_parking_rates_current double_precision," +
          "c_parking_rates_general character varying," +
          "h_lots_available integer," +
          "h_parking_rates_general double precision," +
          "y_lots_available integer," +
          "y_parking_rates_general double precision," +
          "route_info character varying," +
          "route_info_from_current character varying);"
      );

      tx.executeSql("DROP TABLE nearbyCpInfo;");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
          "car_park_no character varying(10) PRIMARY KEY," +
          "address character varying(80)," +
          "postal character varying," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "grace_period integer," +
          "lat_long character varying(50)," +
          "total_time integer," +
          "total_distance integer," +
          "c_lots_available integer," +
          "c_parking_rates_current double_precision," +
          "c_parking_rates_general character varying," +
          "h_lots_available integer," +
          "h_parking_rates_general double precision," +
          "y_lots_available integer," +
          "y_parking_rates_general double precision," +
          "route_info character varying," +
          "route_info_from_current character varying);"
      );
    });
  }
}
