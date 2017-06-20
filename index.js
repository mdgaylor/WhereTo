var map;
var searchButton;
var locationInput;
var marker

function initialize() {
  initMap();
  console.log('Map initialized...');
  initSearch();
  console.log('Search bar initialized...');

  searchButton.onclick = executeSearch;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 1
  });

}

function initSearch() {
  searchButton = document.getElementById('execSearch');
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var globalBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90.0, -180.0),
    new google.maps.LatLng(90.0, 180.0));
  var options = {
    bounds: globalBounds,
    types: ['(cities)']
  }
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  var autocomplete = new google.maps.places.Autocomplete(input, options);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });


}

function executeSearch() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(map) {
    if (this.readyState == 4 && this.status == 200) {
      var marker = new google.maps.Marker({
        position: {lat: 0.0, lng: 0.0},
        map: map
      });
      alert('hello');
    }
  }
  xhttp.open("GET", "ajax.txt", true);
  xhttp.send();
}
