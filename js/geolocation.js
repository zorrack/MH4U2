function getUserGeolocation(map){

$('.locate-position').on('click', function(){

  map.locate( {
    setView: true,
    maxZoom: 15

  });
});

function onLocationFound(e) {

  if (map.hasOwnProperty("locationMarker")) {
    map.removeLayer(map.locationMarker);
    map.removeLayer(map.locationRadius);
  }

  let radius = L.circle([e.latitude, e.longitude], e.accuracy / 2);
  let locationMarker = L.marker(e.latlng);

  let icon = L.AwesomeMarkers.icon({
    markerColor: "white",
    prefix: 'glyphicon'
  });
  locationMarker.setIcon(icon);

  map.addLayer(locationMarker);
      // .on('click', function() {
      //   confirm("are you sure?");
      // });
  locationMarker.bindPopup("Ви у радіусі " + radius.options.radius + " м від цієї точки").openPopup();
  map.addLayer(radius);

  map.locationMarker = locationMarker;
  map.locationRadius = radius;
};

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);

}

function createUserLocationBtn(map) {

    //Create custom user location control
    L.Control.LocationBtn = L.Control.extend({
      onAdd: function(map) {
        var el = L.DomUtil.create('div', 'leaflet-control btn btn-light btn-sm locate-position'); 
        el.innerHTML = `<span class="icon">&#xf05b;</span>`;
        el.setAttribute('title', "Показати моє місцезнаходження");
        return el;
    },
      onRemove: function(map) {
        // Nothing to do here
      }
    });

    L.control.LocationBtn = function(opts) {
      return new L.Control.LocationBtn(opts);
    }

    L.control.LocationBtn({
      position: 'topleft'
    }).addTo(map);

}; 

