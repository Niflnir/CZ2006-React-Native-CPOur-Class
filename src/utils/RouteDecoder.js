export default class RouteDecoder {
  routeDecoder(route_info) {
    var polyUtil = require("polyline-encoded");
    var encoded = route_info.route_geometry;
    var latLong = [];

    if (encoded !== undefined || encoded !== "" || encoded != null) {
      var latlngs = polyUtil.decode(encoded, {
        precision: 5,
      });
      for (var i = 0; i < latlngs.length; i++) {
        var oneLatLong = { lat: 0, lng: 0 };
        if (latlngs[i] != []) {
          oneLatLong.lat = latlngs[i][0];
          oneLatLong.lng = latlngs[i][1];
          latLong.push(oneLatLong);
        }
      }
      var btnId = "Default route";
      if (route_info.hasOwnProperty("subtitle")) {
        btnId = route_info.subtitle;
      }
      return [latLong, btnId];
    }
  }
}
