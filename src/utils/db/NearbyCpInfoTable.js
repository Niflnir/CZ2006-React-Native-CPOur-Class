import * as SQLite from "expo-sqlite";
import GetLots from "../api/GetLots";
import GetRoute from "../api/GetRoute";

db = SQLite.openDatabase("cp.db");

export default class NearbyCpInfoTable {
  constructor(car_park_no, cpLots, toLatLong) {
    this.car_park_no = car_park_no;
    this.cpLots = cpLots;
    this.toLatLong = toLatLong;
  }
  createNearbyCpInfoTable() {
    console.log("creating nearbyCpTable");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
          "car_park_no character varying(10) PRIMARY KEY," +
          "address character varying(80)," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "lat_long character varying(50)," +
          "total_time integer," +
          "total_distance integer," +
          "c_lots_available integer," +
          "h_lots_available integer," +
          "y_lots_available integer," +
          "route_info character varying);"
      );
    });
  }

  async setTable() {
    console.log("getting");
    const getLots = new GetLots();
    const lotData = await getLots.getLots();
    const toLatLong = this.toLatLong;

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
                    (tx, results) => {
                      // console.log(results);
                    }
                  );
                  // to store distance, time, and other route info

                  const getRoute = new GetRoute(
                    lat_long,
                    toLatLong,
                    car_park_no
                  );
                  getRoute.getRoute();
                  const cpLots = lotData.filter(
                    (d) => d.carpark_number == car_park_no
                  );
                  if (cpLots.length != 0) {
                    const temp = new NearbyCpInfoTable(
                      car_park_no,
                      cpLots[0]["carpark_info"]
                    );
                    temp.setLots();
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
  }

  setLots() {
    var typeC = this.cpLots.filter((d) => d.lot_type == "C")[0];
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE nearbyCpInfo SET c_lots_available=? WHERE car_park_no=?",
        [typeC["lots_available"], this.car_park_no],
        () => {},
        (error) => {
          console.log(error);
        }
      );

      if (this.cpLots.length > 1) {
        var typeY = this.cpLots.filter((d) => d.lot_type == "Y")[0];
        var typeH = this.cpLots.filter((d) => d.lot_type == "H")[0];

        if (typeY != {}) {
          tx.executeSql(
            "UPDATE nearbyCpInfo SET y_lots_available=? WHERE car_park_no=?",
            [typeY["lots_available"], this.car_park_no],
            () => {},
            (error) => {
              console.log(error);
            }
          );
        }
        if (typeH != {}) {
          tx.executeSql(
            "UPDATE nearbyCpInfo SET h_lots_available=? WHERE car_park_no=?",
            [typeH["lots_available"], this.car_park_no],
            () => {},
            (error) => {
              console.log(error);
            }
          );
        }
      }
    });
  }
  recreateNearbyCpInfoTable() {
    db.transaction((tx) => {
      console.log("recreating nearbyCpInfoTable");
      tx.executeSql("DROP TABLE nearbyCpInfo;");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS nearbyCpInfo (" +
          "car_park_no character varying(10) PRIMARY KEY," +
          "address character varying(80)," +
          "car_park_type character varying(40)," +
          "type_of_parking_system character varying(20)," +
          "short_term_parking character varying(30)," +
          "free_parking character varying(30)," +
          "night_parking character varying(30)," +
          "lat_long character varying(50)," +
          "total_time integer," +
          "total_distance integer," +
          "c_lots_available integer," +
          "h_lots_available integer," +
          "y_lots_available integer," +
          "route_info character varying);"
      );
    });
  }
}
