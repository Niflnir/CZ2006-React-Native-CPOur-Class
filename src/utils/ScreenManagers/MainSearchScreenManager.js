import ApiServices from "../ApiServices";
import CpInfoTable from "../db/CpInfoTable";
import FavouritesTable from "../db/FavouritesTable";
import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import PgsTable from "../db/PgsTable";
import SearchHistoryTable from "../db/SearchHistoryTable";
import FirebaseServices from "../FirebaseServices";
import LocationServices from "../LocationServices";
/**
 * Manages interaction between MainSearchScreen and control classes
 */
export default class MainSearchScreenManager {
  /**
   * Initialize tables in local database and asks user for permission to access location services
   */
  didMount() {
    const pgsTable = new PgsTable();
    const cpInfoTable = new CpInfoTable();
    const searchHistoryTable = new SearchHistoryTable();
    const fav = new FavouritesTable();
    const locationServices = new LocationServices();
    cpInfoTable.createCpInfoTable();
    searchHistoryTable.createSearchHistoryTable();
    fav.createFavouritesTable();
    pgsTable.createPgsTable();
    locationServices.getLocationPermission();
  }

  /**
   * Stores relevant location information in respective variables
   *
   * @param {String} postal The postal code of the selected destination
   * @param {String} building The building name of the selected destination
   */
  async paramHandler(paramData) {
    const apiServices = new ApiServices();
    const locationServices = new LocationServices();
    const fbServices = new FirebaseServices();
    locationServices.getLocationPermission();
    var info = {
      locationData: {},
      latLong: "",
      address: "",
      currentLatLong: "",
      currentPostalCode: "",
      postal: "",
    };
    await locationServices.getLocation().then((data) => {
      info["currentLatLong"] = data;
      var TOKEN = fbServices.getToken();
      TOKEN = fbServices.getToken();
      const URL =
        "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
        info["currentLatLong"] +
        "&token=" +
        TOKEN;
      apiServices
        .getData(URL)
        .then((data) => {
          data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")
            ? (info["currentPostalCode"] = data["GeocodeInfo"][0]["POSTALCODE"])
            : (info["currentPostalCode"] = "Postal code unavailable");
        })
        .catch((err) => console.log(err, URL));
    });
    info.postal = paramData["POSTAL"];

    if (paramData["BUILDING"] == "Current location") {
      info["postal"] = "000000";
      info["latLong"] = info["currentLatLong"];
      info["locationData"]["ADDRESS"] = "Current location";
      info["address"] = "";
    } else {
      info["locationData"] = paramData;
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
   *
   * @param {number} sortOption The index of the sort criteria selected by the user
   * @param {boolean[]} filterOption An array which specifies whether each of the available filter criteria have been selected by the user
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
   * Creates a database query to obtained the sorted and filtered results as per the user's selection
   *
   * @param {number} sortOption The index of the sort criteria selected by the user
   * @param {boolean[]} filterOption An array which specifies whether each of the available filter criteria have been selected by the user
   * @returns {String} Query to be made to database for selected sort/filter options
   */
  sortFilter(sortQuery, filterOption) {
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
      filterQuery = "WHERE ";
      for (var i = 0; i < 6; i++) {
        if (filterOption[i] == false) {
          if (filterQuery == "WHERE ") {
            filterQuery += filterQueryOptions[i];
          } else {
            filterQuery += " AND " + filterQueryOptions[i];
          }
        }
      }
    }
    const sortFilterQuery =
      "SELECT * FROM nearbyCpInfo " + filterQuery + " ORDER BY " + sortQuery;
    return sortFilterQuery;
  }
}
