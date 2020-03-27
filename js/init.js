let collection = {
    'type': 'FeatureCollection',
    'features': []
};
let map = L.map('map').setView([49.8397, 24.0297], 8);
var loader;

let wantedSheets = [
    {
        type: "sheetsForMapping",
        data: []
    },
    {
        type: "configSheets",
        data: []
    }
];

$( document ).ready(function() {

    $("#control-bar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#control-barCollapse').on('click', function () {
        $('#control-bar').toggleClass('active');
    });

    $("#sidebar").mCustomScrollbar({
        theme: "dark-2"
    });

    ///Hide breadcrumb dropdown on map click
    map.on('click', function(e) {
        $('.breadcrumbs-dropdown-content').collapse();
    });

    ///Handling click event for the Clear Filter button inside Bootstrap control sidebar START
     $('.parent').on('click', function(e) {
      // Do not trigger if target elm or it's child has `no-orange` class
      if(!treeHasClass(e.target, "no-orange", this)) {
        $(this).css('backgroundColor', 'darkorange');
      }
    });

    $('.no-collapse').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      $('.original-dropper .dropdown-toggle').dropdown("toggle");
      //Disable Clear Filter button after click
      $(this).prop("disabled",true);
      console.log('clicked');
    });
    /**
     * Checks if any of parent nodes of elm has a class name
     * @param {HTMLElement} elm the starting node
     * @param {string} className
     * @param {HTMLElement} stopAtElm if this parent is reached, search stops
    **/
    function treeHasClass(elm, className, stopAtElm) {
      while(elm != null && elm != stopAtElm) {
        if(elm.classList.contains(className)) {
          return true;
        }
        elm = elm.parentNode;
      }
      return false;
    }
    ///Handling click event for the Clear Filter button inside Bootstrap control sidebar END

    // This is the Carto Positron basemap
    let basemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    // let basemap = L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    });
    basemap.addTo(map);

    //Map loader
    loader = L.control.loader();
    loader.addTo(map);

    let layerControl = new L.Control.Custom(null, null, {collapsed: true});
    map.layerControl = layerControl;
    layerControl.addTo(map);

///map legend START  
    let legend = new L.Control.Legend();
    legend.addTo(map);

    map.on('overlayadd', e => $(`.legend > span:contains(${e.name})`).toggle() );
    map.on('overlayremove', e => $(`.legend > span:contains(${e.name})`).toggle() );
    $(".info.legend.leaflet-control").hide();
    
    createUserLocationBtn(map);
    getUserGeolocation(map);

    let sidebar = L.control.sidebar('sidebar', {
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
    let checkboxStates = updateCheckboxStates();

    let checkboxIsChecked = false;

    filtersSectionBinding.forEach(binding => {
        checkboxIsChecked = checkboxIsChecked | checkboxStates[binding.arrayName].length > 0;
    });

    let filteredMarkers;

    //If at least one filtering checkbox is checked, filter by the selected feature property is applied
    if(checkboxIsChecked) {
        filteredMarkers = markers.filter(marker => {
            let isPatientTypeChecked = checkboxStates.patientTypes
                .includes(marker.feature.properties.patienttype);
            let isServiceCategoryChecked = checkboxStates.serviceCategories
                .includes(marker.feature.properties.ac1);
            let isInpatientCategoryChecked = checkboxStates.booleanCategories
                .includes(marker.feature.properties.isinpatient);
            return isPatientTypeChecked || isServiceCategoryChecked || isInpatientCategoryChecked //true if either of variables is true
        });
    }
    //If no filter checkbox is checked, return all the features in the array.
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
        return filteredMarkers.filter(element => element.feature.properties.district === district);
    } else {
        return filteredMarkers;
    }
}

function getMarkersByRegion(filteredMarkers, region) {
    if (region && region !== "") {
        return filteredMarkers.filter(element => element.feature.properties.region === region);
    } else {
        return filteredMarkers;
    }
}

// init() is called as soon as the page loads
function init(map, sidebar) {
    Tabletop.init({

        key: dataURL,
        callback: (data, tabletop, mappingData) => {        
            parseNumbers: true;
            simpleSheet: false;

            let mappingSheets = getData(tabletop);
            createRegions(mappingSheets);
            wanted: mappingSheets;
            
            createFacilitiesArray(mappingSheets);
            let codes = mergeCodes(collection, dataTypesTemplate);

            // initAdministrativeUnitsTree();

            // let regions = getRegions(collection.features);
            // populateRegionsTemplate(regions, regionsTemplate);
            // document.getElementById('breadcrumb').appendChild(createRegionNavigation(regionsTemplate));
            // toggleRegionNavigation(selectedAdministrativeUnit);

            //Create marker cluster layer group.
            let markerCluster = L.markerClusterGroup({
                showCoverageOnHover: true,
                zoomToBoundsOnClick: true,
            }).addTo(map);
            map.markerCluster = markerCluster;

            let overlays = createOverlays(codes);
            let markers = createMarkers (map.sidebar, collection.features);
            map.markers = markers;
            createLayers(markerCluster, collection, markers, overlays, dataTypesTemplate);
            createFilters(markers);
            initializeEvents(markerCluster, map.sidebar, markers);
            addMarkerSearch(markerCluster);
            initBreadcrumbs(map.rootAdministrativeUnit);

            $(".breadcrumbs-dropdown-content").mCustomScrollbar({
                theme: "dark-2"
            });

            //When all the map controls being initialized, hide map loader
            loader.hide();
        },
    });
}

function initializeEvents(layers, sidebar, markers) {
    buttonsJson.forEach(element => bindClearFilter(element.buttonId, element.className, layers, sidebar, markers));
}

function bindClearFilter(buttonId, className, layers, sidebar, markers) {
    var btn = document.getElementById(buttonId);
    if (btn) {
        btn.onclick = function (e) {
            clearCheckboxFilters(className, layers, sidebar, markers);
        }
    }   
}

function updateMarkers(markers) {
    let filteredMarkers = getFilteredMarkers(markers);

    map.markerCluster.subGroups.forEach(subGroup => {
        subGroup.clearLayers();

        let subGroupMarkers = filteredMarkers.filter(marker => marker.subGroup === subGroup);
        subGroupMarkers.forEach(marker => subGroup.addLayer(marker));
    });
}

function createMarkers(sidebar, features) {
    let markers = [];
    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
    	let marker = createMarker(feature);
        markers.push(marker);
        // AwesomeMarkers is used to create facility icons. TODO: add icons
        let icon = L.AwesomeMarkers.icon({
            icon: 'glyphicon-glyphicon-plus',
            iconColor: 'white',
            markerColor: getMarkerColor(feature.properties.ac1),
            prefix: 'glyphicon'
        });
        marker.setIcon(icon);

        //Function to open right sidebar with facility description after clicking on marker
        marker.on('click', (e)=> populateInfoSidebar(e, sidebar));
    }

    return markers;
}

function createFacilitiesArray(array) {

    let regions = array.data.forEach(region => {

        let rows = region.elements;
        rows.forEach(row => {

            let lat = parseFloat(row.Latitude);
            let lon = parseFloat(row.Longitude);

            // let showOnMap = Boolean(row["Додати на мапу"]);
            let showOnMap = row["Додати на мапу"];
            //If feature has the lat and long property AND the showOnMap checkbox is set to true
            if (lat && lon && showOnMap === "TRUE") {
                let coords = [parseFloat(row.Longitude), parseFloat(row.Latitude)];
                let feature = {
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
                }
                collection.features.push(feature);
            }
        }) 
    })
    map.rootAdministrativeUnit = new AdministrativeUnit("root", 0, "Всі");
    buildAdministrativeUnitsTree(map.rootAdministrativeUnit, collection.features);
}

function buildAdministrativeUnitsTree(rootAu, features) {
    let childAuTemplate = administrativeUnitsBindingTemplate.find(au => au.auLevel === rootAu.Level + 1);

    if (childAuTemplate !== undefined) {
        let currentLevelAus = [... new Set(features.map(feature => feature.properties[childAuTemplate.auSourceProperty]))];
        currentLevelAus.forEach(auRecord => {
            let childAu = new AdministrativeUnit(childAuTemplate.auId, childAuTemplate.auLevel, auRecord);
            rootAu.addChildAdministrativeUnit(childAu);
            buildAdministrativeUnitsTree(childAu, features.filter(feature => feature.properties[childAuTemplate.auSourceProperty] == auRecord));
        });
    }
}

function createMarker(feature) {
    var marker = null;
    marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    //Generating features for GeoJSON   
    marker.feature = feature;
    feature.properties.searchby = [];
    //Create a new combined property 'searchby' for searching by multiple features
    searchByMapping.forEach(element => feature.properties.searchby.push(feature.properties[element]));

    return marker;
}

function getMarkerColor(type) {
    if (markerColors.hasOwnProperty(type))
        return markerColors[type];
    else
        return 'blue';
}
