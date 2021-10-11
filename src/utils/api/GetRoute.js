// To get route info like distance, time, and instructions and store in database (nearbyCpInfo table)

import * as SQLite from "expo-sqlite";
import GetData from "../db/GetData";
const db = SQLite.openDatabase("cp.db");

const getRoute = async (lat_long, toLatLong, car_park_no) => {
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc5NjAsInVzZXJfaWQiOjc5NjAsImVtYWlsIjoiYXBwLmNwLm91ckBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MzM4NzIwNzgsImV4cCI6MTYzNDMwNDA3OCwibmJmIjoxNjMzODcyMDc4LCJqdGkiOiIwMzZjMDAwZTI3NDA0NGUzNWQxN2ZmYTIxODIxOWRhYSJ9.fIGQPxMUVyAQ-u56CibBjDlqJl0o2SNZafPxChlxH6M";
  const URL =
    "https://developers.onemap.sg/privateapi/routingsvc/route?start=" +
    lat_long +
    "&end=" +
    toLatLong +
    "&routeType=walk&token=" +
    TOKEN;
  await GetData(URL)
    .then((data) => {
      db.transaction((tx) => {
        // tx.executeSql(
        //   "UPDATE nearbyCpInfo SET route_info=? WHERE car_park_no=?",
        //   [JSON.stringify(data), car_park_no],
        //   () => {},
        //   (error) => {
        //     console.log(error);
        //   }
        // );

        tx.executeSql(
          // to store distance of carpark from destination in database
          "UPDATE nearbyCpInfo SET total_distance=? WHERE car_park_no=?",
          [data["route_summary"]["total_distance"] / 1000, car_park_no],
          () => {},
          (error) => {
            console.log(error);
          }
        );

        tx.executeSql(
          // to store travel time from carpark to destination in database
          "UPDATE nearbyCpInfo SET total_time=? WHERE car_park_no=?",
          [data["route_summary"]["total_time"] / 60, car_park_no],
          () => {},
          (error) => {
            console.log(error);
          }
        );
      });
    })
    .catch((error) => console.log(error));
};

export default getRoute;
