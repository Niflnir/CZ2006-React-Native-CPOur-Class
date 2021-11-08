import CpInfoTable from "../db/CpInfoTable";
import FavouritesTable from "../db/FavouritesTable";
import NearbyCpInfoTable from "../db/NearbyCpInfoTable";
import PgsTable from "../db/PgsTable";
import SearchHistoryTable from "../db/SearchHistoryTable";
import { getToken } from "../DbServices";
import Services from "../Services";
import SortFilter from "../SortFilter";

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
    var status;
    await services
      .getLocationPermission()
      .then((data) => {
        status = data;
      })
      .catch((error) => console.log("location error: ", error));
    return status;
  }

  /**
   * Stores relevant location information in respective variables
   */
  async paramHandler(status, paramData) {
    if (status !== "granted") {
      Alert.alert(
        "Warning",
        "Permission to access location was denied. Cannot get current location. Please change permissions in settings."
      );
      return;
    }
    var info = {
      locationData: {},
      latLong: "",
      address: "",
      currentLatLong: "",
      currentPostalCode: "",
      postal: "",
    };
    const services = new Services();
    await services.getLocation().then((data) => {
      info["currentLatLong"] = data;
      var TOKEN = getToken();
      TOKEN = getToken();
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
   */
  flListHandler(sortOption, filterOption) {
    const sortfilter = new SortFilter();
    var sortQuery = "c_lots_available DESC";
    if (sortOption == 1) {
      sortQuery = "total_distance ASC";
    } else if (sortOption == 2) {
      sortQuery = "c_parking_rates_current ASC";
    }
    const query = sortfilter.sortFilter(sortQuery, filterOption);

    return new Promise(function (resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results.rows["_array"]);
        });
      });
    });
  }
}
