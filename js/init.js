var facilitiesJson;
var facilitiesForFiltering = {
    'type': 'FeatureCollection',
    'features': []
};

$( document ).ready(function() {

    $("#control-bar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#control-barCollapse').on('click', function () {
        $('#control-bar').toggleClass('active');
    });
    
    var map = L.map('map').setView([49.3994, 31.1656], 7);

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

function getFilteredFacilities() {
    return facilitiesForFiltering.features.filter((feature) => {
        var isPatientTypeChecked = checkboxStates.patientTypes.includes(feature.properties.patienttype)
        var isServiceCategoryChecked = checkboxStates.serviceCategories.includes(feature.properties.ac1)
        return isPatientTypeChecked && isServiceCategoryChecked //only true if both are true
    });
}
// init() is called as soon as the page loads
function init(map, sidebar, initFunction) {
// PASTE YOUR URLs HERE. These URLs come from Google Sheets 'shareable link' form
//This is the link for old spreadsheet version saved on my Drive var dataURL = 'https://docs.google.com/spreadsheets/d/19de3Asjrw5JVRU0il06NbejNCBqTFjm90R7zlWN1cNE/edit?usp=sharing';
 var dataURL = 'https://docs.google.com/spreadsheets/d/1dxhQfU1AH99eHCfV-klZrzWVSYm81eLRMeK9tenozRY/edit?usp=sharing';
    Tabletop.init({
        key: dataURL,
        callback: (data) => {
            createFacilitiesArray(data);
            updateCheckboxStates();
            var facilitiesJson = new L.GeoJSON(null);
            createFilters(facilitiesJson, sidebar);
        	createMarkers (facilitiesJson, sidebar, getFilteredFacilities());
            facilitiesJson.addTo(map);
        },
        simpleSheet: true
    });
    //SimpleSheet assumes there is only one table and automatically sends its data
}

function updateMarkers(filteredLayer, sidebar) {
    filteredLayer.clearLayers()
    updateCheckboxStates()
    createMarkers(filteredLayer, sidebar, getFilteredFacilities());   
}

function updateCheckboxStates() {
  checkboxStates = {
    patientTypes: [],
    serviceCategories: []
  }

  for (let input of document.querySelectorAll('input')) {
    if(input.checked) {
      switch (input.className) {
        case 'patient-type': checkboxStates.patientTypes.push(input.value); break
        case 'service-category': checkboxStates.serviceCategories.push(input.value); break
      }
    }
  }
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
            markerColor: getColor(feature.ac1),
            prefix: 'glyphicon',
            extraClasses: 'fa-rotate-0'
        });
        marker.setIcon(icon);

        //Function to open right side description panel after clicking on marker
        marker.on({
            click: function(e) {
                L.DomEvent.stopPropagation(e);
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
        case '14':
            return 'red';
        case '15':
            return 'blue';
                case '16':
            return 'orange';    
        default:
            return 'green';
    }
}

