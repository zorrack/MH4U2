// based on the category assign a marker to the layer
  layers.entretientLayer = L.geoJson(internships, {
    filter: function(feature, layer) {
      return (feature.properties.category === "entretient");
    }
  })

  layers.sécuritéLayer = L.geoJson(internships, {
    filter: function(feature, layer) {
      return (feature.properties.category === "securité");
    }
  })

  layers.secrétariatLayer = L.geoJson(internships, {
    filter: function(feature, layer) {
      return (feature.properties.category === "secretaria");
    }
  })

	// register click event
  $('button').on('click', function(e) {
    const layerName = e.target.name;

		// if a layer is already active, remove it from the map and the active array
    if (layers.active.includes(layerName)) {
      layers.active = layers.active.filter(layer => layer !== layerName);
      map.removeLayer(layers[layerName]);
    } else {
 			// add the layer to the map and to the active array
      layers.active.push(layerName);
      layers[layerName].addTo(map);
    }
  });
});