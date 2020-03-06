"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var collection = {
  'type': 'FeatureCollection',
  'features': []
};
var map = L.map('map').setView([49.8397, 24.0297], 8);
var loader;
var wantedSheets = [{
  type: "sheetsForMapping",
  data: []
}, {
  type: "configSheets",
  data: []
}];
$(document).ready(function () {
  $("#control-bar").mCustomScrollbar({
    theme: "minimal"
  });
  $('#control-barCollapse').on('click', function () {
    $('#control-bar').toggleClass('active');
  });
  $("#sidebar").mCustomScrollbar({
    theme: "dark-2"
  });
  $("#region").mCustomScrollbar({
    theme: "dark-2"
  });
  $(".scrollable").mCustomScrollbar({
    theme: "dark-2"
  }); //TODO: add custom scrollbar
  // This is the Carto Positron basemap
  // let basemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  //     subdomains: 'abcd',
  //     maxZoom: 19
  // });
  // basemap.addTo(map);

  var basemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "Map data &copy; OpenStreetMap contributors"
  });
  basemap.addTo(map); //Map loader

  loader = L.control.loader();
  loader.addTo(map);
  var layerControl = L.control.layers(null, null, {
    collapsed: true
  });
  map.layerControl = layerControl;
  layerControl.addTo(map);
  getUserGeolocation(map);
  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'right'
  });
  map.addControl(sidebar);
  map.sidebar = sidebar;
  map.on('click', function () {
    map.sidebar.hide();
  });
  init(map, sidebar);
});

function getFilteredMarkers(markers) {
  var checkboxStates = updateCheckboxStates();
  var checkboxIsChecked = false;
  filtersSectionBinding.forEach(function (binding) {
    checkboxIsChecked = checkboxIsChecked | checkboxStates[binding.arrayName].length > 0;
  });
  var filteredMarkers; //If at least one filtering checkbox is checked, filter by the selected feature property is applied

  if (checkboxIsChecked) {
    filteredMarkers = markers.filter(function (marker) {
      var isPatientTypeChecked = checkboxStates.patientTypes.includes(marker.feature.properties.patienttype);
      var isServiceCategoryChecked = checkboxStates.serviceCategories.includes(marker.feature.properties.ac1);
      var isInpatientCategoryChecked = checkboxStates.booleanCategories.includes(marker.feature.properties.isinpatient);
      return isPatientTypeChecked || isServiceCategoryChecked || isInpatientCategoryChecked; //true if either of variables is true
    });
  } //If no filter checkbox is checked, return all the features in the array.
  else {
      filteredMarkers = markers;
    }

  if (map.breadcrumbs.length > 1) {
    filteredMarkers = getMarkersByRegion(filteredMarkers, map.breadcrumbs[1].DisplayName);
  }

  if (map.breadcrumbs.length > 2) {
    filteredMarkers = getMarkersByDistrict(filteredMarkers, map.breadcrumbs[2].DisplayName);
  }

  return filteredMarkers;
}

function getMarkersByDistrict(filteredMarkers, district) {
  if (district && district !== "") {
    return filteredMarkers.filter(function (element) {
      return element.feature.properties.district === district;
    });
  } else {
    return filteredMarkers;
  }
}

function getMarkersByRegion(filteredMarkers, region) {
  if (region && region !== "") {
    return filteredMarkers.filter(function (element) {
      return element.feature.properties.region === region;
    });
  } else {
    return filteredMarkers;
  }
} // init() is called as soon as the page loads


function init(map, sidebar) {
  // Tabletop.init({
  //     key: acCodesURL,
  //     callback: (acCodes) => {
  //         getCodes(acCodes);
  // },
  // simpleSheet: true
  // });
  Tabletop.init({
    key: dataURL,
    callback: function callback(data, tabletop, mappingData) {
      parseNumbers: true;

      simpleSheet: false;

      var mappingSheets = getData(tabletop);
      createRegions(mappingSheets);

      wanted: mappingSheets;

      createFacilitiesArray(mappingSheets);
      var codes = mergeCodes(collection, dataTypesTemplate); // initAdministrativeUnitsTree();
      // let regions = getRegions(collection.features);
      // populateRegionsTemplate(regions, regionsTemplate);
      // document.getElementById('breadcrumb').appendChild(createRegionNavigation(regionsTemplate));
      // toggleRegionNavigation(selectedAdministrativeUnit);
      //Create marker cluster layer group.

      var markerCluster = L.markerClusterGroup({
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true
      }).addTo(map);
      map.markerCluster = markerCluster;
      var overlays = createOverlays(codes);
      var markers = createMarkers(map.sidebar, collection.features);
      map.markers = markers;
      createLayers(markerCluster, collection, markers, overlays);
      createFilters(markers);
      initializeEvents(markerCluster, map.sidebar, markers);
      addMarkerSearch(markerCluster);
      initBreadcrumbs(map.rootAdministrativeUnit); //When all the map controls being initialized, hide map loader

      loader.hide();
    }
  });
}

function initializeEvents(layers, sidebar, markers) {
  buttonsJson.forEach(function (element) {
    return bindClearFilter(element.buttonId, element.className, layers, sidebar, markers);
  });
}

function bindClearFilter(buttonId, className, layers, sidebar, markers) {
  var btn = document.getElementById(buttonId);

  if (btn) {
    btn.onclick = function (e) {
      clearCheckboxFilters(className, layers, sidebar, markers);
    };
  }
}

function updateMarkers(markers) {
  var filteredMarkers = getFilteredMarkers(markers);
  map.markerCluster.subGroups.forEach(function (subGroup) {
    subGroup.clearLayers();
    var subGroupMarkers = filteredMarkers.filter(function (marker) {
      return marker.subGroup === subGroup;
    });
    subGroupMarkers.forEach(function (marker) {
      return subGroup.addLayer(marker);
    });
  });
}

function createMarkers(sidebar, features) {
  var markers = [];

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var marker = createMarker(feature);
    markers.push(marker); // AwesomeMarkers is used to create facility icons. TODO: add icons

    var icon = L.AwesomeMarkers.icon({
      icon: 'glyphicon-glyphicon-plus',
      iconColor: 'white',
      markerColor: getMarkerColor(feature.properties.ac1),
      prefix: 'glyphicon'
    });
    marker.setIcon(icon); //Function to open right sidebar with facility description after clicking on marker

    marker.on('click', function (e) {
      return populateInfoSidebar(e, sidebar);
    });
  }

  return markers;
}

function createFacilitiesArray(array) {
  var regions = array.data.forEach(function (region) {
    var rows = region.elements;
    rows.forEach(function (row) {
      var lat = parseFloat(row.Latitude);
      var lon = parseFloat(row.Longitude); // let showOnMap = Boolean(row["Додати на мапу"]);

      var showOnMap = row["Додати на мапу"]; //If feature has the lat and long property AND the showOnMap checkbox is set to true

      if (lat && lon && showOnMap === "TRUE") {
        var coords = [parseFloat(row.Longitude), parseFloat(row.Latitude)];
        var feature = {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': coords
          },
          'properties': {
            'officialName': row["Офіційна назва"],
            'recorddate': row["Інформація актуальна станом на:"],
            'address': row["Адреса"],
            'district': row["Район"],
            'region': row["Область"],
            'phonenumber': row["контактний номер"],
            'email': row["електронна пошта веб сайт"],
            'patienttype': row["Цільове населення"],
            'mentalhealthworkers': row["фахівці з психічного здоров'я"],
            'ac1': row["Activity code 1"],
            //TODO: set up both inpatient and outpatient data filter 
            'isinpatient': row["амбулаторний чи стаціонарний"]
          }
        };
        collection.features.push(feature);
      }
    });
  });
  map.rootAdministrativeUnit = new AdministrativeUnit("root", 0, "Всі");
  buildAdministrativeUnitsTree(map.rootAdministrativeUnit, collection.features);
}

function buildAdministrativeUnitsTree(rootAu, features) {
  var childAuTemplate = administrativeUnitsBindingTemplate.find(function (au) {
    return au.auLevel === rootAu.Level + 1;
  });

  if (childAuTemplate !== undefined) {
    var currentLevelAus = _toConsumableArray(new Set(features.map(function (feature) {
      return feature.properties[childAuTemplate.auSourceProperty];
    })));

    currentLevelAus.forEach(function (auRecord) {
      var childAu = new AdministrativeUnit(childAuTemplate.auId, childAuTemplate.auLevel, auRecord);
      rootAu.addChildAdministrativeUnit(childAu);
      buildAdministrativeUnitsTree(childAu, features.filter(function (feature) {
        return feature.properties[childAuTemplate.auSourceProperty] == auRecord;
      }));
    });
  }
}

function createMarker(feature) {
  var marker = null;
  marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]); //Generating features for GeoJSON   

  marker.feature = feature;
  feature.properties.searchby = []; //Create a new combined property 'searchby' for searching by multiple features

  searchByMapping.forEach(function (element) {
    return feature.properties.searchby.push(feature.properties[element]);
  });
  return marker;
}

function getMarkerColor(type) {
  if (markerColors.hasOwnProperty(type)) return markerColors[type];else return 'blue';
}