import Services from "../Services";
import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import SearchHistoryTable from "../db/SearchHistoryTable";

export default class SearchScreenManager {
  tableHandler(item) {
    const nearbyCpInfoTable = new NearbyCpInfoTable();
    nearbyCpInfoTable.recreateNearbyCpInfoTable();
    const searchHistoryTable = new SearchHistoryTable();
    searchHistoryTable.setSearchHistoryTable(item);
  }

  addressSubmitHandler(address) {
    const URL =
      "https://developers.onemap.sg/commonapi/search?searchVal=" +
      address +
      "&getAddrDetails=Y&returnGeom=Y&pageNum=1";
    const api = new Services();
    const results = api.getData(URL); // to store promise returned by GetData

    return results;
  }
}
