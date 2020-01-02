var uniqueResults;
var overlays;

function getUniqueValues(data, prop){
	var i,
	    unique,
	    uniqueResults = {};

	for (i in data) {
	   unique = data[i].feature.properties.prop;
	   if (!uniqueResults[prop]) {
	      uniqueResults[prop]= [];
	   }

	   uniqueResults[prop].push(data[i]);
	}
	return uniqueResults;
	console.log(uniqueResults);
}


function createLayers(){
	var categoryLayers = [];


		for (var i = 0; i <= uniqueResults; i++) {
			categoryLayers[i] = new L.layerGroup().addTo(map);
		}
	return categoryLayers;
}

function addCategoryOverlays(){
	overlays = {};
	for (var i = 0; i <= uniqueResults; i++) {
		// Create map overlays
		overlays.push(categoryLayers[i] + ": " + categoryLayers[i]);
	}
	return overlays;
}

// function pushFacilitiesToLayers(){
// 	var overlays = {
// 		marker.feature.properties.ac1: marker.feature.properties.ac1
// 	}
// }

