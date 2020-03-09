define(["@babel/runtime-corejs3/core-js-stable/instance/for-each"], function (_forEach) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _forEach = _interopRequireDefault(_forEach);

  function addMarkerSearch(parentMarkerCluster) {
    var _context;

    var subGroups = L.layerGroup([]);
    (0, _forEach.default)(_context = parentMarkerCluster.subGroups).call(_context, subGroup => {
      subGroups.addLayer(subGroup);
    }); //TODO: make search results dependent on visible layers

    map.addControl(new L.Control.Search({
      layer: subGroups,
      initial: false,
      zoom: 16,
      textPlaceholder: "Пошук (Назва | фахівці | послуги)",
      textErr: "Пошук не дав результатів",
      propertyName: 'searchby',
      //Fnction that return row tip html node(or html string), receive text tooltip in first param
      buildTip: function buildTip(text, val) {
        return '<a href="#" class="' + " " + '">' + text + '<b>' + " " + name + '</b></a>';
      }
    }));
  }
});