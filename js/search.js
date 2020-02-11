function searchMarkers(parentMarkerCluster){

	let searchLayers = L.layerGroup([]);
	map.markerCluster.subGroups.forEach(subGroup => {
        searchLayers.addLayer(subGroup);
	});
	console.log(searchLayers);

    map.addControl( new L.Control.Search({
        layer: searchLayers,
        initial: false,
		propertyName: 'officialName',
		buildTip: function(text, val) {
			var type = val.layer.feature.properties.activitycategory;
			return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
		}
    }) );
}
