// To create nearbyCpInfo table that stores relevant info of nearby carparks

// TO DO: create separate columns for lots available and total lots, store as integers so can sort later on

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cp.db");

const createNearbyCpTable = () => {
  console.log("creating nearbyCpTable");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
        "car_park_no character varying(10) PRIMARY KEY," +
        "address character varying(80)," +
        "car_park_type character varying(40)," +
        "type_of_parking_system character varying(20)," +
        "short_term_parking character varying(30)," +
        "free_parking character varying(30)," +
        "night_parking character varying(30)," +
        "lat_long character varying(50)," +
        "total_time integer," +
        "total_distance integer," +
        "c_lots_available integer," +
        "h_lots_available integer," +
        "y_lots_available integer," +
        "route_info character varying);"
    );
  });
};

export default createNearbyCpTable;
