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
			//Add received text to the infowindow
			// let content = document.createTextNode(subActivities);
			// let infoWindow = document.getElementsByClassName('info')[0].appendChild(content);

			///Create overlay if the category has at least one element
				let filteredMarkers = markers.filter(marker =>
					marker.feature.properties.activitycategory == layer);

				let subGroup = L.featureGroup
					.subGroup(parentMarkerCluster, filteredMarkers).addTo(map);
				parentMarkerCluster.subGroups.push(subGroup);
				filteredMarkers.forEach(marker => marker.subGroup = subGroup);
				map.layerControl.addOverlay(subGroup, layer);
			}
	});
	let spans = $(".leaflet-control-layers-overlays span");
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

function buildLegendControl(overlayObject) {
	let html = "<h4>" + overlayObject.layer + "</h4>";
	html += "<ul>";
	overlayObject.subActivities.forEach(activity => html += "<li>" + activity + "</li>");
	html += "</ul>";

	return html;
}

L.Control.Custom = L.Control.Layers.extend({

  onAdd: function () {
		this._initLayout();
		this._addBtn();
		this._update();
		return this._container;
	},

	_addBtn: function () {
	  let objects = this._container.getElementsByClassName('leaflet-control-layers-list');
	  let button = L.DomUtil.create('button', 'layer-control-close', objects[0]);
	  button.title = "Enter Tooltip Here";
	  button.textContent = 'Close control';
  		L.DomEvent.on(objects, 'click', function(e){
	    L.DomEvent.stop(e);
	    this._collapse();
	  }, this);
	}

});

///
L.Control.Layers.include({
    getOverlays: function () {
        var control, layers;
        layers = {};
        control = this;
        control._layers.forEach(function (obj) {
            let layerName;
            if (obj.overlay) {
                layerName = obj.name;
                return layers[layerName] = control._map.hasLayer(obj.layer);
            }
        });
        return layers;
    }
});

L.Control.Legend = L.Control.Layers.extend({

    onAdd: map => {
	  let title = '<h4>Заголовок</h4>';
	  let div = L.DomUtil.create('div', 'info legend');
	  // div.innerHTML = title + [
	  // 	['0', 'Неформальні послуги в громаді'],
	  //   ['1','Формальні послуги в громаді'],
	  //   ['2','Допомога у сфері психічного здоров’я на рівні первинної медико-санітарної допомоги']
	  // ].map(a => `<span id="${a[0]}"><i></i> ${a[1]}</span>`).join('')
	  return div;
	},

   });

function onEachFeature(feature, layer) {
	layer.on('mouseover', e => $(`.legend > span:contains(${e.name})`).toggle() );
	layer.on('mouseout', e => $(`.legend > span:contains(${e.name})`).toggle() );
		
	layer.on('click', e => $(`.legend > span:contains(${e.name})`).toggle(), 
			console.log("Layer name -" + layer + "subactivities -" + subActivities)
	);
};

///////////Add overlay subcategories info tooltip