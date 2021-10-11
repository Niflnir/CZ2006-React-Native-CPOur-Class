import * as SQLite from "expo-sqlite";
var result;
const db = SQLite.openDatabase("cp.db");

const sortFilter = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM nearbyCpInfo ORDER BY c_lots_available DESC",
      [],
      (tx, results) => {
        result = results.rows;
      }
    );
  });
  setTimeout(returnResult());
};

const returnResult = () => {
  return result;
};
