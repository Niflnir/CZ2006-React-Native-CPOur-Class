// to store lot availability info in nearbyCpInfo table in database

// TO DO: store lots available and total lots as integers in separate columns

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cp.db");

const setLots = (car_park_no, cpLots) => {
  var typeC = cpLots.filter((d) => d.lot_type == "C")[0];
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE nearbyCpInfo SET c_lots_available=? WHERE car_park_no=?",
      [typeC["lots_available"], car_park_no],
      () => {},
      (error) => {
        console.log(error);
      }
    );

    if (cpLots.length > 1) {
      var typeY = cpLots.filter((d) => d.lot_type == "Y")[0];
      var typeH = cpLots.filter((d) => d.lot_type == "H")[0];

      if (typeY != {}) {
        tx.executeSql(
          "UPDATE nearbyCpInfo SET y_lots_available=? WHERE car_park_no=?",
          [typeY["lots_available"], car_park_no],
          () => {},
          (error) => {
            console.log(error);
          }
        );
      }
      if (typeH != {}) {
        tx.executeSql(
          "UPDATE nearbyCpInfo SET h_lots_available=? WHERE car_park_no=?",
          [typeH["lots_available"], car_park_no],
          () => {},
          (error) => {
            console.log(error);
          }
        );
      }
    }
  });
};
export default setLots;
