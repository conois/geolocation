document.getElementById("encuentrame").addEventListener('click', buscar);


function initMap() {
        var chile = {lat: -33.4569900, lng:-70.6394349};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: chile
        });
        var marker = new google.maps.Marker({
          position: chile,
          map: map
        });
         //Este extracto de codigo permite el autocompletado de input 
        var partida= document.getElementById("partida"); 
        var destino= document.getElementById("destino"); 

        new google.maps.places.Autocomplete(partida); 
        new google.maps.places.Autocomplete(destino); 

        
}

  function buscar(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

var latitude, longitude;
var success = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 18,
        center: myLatlng
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var miUbicacion = new google.maps.Marker({
        position: ({
            lat: latitude,
            lng: longitude
        }),
    });

    miUbicacion.setMap(map);

    var partida= document.getElementById("partida"); 
    var destino= document.getElementById("destino");

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var calculateAndDisplayRoute = function(directionService, directionDisplay) {
        directionsService.route({
            origin: partida.value,
            destination: destino.value,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('No fue posible encontrar una ruta.');
            }
        });
    }

    directionsDisplay.setMap(map);

    var trazarRuta = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    document.getElementById('trazar').addEventListener('click', trazarRuta);
}

var error = function(error) {
    alert('No hemos podido encontrar tu ubicación');
}
  