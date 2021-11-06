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
  sortFilter(sortQuery, filterOption) {
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

    if (filterOption.includes(false)) {
      // min 2 test cases
      filterQuery = "WHERE ";
      for (var i = 0; i < 6; i++) {
        if (filterOption[i] == false) {
          if (filterQuery == "WHERE ") {
            filterQuery += filterQueryOptions[i];
          } else {
            filterQuery += " AND " + filterQueryOptions[i];
          }
        }
      } // 2 Test case
    } // 1 test A1

    const sortFilterQuery =
      "SELECT * FROM nearbyCpInfo " + filterQuery + " ORDER BY " + sortQuery;
    console.log(sortFilterQuery);
    return sortFilterQuery;
  }
}
