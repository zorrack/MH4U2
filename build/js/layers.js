require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

define(["@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/instance/map", "@babel/runtime-corejs3/core-js-stable/set"], function (_filter, _forEach, _map, _set) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _filter = _interopRequireDefault(_filter);
  _forEach = _interopRequireDefault(_forEach);
  _map = _interopRequireDefault(_map);
  _set = _interopRequireDefault(_set);

  function createOverlays(arr) {
    return [...new _set.default((0, _map.default)(arr).call(arr, data => data.activitycategory))];
  }

  function createLayers(parentMarkerCluster, arr, markers, overlays) {
    parentMarkerCluster.subGroups = [];
    (0, _forEach.default)(overlays).call(overlays, layer => {
      var _context;

      if ((0, _filter.default)(_context = arr.features).call(_context, feature => feature.properties.activitycategory == layer).length > 0) {
        ///Create overlay if the category has at least one element
        var filteredMarkers = (0, _filter.default)(markers).call(markers, marker => marker.feature.properties.activitycategory == layer);
        var subGroup = L.featureGroup.subGroup(parentMarkerCluster, filteredMarkers).addTo(map);
        parentMarkerCluster.subGroups.push(subGroup);
        (0, _forEach.default)(filteredMarkers).call(filteredMarkers, marker => marker.subGroup = subGroup);
        map.layerControl.addOverlay(subGroup, layer);
      }
    });
  }
});