var map;
var searchButton;
var locationInput;

var locations;

var idCounter;

function initialize() {
  initMap();
  console.log('Map initialized...');
  initSearch();
  console.log('Search bar initialized...');

  searchButton.onclick = executeSearch;
  locations = {};
  idCounter = 0;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 1
  });
}

function initSearch() {
  searchButton = document.getElementById('execSearch');
  locationInput = document.getElementById('locationInput');
  locationList = document.getElementById('locationList');
}

function removeLocation() {
  var loc = locations[this.id];
  loc['marker'].setMap(null);
  locationList.removeChild(this);
}

function executeSearch() {
  var loc = {};
  loc['location'] = locationInput.value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      var lat = Math.random() * 180.0 - 90.0;
      var lng = Math.random() * 360.0 - 180.0;
      loc['marker'] = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map
      });
      loc['marker'].setAnimation(google.maps.Animation.DROP);
      var listEl = document.createElement('li');
      var textNode = document.createTextNode(loc['location']);

      listEl.appendChild(textNode);
      listEl.id = "LOC_" + idCounter++;
      locationList.appendChild(listEl);

      listEl.onclick = removeLocation;
      locations[listEl.id] = loc;
    }
  }
  xhttp.open("GET", "ajax.txt", true);
  xhttp.send();
}
