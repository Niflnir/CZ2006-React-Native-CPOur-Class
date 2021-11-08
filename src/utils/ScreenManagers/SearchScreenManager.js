import Services from "../Services";
import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import SearchHistoryTable from "../db/SearchHistoryTable";
import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");

export default class SearchScreenManager {
  tableHandler(currentLocation, item) {
    const nearbyCpInfoTable = new NearbyCpInfoTable();
    nearbyCpInfoTable.recreateNearbyCpInfoTable();
    if (!currentLocation) {
      const searchHistoryTable = new SearchHistoryTable();
      searchHistoryTable.setSearchHistoryTable(item);
    }
  }

  getSearchHistory() {
    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM searchHistory", [], (tx, results) => {
          resolve(results);
        });
      });
    });
  }

  addressSubmitHandler(address) {
    const URL =
      "https://developers.onemap.sg/commonapi/search?searchVal=" +
      address +
      "&getAddrDetails=Y&returnGeom=Y&pageNum=1";
    const services = new Services();
    const results = services.getData(URL); // to store promise returned by GetData

    return results;
  }
}
