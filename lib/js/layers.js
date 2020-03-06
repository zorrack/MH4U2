"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createOverlays(arr) {
  return _toConsumableArray(new Set(arr.map(function (data) {
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