// To drop searchHistory table when user clicks on "Clear Search History" from side drawer

// TO DO: find out way to clear rather than drop table

import { openDatabase } from "expo-sqlite";

const db = openDatabase("cp.db");
const dropSearchHistoryTable = () => {
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE searchHistory;");
    console.log("dropped");
  });
};
export default dropSearchHistoryTable;
