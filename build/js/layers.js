"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function createOverlays(arr) {
  return (0, _toConsumableArray2.default)(new Set(arr.map(function (data) {
    return data.activitycategory;
  })));
}

function createLayers(parentMarkerCluster, arr, markers, overlays) {
  parentMarkerCluster.subGroups = [];
  overlays.forEach(function (layer) {
    if (arr.features.filter(function (feature) {
      return feature.properties.activitycategory == layer;
    }).length > 0) {
      ///Create overlay if the category has at least one element
      var filteredMarkers = markers.filter(function (marker) {
        return marker.feature.properties.activitycategory == layer;
      });
      var subGroup = L.featureGroup.subGroup(parentMarkerCluster, filteredMarkers).addTo(map);
      parentMarkerCluster.subGroups.push(subGroup);
      filteredMarkers.forEach(function (marker) {
        return marker.subGroup = subGroup;
      });
      map.layerControl.addOverlay(subGroup, layer);
    }
  });
}