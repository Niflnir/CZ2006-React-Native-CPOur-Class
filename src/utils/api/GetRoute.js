// To get route info like distance, time, and instructions and store in database (nearbyCpInfo table)

import * as SQLite from "expo-sqlite";
import GetData from "../api/GetData";
import { getToken } from "../DbServices";
db = SQLite.openDatabase("cpour.db");

export default class GetRoute {
  async getRoute(lat_long, toLatLong, car_park_no, currentLatLong) {
    db.transaction((tx) => {
      tx.executeSql("SELECT * from nearbyCpInfo", (tx, results) =>
        console.log("ROUTE: ", results)
      );
    });

    const TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc5NjAsInVzZXJfaWQiOjc5NjAsImVtYWlsIjoiYXBwLmNwLm91ckBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MzUyNTY3MTAsImV4cCI6MTYzNTY4ODcxMCwibmJmIjoxNjM1MjU2NzEwLCJqdGkiOiIwMjkzY2ZkYTc4NzFjNTY5NTgwMjkxMDNmN2I4NmM1NCJ9.Ppc_NQFKw5NOkzjNP1xXE8S35dq9faiwzAwlv9GPEek";

    const URL =
      "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
      lat_long +
      "&end=" +
      toLatLong +
      "&routeType=walk&token=" +
      TOKEN;
    const URL2 =
      "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=" +
      lat_long +
      "&token=" +
      TOKEN;
    const URL3 =
      "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
      currentLatLong +
      "&end=" +
      toLatLong +
      "&routeType=drive&token=" +
      TOKEN;
    const getData = new GetData();
    await getData
      .getData(URL)
      .then((data) => {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE nearbyCpInfo SET route_info=? WHERE car_park_no=?",
            [JSON.stringify(data), car_park_no],
            () => {},
            (error) => {
              console.log(error);
            }
          );

          tx.executeSql(
            // to store distance of carpark from destination in database
            "UPDATE nearbyCpInfo SET total_distance=? WHERE car_park_no=?",
            [data["route_summary"]["total_distance"] / 1000, car_park_no],
            () => {},
            () => {
              console.log("Route error");
            }
          );

          tx.executeSql(
            // to store travel time from carpark to destination in database
            "UPDATE nearbyCpInfo SET total_time=? WHERE car_park_no=?",
            [data["route_summary"]["total_time"] / 60, car_park_no],
            () => {},
            () => {
              console.log("Route error");
            }
          );
        });
      })
      .catch((err) => console.log(err, URL));
    var postal = "Postal code unavailable";
    await getData
      .getData(URL2)
      .then((data) => {
        if (data["GeocodeInfo"][0].hasOwnProperty("POSTALCODE")) {
          postal = data["GeocodeInfo"][0]["POSTALCODE"];
        }
      })
      .catch((err) => console.log(err, URL));
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE nearbyCpInfo SET postal=? WHERE car_park_no=?",
        [postal, car_park_no],
        () => {},
        (error) => {
          console.log("Route error");
        }
      );
    });
    if (currentLatLong != lat_long) {
      await getData
        .getData(URL3)
        .then((data) => {
          db.transaction((tx) => {
            tx.executeSql(
              "UPDATE nearbyCpInfo SET route_info_from_current=? WHERE car_park_no=?",
              [JSON.stringify(data), car_park_no],
              () => {},
              (error) => {
                console.log(error);
              }
            );
          });
        })
        .catch((err) => console.log(err, URL));
    }
  }
}
