var codesJson = [ ];
var codesProperties = [
	{
		name: "ac1",
		columnName: "Activity code"
	},
	{
		name: "activitycategory",
		columnName: "Activity category"
	},
	{
		name: "activitycodename",
		columnName: "Activity code name"
	},
	{
		name: "subactivitycode",
		columnName: "Subactivity code"
	},
	{
		name: "subactivitycodename",
		columnName: "Subactivity code name"
	}
];

function getCodes(acCodes) {
    for (var i = 0; i < acCodes.length; i++) {
        var row = acCodes[i];
        var feature = {};

        for (var j = 0; j < codesProperties.length; j++) {
        	feature[codesProperties[j].name] = row[codesProperties[j].columnName];
        }
		codesJson.push(feature);
    }
};

function mergeCodes(arr, codeArr) {
	arr.features.forEach(element => {
		match = codeArr.find(codeElement => codeElement.ac1 == element.properties.ac1);
		if (match) {
			console.log("Match found ")
			// Merge the second array into the first one
			for (var j = 0; j < codesProperties.length; j++) {
        		element.properties[codesProperties[j].name] = match[codesProperties[j].name];
        	}
		}
	});
}

function createMarkerClusterSubgroups(parentMarkerCluster){
 markerClusterSubGroup = L.featureGroup.subGroup(parentMarkerCluster, arrayOfMarkers);
 markerClusterSubGroup.addTo(map);
}


///Doesn't work
// function createLayers(map, codesJson){
// 	var categoryLayers = [];
// 	for (var i = 0; i < codesJson.length; i++) {
// 		categoryLayers[i] = new L.layerGroup().addTo(map);
// 	}

// 	return addOverlays(categoryLayers);
// }

function addOverlays(categoryLayers){
	var overlays = {}; ///collection feature: value
	for (var i = 0; i < categoryLayers.length; i++) {
		// Create map overlays
		overlays[categoryLayers[i].activitycodename] = categoryLayers[i].activitycodename;
	}
	return overlays;
}

