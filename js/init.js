//var map;
//var sidebar;
// Create layer groups for "Activity code 1" feature values
var codeFourteenLayer = new L.layerGroup();
var codeFifteenLayer = new L.layerGroup();
var codeSixteenLayer = new L.layerGroup();

$( document ).ready(function() {
    var map = L.map('map').setView([49.3994, 31.1656], 7);

	// This is the Carto Positron basemap
	var basemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	    subdomains: 'abcd',
	    maxZoom: 19
	});
	basemap.addTo(map);

    var sidebar = L.control.sidebar('sidebar', {
        autopan: true,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        position: 'right'
    });
    map.addControl(sidebar);
    map.on('click', function () {
        sidebar.toggle();
    })

	var overlays = {  // Create map overlays
        "Activity code 14": codeFourteenLayer,
		"Activity code 15": codeFifteenLayer,
		"Activity code 16": codeSixteenLayer
	};
	var layer = L.control.layers(null, overlays).addTo(map);
    init(map, sidebar);
    codeFourteenLayer, codeFifteenLayer, codeSixteenLayer.addTo(map);
});
// init() is called as soon as the page loads
function init(map, sidebar) {
// PASTE YOUR URLs HERE. These URLs come from Google Sheets 'shareable link' form
//This is the link for old spreadsheet version saved on my Drive var dataURL = 'https://docs.google.com/spreadsheets/d/19de3Asjrw5JVRU0il06NbejNCBqTFjm90R7zlWN1cNE/edit?usp=sharing';
 var dataURL = 'https://docs.google.com/spreadsheets/d/1dxhQfU1AH99eHCfV-klZrzWVSYm81eLRMeK9tenozRY/edit?usp=sharing';
    Tabletop.init({
        key: dataURL,
        callback: (data) => {
        	googleSheetsToJson (data, map, sidebar)
        },
        simpleSheet: true
    });
    //SimpleSheet assumes there is only one table and automatically sends its data
}
// The form of data must be a JSON representation of a table as returned by Tabletop.js
function googleSheetsToJson(data, map, sidebar) {
var facilitiesJson = L.GeoJSON();

    for (var row in data) {
    	var marker = createMarker(data[row]);
        marker.addTo(facilitiesJson);
        if (marker.feature.properties.ac1 === "15") {
            marker.addTo(codeFifteenLayer);
        }
        else if (marker.feature.properties.ac1 === "14") {
            marker.addTo(codeFourteenLayer);
        }
        else {
            marker.addTo(codeSixteenLayer);
            }
        // AwesomeMarkers is used to create facility icons
        var icon = L.AwesomeMarkers.icon({
            icon: 'plus-sign',
            iconColor: 'white',
            markerColor: getColor(data[row]["Activity code 1"]),
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
 
 function createMarker(markerData) {

 }

 function parseRow(row)

    var marker = L.marker([row.Latitude, row.Longitude]);
    var coords = row.Latitude + ', ' + row.Longitude;
    //Generating features for GeoJSON and parsing features that will
    // be displayed on the right side description panel    
    marker.feature = {
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
	};

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
