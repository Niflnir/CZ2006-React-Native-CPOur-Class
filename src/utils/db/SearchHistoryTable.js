import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cp.db");

export default class SearchHistoryTable {
  constructor(locationInfo) {
    this.locationInfo = locationInfo;
  }
  createSearchHistoryTable() {
    console.log("creating searchHistoryTable");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS searchHistory (" +
          "ADDRESS character varying UNIQUE," +
          "BLK_NO character varying," +
          "BUILDING character varying," +
          "LATITUDE character varying," +
          "LONGITUDE character varying," +
          "POSTAL character varying," +
          "ROAD_NAME character varying," +
          "SEARCHVAL character varying," +
          "X character varying," +
          "Y character varying)"
      );

      tx.executeSql(
        "SELECT COUNT(*) FROM (SELECT 0 FROM searchHistory LIMIT 1)",
        [],
        (tx, results) => {
          if (results.rows.item(0)["COUNT(*)"] == 0) {
            tx.executeSql(
              "INSERT INTO searchHistory (BUILDING) VALUES ('Current location');"
            );
          }
        }
      );
    });
  }

  dropSearchHistoryTable() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE searchHistory;");
      console.log("dropped");
    });
  }

  setSearchHistoryTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO searchHistory (" +
          "ADDRESS, BLK_NO, BUILDING, LATITUDE, LONGITUDE, POSTAL," +
          "ROAD_NAME, SEARCHVAL, X, Y)" +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          this.locationInfo["ADDRESS"],
          this.locationInfo["BLK_NO"],
          this.locationInfo["BUILDING"],
          this.locationInfo["LATITUDE"],
          this.locationInfo["LONGITUDE"],
          this.locationInfo["POSTAL"],
          this.locationInfo["ROAD_NAME"],
          this.locationInfo["SEARCHVAL"],
          this.locationInfo["X"],
          this.locationInfo["Y"],
        ]
      );
      // tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) =>
      //   console.log("search history: ", results)
      // );
    });
  }
}
