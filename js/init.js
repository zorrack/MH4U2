var facilitiesJson;
var collection = {
    'type': 'FeatureCollection',
    'features': []
};
var map = L.map('map').setView([49.8397, 24.0297], 8);
var checkboxIsChecked = new Boolean;

$( document ).ready(function() {

    $("#control-bar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#control-barCollapse').on('click', function () {
        $('#control-bar').toggleClass('active');
    });
    
    
	// This is the Carto Positron basemap
	var basemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	    subdomains: 'abcd',
	    maxZoom: 19
	});
	basemap.addTo(map);

    layerControl = L.control.layers(null, null, {collapsed: false});
    layerControl.addTo(map);

    var sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'right'
    });
    map.addControl(sidebar);
    map.on('click', function () {
        sidebar.hide();
    })

    init(map, sidebar, () => {

        // var overlays = createLayers(map, activityCategoriesJson);
        // var layer = L.control.layers(null, overlays).addTo(map);
    });

});

function getFilteredMarkers(checkboxIsChecked) {
    //Checking if at least one filter checkbox is checked
    checkboxIsChecked = $("input[type=checkbox]").is(":checked");

    //If at least one filtering checkbox is checked, filter by the selected feature property is applied
    if(checkboxIsChecked) {
        return collection.features.filter((feature) => {
            var isPatientTypeChecked = checkboxStates.patientTypes
            .includes(feature.properties.patienttype)
            var isServiceCategoryChecked = checkboxStates.serviceCategories
            .includes(feature.properties.ac1)
            var isInpatientCategoryChecked = checkboxStates.inpatientOrOutpationed
            .includes(feature.properties.isinpatient)
            var isInpatientCategoryChecked = checkboxStates.booleanCategories
            .includes(feature.properties.isinpatient)
            return isPatientTypeChecked || isServiceCategoryChecked || isInpatientCategoryChecked //true if either of variables is true
        });
    }
    //If no filter checkbox is checked, return all the features in the array.
    else {
        return collection.features;
        }
}
// init() is called as soon as the page loads
function init(map, sidebar, initFunction) {
// PASTE YOUR URLs HERE. These URLs come from Google Sheets 'shareable link' form
//NOTE: Google Spreadsheet table should not have empty rows!!! 
    var dataURL = 'https://docs.google.com/spreadsheets/d/12Me343d7zlUQ2UqCIVG9BrWD8OPL_KRk4DL1nm5RlAE/edit?usp=sharing';
    var acCodesURL = 'https://docs.google.com/spreadsheets/d/1jX20bMaNFLYijteEGjJBDNzpkVqTC_YP0mA2B1zpED4/edit?usp=sharing';
    Tabletop.init({
        key: dataURL,
        callback: (data) => {
            createFacilitiesArray(data);
            // updateCheckboxStates();

            mergeCodes(collection, codesJson);

            var facilitiesJson = new L.GeoJSON(null);
            //Creating marker cluster layer group.
            var markerCluster = L.markerClusterGroup({
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true
            }).addTo(map);
            checkboxIsChecked === false;
            let overlays = createOverlays(codesJson);
            let markers = createMarkers (sidebar, getFilteredMarkers());

            createLayers(markerCluster, collection, markers, overlays, layerControl);

            // createFilters(markerCluster, sidebar, checkboxIsChecked);
            initializeEvents(markerCluster, sidebar);
        },
        simpleSheet: true
    });
    Tabletop.init({
        key: acCodesURL,
        callback: (acCodes) => {
            getCodes(acCodes);
            initFunction();
        },
        simpleSheet: true 
    });
//SimpleSheet assumes there is only one table and automatically sends its data
}

var buttonsJson = [
    {
        buttonId : "clearPatientTypeFiltersBtn",
        className : "patient-type-check",
    },
    {
        buttonId : "clearServiceCategoryFiltersBtn",
        className : "service-category"
    }, 
    {
        buttonId : "clearMentalHealthWorkersBtn",
        className : "mental-health-worker"
    },
    {
        buttonId : "clearisInpatientFiltersBtn",
        className : "is-inpatient-check",

        buttonId : "clearbooleancategoryFiltersBtn",
        className : "boolean-category-check"
    }
];

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


function updateMarkers(filters, sidebar) {
    filters.clearLayers()
    updateCheckboxStates()
    createMarkers(filters, sidebar, getFilteredMarkers())
}

// The form of data must be a JSON representation of a table as returned by Tabletop.js
function createMarkers(sidebar, features) {
    var markers = []; 
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
    	var marker = createMarker(feature);
        markers.push(marker);
        // AwesomeMarkers is used to create facility icons. TODO: add icons
        var icon = L.AwesomeMarkers.icon({
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
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var lat = parseFloat(row.Latitude);
        var lon = parseFloat(row.Longitude);
        if (lat & lon) {
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

// Color coding used for the markers. Returns different colors depending on the string passed. 
function getColor(type) {
    switch (type) {
        case '14': return 'cadetblue';
        case '3': return 'darkblue';
        case '4': return 'gray';
        case '15': return 'lightgray';
        case '16': return 'purple';
        default: return 'blue';
    }
}

//Changing facility title and description to title case
//function capitalizeFirstLetter(string) {
//    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//}
