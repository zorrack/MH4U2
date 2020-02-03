var activityCategoriesJson = [ ];

function getActivityCategoriesJson(acCodes) {
    for (var i = 0; i < acCodes.length; i++) {
        var row = acCodes[i];
        var feature = {
			'ac1' : row["Activity code"],
			'activitycategory' : row["Activity category"],
			'activitycodename' : row["Activity code name"],
			'subactivitycode' : row["Subactivity code"],
			'subactivitycodename' : row["Subactivity code name"],
		}
	activityCategoriesJson.push(feature);
    }
};

function matchMarkerActivityCategoryCode(facilitiesForFiltering, activityCategoriesJson) {
	facilitiesForFiltering.features.forEach(element => {
		var activityCategory = activityCategoriesJson.find(acElement => acElement.ac1 == element.properties.ac1);
		if (activityCategory) {
			element.properties.activitycategory = acElement.activitycategory;
			element.properties.activitycodename = acElement.activitycodename;
			element.properties.subactivitycode = acElement.subactivitycode;
			element.properties.subactivitycodename = acElement.subactivitycodename;
			console.log(element);
		}
		
	});
}

///Doesn't work
function createLayers(activityCategoriesJson, categoryLayers){
	var categoryLayers = [];
		for (var i = 0; i < activityCategoriesJson.length; i++) {
			categoryLayers[i] = new L.layerGroup().addTo(map);
		}
}

function addOverlays(categoryLayers, overlays){
	var overlays = {}; ///collection feature: value
	for (var i = 0; i < categoryLayers.length; i++) {
		// Create map overlays
		overlays.push(categoryLayers.activitycodename[i] + ": " + categoryLayers.activitycodename[i]);
	}
	return overlays;
}

// function createLayers(activityCategoriesJson, categoryLayers){
// 	var categoryLayers = [];
// 		for (var i = 0; i < activityCategoriesJson.length; i++) {
// 			categoryLayers[i] = new L.layerGroup().addTo(map);
// 		}
// }

// function addOverlays(categoryLayers, overlays){
// 	var overlays = {}; ///collection feature: value
// 	for (var i = 0; i < categoryLayers.length; i++) {
// 		// Create map overlays
// 		overlays.push(categoryLayers[i] + ": " + categoryLayers[i]);
// 	}
// 	return overlays;
// }

