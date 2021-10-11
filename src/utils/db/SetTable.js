// To find nearby carparks and store relevant info in nearbyCpInfo table in database

// TO DO: find better way than timeouts to make sync

import * as SQLite from "expo-sqlite";
import getRoute from "../api/GetRoute";
import getLots from "../api/GetLots";
import setLots from "./SetLots";

var lotData;

const db = SQLite.openDatabase("cp.db");

const setTable = async (toLatLong) => {
  console.log("getting");
  lotData = await getLots();

  // to get distance of carpark from destination
  const getDistance = (toLatLong, fromLatLong) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    var toLatLongSep = toLatLong.split(",");
    var lat1 = parseFloat(toLatLongSep[0]);
    var long1 = parseFloat(toLatLongSep[1]);

    var fromLatLongSep = fromLatLong.split(",");
    var lat2 = parseFloat(fromLatLongSep[0]);
    var long2 = parseFloat(fromLatLongSep[1]);
    // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLong = deg2rad(long2 - long1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cpInfo;", [], async (tx, results) => {
        // to iterate through every carpark in database, find distance from destination, and store nearby carparks
        const distanceHandler = (low, high) => {
          for (var i = low; i < high; i++) {
            var oneCP = results.rows.item(i);
            var distance = getDistance(toLatLong, oneCP.lat_long);
            console.log();

            if (distance < 0.6) {
              // estimate of nearby carpark (note: distance is not proper route, only straight line)
              const car_park_no = oneCP.car_park_no;
              const address = oneCP.address;
              const car_park_type = oneCP.car_park_type;
              const type_of_parking_system = oneCP.type_of_parking_system;
              const short_term_parking = oneCP.short_term_parking;
              const free_parking = oneCP.free_parking;
              const night_parking = oneCP.night_parking;
              const lat_long = oneCP.lat_long;

              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO nearbyCpInfo (car_park_no, address, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, lat_long)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                  [
                    car_park_no,
                    address,
                    car_park_type,
                    type_of_parking_system,
                    short_term_parking,
                    free_parking,
                    night_parking,
                    lat_long,
                  ],
                  () => {}
                );
                // to store distance, time, and other route info
                getRoute(lat_long, toLatLong, car_park_no);
                const cpLots = lotData.filter(
                  (d) => d.carpark_number == car_park_no
                );
                if (cpLots.length != 0) {
                  setLots(car_park_no, cpLots[0]["carpark_info"]);
                }
              });
            }
            if (i == 2161) {
              console.log("done getting");
            }
          }
        };
        distanceHandler(0, 1000);
        setTimeout(() => {
          distanceHandler(1000, 2162);
        }, 500);
      });
    });
  });
};

export default setTable;
