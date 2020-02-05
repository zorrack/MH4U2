var uniqueCategories;
var overlays;

function getUniqueCategories(data, prop){
	var i,
	unique,
	uniqueCategories = {};

	for (i in data) {
	   unique = data[i].feature.properties.prop;
	   if (!uniqueCategories[prop]) {
	      uniqueCategories[prop]= [];
	   }

	   uniqueCategories[prop].push(data[i]);
	}
	return uniqueCategories;
}


function createLayers(){
	var categoryLayers = [];
		for (var i = 0; i <= uniqueCategories; i++) {
			categoryLayers[i] = new L.layerGroup().addTo(map);
		}
	return categoryLayers;
}

function addCategoryOverlays(){
	overlays = {};
	for (var i = 0; i <= uniqueCategories; i++) {
		// Create map overlays
		overlays.push(categoryLayers[i] + ": " + categoryLayers[i]);
	}
	return overlays;
}
