import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");

export default class DropAll {
  dropAll() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE cpInfo");
      tx.executeSql("DROP TABLE nearbyCpInfo");
      tx.executeSql("DROP TABLE searchHistory");
      tx.executeSql("DROP TABLE favourites");
    });
  }
}
