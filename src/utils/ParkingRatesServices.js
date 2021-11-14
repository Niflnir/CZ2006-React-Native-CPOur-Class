/**
 * Handles parking rate services
 */
class ParkingRatesServices {
  /**
   * Adds the current and general car parking rates to the nearbyCpInfo table
   *
   * @param {String[]} queries The queries to be made to the database
   */
  getCarParkingRate(queries) {
    const centralArea = [
      "ACB",
      "BBB",
      "BRB1",
      "CY",
      "DUXM",
      "HLM",
      "KAB",
      "KAM",
      "PRM",
      "SLS",
      "SR1",
      "SR2",
      "TPM",
      "UCS",
      "WCB",
    ];
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours * 100 + minutes;
    var cParkingRateGeneral;
    var cParkingRateRN;

    console.log("getting parking rates");

    db.transaction((tx) => {
      tx.executeSql(queries[0], [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const cpInfo = results.rows._array[i];
          cParkingRateRN = 0.6;
          cParkingRateGeneral = {
            MonSat7To5: 0.6,
            Other: 0.6,
            free_parking: cpInfo["free_parking"],
          };

          if (this.freeParking(day, time, cpInfo["free_parking"])) {
            cParkingRateRN = 0;
          }
          if (centralArea.includes(cpInfo["car_park_no"])) {
            cParkingRateGeneral["MonSat7To5"] = 1.2;
            cParkingRateGeneral["Other"] = 0.6;
            cParkingRateRN = this.centralParkingRate(
              day,
              hours,
              cParkingRateRN
            );
          }

          tx.executeSql(queries[1], [
            JSON.stringify(cParkingRateGeneral),
            cpInfo["car_park_no"],
          ]);
          tx.executeSql(queries[2], [cParkingRateRN, cpInfo["car_park_no"]]);
        }
      });
    });
  }
  /**
   * Checks if peak central parking rates are applicable at the carpark
   *
   * @param {number} day The current day
   * @param {number} hours The hours portion of the current time
   * @param {number} cParkingRateRN The current parking rate at the carpark
   * @returns {number} The parking rate
   */
  centralParkingRate(day, hours, cParkingRateRN) {
    if (hours >= 7 && hours <= 17 && day > 0 && cParkingRateRN != 0) {
      return 1.2;
    }
    return cParkingRateRN;
  }

  /**
   * Checks if free parking is applicable at the carpark
   *
   * @param {number} day The current day
   * @param {number} time The hours portion of the current time
   * @param {String} cpFreeParking The details of free parking at the carpark
   * @returns {boolean} Whether or not free parking is applicable
   */
  freeParking(day, time, cpFreeParking) {
    return (
      ((day == 0 || day == 5) &&
        time <= 2230 &&
        cpFreeParking == "SUN & PH FR 7AM-10.30PM" &&
        time >= 700) ||
      (cpFreeParking == "SUN & PH FR 1PM-10.30PM" && time >= 1300)
    );
  }

  /**
   * Updates nearbyCpInfo table with parking rates for non-car vehicels
   *
   * @param {String[]} queries The queries to be made to the database
   */
  notCar(queries) {
    db.transaction((tx) => {
      tx.executeSql(queries[0], [], (tx, results) => {
        for (var i = 0; i < results.rows._array.length; i++) {
          const cpInfo = results.rows._array[i];
          if (cpInfo["y_lots_available"] != null) {
            tx.executeSql(queries[1], [0.65, cpInfo["car_park_no"]]);
          }
          if (cpInfo["y_lots_available"] != null) {
            tx.executeSql(queries[2], [1.2, cpInfo["car_park_no"]]);
          }
        }
      });
    });
  }
}
export default ParkingRatesServices;
