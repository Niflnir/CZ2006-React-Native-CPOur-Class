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

      return (
        Math.floor(duration) +
        " h " +
        Math.floor((duration - Math.floor(duration)) * 60) +
        " mins "
      );
    }
    console.log(duration);
    var today = new Date();
    var hours = (today.getHours() + 8) % 24;
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours * 100 + minutes;

    var duration = 0;

    if (vehicleType == 1) {
      const slots = Math.floor(budget / 0.65);
      var hoursLeft = 0;
      var minutesLeft = 0;
      var daySlot = true;
      var durationHours = 0;
      durationMinutes = 0;
      if (time >= 700 && time <= 2230) {
        hoursLeft = 22 - hours;
        minutesLeft = 90 - minutes;
      } else {
        daySlot = false;
        if (time <= 2230 && time >= 2359) {
          hoursLeft = 30 - hours;
          minutesLeft = 60 - minutes;
          console.log(hoursLeft * 100 + minutesLeft);
        } else if (time >= 0 && time <= 700) {
          hoursLeft = 7 - hours;
          minutesLeft = 60 - minutes;
        }
      }
      for (var i = 1; i < slots; i++) {
        if (daySlot) {
          durationHours += 15;
          durationMinutes += 30;
        } else {
          durationHours += 8;
          durationMinutes += 30;
        }
        daySlot = !daySlot;
      }
      durationHours += hoursLeft;
      durationMinutes += minutesLeft;

      if (durationMinutes >= 60) {
        durationMinutes = durationMinutes % 60;
        durationHours += Math.floor(durationMinutes / 60);
      }

      return durationHours + " h " + durationMinutes + " m";
    }
    if (vehicleType == 2) {
      if (cpInfo.type_of_parking_system == "ELECTRONIC PARKING") {
        const perMinute = 1.2 / 30;
        duration = budget / perMinute;
      } else {
        duration = Math.floor(budget / 1.2) * 30;
      }
      console.log(Math.floor(duration / 60) + " h " + (duration % 60) + " min");
      return Math.floor(duration / 60) + " h " + (duration % 60) + " min";
    }
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
