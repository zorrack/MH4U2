define([], function () {
  "use strict";

  function getUserGeolocation(map) {
    $('#locate-position').on('click', function () {
      map.locate({
        setView: true,
        maxZoom: 15
      });
    });

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      var marker = L.marker(e.latlng);
      var icon = L.AwesomeMarkers.icon({
        markerColor: "white",
        prefix: 'glyphicon'
      });
      marker.setIcon(icon);
      marker.addTo(map).on('click', function () {
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
});