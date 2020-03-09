"use strict";

function addMarkerSearch(parentMarkerCluster) {
  var subGroups = L.layerGroup([]);
  parentMarkerCluster.subGroups.forEach(function (subGroup) {
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