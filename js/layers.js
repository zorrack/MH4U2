let layer;

function createOverlays(arr){
	return [... new Set(arr.map(data => data.activitycategory))];
}

function createLayers(parentMarkerCluster, arr, markers, overlays, codeData) {
	parentMarkerCluster.subGroups = [];

	let overlayMap = [];

	overlays.forEach(layer => {
		let filteredFeatures = arr.features
			.filter(feature => feature.properties.activitycategory == layer);

		if (filteredFeatures.length > 0) {
			//Get service subcategories list for each category overlay
			let subActivities = [... new Set(filteredFeatures.map(feature =>
				feature.properties.subactivitycodename))];
			overlayMap.push({
				"layer" : layer,
				"subActivities" : subActivities
			});
				let filteredMarkers = markers.filter(marker =>
					marker.feature.properties.activitycategory == layer);

				let subGroup = L.featureGroup
					.subGroup(parentMarkerCluster, filteredMarkers).addTo(map);
				parentMarkerCluster.subGroups.push(subGroup);
				filteredMarkers.forEach(marker => marker.subGroup = subGroup);
				map.layerControl.addOverlay(subGroup, layer);
			}
	});
	//Get the name of the overlay on hover and show corresponding subcategories in the legend control
	let spans = $(".leaflet-control-layers-overlays div");
	spans.each(overlaySpanIndex => {
		let overlayObject = overlayMap.find(el => el.layer == spans[overlaySpanIndex].innerText.trim());
		spans[overlaySpanIndex].onmouseover = () => {
			let legendControl = $(".info.legend.leaflet-control");
			if (typeof legendControl !== "undefined") {
				legendControl[0].innerHTML = buildLegendControl(overlayObject);
				legendControl.show();
			}
		};
		spans[overlaySpanIndex].onmouseout = () => {
			let legendControl = $(".info.legend.leaflet-control");
			legendControl.hide();
		}
	});
	map.overlayMap = overlayMap;
}

//Build the template for legend control
function buildLegendControl(overlayObject) {
	let html = "<h4>" + overlayObject.layer + '</h4>';
	html += '<ul class="list-group">';
	overlayObject.subActivities.forEach(activity => html += '<li class="list-group-item">' 
	+ activity + '</li>');
	html += '</ul>';

	return html;
}
//Create custom overlay control
L.Control.Custom = L.Control.Layers.extend({

  onAdd: function () {
		this._initLayout();
		this._update();
		return this._container;
	}

});

//Create legend control
L.Control.Legend = L.Control.Layers.extend({

    onAdd: map => {
	  let title = '<h4>Заголовок</h4>';
	  let div = L.DomUtil.create('div', 'info legend');
	  return div;
	},

   });