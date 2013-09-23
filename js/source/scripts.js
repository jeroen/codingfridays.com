$(".hisrc img").hisrc();


var map; // Global declaration of the map
var iw			= new google.maps.InfoWindow(); // Global declaration of the infowindow
var lat_longs	= [];
var markers		= [];

function initialize() {

	var myLatlng = new google.maps.LatLng(41.650625, 2.746188);
	var myOptions = {
  		zoom: 16,
		center: myLatlng,
  		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var markerOptions = {
		map: map,
		position: myLatlng,
		icon: "img/map-field-icon.png",
		shadow: "img/map-field-shadow.png"
	};
	marker_0 = createMarker(markerOptions);

}

function createMarker(markerOptions) {
	var marker = new google.maps.Marker(markerOptions);
	markers.push(marker);
	lat_longs.push(marker.getPosition());
	return marker;
}

window.onload = initialize;