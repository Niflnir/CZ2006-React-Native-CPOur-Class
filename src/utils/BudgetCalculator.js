export default class BudgetCalculator {
  #cpInfo = this.props.route.params.cpInfo;

  calculateTime(budget, vehicleType) {
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours + minutes / 60;
    var duration;
    if (vehicleType == "C") {
      if (this.#cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          duration =
            JSON.parse(this.#cpInfo["c_parking_rates_general"])["Other"] * 0.5;
          if (endTime > 22.5) {
            var cost =
              (endTime - 22.5) *
              JSON.parse(this.#cpInfo["c_parking_rates_general"])["Other"];
            return cost <= 5 ? cost : 5; //capped at $5 night parking scheme
          } else return 0;
        } else {
          return (
            duration *
            JSON.parse(this.#cpInfo["c_parking_rates_general"])["Other"]
          );
        }
      }
    }
  }
  calculateBudget(durationHours, durationMinutes, vehicleType) {
    var today = new Date();
    var hours = today.getHours();
    var day = today.getDay();
    var minutes = today.getMinutes();
    var time = hours + minutes / 60;
    var duration = durationHours + durationMinutes / 60; //duration in decimal for easier calculation

    if (vehicleType == "C") {
      if (this.#cpInfo["free_parking"] == "SUN & PH FR 7AM-10.30PM") {
        if ((day == 0 || day == 5) && time >= 7 && time <= 22.5) {
          var endTime = time + duration;
          if (endTime > 22.5) {
            var cost =
              (endTime - 22.5) *
              JSON.parse(this.#cpInfo["c_parking_rates_general"])["Other"];
            return cost <= 5 ? cost : 5; //capped at $5 night parking scheme
          } else return 0;
        } else {
          return (
            duration *
            JSON.parse(this.#cpInfo["c_parking_rates_general"])["Other"]
          );
        }
      }
      // Electronic parking system - per minute basis
      // Coupon parking system - per half-hour
      // Night parking scheme - capped at $5
    }
    if (vehicleType == "Y") {
      return duration * this.#cpInfo["y_parking_rates_general"];
    }

    if (vehicleType == "H") {
      return duration * this.#cpInfo["H_parking_rates_general"];
    }
  }
}
