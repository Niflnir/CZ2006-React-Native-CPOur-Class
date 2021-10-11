// To drop nearbyCpTable whenever user inputs new address

// TO DO: find out way to empty rather than drop table

import { openDatabase } from "expo-sqlite";

const db = openDatabase("cp.db");
const dropNearbyCpTable = () => {
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE nearbyCpInfo;");
    // tx.executeSql("DROP TABLE cpInfo;");
    console.log("dropped");
  });
};
export default dropNearbyCpTable;
