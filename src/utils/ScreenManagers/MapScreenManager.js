import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");

export default class MapScreenManaager {
  pgsList() {
    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pgs",
          [],
          (tx, results) => {
            resolve(results);
          },
          (tx, err) => {
            reject(err);
          }
        );
      });
    });
  }
}
