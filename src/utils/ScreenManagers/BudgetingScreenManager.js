/**
 * Manages main logic behind BudgetingScreen
 */
class BudgetingScreenManager {
  /**
   * Calculates duration of time user can expect to park car subject to input budget
   * @param {number} budget Budget input by user
   * @param {number} vehicleType Vehicle type selected by user
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
      console.log(0, cpInfo["free_parking"]);
      if (cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        console.log(1);
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          console.log(2);
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"] +
            (22.5 - time);
        } else {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
        }
      } else if (cpInfo["free_parking"] == "SUN & PH FR 1PM-10.30PM") {
        console.log(3);
        if ((day == 0 || day == 5) && time >= 13 && time <= 22.5) {
          console.log(4);
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"] +
            (22.5 - time);
        } else {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
        }
      } else {
        console.log(5);
        duration =
          budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
      }
      if (cpInfo["type_of_parking_system"] == "ELECTRONIC PARKING") {
        duration = (budget * 30) / cpInfo["c_parking_rates_current"];
      } else {
        duration = Math.floor(budget / cpInfo["c_parking_rates_current"]) * 30;
      }
      return Math.floor(duration / 60) + " h " + (duration % 60) + " mins ";
    }

    time = hours * 100 + minutes;
    duration = 0;

    if (vehicleType == 1) {
      const slots = Math.floor(budget / 0.65);
      if (slots == 0) {
        return "0 h 0 min";
      }
      var hoursLeft = 0;
      var minutesLeft = 0;
      var daySlot = true;
      var durationHours = 0;
      var durationMinutes = 0;
      if (time >= 700 && time <= 2230) {
        if (minutes >= 30) {
          hoursLeft = 21 - hours;
        } else {
          hoursLeft = 22 - hours;
        }

        minutesLeft = 90 - minutes;
      } else {
        daySlot = false;
        if (time <= 2230 && time >= 2359) {
          hoursLeft = 30 - hours;
          minutesLeft = 60 - minutes;
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

      console.log(durationHours, durationMinutes);

      if (durationMinutes >= 60) {
        durationMinutes = durationMinutes % 60;
        durationHours += Math.floor(durationMinutes / 60);
      }

      return durationHours + " h " + durationMinutes + " min";
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
    var minutes = today.getMinutes();
    var time = hours * 100 + minutes;
    var duration = parseInt(durationHours * 60) + parseInt(durationMinutes); //duration in decimal for easier calculation
    console.log(duration);
    var fee = 0;
    if (vehicleType == 0) {
      if (cpInfo["type_of_parking_system"] == "ELECTRONIC PARKING") {
        fee = (duration * cpInfo["c_parking_rates_current"]) / 30;
      } else {
        fee =
          ((duration + (duration % 30)) / 30) *
          cpInfo["c_parking_rates_current"];
        console.log(duration + (duration % 30));
      }
      return fee;
    }
    if (vehicleType == 1) {
      var daySlot = true;
      var hoursLeft;
      var minutesLeft = 90 - minutes;
      if (minutes >= 30) {
        hoursLeft = 21 - hours;
      } else {
        hoursLeft = 22 - hours;
      }
      if (time <= 700 && time >= 2230) {
        daySlot = false;
        if (time <= 2230 && time >= 2359) {
          hoursLeft = 30 - hours;
          minutesLeft = 60 - minutes;
        } else if (time >= 0 && time <= 700) {
          hoursLeft = 7 - hours;
          minutesLeft = 60 - minutes;
        }
      }
      var durationLeft = duration - hoursLeft * 60 - minutesLeft;
      console.log("durationLeft: ", durationLeft);
      var slots = 1;
      while (durationLeft >= 0) {
        if (daySlot) {
          durationLeft -= 930;
        } else {
          durationLeft -= 510;
        }
        slots++;
        daySlot = !daySlot;
      }
      console.log(slots);
      return (0.65 * slots).toFixed(2);
    }

    if (vehicleType == 2) {
      console.log(duration);
      if (cpInfo["type_of_parking_system"] == "ELECTRONIC PARKING") {
        return ((duration * 1.2) / 30).toFixed(2);
      } else {
        var halfHours = Math.ceil(duration / 30);
        return (halfHours * 1.2).toFixed(2);
      }
    }
  }
}

export default BudgetingScreenManager;
