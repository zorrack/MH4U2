var facilitiesJson;
var facilitiesForFiltering = {
    'type': 'FeatureCollection',
    'features': []
};
var checkboxIsChecked = new Boolean;

$( document ).ready(function() {

    $("#control-bar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#control-barCollapse').on('click', function () {
        $('#control-bar').toggleClass('active');
    });
    
    var map = L.map('map').setView([49.8397, 24.0297], 8);

	// This is the Carto Positron basemap
	var basemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	    subdomains: 'abcd',
	    maxZoom: 19
	});
	basemap.addTo(map);

        var sidebar = L.control.sidebar('sidebar', {
            closeButton: false,
            position: 'right'
        });
        map.addControl(sidebar);
    map.on('click', function () {
        sidebar.hide();
    })

	var layer = L.control.layers(null, overlays).addTo(map);
    init(map, sidebar, () => {
//        getUniqueCategories(facilitiesForFiltering, ac1);
 //           createLayers();
 //           addCategoryOverlays();
    });

});

function getFilteredMarkers(checkboxIsChecked) {
    //Checking if at least one filter checkbox is checked
    checkboxIsChecked = $("input[type=checkbox]").is(":checked");

    //If at least one filtering checkbox is checked, filter by the selected feature property is applied
    if(checkboxIsChecked === true) {
        return facilitiesForFiltering.features.filter((feature) => {
            var isPatientTypeChecked = checkboxStates.patientTypes.includes(feature.properties.patienttype)
            var isServiceCategoryChecked = checkboxStates.serviceCategories.includes(feature.properties.ac1)
            return isPatientTypeChecked || isServiceCategoryChecked //true if either of variables is true
        });
    }
    //If no filter checkbox is checked, return all the features in the array. for filtering
    else {
        return facilitiesForFiltering.features;
        }
}
// init() is called as soon as the page loads
function init(map, sidebar, initFunction) {
// PASTE YOUR URLs HERE. These URLs come from Google Sheets 'shareable link' form
//This is the link for old spreadsheet version saved on my Drive var dataURL = 'https://docs.google.com/spreadsheets/d/19de3Asjrw5JVRU0il06NbejNCBqTFjm90R7zlWN1cNE/edit?usp=sharing';
//NOTE: Google Spreadsheet table should not have empty rows!!! 
 var dataURL = 'https://docs.google.com/spreadsheets/d/12Me343d7zlUQ2UqCIVG9BrWD8OPL_KRk4DL1nm5RlAE/edit?usp=sharing';
    Tabletop.init({
        key: dataURL,
        callback: (data) => {
            createFacilitiesArray(data);
            updateCheckboxStates();
            var facilitiesJson = new L.GeoJSON(null);
            checkboxIsChecked === false;
            createFilters(facilitiesJson, sidebar, checkboxIsChecked);
        	createMarkers (facilitiesJson, sidebar, getFilteredMarkers());
            initializeEvents(facilitiesJson, sidebar);
            facilitiesJson.addTo(map);
        },
        simpleSheet: true
    });
    //SimpleSheet assumes there is only one table and automatically sends its data
}

var buttonsJson = [
    {
        buttonId : "clearPatientTypeFiltersBtn",
        className : "patient-type-check"
    },
    {
        buttonId : "clearServiceCategoryFiltersBtn",
        className : "service-category"
    }, 
    {
        buttonId : "clearMentalHealthWorkersBtn",
        className : "mental-health-worker"
    }
];

function initializeEvents(facilitiesJson, sidebar) {
    buttonsJson.forEach(element => bindClearFilter(element.buttonId, element.className, facilitiesJson, sidebar));
}

function bindClearFilter(buttonId, className, facilitiesJson, sidebar) {
    var btn = document.getElementById(buttonId);
    if (btn) {
        btn.onclick = function (e) {
            clearCheckboxFilters(className, facilitiesJson, sidebar);
        }
    }   
}

function updateMarkers(filteredLayer, sidebar) {
    filteredLayer.clearLayers()
    updateCheckboxStates()
    createMarkers(filteredLayer, sidebar, getFilteredMarkers())
}

// The form of data must be a JSON representation of a table as returned by Tabletop.js
function createMarkers(facilitiesJson, sidebar, features) {
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
    	var marker = createMarker(feature);
            marker.addTo(facilitiesJson);

        // AwesomeMarkers is used to create facility icons
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
                document.getElementById('sidebar-content').innerHTML = "Офіційна назва станом на " + e.target.feature.properties.recorddate + ": "
                + e.target.feature.properties.officialName + "<br />" +
                "Юридична адреса<br />" + e.target.feature.properties.address + "<br />Контакти<br />" + e.target.feature.properties.phonenumber + " " + 
                e.target.feature.properties.email + "<br />" + "Цільове населення: " + e.target.feature.properties.patienttype + 
                "<br />Фахівці з психічного здоров'я<br />" + e.target.feature.properties.mentalhealthworkers;
                sidebar.show();
            }
        });
    }
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
                    'ac2': row["Activity code 2"],
                    'sac1': row["Subactivity code 1"],
                    'sac2': row["Subactivity code 2"],
                    'sac3': row["Subactivity code 3"],
                    'sac4': row["Subactivity code 4"],
                }
            }
            facilitiesForFiltering.features.push(feature);
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
