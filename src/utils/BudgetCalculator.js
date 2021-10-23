export default class BudgetCalculator {
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
        } else {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
        }
      } else if (cpInfo["free_parking"] == "SUN & PH FR 1PM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 13 && time <= 22.5) {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"] +
            (22.5 - time);
        } else {
          duration =
            budget / JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
        }
      }
    }
    if (vehicleType == 1) {
      duration = budget / cpInfo["y_parking_rates_general"];
    }
    if (vehicleType == 2) {
      duration = budget / cpInfo["h_parking_rates_general"];
    }
    console.log(vehicleType);
    console.log(budget);
    console.log(duration);
    return (
      Math.floor(duration) +
      " h " +
      Math.floor((duration - Math.floor(duration)) * 60) +
      " mins "
    );
  }
  calculateBudget(durationHours, durationMinutes, vehicleType, cpInfo) {
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours + minutes / 60;
    var duration = durationHours + durationMinutes / 60; //duration in decimal for easier calculation

    if (vehicleType == "C") {
      if (cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          var endTime = time + duration;
          if (endTime > 22.5) {
            var cost =
              (endTime - 22.5) *
              JSON.parse(cpInfo["c_parking_rates_general"])["Other"];
            return cost <= 5 ? cost : 5; //capped at $5 night parking scheme
          } else return 0;
        } else {
          return (
            duration * JSON.parse(cpInfo["c_parking_rates_general"])["Other"]
          );
        }
      }
      // Electronic parking system - per minute basis
      // Coupon parking system - per half-hour
      // Night parking scheme - capped at $5
    }
    if (vehicleType == "Y") {
      return duration * cpInfo["y_parking_rates_general"];
    }

    if (vehicleType == "H") {
      return duration * cpInfo["H_parking_rates_general"];
    }
  }
}
