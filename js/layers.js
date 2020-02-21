function createOverlays(arr){
	return [... new Set(arr.map(data => data.activitycategory))];
}

function createLayers(parentMarkerCluster, arr, markers, overlays) {
	parentMarkerCluster.subGroups = [];

	overlays.forEach(layer => {
		if (arr.features
			.filter(feature => feature.properties.activitycategory == layer).length > 0) {
				let filteredMarkers = markers.filter(marker => marker.feature.properties.activitycategory == layer);
				let subGroup = L.featureGroup
					.subGroup(parentMarkerCluster, filteredMarkers).addTo(map);
				parentMarkerCluster.subGroups.push(subGroup);
				filteredMarkers.forEach(marker => marker.subGroup = subGroup);
				map.layerControl.addOverlay(subGroup, layer);
			}
	});
}
