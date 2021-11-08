import CpInfoTable from "../db/CpInfoTable";
import FavouritesTable from "../db/FavouritesTable";
import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import PgsTable from "../db/PgsTable";
import SearchHistoryTable from "../db/SearchHistoryTable";
import Services from "../Services";

export default class MainSearchScreenManager {
  async didMount() {
    const pgsTable = new PgsTable();
    const cpInfoTable = new CpInfoTable();
    const searchHistoryTable = new SearchHistoryTable();
    const fav = new FavouritesTable();
    const services = new Services();
    cpInfoTable.createCpInfoTable();
    searchHistoryTable.createSearchHistoryTable();
    fav.createFavouritesTable();
    pgsTable.createPgsTable();
    await services
      .getLocationPermission()
      .then((data) => {
        status = data;
      })
      .catch((error) => console.log("location error: ", error));
  }

  /**
   * Stores relevant location information in respective variables
   */
  async paramHandler(postal, building) {
    const services = new Services();
    services.getLocationPermission();
    var info = {
      locationData: {},
      latLong: "",
      address: "",
      currentLatLong: "",
      currentPostalCode: "",
      postal: "",
    };
    await services.getLocation().then((data) => {
      info["currentLatLong"] = data;
      var TOKEN = services.getToken();
      TOKEN = services.getToken();
      const URL =
        "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
        info["currentLatLong"] +
        "&token=" +
        TOKEN;
      services
        .getData(URL)
        .then((data) => {
          data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")
            ? (info["currentPostalCode"] = data["GeocodeInfo"][0]["POSTALCODE"])
            : (info["currentPostalCode"] = "Postal code unavailable");
        })
        .catch((err) => console.log(err, URL));
    });
    info.postal = postal; //////// postal :

    if (building == "Current location") {
      info["postal"] = "000000";
      info["latLong"] = info["currentLatLong"];
      info["locationData"]["ADDRESS"] = "Current location";
      info["address"] = "";
    } else {
      info["address"] = info["locationData"]["ADDRESS"];
      info["latLong"] =
        info["locationData"]["LATITUDE"] +
        "," +
        info["locationData"]["LONGITUDE"];
    }

    setTimeout(() => {
      const nearbyCpInfoTable = new NearbyCpInfoTable();
      nearbyCpInfoTable.setTable(info["latLong"], info.currentLatLong);
    }, 3000);

    return info;
  }

  /**
   * Sets list to be displayed in flatlist
   */
  flListHandler(sortOption, filterOption) {
    var sortQuery = "c_lots_available DESC";
    if (sortOption == 1) {
      sortQuery = "total_distance ASC";
    } else if (sortOption == 2) {
      sortQuery = "c_parking_rates_current ASC";
    }
    const query = this.sortFilter(sortQuery, filterOption);

    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results.rows["_array"]);
        });
      });
    });
  }
  /**
   *
   * @param {number} sortOption Index of sort criteria selected by user
   * @param {boolean[]} filterOption Whether or not each filter criteria has been selected by user
   * @returns {String} Query to be made to database `for selected sort/filter options
   */
  sortFilter(sortQuery, filterOption) {
    var filterQueryArray = [];
    var filterQuery = "";
    const filterQueryOptions = [
      "h_lots_available IS NOT NULL",
      "y_lots_available IS NOT NULL",
      "free_parking != 'NO'",
      "night_parking != 'NO'",
      "type_of_parking_system == 'ELECTRONIC PARKING'",
      "type_of_parking_system == 'COUPON PARKING'",
    ];

    if (filterOption.includes(false)) {
      // min 2 test cases
      filterQuery = "WHERE ";
      for (var i = 0; i < 6; i++) {
        if (filterOption[i] == false) {
          if (filterQuery == "WHERE ") {
            filterQuery += filterQueryOptions[i];
          } else {
            filterQuery += " AND " + filterQueryOptions[i];
          }
        }
      } // 2 Test case
    } // 1 test A1

    const sortFilterQuery =
      "SELECT * FROM nearbyCpInfo " + filterQuery + " ORDER BY " + sortQuery;
    console.log(sortFilterQuery);
    return sortFilterQuery;
  }
}
