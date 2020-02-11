function addMarkerSearch(parentMarkerCluster){

	let searchsubGroups = L.layerGroup([]);
	map.markerCluster.subGroups.forEach(subGroup => {
        searchsubGroups.addLayer(subGroup);
	});

	//TODO: make search results dependent on visible layers

    map.addControl( new L.Control.Search({
        layer: searchsubGroups,
        initial: false,
        zoom: 16,
        textPlaceholder: "Пошук (Назва | фахівці | послуги)",
        textErr: "Пошук не дав результатів",
		propertyName: 'searchby',
		//Fnction that return row tip html node(or html string), receive text tooltip in first param
		buildTip: function(text, val) {
//			var name = val.layer.feature.properties.officialName;
			return '<a href="#" class="' + " " + '">' + text + '<b>' + " " + name + '</b></a>';
		}
    }) );
}


