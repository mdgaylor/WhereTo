var map;
var locationList;
var locations;

function initialize() {
  initMap();
  console.log('Map initialized...');
  initSearch();
  console.log('Search bar initialized...');
  locations = {};
  locationList = document.getElementById('locationList');
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 1
  });
}

function initSearch() {
  var ctrls = document.getElementById('mapControls');
  // Client text input
  var input = document.getElementById('mapControlsInput');
  var globalBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90.0, -180.0),
    new google.maps.LatLng(90.0, 180.0));

  var options = {
    bounds: globalBounds,
    types: ['(regions)']
  }

  // Puts the map controls in the top left corner of the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(ctrls);
  // Makes an autocomplete from the user input and options
  var autocomplete = new google.maps.places.Autocomplete(input, options);

  // Listener for when a location is selected from the autocomplete
  autocomplete.addListener('place_changed', function() {
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
      map.setZoom(15);
    }
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });
    marker.setAnimation(google.maps.Animation.DROP);

    var listEl = document.createElement('li');
    var textNode = document.createTextNode(place.name);
    listEl.id = place.place_id;
    listEl.appendChild(textNode);
    listEl.onclick = removeLocation;

    locations[place.place_id] = marker;
    locationList.appendChild(listEl);
  });
}

function removeLocation() {
  var marker = locations[this.id];
  if (!marker) {
    return;
  }
  marker.setMap(null);
  locationList.removeChild(this);
}
