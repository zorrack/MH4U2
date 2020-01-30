var uniqueCategories;
var overlays;

//TODO: fix the constructor
function getUniqueCategories(data, prop){
	var i,
	unique,
	uniqueCategories = {}; ///collection feature: value

	for (i in data) {
	   unique = data[i].feature.properties.prop;
	   console.log(unique);
	   if (!uniqueCategories[prop]) {
	      uniqueCategories[prop]= [];
	   }

	   uniqueCategories[prop].push(data[i]);
	}
	return uniqueCategories;
}


function createLayers(){
	var categoryLayers = [];
		for (var i = 0; i < uniqueCategories.length; i++) {
			categoryLayers[i] = new L.layerGroup().addTo(map);
		}
}

function addCategoryOverlays(){
	overlays = {}; ///collection feature: value
	for (var i = 0; i < uniqueCategories.length; i++) {
		// Create map overlays
		overlays.push(categoryLayers[i] + ": " + categoryLayers[i]);
	}
	return overlays;
}

