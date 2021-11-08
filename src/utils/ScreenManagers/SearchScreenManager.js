import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import SearchHistoryTable from "../db/SearchHistoryTable";
import * as SQLite from "expo-sqlite";
import ApiServices from "../ApiServices";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages interaction between SearchScreen and control classes
 */
export default class SearchScreenManager {
  /**
   * Creates nearbyCpInfoTable and updates searchHistory table if required
   *
   * @param {boolean} currentLocation Whether "Current location" was selected by the user
   * @param {Object} item The details of the selected destination
   */
  tableHandler(currentLocation, item) {
    const nearbyCpInfoTable = new NearbyCpInfoTable();
    nearbyCpInfoTable.recreateNearbyCpInfoTable();
    if (!currentLocation) {
      const searchHistoryTable = new SearchHistoryTable();
      searchHistoryTable.setSearchHistoryTable(item);
    }
  }

  /**
   * Obtains the list of items in the searchHistory table
   *
   * @returns {Promise} The list of items in the searchHistory table
   */
  getSearchHistory() {
    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
          resolve(results);
        });
      });
    });
  }

  /**
   * Obtains list of locations matching the user's input keyword address
   *
   * @param {String} address The keyword address input by the user
   * @returns {Object} The list of locations matching the keyword address
   */
  addressSubmitHandler(address) {
    const URL =
      "https://developers.onemap.sg/commonapi/search?searchVal=" +
      address +
      "&getAddrDetails=Y&returnGeom=Y&pageNum=1";
    const apiServices = new ApiServices();
    const results = apiServices.getData(URL); // to store promise returned by GetData

    return results;
  }
}
