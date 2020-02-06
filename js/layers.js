

///Doesn't work
// function createLayers(map, codesJson){
// 	var acLayers = [];
// 	for (var i = 0; i < codesJson.length; i++) {
// 		acLayers[i] = new L.layerGroup().addTo(map);
// 	}

// 	return addOverlays(acLayers);
// }

var layers = [];
var overlays = [];

function createLayers(parentMarkerCluster, markerArr){
	markerArr.forEach(marker => 
		overlays.push(marker.activitycodename)
 		marker.activitycodename = new L.featureGroup.subGroup(parentMarkerCluster).addTo(map));
	// group1 = L.featureGroup.subGroup(parentMarkerCluster).addTo(map),
	// group2 = L.featureGroup.subGroup(parentMarkerCluster).addTo(map),
	// group3 = L.featureGroup.subGroup(parentMarkerCluster).addTo(map)
}

function createOverlays(lColtrol){
	markerArr.forEach(layer =>

		lControl.addOverlay(layer, overlays));

}

	for (var i = 0; i < markerArr.length; i++) {
		var layerName = layers[i].activitycodename;
		layers[i] = new L.featureGroup.subGroup(parentMarkerCluster).addTo(map);
		lColtrol.addOverlay(layers[i], layerName);
	}
	// var overlays = {}; ///collection feature: value
	// for (var i = 0; i < acLayers.length; i++) {
	// 	// Create map overlays
	// 	overlays[acLayers[i].activitycodename] = acLayers[i].activitycodename;
	// }
	// return overlays;
// }




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


// function createLayers(){
// 	var acLayers = [];
// 		for (var i = 0; i < uniqueCategories.length; i++) {
// 			acLayers[i] = new L.layerGroup().addTo(map);
// 		}
// }

function addCategoryOverlays(){
	overlays = {}; ///collection feature: value
	for (var i = 0; i < uniqueCategories.length; i++) {
		// Create map overlays
		overlays.push(acLayers[i] + ": " + acLayers[i]);
	}
	return overlays;
}

