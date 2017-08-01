var map;
var locationList;
var locations;
var idToLocationElements;

function initialize() {
  initMap();
  console.log('Map initialized...');
  initSearch();
  console.log('Search bar initialized...');
  locations = {};
  idToLocationElements = {};
  locationList = document.getElementById('locationList');
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 1,
    styles: [{
      "featureType": "road", 
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit", // train tracks
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi", // points of interest
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.neighborhood", // neighborhoods
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.land_parcel", // small cities
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill", // equatorial lines
      "stylers": [{
        "visibility": "off"
      }]
    }]
  });
  map.addListener('click', function(e) {
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    geocoder.geocode({'location': e.latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {

            var locationNames = {};
            for (var i = 0; i < results[0].address_components.length; i++) {
              var type = results[0].address_components[i].types[0]
              if (type ===  'locality' || type === 'administrative_area_level_1' || type === 'country') {
                locationNames[type] = results[0].address_components[i].long_name;
              }
            }
            var listEl = document.createElement('li');
            listEl.id = results[0].place_id;
            if ('locality' in locationNames) {
              listEl.appendChild(document.createTextNode(locationNames['locality']));
            } else if ('administrative_area_level_1' in locationNames) {
              listEl.appendChild(document.createTextNode(locationNames['administrative_area_level_1']))
            } else {
              listEl.appendChild(document.createTextNode(locationNames['country']))
            }
            idToLocationElements[results[0].place_id] = listEl;
            placeMarker(e.latLng, map, results[0].place_id);
            listEl.onclick = removeLocation;
            locationList.appendChild(listEl);
          } else {
            window.alert('No result found');
          }
        }
      });
  });
  map.setOptions({ minZoom: 2, maxZoom: 9 });
}

function placeMarker(position, map, id) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  marker.setAnimation(google.maps.Animation.DROP);
  marker.addListener('click', function(e) {
    marker.setMap(null);
    locationList.removeChild(idToLocationElements[id]);
  });
  locations[id] = marker;
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
    marker.addListener('click', function(e) {
      marker.setMap(null);
    });

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
