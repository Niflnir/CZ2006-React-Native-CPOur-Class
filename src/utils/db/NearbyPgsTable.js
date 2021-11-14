import * as SQLite from "expo-sqlite";
import DatabaseServices from "../DatabaseServices.js";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages nearbyPgs table in local database to store information of all petrol station in Singapore
 */
class NearbyPgsTable {
  /**
   * Creates new nearbyPgs table if not aready existing
   */
  createNearbyPgsTable(cpLatLong) {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyPgs (" +
          "name character varying," +
          "address character varying," +
          "postal character varying," +
          "latLong character varying," +
          "total_distance integer," +
          "total_time integer," +
          "route_info character varying)",
        [],
        (tx, results) => console.log("created nearbyPgs table"),
        (tx, err) => console.log("nearbyPgs err: ", err)
      );

      tx.executeSql(
        "DROP TABLE nearbyPgs",
        [],
        () => console.log("dropped"),
        (tx, err) => console.log("drop nearbyPgs: ", err)
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyPgs (" +
          "name character varying," +
          "address character varying," +
          "postal character varying," +
          "latLong character varying," +
          "total_distance integer," +
          "total_time integer," +
          "route_info character varying)",
        [],
        (tx, results) => console.log("created nearbyPgs table"),
        (tx, err) => console.log("nearbyPgs err: ", err)
      );

      tx.executeSql(
        "SELECT COUNT(*) FROM (SELECT 0 FROM nearbyPgs LIMIT 1)",
        [],
        (tx, results) => {
          if (results.rows.item(0)["COUNT(*)"] == 0) {
            this.populate(cpLatLong);
          }
        }
      );
    });
  }

  /**
   * Adds petrol stations in vicinity of carpark to nearbyPgs table
   *
   * @param {String} cpLatLong
   */
  populate(cpLatLong) {
    const dbServices = new DatabaseServices();
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM pgs", [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const onePgs = results.rows.item(i);
          const distance = dbServices.getDistance(onePgs.latLong, cpLatLong);
          if (distance <= 1.5) {
            tx.executeSql(
              "INSERT INTO nearbyPgs (name, address, postal, latLong)" +
                "VALUES(?,?,?,?)",
              [onePgs.name, onePgs.address, onePgs.postal, onePgs.latLong],
              () => {},
              (tx, error) => {
                console.log("populating pgs error: ", error);
              }
            );

            const route_info_from_cp = dbServices.getRoute(
              cpLatLong,
              onePgs.latLong,
              onePgs.postal,
              "no"
            );
          }
        }
      });
    });
  }
  drop() {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE nearbyPgs",
        [],
        () => console.log("dropped"),
        (tx, err) => console.log("drop nearbyPgs: ", err)
      );
    });
  }
  print() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM nearbyPgs",
        [],
        (tx, results) => console.log(results),
        (tx, err) => console.log("print nearbyPgs: ", err)
      );
    });
  }
}
export default NearbyPgsTable;
