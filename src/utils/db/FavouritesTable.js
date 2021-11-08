import { getFavourites } from "../DbServices";
import GetGracePeriod from "../GetGracePeriod";
import ParkingRates from "../GetParkingRates";
import Services from "../Services";
import * as SQLite from "expo-sqlite";
import NearbyCpInfoTable from "./NearbyCpInfoTable";

db = SQLite.openDatabase("cpour.db");

/**
 * Manages favourites table in local database to store information of favourited destination-carpark pairs
 */
export default class FavouritesTable {
  /**
   * Creates new favourites table if not already exisiting and populates it with data stored in user database
   */
  async createFavouritesTable() {
    console.log("creating favourites");
    const nearby = new NearbyCpInfoTable();

    const api = new Services();
    lotData = await api.getLots();
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favourites (" +
          "car_park_no character varying(10)," +
          "address character varying(80)," +
          "postal character varying," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "grace_period integer," +
          "lat_long character varying(50)," +
          "total_time double precision," +
          "total_distance double precision," +
          "c_lots_available integer," +
          "c_parking_rates_current double_precision," +
          "c_parking_rates_general character varying," +
          "h_lots_available integer," +
          "h_parking_rates_general double precision," +
          "y_lots_available integer," +
          "y_parking_rates_general double precision," +
          "route_info character varying," +
          "route_info_from_current character varying," +
          "destination_address character varying," +
          "destination_latlong character varying," +
          "destination_postal character varying," +
          "PRIMARY KEY (car_park_no, destination_address));",
        [],
        () => {},
        (tx, er) => console.log("cant table")
      );
      tx.executeSql(
        "DROP TABLE favourites",
        [],
        () => {},
        (tx, err) => {
          console.log(err);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favourites (" +
          "car_park_no character varying(10)," +
          "address character varying(80)," +
          "postal character varying," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "grace_period integer," +
          "lat_long character varying(50)," +
          "total_time double precision," +
          "total_distance double precision," +
          "c_lots_available integer," +
          "c_parking_rates_current double_precision," +
          "c_parking_rates_general character varying," +
          "h_lots_available integer," +
          "h_parking_rates_general double precision," +
          "y_lots_available integer," +
          "y_parking_rates_general double precision," +
          "route_info character varying," +
          "route_info_from_current character varying," +
          "destination_address character varying," +
          "destination_latlong character varying," +
          "destination_postal character varying," +
          "PRIMARY KEY (car_park_no, destination_address));",
        [],
        () => {},
        (tx, er) => console.log("cant table")
      );

      const favouritesList = getFavourites();
      for (const cp in favouritesList) {
        if (cp != "initialized") {
          const oneCpInfo = favouritesList[cp];
          for (const dPostal in oneCpInfo) {
            const cpInfo = oneCpInfo[dPostal]["cpInfo"];
            const locationInfo = oneCpInfo[dPostal]["locationInfo"];
            const car_park_no = cpInfo["car_park_no"];
            const address = cpInfo["address"];
            const postal = cpInfo["postal"];
            const car_park_type = cpInfo["car_park_type"];
            const type_of_parking_system = cpInfo["type_of_parking_system"];
            const short_term_parking = cpInfo["short_term_parking"];
            const free_parking = cpInfo["free_parking"];
            const night_parking = cpInfo["night_parking"];
            const grace_period = cpInfo["grace_period"];
            const lat_long = cpInfo["lat_long"];
            const c_parking_rates_general = cpInfo["c_parking_rates_general"];
            const h_parking_rates_general = cpInfo["h_parking_rates_general"];
            const y_parking_rates_general = cpInfo["y_parking_rates_general"];
            const route_info = cpInfo["route_info"];
            const route_info_from_current = cpInfo["route_info_from_current"];
            const total_time = cpInfo["total_time"];
            const total_distance = cpInfo["total_distance"];
            const l_address = locationInfo["address"];
            const l_latlong = locationInfo["latLong"];
            const l_postal = locationInfo["postal"];

            tx.executeSql(
              "INSERT INTO favourites (" +
                "car_park_no," +
                "address," +
                "postal," +
                "car_park_type," +
                "type_of_parking_system," +
                "short_term_parking," +
                "free_parking," +
                "night_parking," +
                "grace_period," +
                "lat_long," +
                "c_parking_rates_general," +
                "h_parking_rates_general," +
                "y_parking_rates_general," +
                "destination_address)" +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
              [
                car_park_no,
                address,
                postal,
                car_park_type,
                type_of_parking_system,
                short_term_parking,
                free_parking,
                night_parking,
                grace_period,
                lat_long,
                c_parking_rates_general,
                h_parking_rates_general,
                y_parking_rates_general,
                l_address,
              ],
              () => {},
              (tx, err) => {
                console.log(err);
              }
            );

            tx.executeSql(
              "UPDATE favourites SET route_info_from_current=?, route_info=?, total_time=?, total_distance=?, destination_address=?, destination_latlong=?, destination_postal=? WHERE car_park_no=?",
              [
                route_info_from_current,
                route_info,
                total_time,
                total_distance,
                l_address,
                l_latlong,
                l_postal,
                car_park_no,
              ],
              () => {},
              (tx, err) => console.log(err)
            );
            const cpLots = lotData.filter(
              (d) => d.carpark_number == car_park_no
            );
            if (cpLots.length != 0) {
              nearby.setLots(
                1,
                car_park_no,
                cpLots[0]["carpark_info"],
                l_address
              );
            }
          }
        }
      }
    });
    const rate = new ParkingRates();
    const table = "favourites";
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
    rate.getCarParkingRate(queries1);
    rate.notCar(queries2);
    const grace = new GetGracePeriod();
    grace.getGracePeriod();
  }
  print() {
    db.transaction((tx) => {
      console.log("printing");
      tx.executeSql(
        "SELECT * FROM favourites",
        [],
        (tx, results) => {
          console.log("res: ", results);
        },
        (tx, error) => console.log(error)
      );
    });
  }
}
