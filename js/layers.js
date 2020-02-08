var layers;

function createOverlays(arr){
	return overlays  = [... new Set(arr.map(data => data.activitycategory))]
}

function createLayers(parentMarkerCluster, arr, markers, overlays, lControl){
	overlays.forEach(layer => {
		if (arr.features
			.filter(feature => feature.properties.activitycategory == layer).length > 0) {
				var subGroup = L.featureGroup
					.subGroup(parentMarkerCluster,
						markers.filter(marker => marker.feature.properties.activitycategory == layer)).addTo(map);
				lControl.addOverlay(subGroup, layer)
			}
	}
	);
}
