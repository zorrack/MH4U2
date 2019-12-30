function countUniqueValues(){

	return unique;
}

function createLayers(){

	for (var i = unique; i >= 0; i++) {
		var "layer" + [i] = new L.layerGroup();
	}
}

function pushFacilitiesToLayers(){

}

https://stackoverflow.com/questions/52412576/comparing-values-in-json-object-array