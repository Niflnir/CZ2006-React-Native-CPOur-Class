// To add address selected by user on SearchScreen to searchHistory table

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cp.db");

const setSearchHistory = (locationInfo) => {
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
    // tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) =>
    //   console.log("search history: ", results)
    // );
  });
};

export default setSearchHistory;
