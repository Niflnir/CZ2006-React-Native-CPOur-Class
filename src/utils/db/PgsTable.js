import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages pgs table in local database to store information of all petrol station in Singapore
 */
export default class PgsTable {
  /**
   * Creates new pgs table if not aready existing
   */
  createPgsTable() {
    db.transaction((tx) => {});
  }

  /**
   * Populates pgs table with carpark data
   */
  populate() {
    console.log("populating");
    db.transaction((tx) => {});
  }
}
