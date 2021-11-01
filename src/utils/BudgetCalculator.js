/** Calculates the amount of time the user can park their car or estimated parking fee for a specified duration
 */
export default class BudgetCalculator {
  /**
   * Calculates duration of time user can expect to park car subject to input budget
   * @param {*} budget Budget input by user
   * @param {*} vehicleType Vehicle type selected by user
   * @param {*} cpInfo Carpark information of selected carpark
   * @returns {number} Duration of time user can park subject to input budget
   */
  calculateTime(budget, vehicleType, cpInfo) {
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours + minutes / 60;
    var duration = 0;
    if (vehicleType == 0) {
      if (cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"] +
            (22.5 - time);
        }
      } else if (cpInfo["free_parking"] == "SUN & PH FR 1PM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 13 && time <= 22.5) {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"] +
            (22.5 - time);
        }
      } else {
        duration =
          budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
      }
    }
    if (vehicleType == 1) {
      duration = budget / cpInfo["y_parking_rates_general"];
    }
    if (vehicleType == 2) {
      duration = budget / cpInfo["h_parking_rates_general"];
    }

    return (
      Math.floor(duration) +
      " h " +
      Math.floor((duration - Math.floor(duration)) * 60) +
      " mins "
    );
  }

  /** Calculates the estimated cost of parking the car for the duration the user inputs
   * @param {number} durationHours Number of hours input by user
   * @param {number} durationMinutes Number of minutes input by user
   * @param {number} vehicleType Type of vehicle selected by user
   * @param {*} cpInfo Carpark information of selected carpark
   * @returns {number} Estimated cost of parking the car for the input duration of time
   */
  calculateBudget(durationHours, durationMinutes, vehicleType, cpInfo) {
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = (hours + minutes) / 60;
    var duration = parseInt(durationHours) + parseInt(durationMinutes) / 60; //duration in decimal for easier calculation

    if (vehicleType == 0) {
      if (cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          var endTime = time + duration;
          if (endTime > 22.5) {
            var cost =
              (endTime - 22.5) *
              JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
            return cost <= 5 ? cost : 5; //capped at $5 night parking scheme
          } else return 0;
        }
      } else {
        return (
          Math.round(
            duration *
              JSON.parse(cpInfo["c_parking_rates_general"])["Other"] *
              100
          ) / 100
        );
      }
      // Electronic parking system - per minute basis
      // Coupon parking system - per half-hour
      // Night parking scheme - capped at $5
    }
    if (vehicleType == 1) {
      return (
        Math.round(duration * cpInfo["y_parking_rates_general"] * 100) / 100
      );
    }

    if (vehicleType == 2) {
      return (
        Math.round(duration * cpInfo["H_parking_rates_general"] * 100) / 100
      );
    }
  }
}
