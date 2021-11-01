import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");
/**
 * Gets grace period for carparks
 */
export default class GetGracePeriod {
  /**
   * Sets value of grace period for carparks in selected table
   * @param {number} index 1 for favourites table, 0 for nearbyCpInfo table
   */
  getGracePeriod(index) {
    var query;
    index = 0
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
}
