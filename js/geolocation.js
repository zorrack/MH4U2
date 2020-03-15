function getUserGeolocation(map){

$('.locate-position').on('click', function(){

  map.locate({setView: true, maxZoom: 15

  });
});

function onLocationFound(e) {

    var radius = e.accuracy / 2;
    let marker = L.marker(e.latlng)
        let icon = L.AwesomeMarkers.icon({
            markerColor: "white",
            prefix: 'glyphicon'
        });
        marker.setIcon(icon);

    marker.addTo(map)

        .on('click', function() {
          confirm("are you sure?");
        });
        marker.bindPopup("Ви у радіусі " + radius + " м від цієї точки").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

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

