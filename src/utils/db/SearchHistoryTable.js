import * as SQLite from "expo-sqlite";

db = SQLite.openDatabase("cpour.db");
/**
 * Manages searchHistoryTable in local database to store recently searched destinations
 */
export default class SearchHistoryTable {
  /**
   * Creates new searchHistoryTable is not already existing
   */
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
    });
  }

  /**
   * Drops existing searchHistoryTable
   */
  dropSearchHistoryTable() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE searchHistory;");
      console.log("dropped");
    });
  }

  /**
   * Adds new destination info to searchHistoryTable whenever user searches new destination
   * @param {*} locationInfo Location information of selected destination
   */
  setSearchHistoryTable(locationInfo) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO searchHistory (" +
          "ADDRESS, BLK_NO, BUILDING, LATITUDE, LONGITUDE, POSTAL," +
          "ROAD_NAME, SEARCHVAL, X, Y)" +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          locationInfo["ADDRESS"],
          locationInfo["BLK_NO"],
          locationInfo["BUILDING"],
          locationInfo["LATITUDE"],
          locationInfo["LONGITUDE"],
          locationInfo["POSTAL"],
          locationInfo["ROAD_NAME"],
          locationInfo["SEARCHVAL"],
          locationInfo["X"],
          locationInfo["Y"],
        ]
      );
    });
  }
}
