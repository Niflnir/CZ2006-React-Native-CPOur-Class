/**
 * Gets query to be made to database for selected sort and filter options
 */
export default class SortFilter {
  /**
   *
   * @param {number} sortOption Index of sort criteria selected by user
   * @param {boolean[]} filterOption Whether or not each filter criteria has been selected by user
   * @returns {String} Query to be made to database `for selected sort/filter options
   */
  sortFilter(sortOption, filterOption) {
    var sortQuery = "c_lots_available DESC";
    var filterQueryArray = [];
    var filterQuery = "";
    const filterQueryOptions = [
      "h_lots_available IS NOT NULL",
      "y_lots_available IS NOT NULL",
      "free_parking != 'NO'",
      "night_parking != 'NO'",
      "type_of_parking_system == 'ELECTRONIC PARKING'",
      "type_of_parking_system == 'COUPON PARKING'",
    ];

    if (sortOption == 1) {
      sortQuery = "total_distance ASC";
    } else if (sortOption == 2) {
      sortQuery = "c_parking_rates_current ASC";
    }

    if (filterOption.includes(false)) {
      filterQuery = "WHERE ";
      for (var i = 0; i < 6; i++) {
        if (filterOption[i] == false && filterQuery == "WHERE ") {
          filterQuery += filterQueryOptions[i];
        } else if (filterOption[i] == false && filterQuery != "WHERE ") {
          filterQuery += " AND " + filterQueryOptions[i];
        }
      }
    }

    const sortFilterQuery =
      "SELECT * FROM nearbyCpInfo " + filterQuery + " ORDER BY " + sortQuery;
    console.log(sortFilterQuery);
    return sortFilterQuery;
  }
}
