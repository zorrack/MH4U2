require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

define(["@babel/runtime-corejs3/core-js-stable/set", "@babel/runtime-corejs3/core-js-stable/instance/find", "@babel/runtime-corejs3/core-js-stable/parse-float", "@babel/runtime-corejs3/core-js-stable/instance/includes", "@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/instance/map"], function (_set, _find, _parseFloat2, _includes, _filter, _forEach, _map) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _set = _interopRequireDefault(_set);
  _find = _interopRequireDefault(_find);
  _parseFloat2 = _interopRequireDefault(_parseFloat2);
  _includes = _interopRequireDefault(_includes);
  _filter = _interopRequireDefault(_filter);
  _forEach = _interopRequireDefault(_forEach);
  _map = _interopRequireDefault(_map);
  var collection = {
    'type': 'FeatureCollection',
    'features': []
  };
  var map = (0, _map.default)(L).call(L, 'map').setView([49.8397, 24.0297], 8);
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
    (0, _forEach.default)(filtersSectionBinding).call(filtersSectionBinding, binding => {
      checkboxIsChecked = checkboxIsChecked | checkboxStates[binding.arrayName].length > 0;
    });
    var filteredMarkers; //If at least one filtering checkbox is checked, filter by the selected feature property is applied

    if (checkboxIsChecked) {
      filteredMarkers = (0, _filter.default)(markers).call(markers, marker => {
        var _context, _context2, _context3;

        var isPatientTypeChecked = (0, _includes.default)(_context = checkboxStates.patientTypes).call(_context, marker.feature.properties.patienttype);
        var isServiceCategoryChecked = (0, _includes.default)(_context2 = checkboxStates.serviceCategories).call(_context2, marker.feature.properties.ac1);
        var isInpatientCategoryChecked = (0, _includes.default)(_context3 = checkboxStates.booleanCategories).call(_context3, marker.feature.properties.isinpatient);
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
      return (0, _filter.default)(filteredMarkers).call(filteredMarkers, element => element.feature.properties.district === district);
    } else {
      return filteredMarkers;
    }
  }

  function getMarkersByRegion(filteredMarkers, region) {
    if (region && region !== "") {
      return (0, _filter.default)(filteredMarkers).call(filteredMarkers, element => element.feature.properties.region === region);
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
      callback: (data, tabletop, mappingData) => {
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
    (0, _forEach.default)(buttonsJson).call(buttonsJson, element => bindClearFilter(element.buttonId, element.className, layers, sidebar, markers));
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
    var _context4;

    var filteredMarkers = getFilteredMarkers(markers);
    (0, _forEach.default)(_context4 = map.markerCluster.subGroups).call(_context4, subGroup => {
      subGroup.clearLayers();
      var subGroupMarkers = (0, _filter.default)(filteredMarkers).call(filteredMarkers, marker => marker.subGroup === subGroup);
      (0, _forEach.default)(subGroupMarkers).call(subGroupMarkers, marker => subGroup.addLayer(marker));
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

      marker.on('click', e => populateInfoSidebar(e, sidebar));
    }

    return markers;
  }

  function createFacilitiesArray(array) {
    var _context5;

    var regions = (0, _forEach.default)(_context5 = array.data).call(_context5, region => {
      var rows = region.elements;
      (0, _forEach.default)(rows).call(rows, row => {
        var lat = (0, _parseFloat2.default)(row.Latitude);
        var lon = (0, _parseFloat2.default)(row.Longitude); // let showOnMap = Boolean(row["Додати на мапу"]);

        var showOnMap = row["Додати на мапу"]; //If feature has the lat and long property AND the showOnMap checkbox is set to true

        if (lat && lon && showOnMap === "TRUE") {
          var coords = [(0, _parseFloat2.default)(row.Longitude), (0, _parseFloat2.default)(row.Latitude)];
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
    var childAuTemplate = (0, _find.default)(administrativeUnitsBindingTemplate).call(administrativeUnitsBindingTemplate, au => au.auLevel === rootAu.Level + 1);

    if (childAuTemplate !== undefined) {
      var currentLevelAus = [...new _set.default((0, _map.default)(features).call(features, feature => feature.properties[childAuTemplate.auSourceProperty]))];
      (0, _forEach.default)(currentLevelAus).call(currentLevelAus, auRecord => {
        var childAu = new AdministrativeUnit(childAuTemplate.auId, childAuTemplate.auLevel, auRecord);
        rootAu.addChildAdministrativeUnit(childAu);
        buildAdministrativeUnitsTree(childAu, (0, _filter.default)(features).call(features, feature => feature.properties[childAuTemplate.auSourceProperty] == auRecord));
      });
    }
  }

  function createMarker(feature) {
    var marker = null;
    marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]); //Generating features for GeoJSON   

    marker.feature = feature;
    feature.properties.searchby = []; //Create a new combined property 'searchby' for searching by multiple features

    (0, _forEach.default)(searchByMapping).call(searchByMapping, element => feature.properties.searchby.push(feature.properties[element]));
    return marker;
  }

  function getMarkerColor(type) {
    if (markerColors.hasOwnProperty(type)) return markerColors[type];else return 'blue';
  }
});