function addMarkerSearch(parentMarkerCluster){
	let subGroups = L.layerGroup([]);
	parentMarkerCluster.subGroups.forEach(subGroup => {
        subGroups.addLayer(subGroup);
	});
	//TODO: make search results dependent on visible layers
	var controlSearch = new L.Control.Search({
   		layer: subGroups,
        initial: false,
        zoom: 16,
        textPlaceholder: "Пошук (Назва | фахівці | послуги)",
        textErr: "Пошук не дав результатів",
		propertyName: 'searchby',
		hideMarkerOnCollapse: true,

		//Fnction that return row tip html node(or html string), receive text tooltip in first param
		buildTip: function(text, val) {
			return '<a href="#" class="' + " " + '">' + text + '<b>' + " " + name + '</b></a>';
		}
	//TODO: prevent default action when user hits Enter 
	}).on('search:expanded', function () {
   		this._input.onkeyup = function(event){
    	if (event.key == "Enter") {
		    // Do work
		    event.preventDefault();
		    console.log("Enter is pressed")
   		}
	}
}).addTo(map);
}	