var map;
var searchButton;
var locationInput;

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
  locationInput = document.getElementById('locationInput');
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
