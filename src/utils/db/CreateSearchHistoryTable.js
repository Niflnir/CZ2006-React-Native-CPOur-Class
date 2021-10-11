// To create searchHistory table that stores recently searched addresses and relevant info
// Always initalized with current location as first row so can display it as an option on SearchScreen

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cp.db");

const createSearchHistoryTable = () => {
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
            "INSERT INTO searchHistory (ADDRESS, BUILDING) VALUES ('Current location', 'Current location');"
          );
        }
      }
    );
  });
};

export default createSearchHistoryTable;
