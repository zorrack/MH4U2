let collection = {
    'type': 'FeatureCollection',
    'features': []
};
let map = L.map('map').setView([49.8397, 24.0297], 8);

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
    
    
	// This is the Carto Positron basemap
	// let basemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	//     subdomains: 'abcd',
	//     maxZoom: 19
	// });
	// basemap.addTo(map);

    let basemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "Map data &copy; OpenStreetMap contributors"
    });
    basemap.addTo(map);

    let layerControl = L.control.layers(null, null, {collapsed: true});
    map.layerControl = layerControl;
    layerControl.addTo(map);

    let sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'right'
    });
    map.addControl(sidebar);
    map.sideBar = sidebar;

    map.on('click', function () {
        this.sidebar.hide();
    });

    init(map, sidebar);

});

function getFilteredMarkers(markers) {
    let checkboxStates = updateCheckboxStates();

    let checkboxIsChecked = false;

    filtersSectionBinding.forEach(binding => {
        checkboxIsChecked = checkboxIsChecked | checkboxStates[binding.arrayName].length > 0;
    });

    //If at least one filtering checkbox is checked, filter by the selected feature property is applied
    if(checkboxIsChecked) {
        return markers.filter(marker => {
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
        return markers;
    }
}
// init() is called as soon as the page loads
function init(map, sidebar) {
// PASTE YOUR URLs HERE. These URLs come from Google Sheets 'shareable link' form
//NOTE: Google Spreadsheet table should not have empty rows!!! 
    const dataURL = 'https://docs.google.com/spreadsheets/d/12Me343d7zlUQ2UqCIVG9BrWD8OPL_KRk4DL1nm5RlAE/edit?usp=sharing';
    const acCodesURL = 'https://docs.google.com/spreadsheets/d/1jX20bMaNFLYijteEGjJBDNzpkVqTC_YP0mA2B1zpED4/edit?usp=sharing';
    Tabletop.init({
        key: dataURL,
        callback: (data) => {
            createFacilitiesArray(data);

            mergeCodes(collection, codesJson);

            //Creating marker cluster layer group.
            let markerCluster = L.markerClusterGroup({
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true
            }).addTo(map);
            map.markerCluster = markerCluster;
            let overlays = createOverlays(codesJson);
            let markers = createMarkers (sidebar, collection.features);
            createLayers(markerCluster, collection, markers, overlays);
            createFilters(markers);

            initializeEvents(markerCluster, sidebar);
            //map.addLayer(markerCluster);
        },
        simpleSheet: true
    });
    Tabletop.init({
        key: acCodesURL,
        callback: (acCodes) => {
            getCodes(acCodes);
        },
        simpleSheet: true 
    });
//SimpleSheet assumes there is only one table and automatically sends its data
}

function initializeEvents(layers, sidebar) {
    buttonsJson.forEach(element => bindClearFilter(element.buttonId, element.className, layers, sidebar));
}

function bindClearFilter(buttonId, className, layers, sidebar) {
    var btn = document.getElementById(buttonId);
    if (btn) {
        btn.onclick = function (e) {
            clearCheckboxFilters(className, layers, sidebar);
        }
    }   
}


function updateMarkers(markers) {
    let filteredMarkers = getFilteredMarkers(markers);

    map.markerCluster.subGroups.forEach(subGroup => {
        subGroup.clearLayers();

        let subGroupMarkers = filteredMarkers.filter(marker => marker.subGroup === subGroup);
        subGroupMarkers.forEach(marker => { subGroup.addLayer(marker); console.log("Added marker to subGroup")});
    });
}

// The form of data must be a JSON representation of a table as returned by Tabletop.js
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
            markerColor: getColor(feature.properties.ac1),
            prefix: 'glyphicon'
        });
        marker.setIcon(icon);

        //Function to open right sidebar with facility description after clicking on marker
        marker.on({
            click: function(e) {
                L.DomEvent.stopPropagation(e);
                //TODO: Add styles to sidebar content elements
                document.getElementById('sidebar-title').innerHTML = e.target.feature.properties.officialName;
                document.getElementById('sidebar-content').innerHTML = "Офіційна назва"  + ": "
                + e.target.feature.properties.officialName + "<br />" +
                "Юридична адреса<br />" + e.target.feature.properties.address + "<br />Контакти<br />" + e.target.feature.properties.phonenumber + " " + 
                e.target.feature.properties.email + "<br />" + "<br />Цільове населення: <br />" + e.target.feature.properties.patienttype +
                "<br />Фахівці з психічного здоров'я<br />" + e.target.feature.properties.mentalhealthworkers +
                "<br />Інформація актуальна станом на " + e.target.feature.properties.recorddate;
                sidebar.show();
            }
        });
    }

    return markers;
}

function createFacilitiesArray(data) {
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let lat = parseFloat(row.Latitude);
        let lon = parseFloat(row.Longitude);
        if (lat & lon) {
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
                    'phonenumber': row["контактний номер"],
                    'email': row["електронна пошта веб сайт"],
                    'patienttype': row["Цільове населення"],
                    'mentalhealthworkers': row["фахівці з психічного здоров'я"],
                    'ac1': row["Activity code 1"],
                    //TODO: set up both inpatient and outpatient data filter 
                    'isinpatient': row["амбулаторний чи стаціонарний"],

                    'familydoctors' : row["Сімейні лікарі_filter"],
                    'psychiatrists' : row["Психіатри_filter"],
                    'childpsychiatrists' : row["Дитячі психіатри_filter"],
                    'neurologists' : row["Неврологи _filter"],
                    'pediaters' : row["Педіатри_filter"],
                    'narcologists' : row["Наркологи_filter"],
                    'medpsychologists' : row["Медичні психологи_filter"],
                    'docpsychotherapists' : row["Лікарі психотерапевти_filter"],
                    'psychologists' : row["Психологи_filter"],
                    'psychotherapists' : row["Психотерапевти _filter"],
                    'logopeads' : row["Логопеди_filter"],
                    'therapists' : row["Терапевти _filter"]
                }
            }
            collection.features.push(feature);
        }
    }
}
 
function createMarker(feature) {
    var marker = null;
    marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    //Generating features for GeoJSON   
    marker.feature = feature;
    return marker;
}

//Changing facility title and description to title case
//function capitalizeFirstLetter(string) {
//    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//}
