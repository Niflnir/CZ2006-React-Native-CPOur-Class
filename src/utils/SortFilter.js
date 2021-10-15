export default class SortFilter {
  sortFilter(sortOption, filterOption) {
    var sortQuery = "";
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

    if (sortOption == 0) {
      sortQuery = "c_lots_available DESC";
    } else if (sortOption == 1) {
      sortQuery = "total_distance ASC";
    } else {
      sortQuery = "parking_rate ASC";
    }

    for (var i = 0; i < 6; i++) {
      if (filterOption[i] == false) {
        filterQueryArray.push(filterQueryOptions[i]);
      }
    }

    console.log(filterQueryArray);
    if (filterQueryArray.length > 0) {
      filterQuery = "WHERE " + filterQueryArray[0];
      for (var i = 1; i < filterQueryArray.length; i++) {
        filterQuery += " AND " + filterQueryArray[i];
      }
    }

    const sortFilterQuery =
      "SELECT * FROM nearbyCpInfo " + filterQuery + " ORDER BY " + sortQuery;

    return sortFilterQuery;
  }
}
